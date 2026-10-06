// Static sitemap for the homepage, resume and published case studies.
import { publishedProjects } from "../data/projects.js";

export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const paths = ["", "resume/", ...publishedProjects.map((project) => `work/${project.slug}/`)];
  const urls = paths
    .map((path) => `  <url><loc>${new URL(`${base}${path}`, site).href}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
