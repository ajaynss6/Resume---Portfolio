// ---------------------------------------------------------------------------
// Small UI behaviours shared across pages:
//   [data-brief-open]   opens the TL;DR dialog ([data-brief])
//   [data-brief-close]  closes it; clicking the backdrop also closes it
//   [data-copy="text"]  copies text to the clipboard, confirms in
//                       [data-copy-label] and announces via a live region
// ---------------------------------------------------------------------------

function announce(message) {
  let region = document.querySelector("[data-live-region]");
  if (!region) {
    region = document.createElement("div");
    region.setAttribute("data-live-region", "");
    region.setAttribute("role", "status");
    region.className = "visually-hidden";
    document.body.append(region);
  }
  region.textContent = "";
  window.setTimeout(() => (region.textContent = message), 30);
}

function initBrief() {
  const dialog = document.querySelector("[data-brief]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  document.querySelectorAll("[data-brief-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => dialog.showModal());
  });

  dialog.querySelectorAll("[data-brief-close]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  // Close when the click lands on the backdrop (the dialog box itself).
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  if (window.location.hash === "#brief") dialog.showModal();
}

function initCopy() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    const label = button.querySelector("[data-copy-label]");
    const original = label?.textContent;

    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        if (label) label.textContent = "Copied ✓";
        announce(`${text} copied to clipboard`);
      } catch {
        // Clipboard blocked: fall back to opening the mail client.
        window.location.href = `mailto:${text}`;
        return;
      }
      window.setTimeout(() => {
        if (label && original) label.textContent = original;
      }, 2000);
    });
  });
}

function init() {
  initBrief();
  initCopy();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
