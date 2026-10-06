// ---------------------------------------------------------------------------
// Renders static assets from the built site with headless Chromium:
//   /resume  -> public/<profile.resumePdf>  (text-based, ATS-readable PDF)
//   /og      -> public/og.png               (1200x630 social card)
//
// Usage: npm run assets   (builds first, then renders)
// Commit the outputs; CI does not run a browser.
// ---------------------------------------------------------------------------

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright-core";
import { profile } from "../src/data/profile.js";

const ROOT = resolve("dist");
const BASE = (process.env.BASE_PATH || "/Resume---Portfolio").replace(/\/$/, "");
const PORT = 4799;

const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.startsWith(BASE)) path = path.slice(BASE.length);
  let file = join(ROOT, path);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
  } catch {
    file = `${file.replace(/\/$/, "")}.html`;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});

// Prefer an explicit or preinstalled Chromium; otherwise let Playwright resolve one.
const executablePath = [process.env.CHROMIUM_PATH, "/opt/pw-browsers/chromium"].find(
  (path) => path && existsSync(path),
);

await new Promise((done) => server.listen(PORT, done));
const browser = await chromium.launch(executablePath ? { executablePath } : {});

try {
  const origin = `http://localhost:${PORT}${BASE}`;
  const page = await browser.newPage();

  await page.goto(`${origin}/resume/`, { waitUntil: "networkidle" });
  await page.pdf({
    path: join("public", profile.resumePdf),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`wrote public/${profile.resumePdf}`);

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(`${origin}/og/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: join("public", "og.png") });
  console.log("wrote public/og.png");
} finally {
  await browser.close();
  server.close();
}
