// ---------------------------------------------------------------------------
// The Thread: a hairline that leaves the hero galaxy and runs the length of
// the page, revealed by scrolling.
//
// The path starts at the galaxy core, curls out to a page margin, then runs
// down the margins, crossing sides only through the empty padding between
// sections so it never sits on top of text. A small dot tracks the scroll
// position, a checkpoint fills as each section is reached, and the line ends
// in a still ring at the footer. It only redraws while scrolling.
//
//   <canvas data-thread></canvas>   fixed, full viewport, behind content
//
// Under reduced motion the head jumps to the scroll position without easing.
// ---------------------------------------------------------------------------

const STEP = 6; // px between sampled path points
const HEAD_AT = 0.62; // head follows this fraction of the viewport height
const TAIL = 520; // px of lit trail behind the head
const EASE = 0.12; // head easing per frame

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function token(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, "$1$1") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Centripetal Catmull-Rom through waypoints, sampled every STEP px. The
// centripetal form never loops or overshoots, even with uneven spacing.
function sample(points) {
  const out = [];
  const knot = (a, b) => Math.max(1e-3, Math.sqrt(Math.hypot(b.x - a.x, b.y - a.y)));
  const lerp = (a, b, ta, tb, t) => {
    const w = (t - ta) / (tb - ta);
    return { x: a.x + (b.x - a.x) * w, y: a.y + (b.y - a.y) * w };
  };
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const t0 = 0;
    const t1 = t0 + knot(p0, p1);
    const t2 = t1 + knot(p1, p2);
    const t3 = t2 + knot(p2, p3);
    const steps = Math.max(2, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / STEP));
    for (let k = 0; k < steps; k++) {
      const t = t1 + ((t2 - t1) * k) / steps;
      const a1 = lerp(p0, p1, t0, t1, t);
      const a2 = lerp(p1, p2, t1, t2, t);
      const a3 = lerp(p2, p3, t2, t3, t);
      const b1 = lerp(a1, a2, t0, t2, t);
      const b2 = lerp(a2, a3, t1, t3, t);
      out.push(lerp(b1, b2, t1, t2, t));
    }
  }
  out.push({ ...points[points.length - 1] });
  return out;
}

