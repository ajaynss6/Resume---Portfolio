// ---------------------------------------------------------------------------
// Motion system
// ---------------------------------------------------------------------------
// A single, attribute-driven animation layer. Components declare intent with
// data attributes; this module owns the actual motion so timing, easing and
// behaviour stay consistent across the whole site.
//
//   data-reveal              fade + rise into view
//   data-reveal-delay="0.2"  extra delay (seconds)
//   data-reveal-y="40"       custom rise distance (px)
//   data-reveal-group        container whose [data-reveal] children stagger in
//   data-stagger="0.08"      stagger interval for a group (seconds)
//   data-split               container holding [data-split-word] elements
//   data-split-delay="0.1"   delay before a split reveal
//   data-parallax="0.12"     scroll-linked vertical drift
//   data-count-to="45"       count-up number (+ data-count-prefix/suffix)
// ---------------------------------------------------------------------------

import { animate, inView, scroll, stagger, cubicBezier } from "motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);
const EASE_SOFT = cubicBezier(0.22, 1, 0.36, 1);
const REVEAL_DURATION = 0.9;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cleanups = new Set();

const markDone = (el) => el.setAttribute("data-animate-done", "");

const enterView = (el, handler, options) => {
  let stop = () => {};
  stop = inView(
    el,
    (target, entry) => {
      if (!entry.isIntersecting) return;
      stop();
      handler(target);
    },
    options,
  );
  cleanups.add(stop);
};

// --- Reveals ---------------------------------------------------------------

function initGroupReveals(root) {
  root.querySelectorAll("[data-reveal-group]").forEach((group) => {
    if (group.hasAttribute("data-reveal-bound")) return;
    group.setAttribute("data-reveal-bound", "");

    const items = Array.from(group.querySelectorAll("[data-reveal]")).filter(
      (item) => item.closest("[data-reveal-group]") === group,
    );
    if (!items.length) return;

    const interval = parseFloat(group.dataset.stagger || "0.08");

    enterView(
      group,
      () => {
        if (prefersReducedMotion()) {
          items.forEach(markDone);
          return;
        }
        animate(
          items,
          { opacity: [0, 1], transform: ["translate3d(0, 28px, 0)", "none"] },
          { duration: REVEAL_DURATION, delay: stagger(interval), ease: EASE },
        );
        items.forEach(markDone);
      },
      { amount: 0.15 },
    );
  });
}

function initReveals(root) {
  root.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.hasAttribute("data-reveal-bound")) return;
    if (el.closest("[data-reveal-group]")) return;
    el.setAttribute("data-reveal-bound", "");

    const delay = parseFloat(el.dataset.revealDelay || "0");
    const y = parseFloat(el.dataset.revealY || "28");

    enterView(
      el,
      () => {
        if (prefersReducedMotion()) {
          markDone(el);
          return;
        }
        animate(
          el,
          { opacity: [0, 1], transform: [`translate3d(0, ${y}px, 0)`, "none"] },
          { duration: REVEAL_DURATION, delay, ease: EASE },
        );
        markDone(el);
      },
      { amount: 0.2 },
    );
  });
}

// --- Text (word) reveals ---------------------------------------------------

function initSplitReveals(root) {
  root.querySelectorAll("[data-split]").forEach((el) => {
    if (el.hasAttribute("data-split-bound")) return;
    el.setAttribute("data-split-bound", "");

    const words = el.querySelectorAll("[data-split-word]");
    if (!words.length) return;

    const delay = parseFloat(el.dataset.splitDelay || "0.05");

    enterView(
      el,
      () => {
        if (prefersReducedMotion()) {
          words.forEach(markDone);
          return;
        }
        animate(
          words,
          {
            opacity: [0, 1],
            transform: ["translate3d(0, 110%, 0)", "translate3d(0, 0, 0)"],
          },
          { duration: 1, delay: stagger(0.045, { startDelay: delay }), ease: EASE },
        );
        words.forEach(markDone);
      },
      { amount: 0.5 },
    );
  });
}

// --- Parallax --------------------------------------------------------------

function initParallax(root) {
  if (prefersReducedMotion()) return;

  root.querySelectorAll("[data-parallax]").forEach((el) => {
    if (el.hasAttribute("data-parallax-bound")) return;
    el.setAttribute("data-parallax-bound", "");

    const amount = parseFloat(el.dataset.parallax || "0.12");
    const shift = amount * 100;

    cleanups.add(
      scroll(
        animate(
          el,
          { y: [shift, -shift] },
          { ease: EASE_SOFT, duration: 0 },
        ),
        { target: el, offset: ["start end", "end start"] },
      ),
    );
  });
}

// --- Count-up numbers ------------------------------------------------------

function initCounters(root) {
  root.querySelectorAll("[data-count-to]").forEach((el) => {
    if (el.hasAttribute("data-count-bound")) return;
    el.setAttribute("data-count-bound", "");

    const target = parseFloat(el.dataset.countTo || "0");
    const prefix = el.dataset.countPrefix || "";
    const suffix = el.dataset.countSuffix || "";
    const decimals = parseInt(el.dataset.countDecimals || "0", 10);

    const render = (value) => {
      el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    };

    if (prefersReducedMotion()) {
      render(target);
      return;
    }

    // The server-rendered value stays in the DOM (better for SEO and no-JS);
    // it only counts up once the number actually scrolls into view.
    enterView(
      el,
      () => {
        animate(0, target, {
          duration: 1.7,
          ease: EASE,
          onUpdate: render,
        });
      },
      { amount: 0.6 },
    );
  });
}

// --- Boot ------------------------------------------------------------------

function init() {
  const root = document;
  document.documentElement.classList.add("motion-ready");
  document.documentElement.classList.remove("motion-fallback");

  // Reduced motion: no animation. Content is already visible via CSS, but we
  // mark elements done so nothing is left in a hidden state.
  if (prefersReducedMotion()) {
    root
      .querySelectorAll("[data-reveal], [data-split-word]")
      .forEach(markDone);
    return;
  }

  initGroupReveals(root);
  initReveals(root);
  initSplitReveals(root);
  initParallax(root);
  initCounters(root);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

// Support Astro view transitions (no-op for a single page, future-proof).
document.addEventListener("astro:page-load", init);

export { animate, inView, scroll, stagger, cubicBezier, prefersReducedMotion };