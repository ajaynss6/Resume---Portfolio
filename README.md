# Ajay Krishna | Portfolio

Personal portfolio for Ajay Krishna, Product Manager for consumer apps and
games. A fully static site deployed to GitHub Pages.

**Live:** https://ajaynss6.github.io/Resume---Portfolio/

## What's on the site

| Route                | What it is                                                        |
| -------------------- | ----------------------------------------------------------------- |
| `/`                  | Hero (interactive player field), impact, work, experience, toolkit, about, contact |
| `/work/<slug>/`      | One case study per published project                              |
| `/resume/`           | Print-first, ATS-readable resume rendered from the same data      |
| `/#brief`            | Opens the TL;DR dialog (30-second version for recruiters)         |
| `/sitemap.xml`       | Generated from published pages                                    |

Signature piece: the hero's **player field**, a canvas spiral of dots where
1 dot = 1,000 daily players (5M+ DAU across EA titles). The pointer pushes
dots away and a few light up like live sessions. It pauses offscreen and
renders a single static frame under `prefers-reduced-motion`.

## Stack

- **[Astro](https://astro.build)**: static HTML, component-based, no runtime framework.
- **[Motion](https://motion.dev)** (vanilla): reveals, count-ups, hover interactions.
- **Native view transitions**: case study titles and visuals morph between pages, no JS router.
- **Plain CSS with design tokens** in `src/styles/tokens.css`: warm ink, bone type, one acid-lime accent.
- **Self-hosted fonts** (Fontsource): Space Grotesk, Inter, JetBrains Mono, Instrument Serif.

## Editing content

All content lives in `src/data/`. Components never hardcode it.

| File                 | Contents                                                       |
| -------------------- | -------------------------------------------------------------- |
| `profile.js`         | Name, positioning, pitch, story, contact, `bookingUrl`, links  |
| `projects.js`        | Case studies (see field list at the top of the file)           |
| `experience.js`      | Roles and highlights (first 3 per role show by default)        |
| `metrics.js`         | Impact numbers                                                 |
| `skills.js`          | Toolkit groups                                                 |
| `navigation.js`      | Section order, labels and index numbers                        |
| `education.js`, `certifications.js`, `achievements.js` | As named         |

Common edits:

- **Booking link:** set `bookingUrl` in `profile.js`. Empty falls back to a prefilled email.
- **New case study:** add an entry to `projects.js`. `decisions` and `learnings`
  are optional and render only when present. `draft: true` hides it.
  The `finance-app` entry is a draft slot waiting for content.
- **Section order:** reorder in `navigation.js` and `src/pages/index.astro`.

## Resume PDF and social card

`public/Ajay_Krishna_Resume.pdf` and `public/og.png` are rendered from the
site by headless Chromium. Re-run after changing content and commit the output:

```bash
npm run assets   # builds, then renders /resume -> PDF and /og -> og.png
```

Set `CHROMIUM_PATH` if Chromium isn't at `/opt/pw-browsers/chromium`.

## Local development

Requires Node 22+.

```bash
npm install
npm run dev      # http://localhost:4321/Resume---Portfolio/
npm run build    # static output -> dist/
npm run preview  # preview the production build
npm run check    # type + Astro diagnostics
```

## Motion system

Animations are declared with data attributes and driven by
`src/scripts/motion-system.js`:

| Attribute               | Effect                                      |
| ----------------------- | ------------------------------------------- |
| `data-reveal`           | Fade + rise into view                       |
| `data-reveal-delay`     | Extra delay (seconds)                       |
| `data-reveal-group`     | Stagger `[data-reveal]` children            |
| `data-split`            | Animate `[data-split-word]` (via SplitText) |
| `data-parallax="0.12"`  | Scroll-linked vertical drift                |
| `data-count-to="45"`    | Count-up number (prefix/suffix supported)   |

Everything respects `prefers-reduced-motion`, and content stays visible
without JavaScript.

## Quality bar

Checked on every pass: `npm run check` clean, axe-core 0 violations on all
pages, Lighthouse 98+ performance (mobile) and 100 accessibility, best
practices and SEO.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on push to `main`.
One-time setup: **Settings → Pages → Source → GitHub Actions**.

`astro.config.mjs` reads `SITE_URL` (`https://ajaynss6.github.io`) and
`BASE_PATH` (`/Resume---Portfolio`), both set in the workflow. If the
repository is renamed, update them there and in `public/robots.txt`.
