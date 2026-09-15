// @ts-check
import { defineConfig } from "astro/config";

// ---------------------------------------------------------------------------
// Deployment configuration
// ---------------------------------------------------------------------------
// `site` is your final deployed URL (used for absolute links / canonical URLs).
// `base` is the sub-path your site is served from. For a GitHub *project*
// page (e.g. https://<user>.github.io/<repo>/) this must be `/<repo>`.
//
// Both can be overridden by environment variables so CI can set them without
// editing this file. Defaults target the `Resume---Portfolio` repository.
// ---------------------------------------------------------------------------
const site = process.env.SITE_URL || "https://ajaynss6.github.io";
const base = process.env.BASE_PATH || "/Resume---Portfolio";

export default defineConfig({
  site,
  base,
});