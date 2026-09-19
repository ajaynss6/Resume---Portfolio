// ---------------------------------------------------------------------------
// Selected work interactions.
// Hovering a project subtly lifts the row, scales its visual, tilts it toward
// the pointer and dims its siblings. Pointer-only, transform/opacity only, so
// it never causes layout shift or jank. Fully disabled for touch and for
// reduced-motion users.
// ---------------------------------------------------------------------------

import { animate, hover, cubicBezier } from "motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);
const SPRING = { type: "spring", stiffness: 260, damping: 30, mass: 0.7 };

const supportsHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function init() {
  const list = document.querySelector("[data-work-list]");
  if (!list) return;
  if (!supportsHover() || prefersReducedMotion()) return;

  const rows = Array.from(list.querySelectorAll("[data-work-row]"));

  rows.forEach((row) => {
    const title = row.querySelector("[data-work-title]");
    const visual = row.querySelector("[data-work-visual]");
    const visualInner = row.querySelector("[data-work-visual-inner]");
    const index = row.querySelector("[data-work-index]");
    const meta = row.querySelector("[data-work-meta]");
    const siblings = rows.filter((item) => item !== row);

    const resetTilt = () => {
      if (!visual) return;
      animate(visual, { rotateX: 0, rotateY: 0 }, SPRING);
    };

    hover(row, () => {
      animate(row, { x: 6 }, SPRING);
      if (title) animate(title, { y: -4 }, SPRING);
      if (visualInner) animate(visualInner, { scale: 1.06 }, SPRING);
      if (index) animate(index, { opacity: 1, color: "var(--accent-strong)" }, { duration: 0.35, ease: EASE });
      if (meta) animate(meta, { opacity: 1 }, { duration: 0.35, ease: EASE });
      animate(siblings, { opacity: 0.32 }, { duration: 0.4, ease: EASE });

      return () => {
        animate(row, { x: 0 }, SPRING);
        if (title) animate(title, { y: 0 }, SPRING);
        if (visualInner) animate(visualInner, { scale: 1 }, SPRING);
        if (index) animate(index, { opacity: 0.45, color: "var(--text-tertiary)" }, { duration: 0.4, ease: EASE });
        resetTilt();
        animate(siblings, { opacity: 1 }, { duration: 0.5, ease: EASE });
      };
    });

    if (visual) {
      row.addEventListener("pointermove", (event) => {
        const rect = row.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        animate(
          visual,
          { rotateY: px * 8, rotateX: -py * 8 },
          { duration: 0.5, ease: EASE },
        );
      });

      row.addEventListener("pointerleave", resetTilt);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

document.addEventListener("astro:page-load", init);