function initThread(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const [ar, ag, ab] = hexToRgb(token("--accent", "#c8ff3d"));
  const [ir, ig, ib] = hexToRgb(token("--text", "#f1ede4"));
  const accent = (a) => `rgba(${ar},${ag},${ab},${a})`;
  const ink = (a) => `rgba(${ir},${ig},${ib},${a})`;

  let W = 0;
  let H = 0;
  let dpr = 1;
  let path = []; // { x, y, s } in document coordinates, s = arc length
  let total = 0;
  let nodes = []; // { s, x, y } checkpoints
  let head = 0; // revealed arc length (eased)
  const reduced = prefersReducedMotion();

  const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;

  function build() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const field = document.querySelector("[data-player-field]");
    const sections = Array.from(document.querySelectorAll("[data-section]"));
    const footer = document.querySelector(".site-footer");
    if (!field || !sections.length) return;

    // Lanes sit halfway into the page margins.
    const container = sections[0].querySelector(".container");
    const cRect = container.getBoundingClientRect();
    const padL = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const margin = Math.max(12, cRect.left + padL);
    const lanes = [W - margin / 2, margin / 2];

    // Galaxy core, matching player-field.js.
    const f = field.getBoundingClientRect();
    const wide = f.width >= 900;
    const gx = f.left + f.width * (wide ? 0.7 : 0.55);
    const gy = docTop(field) + f.height * (wide ? 0.48 : 0.3);
    const heroBottom = docTop(field) + f.height;

    // Curl out of the core, then drop into the right lane below the hero.
    const pts = [
      { x: gx, y: gy },
      { x: gx + (lanes[0] - gx) * 0.35, y: gy + f.height * 0.08 },
      { x: gx + (lanes[0] - gx) * 0.8, y: gy + (heroBottom - gy) * 0.45 },
      { x: lanes[0], y: heroBottom },
    ];
    const marks = [];

    let side = 0;
    sections.forEach((section, i) => {
      const top = docTop(section);
      const bottom = top + section.offsetHeight;
      const style = getComputedStyle(section);
      const padT = parseFloat(style.paddingTop) || 0;
      const padB = parseFloat(style.paddingBottom) || 0;

      // Cross sides through the empty top padding of every other section.
      if (i > 0) {
        const from = lanes[side];
        side = 1 - side;
        pts.push({ x: from, y: top - padB * 0.1 });
        pts.push({ x: (from + lanes[side]) / 2, y: top + padT * 0.35 });
        pts.push({ x: lanes[side], y: top + padT * 0.8 });
      }
      marks.push(pts.length);
      pts.push({ x: lanes[side], y: top + padT });
      pts.push({ x: lanes[side], y: bottom - padB * 0.5 });
    });

    // Ease into the footer and end under the wordmark.
    if (footer) {
      const ft = docTop(footer);
      pts.push({ x: lanes[side] + (W / 2 - lanes[side]) * 0.3, y: ft + 70 });
      pts.push({ x: W / 2, y: ft + footer.offsetHeight * 0.55 });
    }

    path = sample(pts);
    const amp = Math.min(7, margin * 0.18);
    for (const p of path) {
      if (p.y > heroBottom) p.x += Math.sin(p.y * 0.011) * amp;
    }
    total = 0;
    path[0].s = 0;
    for (let i = 1; i < path.length; i++) {
      total += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
      path[i].s = total;
    }

    // Checkpoints at each section entry: nearest sampled point by y.
    nodes = marks.map((index) => {
      const target = pts[index];
      let best = path[0];
      for (const p of path) {
        if (Math.abs(p.y - target.y) + Math.abs(p.x - target.x) < Math.abs(best.y - target.y) + Math.abs(best.x - target.x)) best = p;
      }
      return { x: best.x, y: best.y, s: best.s };
    });

    head = Math.min(head || 0, total);
  }

  // Index of the first sample at or after arc length s.
  function indexAt(s) {
    let lo = 0;
    let hi = path.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (path[mid].s < s) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function pointAt(s) {
    const i = Math.max(1, indexAt(s));
    const a = path[i - 1];
    const b = path[i];
    const span = b.s - a.s || 1;
    const t = Math.min(1, Math.max(0, (s - a.s) / span));
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: a.x + dx * t, y: a.y + dy * t, nx: -dy / len, ny: dx / len };
  }

  // Arc length whose point is at document y (path runs downward overall).
  function arcAtY(y) {
    let lo = 0;
    let hi = path.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (path[mid].y < y) lo = mid + 1;
      else hi = mid;
    }
    return path[lo].s;
  }


  function targetHead() {
    const max = document.documentElement.scrollHeight - H;
    if (window.scrollY >= max - 4) return total;
    return Math.min(total, arcAtY(window.scrollY + H * HEAD_AT));
  }

  function visibleRange() {
    const top = window.scrollY - 60;
    const bottom = window.scrollY + H + 60;
    return [arcAtY(top), Math.min(head, arcAtY(bottom))];
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    if (!path.length) return;
    const sy = window.scrollY;
    const [s0, s1] = visibleRange();

    // Base line: the revealed path in view, a hairline.
    if (s1 > s0) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = ink(0.08);
      ctx.beginPath();
      for (let i = indexAt(s0), started = false; i < path.length && path[i].s <= s1; i++) {
        const p = path[i];
        if (!started) {
          ctx.moveTo(p.x, p.y - sy);
          started = true;
        } else ctx.lineTo(p.x, p.y - sy);
      }
      ctx.stroke();

      // Trail behind the head, fading out.
      const t0 = Math.max(s0, head - TAIL);
      ctx.lineWidth = 1.25;
      for (let i = indexAt(t0) + 1; i < path.length && path[i].s <= head; i++) {
        const a = path[i - 1];
        const b = path[i];
        ctx.strokeStyle = ink(((b.s - (head - TAIL)) / TAIL) * 0.45);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y - sy);
        ctx.lineTo(b.x, b.y - sy);
        ctx.stroke();
      }
    }

    // Checkpoints: one quiet dot per section, filled once reached.
    for (const n of nodes) {
      const y = n.y - sy;
      if (y < -20 || y > H + 20) continue;
      const reached = n.s <= head;
      ctx.beginPath();
      ctx.arc(n.x, y, reached ? 3 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = reached ? ink(0.85) : "rgba(0,0,0,0)";
      ctx.strokeStyle = ink(reached ? 0.85 : 0.22);
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    }

    // Head: a small dot with a soft halo.
    if (head > 0) {
      const h = pointAt(head);
      const y = h.y - sy;
      if (y > -30 && y < H + 30) {
        const halo = ctx.createRadialGradient(h.x, y, 0, h.x, y, 16);
        halo.addColorStop(0, ink(0.14));
        halo.addColorStop(1, ink(0));
        ctx.fillStyle = halo;
        ctx.fillRect(h.x - 16, y - 16, 32, 32);
        ctx.beginPath();
        ctx.arc(h.x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = accent(1);
        ctx.fill();
      }

      // End of the line: one still ring under the wordmark.
      if (head >= total - 1) {
        const end = path[path.length - 1];
        ctx.beginPath();
        ctx.arc(end.x, end.y - sy, 10, 0, Math.PI * 2);
        ctx.strokeStyle = ink(0.3);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  build();

  let rebuildTimer = 0;
  const rebuild = () => {
    window.clearTimeout(rebuildTimer);
    rebuildTimer = window.setTimeout(() => {
      build();
      head = targetHead();
      draw();
    }, 120);
  };
  new ResizeObserver(rebuild).observe(document.body);
  window.addEventListener("resize", rebuild);

  if (reduced) {
    const render = () => {
      head = targetHead();
      draw();
    };
    render();
    window.addEventListener("scroll", render, { passive: true });
    return;
  }

  // Ease the head toward the scroll position, then go idle until the next
  // scroll or resize: nothing animates on its own.
  let frame = 0;
  const loop = () => {
    const target = targetHead();
    head += (target - head) * EASE;
    if (Math.abs(target - head) < 0.5) head = target;
    draw();
    frame = head === target ? 0 : requestAnimationFrame(loop);
  };
  const start = () => {
    if (frame || document.hidden) return;
    frame = requestAnimationFrame(loop);
  };
  window.addEventListener("scroll", start, { passive: true });
  window.addEventListener("resize", start);
  document.addEventListener("visibilitychange", start);
  start();
}

function init() {
  const canvas = document.querySelector("[data-thread]");
  if (!canvas || canvas.hasAttribute("data-thread-bound")) return;
  canvas.setAttribute("data-thread-bound", "");
  initThread(canvas);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
