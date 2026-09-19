// ---------------------------------------------------------------------------
// Navigation behaviour for the HUD header: scroll progress, active-section
// highlighting with a sliding indicator, live local time, cursor sheen,
// scroll compression and the mobile menu overlay.
// ---------------------------------------------------------------------------

import { animate, stagger, scroll, cubicBezier } from "motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);
const NAV_BREAKPOINT = 1000;
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- Scroll progress -------------------------------------------------------

function initScrollProgress() {
  const bar = document.querySelector("[data-scroll-progress]");
  if (!bar) return;

  scroll((progress) => {
    bar.style.transform = `scaleX(${progress})`;
  });
}

// --- Header compression on scroll -----------------------------------------

function initHeaderScroll() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

// --- Live local time (IST) -------------------------------------------------

function initClock() {
  const el = document.querySelector("[data-clock-time]");
  if (!el) return;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const tick = () => {
    el.textContent = formatter.format(new Date());
  };

  tick();
  window.setInterval(tick, 15000);
}

// --- Cursor sheen ----------------------------------------------------------

function initHudGlow() {
  const hud = document.querySelector("[data-hud]");
  if (!hud || prefersReducedMotion()) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  hud.addEventListener("pointermove", (event) => {
    const rect = hud.getBoundingClientRect();
    hud.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    hud.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
}

// --- Active section + sliding indicator ------------------------------------

function initActiveSection() {
  const links = Array.from(document.querySelectorAll("[data-nav-link]"));
  const sections = Array.from(document.querySelectorAll("[data-section]"));
  if (!links.length || !sections.length) return;

  const pill = document.querySelector("[data-nav-pill]");

  const movePill = (link) => {
    if (!pill || !link || link.offsetParent === null) return;
    const nav = link.closest("nav");
    const rect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    animate(
      pill,
      { x: rect.left - navRect.left, width: rect.width, opacity: 1 },
      { type: "spring", stiffness: 420, damping: 42, mass: 0.6 },
    );
  };

  const setActive = (id) => {
    let activeLink = null;
    links.forEach((link) => {
      const active = link.dataset.navLink === id;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "true");
        activeLink = link;
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (activeLink) movePill(activeLink);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));

  // Keep the indicator aligned when the layout changes.
  window.addEventListener("resize", () => {
    const current = links.find((link) => link.classList.contains("is-active"));
    if (current) movePill(current);
  });
}

// --- Mobile menu -----------------------------------------------------------

function initMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!toggle || !menu) return;

  const items = menu.querySelectorAll("[data-menu-item]");
  const label = toggle.querySelector("[data-menu-label]");
  let open = false;
  let lastFocused = null;

  const setOpen = (next) => {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    document.documentElement.style.overflow = open ? "hidden" : "";

    if (label) label.textContent = open ? "Close" : "Menu";

    if (prefersReducedMotion()) return;

    animate(
      items,
      open
        ? { opacity: [0, 1], transform: ["translate3d(0, 24px, 0)", "none"] }
        : { opacity: 0, transform: "translate3d(0, 12px, 0)" },
      open
        ? { duration: 0.6, delay: stagger(0.045, { startDelay: 0.1 }), ease: EASE }
        : { duration: 0.2, ease: EASE },
    );
  };

  toggle.addEventListener("click", () => {
    if (!open) {
      lastFocused = document.activeElement;
      setOpen(true);
      items[0]?.querySelector("a")?.focus();
    } else {
      setOpen(false);
      lastFocused?.focus();
    }
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      lastFocused?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (open && window.innerWidth > NAV_BREAKPOINT) setOpen(false);
  });
}

function init() {
  initScrollProgress();
  initHeaderScroll();
  initClock();
  initHudGlow();
  initActiveSection();
  initMobileMenu();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

document.addEventListener("astro:page-load", init);