// ---------------------------------------------------------------------------
// Player field: the hero's generative artwork.
// A slowly rotating spiral of dots where each dot stands for a slice of the
// 5M+ daily players supported at EA. The pointer pushes dots away; a few
// "light up" at a time like live sessions. Canvas 2D, no dependencies.
//
//   <canvas data-player-field data-total="5000000"></canvas>
//   <span data-player-legend></span>   receives "1 dot = 1,000 players"
//
// Pauses offscreen and in background tabs. Under reduced motion it renders a
// single static frame.
// ---------------------------------------------------------------------------

const ARMS = 3;
const TWIST = 2.2;
const SPIN = 0.018; // radians per second
const SPRING = 0.035;
const DAMPING = 0.86;
const PUSH_RADIUS = 130;
const PUSH_FORCE = 2.4;
const LIT_SHARE = 0.03;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function readColor(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function initField(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const total = Number(canvas.dataset.total || 5_000_000);
  const legend = canvas.parentElement?.querySelector("[data-player-legend]");
  const ink = readColor("--text", "#f1ede4");
  const signal = readColor("--accent", "#c8ff3d");

  let width = 0;
  let height = 0;
  let dpr = 1;
  let count = 0;
  let cx = 0;
  let cy = 0;
  let radius = 0;

  // Per-dot state in flat typed arrays (fast for thousands of points).
  let r, theta, x, y, vx, vy, size, glow;

  const pointer = { x: -9999, y: -9999, active: false };

  function seed() {
    count = width < 700 ? 2000 : 5000;
    r = new Float32Array(count);
    theta = new Float32Array(count);
    x = new Float32Array(count);
    y = new Float32Array(count);
    vx = new Float32Array(count);
    vy = new Float32Array(count);
    size = new Float32Array(count);
    glow = new Float32Array(count);

    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    for (let i = 0; i < count; i++) {
      const kind = Math.random();
      if (kind < 0.68) {
        // Spiral arms, loosening toward the rim.
        const dist = Math.pow(Math.random(), 0.65);
        const arm = (i % ARMS) * ((Math.PI * 2) / ARMS);
        r[i] = Math.min(1, dist + gauss() * 0.05);
        theta[i] = arm + dist * TWIST + gauss() * (0.55 - dist * 0.2);
      } else if (kind < 0.86) {
        // Dense core.
        r[i] = Math.pow(Math.random(), 1.6) * 0.32;
        theta[i] = Math.random() * Math.PI * 2;
      } else {
        // Sparse halo.
        r[i] = 0.25 + Math.random() * 0.85;
        theta[i] = Math.random() * Math.PI * 2;
      }
      size[i] = Math.random() < 0.05 ? 1.9 : 1 + Math.random() * 0.5;
      glow[i] = Math.random() < LIT_SHARE ? Math.random() : 0;
    }

    if (legend) {
      const perDot = Math.round(total / count).toLocaleString("en-US");
      legend.textContent = `1 dot = ${perDot} daily players`;
    }
  }

  function layout() {
    const rect = canvas.getBoundingClientRect();
    const previous = count;
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const wide = width >= 900;
    cx = wide ? width * 0.7 : width * 0.55;
    cy = wide ? height * 0.48 : height * 0.3;
    radius = wide ? Math.min(width * 0.3, height * 0.46) : Math.min(width * 0.62, height * 0.3);

    if (!previous || (width < 700) !== (previous === 2000)) seed();
  }

  function home(i, angle) {
    const a = theta[i] + angle;
    const d = r[i] * radius;
    // Slight vertical squash gives the spiral depth.
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.62];
  }

  function place(angle) {
    for (let i = 0; i < count; i++) {
      const [hx, hy] = home(i, angle);
      x[i] = hx;
      y[i] = hy;
    }
  }

  function step(angle, dt) {
    const pushR2 = PUSH_RADIUS * PUSH_RADIUS;
    for (let i = 0; i < count; i++) {
      const [hx, hy] = home(i, angle);
      vx[i] += (hx - x[i]) * SPRING;
      vy[i] += (hy - y[i]) * SPRING;

      if (pointer.active) {
        const dx = x[i] - pointer.x;
        const dy = y[i] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < pushR2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / PUSH_RADIUS) * PUSH_FORCE;
          vx[i] += (dx / d) * f;
          vy[i] += (dy / d) * f;
        }
      }

      vx[i] *= DAMPING;
      vy[i] *= DAMPING;
      x[i] += vx[i];
      y[i] += vy[i];

      // Sessions: lit dots fade out, new ones occasionally light up.
      if (glow[i] > 0) glow[i] = Math.max(0, glow[i] - dt * 0.25);
      else if (Math.random() < LIT_SHARE * dt * 0.25) glow[i] = 1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = ink;
    for (let i = 0; i < count; i++) {
      if (glow[i] > 0.05) continue;
      ctx.globalAlpha = 0.16 + (1 - r[i]) * 0.3;
      const s = size[i];
      ctx.fillRect(x[i] - s / 2, y[i] - s / 2, s, s);
    }

    ctx.fillStyle = signal;
    for (let i = 0; i < count; i++) {
      if (glow[i] <= 0.05) continue;
      ctx.globalAlpha = glow[i];
      const s = size[i] + 1.2;
      ctx.fillRect(x[i] - s / 2, y[i] - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
  }

  layout();
  place(0);
  draw();

  if (prefersReducedMotion()) {
    new ResizeObserver(() => {
      layout();
      place(0);
      draw();
    }).observe(canvas);
    return;
  }

  let angle = 0;
  let last = performance.now();
  let frame = 0;
  let visible = true;

  const loop = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    angle += SPIN * dt;
    step(angle, dt);
    draw();
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (frame || !visible || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(canvas);

  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  new ResizeObserver(() => {
    layout();
    place(angle);
  }).observe(canvas);

  const host = canvas.closest("[data-player-host]") || canvas;
  host.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });
  host.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  start();
}

function init() {
  document.querySelectorAll("[data-player-field]").forEach((canvas) => {
    if (canvas.hasAttribute("data-field-bound")) return;
    canvas.setAttribute("data-field-bound", "");
    initField(canvas);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
