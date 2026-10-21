---
layout: ../../layouts/DocLayout.astro
title: "Mobile Games Pulse: Data Spike Findings"
project: "Mobile Games Pulse"
projectSlug: "mobile-games-pulse"
kind: "Research"
summary: "What public store data can and cannot provide, tested before building, and the design changes it forced."
---

Run date: 2026-10-20, from a cloud sandbox (datacenter IP, similar to GitHub Actions).

## Summary

| Source | Status | Notes |
|---|---|---|
| Play top grossing games chart (India) | Works | Node `google-play-scraper` 10.1.4 `list()`. 50 and 100 rows. Order stable across repeat calls. |
| Play top grossing games chart (US) | Works | Same call, `country: 'us'`. |
| Play chart via Python | Not available | Python `google-play-scraper` has no chart function. |
| Play app details, Python | Partly broken | Score, version, updated date and genre are fine. `recentChanges` (what's new) is always empty. |
| Play app details, Node | Works | `recentChanges` is populated. |
| Play reviews, Python | Works | `reviews()` with `Sort.NEWEST`, 200 per page, about 11 to 15 s for 1,600 reviews. |
| Apple current RSS (`rss.marketingtools.apple.com`) | No top grossing | Returns 404. |
| Apple legacy RSS (`itunes.apple.com/in/rss/topgrossingapplications/genre=6014`) | Works | 50 games, India, updated today. Undocumented and could be removed at any time. |

## Findings that change the design

1. **Split stack for collection.** Use the Node scraper for the chart and app details, and the Python scraper for reviews. Everything else stays in Python. The Node part is a small script that prints JSON, called from Python.
2. **The chart has no genre.** We need one `app()` call per chart game to get it. That's 50 calls a day with polite delays.
3. **Review volume varies 30x between games.**
   - Free Fire MAX: 1,600 reviews cover only 22 hours (about 800 a day)
   - Candy Crush: 1,600 reviews cover 8.5 days (about 180 a day)
   - Coin Master: 1,600 reviews cover 38 days (about 40 a day)
   - So the cold start backfill only works for mid- and low-volume games. For high-volume games, the 7-day trend must come from daily snapshots.
   - Plan: the daily job pulls the newest N reviews (for example 400) per top 50 game. For high-volume games, each day's sample covers only part of the day.
4. **Most "what's new" text is boilerplate.** In today's top 10, 5 of 10 are generic ("bug fixes", "we update every week"). Big games also update weekly, so "n of top 10 shipped updates" will be 6 to 10 almost every week.
   - Proposal: slide 4 shows "updated this week" and also "with real content notes", and adds a 5th bucket, "generic notes".
5. **Instagram accepts JPEG only.** We render PNG for preview and convert to JPEG (high quality) for upload. The under-50KB check runs on both.
6. **The review mean skews positive.** 5-star reviews make up 72 to 76% of the samples. Week-over-week changes will be small, so most weeks the rating shift slide will show a change of about 0.1 to 0.3, not "4.4 to 3.8".
7. **Card and casino-style games rank high in India** (for example Teen Patti at #9). Consider a genre denylist option (Casino, Card). It's empty by default; your call.

## Instagram (Meta docs, read 2026-10-20)

- Two options: Instagram Login (`graph.instagram.com`, scopes `instagram_business_basic` and `instagram_business_content_publish`) or Facebook Login (needs a Page).
- **Instagram Login fits your setup** (Business account, no Page). Its token table lists no Page token.
- Carousel: one item container per image (`is_carousel_item=true`), then a `CAROUSEL` container with `children`, then `media_publish`. Up to 20 items.
- Images must be JPEG at a public URL. Cropping follows the first image's aspect ratio, so all 4 slides are 4:5.
- Rate limit: the docs say both 100 and 50 posts per 24 h. Either is far above 1 a week.

## OpenRouter models (live prices, per 1M tokens)

| Role | Model | Input | Output | Why |
|---|---|---|---|---|
| Primary | `anthropic/claude-haiku-5.5` | $0.10 | $0.50 | Cheap, strong at strict JSON and following instructions |
| Fallback 1 | `deepseek/deepseek-v4.1-flash` | $0.056 | $0.12 | Different provider, cheapest JSON-capable model |
| Fallback 2 | `minimax/minimax-m3.1-flash:free` | $0 | $0 | Free tier, supports JSON |
| Fallback 3 | Rule-based | $0 | $0 | Always works |

**Weekly cost estimate:** about 35k input tokens and 3k output tokens across about 4 calls, which is under $0.01 a week on the primary model. The $2 a month cap is a safety rail, not a constraint.

## Risks still open

- GitHub Actions IPs were not tested directly. This sandbox is a datacenter IP and was not blocked. Milestone 3 confirms it on Actions.
- The Apple legacy feed is undocumented. Treat it as optional (v1 is Play only, Apple as a cross-check later).
- Scraper libraries break when Google changes the store page. The daily job alerts on fewer than 40 chart rows.
