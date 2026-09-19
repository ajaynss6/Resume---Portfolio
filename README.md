# Ajay Krishna — Portfolio

A premium, dark-first personal portfolio for Ajay Krishna — built as a fully
static site that deploys to GitHub Pages.

## Stack

- **[Astro](https://astro.build)** — static HTML output, component-based, no
  runtime framework.
- **[Motion](https://motion.dev)** (vanilla) — scroll reveals, text reveals,
  parallax, count-ups, hover and micro-interactions.
- **Plain CSS with design tokens** — dark-first system in `src/styles/tokens.css`.
- **Self-hosted fonts** (Fontsource, latin-subsetted): Space Grotesk (display),
  Inter (body), JetBrains Mono (metadata), Instrument Serif (editorial accents).
- Build-time dependencies only. No UI framework, no CSS framework.

## Structure

```
.
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── public/                        # favicon, robots.txt, .nojekyll
├── src/
│   ├── components/
│   │   ├── layout/                # BaseLayout, Header, Footer, Background
│   │   ├── sections/              # Hero, Work, Experience, Capabilities,
│   │   │                          # Metrics, About, Contact, ProjectVisual
│   │   └── ui/                    # Section, SplitText, TagList
│   ├── data/                      # ALL editable content (see below)
│   ├── scripts/
│   │   ├── motion-system.js       # attribute-driven animation engine
│   │   ├── nav.js                 # scroll progress, active section, mobile menu
│   │   └── projects.js            # work-section hover interactions
│   ├── pages/index.astro          # homepage — assembles the sections
│   └── styles/                    # tokens.css, base.css, utilities.css, global.css
└── astro.config.mjs
```

### Content

All professional content lives in `src/data/` — components never hardcode it:

| File                 | Contents                          |
| -------------------- | --------------------------------- |
| `profile.js`         | Name, summary, contact, links     |
| `navigation.js`      | Nav items / section list          |
| `experience.js`      | Work experience                   |
| `projects.js`        | Selected work / product work      |
| `skills.js`          | Capability groups                 |
| `metrics.js`         | Impact numbers (count-up)         |
| `education.js`       | Education                         |
| `certifications.js`  | Certifications                    |
| `achievements.js`    | Achievement highlights            |

## Motion system

Animations are declared with data attributes and driven centrally by
`src/scripts/motion-system.js`, so timing and easing stay consistent:

| Attribute               | Effect                                    |
| ----------------------- | ----------------------------------------- |
| `data-reveal`           | Fade + rise into view                     |
| `data-reveal-delay`     | Extra delay (seconds)                     |
| `data-reveal-group`     | Stagger `[data-reveal]` children          |
| `data-split`            | Animate `[data-split-word]` (via SplitText) |
| `data-parallax="0.12"`  | Scroll-linked vertical drift              |
| `data-count-to="45"`    | Count-up number (prefix/suffix supported) |

The same system respects `prefers-reduced-motion`: animations are skipped and
content is rendered immediately.

## Local development

Requires Node 22+.

```bash
npm install
npm run dev      # http://localhost:4321/Resume---Portfolio/
npm run build    # static output -> dist/
npm run preview  # preview the production build
npm run check    # type + Astro diagnostics
```

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on push to `main`.

One-time setup: **Settings → Pages → Source → GitHub Actions**.

`astro.config.mjs` reads two environment variables (set in the workflow):

| Variable    | Value                         |
| ----------- | ----------------------------- |
| `SITE_URL`  | `https://ajaynss6.github.io`  |
| `BASE_PATH` | `/Resume---Portfolio`         |

If the repository is renamed, update those values in the workflow and in
`astro.config.mjs`.