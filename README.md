# Ajay Krishna — Portfolio

Personal portfolio website. Built with [Astro](https://astro.build), output as a
fully static site that deploys to GitHub Pages.

## Stack

- **Astro** — static HTML output, component-based, near-zero client JavaScript.
- **Plain CSS** with design tokens in `:root` (no CSS framework).
- No runtime dependencies. Astro and TypeScript are build-time only.

## Structure

```
.
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── public/                        # Static assets copied as-is (favicon, robots.txt, .nojekyll)
├── src/
│   ├── components/
│   │   ├── layout/                # BaseLayout, Header, Footer
│   │   ├── sections/              # One component per page section
│   │   └── ui/                    # Reusable primitives (Section, TagList)
│   ├── data/                      # ALL editable content lives here
│   │   ├── profile.js             # Name, summary, contact, links
│   │   ├── navigation.js          # Nav items / section list
│   │   ├── experience.js          # Work experience
│   │   ├── projects.js            # Projects / product work
│   │   ├── skills.js              # Skill groups
│   │   ├── education.js           # Education
│   │   ├── certifications.js      # Certifications
│   │   └── achievements.js        # Impact highlights
│   ├── pages/index.astro          # Homepage — assembles the sections
│   └── styles/global.css          # Design tokens + base styles
└── astro.config.mjs               # site/base configuration
```

**Content and presentation are separated.** To update text, edit the files in
`src/data/`. Components never contain hardcoded professional information.

## Local development

Requires Node 18.17+ (Node 22+ recommended).

```bash
npm install      # install build-time dependencies
npm run dev      # start dev server at http://localhost:4321/Resume---Portfolio/
npm run build    # build static output to dist/
npm run preview  # preview the production build locally
npm run check    # type/accessibility checks
```

## Deployment (GitHub Pages)

Deployment is automated via `.github/workflows/deploy.yml`:

1. Push to the `main` branch.
2. In the repository, go to **Settings → Pages** and set the **Source** to
   **GitHub Actions** (one-time setup).
3. The workflow builds and publishes the site to:
   `https://ajaynss6.github.io/Resume---Portfolio/`

`astro.config.mjs` reads two environment variables, already set in the workflow:

| Variable    | Value                            | Purpose                        |
| ----------- | -------------------------------- | ------------------------------ |
| `SITE_URL`  | `https://ajaynss6.github.io`     | Canonical base URL             |
| `BASE_PATH` | `/Resume---Portfolio`            | Sub-path the site is served at |

If the repository is renamed, update these two values in the workflow and in the
defaults inside `astro.config.mjs`.
