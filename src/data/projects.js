// ---------------------------------------------------------------------------
// Projects / case studies.
// Professional work maps to the resume; personal projects map to their own
// repos. Nothing is invented. Liquidnitro work is unreleased and under NDA:
// it has no case study and must not be described on the website.
// Each project gets a page at /work/<slug>/.
//
// Fields
//   slug, visual          URL and artwork variant (see ProjectVisual.astro)
//   title, context        list heading and one-line context
//   description           list summary
//   company, role, period, team
//   status                OPTIONAL short label, e.g. "Personal project"
//   audience, needs[]     OPTIONAL who it's for and what they need
//   problem               why it mattered (stated or directly implied by the source)
//   approach[]            what I did
//   shipped[]             what went live
//   outcomes[]            OPTIONAL { value, label } headline numbers
//   decisions[]           OPTIONAL { title, body } key calls and tradeoffs
//   learnings[]           OPTIONAL what I'd keep / change
//   repo                  OPTIONAL { url, public }; the button shows only when public
//   draft                 true = excluded from the site until filled in
//   note                  OPTIONAL callout, e.g. for work under NDA
//   value                 OPTIONAL one line: what it changes for the user
//   cover                 OPTIONAL { src, alt, kind } real screen for the list
//   coverStack[]          OPTIONAL 3 { src, alt } to fan out on the cover
//   gallery[]             OPTIONAL { src, alt, kind, caption? } real screens;
//                         kind is phone, desktop, slide or chart. Files live
//                         in public/work/<slug>/
//   docs[]                OPTIONAL { title, slug, kind } pages in src/pages/docs/
//   group                 personal | ea | musigma (filters on the work list)
//   visual variants       ledger, workout, dashboards, monetization,
//                         forecast, events, capacity, turbine (used when
//                         there is no cover)
//
// To strengthen a case study, add `decisions` and `learnings`. Sections render
// only when present.
// ---------------------------------------------------------------------------

/**
 * @typedef {{ value: string, label: string }} Outcome
 * @typedef {{ title: string, body: string }} Decision
 * @typedef {{ src: string, alt: string, kind: string, caption?: string }} Media
 * @typedef {{ title: string, slug: string, kind: string }} Doc
 * @typedef {{
 *   slug: string, visual: string, title: string, context: string,
 *   description: string, tags: string[], company: string, role: string,
 *   period: string, team: string, problem: string, approach: string[],
 *   shipped: string[], outcomes?: Outcome[], decisions?: Decision[],
 *   learnings?: string[], status?: string, audience?: string,
 *   needs?: string[], repo?: { url: string, public: boolean }, note?: string,
 *   value?: string, cover?: Media, coverStack?: { src: string, alt: string }[],
 *   gallery?: Media[], docs?: Doc[],
 *   group?: string, draft?: boolean
 * }} Project
 */

/** @type {Project[]} */
export const projects = [
  {
    // Source: ajaynss6/project_life (private). Only screens with no personal
    // data (no places, routines or people). Personal project: no numbers.
    slug: "life-archivist",
    group: "personal",
    visual: "ledger",
    status: "Personal project",
    title: "Life Archivist: Your Life, Automatically Remembered",
    context: "iOS · Consumer lifestyle",
    description:
      "An iPhone app that quietly records where you go and turns it into an editable journal of your days, with patterns, insights and a private \"ask your life\" search. Everything stays on the phone.",
    tags: ["AI Product", "Consumer", "iOS", "Privacy", "0-1"],
    value:
      "Turns the phone's location sensor into a private memory of your days, with zero effort to keep it.",
    company: "Personal project",
    role: "Product owner and builder",
    period: "2026",
    team: "Solo, AI-assisted build",
    audience:
      "People who want to remember their days, routines and trips without keeping a diary, and who will not hand that data to a cloud.",
    needs: [
      "Remember where the days went without logging anything.",
      "Trust that location history never leaves the phone.",
      "Fix what the app got wrong in one tap.",
      "Ask simple questions about their own life and get answers with receipts.",
    ],
    problem:
      "Journaling needs daily effort most people never sustain. Location history tools either live in someone else's cloud or show raw dots on a map instead of a story. There is no private, effortless record of your own life.",
    approach: [
      "Started from the aha moment: a correct day the user never had to log. Everything else waits on that.",
      "Cut the original spec into small releases, each gated by device tests, because the full MVP was too large to validate.",
      "Kept a decisions log for every product call with the reason behind it, so each tradeoff is explicit and can be revisited.",
      "Put the product through a structured review against three lenses (offer, defensibility, product) before building further.",
    ],
    decisions: [
      {
        title: "Location quality before AI",
        body: "If visit detection is wrong, AI on top answers wrong with confidence. The first releases were only about getting stays and trips right.",
      },
      {
        title: "Ask, don't guess",
        body: "The app never states an uncertain guess as fact. Suggestions appear in italics and become labels only with one tap.",
      },
      {
        title: "Name spots, not visits",
        body: "Naming a place you keep going to answers every past and future visit there at once. It is the highest-value question the app can ask.",
      },
      {
        title: "Local first, AI optional",
        body: "Raw data never leaves the phone. Answers are computed on device; an outside model is opt-in and sees only the question and place names, never the database.",
      },
      {
        title: "The journal is the product",
        body: "The day in words became the home screen. Maps, places, people and insights moved behind it, so the first thing you see is your story, not a dashboard.",
      },
    ],
    learnings: [
      "Building wide before proving the riskiest assumption is expensive. The review said it plainly: prove background tracking on a real iPhone for a full week before adding anything else. That is the next step.",
    ],
    shipped: [
      "Automatic timeline of stays and trips",
      "Ask-don't-guess tagging",
      "The day in words",
      "Patterns and insights",
      "Ask your life, answered on device",
      "Google Timeline import",
      "Privacy Center and Face ID",
      "Encrypted backups",
    ],
    cover: { src: "work/life-archivist/welcome.jpg", alt: "Life Archivist screens: permissions, welcome and tracking settings", kind: "phone" },
    coverStack: [
      { src: "work/life-archivist/permissions.jpg", alt: "" },
      { src: "work/life-archivist/welcome.jpg", alt: "" },
      { src: "work/life-archivist/settings.jpg", alt: "" },
    ],
    gallery: [
      { src: "work/life-archivist/welcome.jpg", alt: "Welcome screen", kind: "phone", caption: "The promise in one line" },
      { src: "work/life-archivist/permissions.jpg", alt: "Permissions screen with a reason for each source", kind: "phone", caption: "Every permission explained, all optional" },
      { src: "work/life-archivist/settings.jpg", alt: "Tracking settings", kind: "phone", caption: "You decide what is recorded" },
    ],
    docs: [{ title: "Product requirements", slug: "life-archivist-prd", kind: "PRD" }],
    repo: { url: "https://github.com/ajaynss6/project_life", public: false },
  },
  {
    // Source: ajaynss6/finance_tracker (private for now). Personal project:
    // no numbers on purpose.
    slug: "finance-tracker",
    group: "personal",
    visual: "ledger",
    status: "Personal project",
    title: "Finance Tracker: One Clean Ledger for Your Money",
    context: "iOS · Consumer fintech",
    description:
      "An iPhone app that turns bank alerts, receipts and statements into one clean, de-duplicated ledger, scores your money habits every day, and answers questions about your spending in plain English. Everything runs on the phone.",
    tags: ["AI Product", "Consumer", "Fintech", "iOS", "Gamification"],
    value:
      "One ledger you can trust, built without typing a single payment, so money decisions start from real numbers instead of guesses.",
    docs: [{ title: "Product overview", slug: "finance-tracker-overview", kind: "Product overview" }],
    company: "Personal project",
    role: "Product owner and builder",
    period: "2026",
    team: "Solo, with Claude Code as the engineering team",
    audience:
      "Busy professionals juggling UPI, cards and EMIs across several banks, who want to know where their money goes without becoming bookkeepers.",
    needs: [
      "See where the money went without typing every payment in.",
      "Trust the totals: no double counting, no guessed merges.",
      "Know what's due before it's due: EMIs and credit card bills.",
      "Keep financial data private and on the phone.",
    ],
    problem:
      "Most Indian money apps track spending by reading bank SMS. iPhones can't read SMS, so iPhone users either type every payment by hand or go without. And the moment you pull from more than one source, the same payment shows up twice and the totals stop being trustworthy.",
    approach: [
      "Picked a data strategy that works within iOS limits: bank alerts and receipts from Gmail, reconciled against statements uploaded now and then.",
      "Wrote the product rules down as invariants before any feature: one payment is stored once, statements are the source of truth, money is never floating point, secrets live only in the Keychain.",
      "Ran the build as product owner with an AI coding agent as the engineering team: issue, small PR, CI, then testing each build on my own iPhone and feeding the fixes back.",
      "Brought live-game retention design to personal finance: a daily Money Score, streaks, quests and badges, all recomputed from real transactions so they can't be gamed.",
    ],
    decisions: [
      {
        title: "Email plus statements, not SMS",
        body: "iOS blocks SMS access, which rules out the approach most Indian finance apps take. Gmail alerts give near real-time coverage, statements fill the gaps and settle disputes for their period. Reconciling the two became the core of the product rather than a workaround.",
      },
      {
        title: "Never merge on a guess",
        body: "Payments match on an exact bank reference first, then on account, amount, date and merchant together. Anything still ambiguous goes to a review queue instead of being merged. One extra tap costs less trust than one wrong total.",
      },
      {
        title: "AI where it helps, never for the maths",
        body: "Rules on the phone read bank alerts; a model only handles receipts the rules can't read. In Ask, totals are computed on the device and handed to the model, and any change it proposes applies only after the user taps Confirm.",
      },
      {
        title: "Tag once, never again",
        body: "Categorising payments is the chore that kills finance apps. Tagging one payment to a new merchant becomes a rule: past payments follow and new ones arrive tagged, even straight from a lock-screen notification.",
      },
      {
        title: "Onboarding that ends on your data",
        body: "One decision per screen, the read-only Gmail promise shown at the exact moment access is asked for, every permission skippable, and a live \"Building your ledger\" screen that ends on what was found instead of an empty dashboard.",
      },
    ],
    shipped: [
      "Read-only Gmail sync on device",
      "Bank alert parsing",
      "De-duplicating match engine",
      "Review queue",
      "Tags that learn",
      "Money Score, streaks and quests",
      "Ask: AI chat over your ledger",
      "EMI and card bill reminders",
      "Face ID lock and privacy mode",
    ],
    repo: { url: "https://github.com/ajaynss6/finance_tracker", public: false },
  },
  {
    // Source: ajaynss6/content-pipeline (private). Slides rendered by the
    // pipeline from its bundled sample data (badged as such).
    slug: "mobile-games-pulse",
    group: "personal",
    visual: "dashboards",
    status: "Personal project",
    title: "Mobile Games Pulse: A Weekly Read on the Top-Grossing Chart",
    context: "Data product · Mobile games",
    description:
      "An automated pipeline that snapshots the Google Play top-grossing games chart every day, reads player reviews and update notes, and turns the week into a four-slide carousel: who moved, why, and what players are saying.",
    tags: ["Data Product", "Gaming", "AI", "Automation", "Market Intelligence"],
    value:
      "Turns public but scattered store data into a weekly story about the games market, at near-zero running cost.",
    company: "Personal project",
    role: "Product owner and builder",
    period: "2026",
    team: "Solo, AI-assisted build",
    audience:
      "Game developers, product managers, analysts and players who follow the mobile games market and want the signal without the busywork.",
    needs: [
      "Know who climbed or slipped in the top-grossing chart this week.",
      "Understand why: events, updates, pricing.",
      "Hear what players are complaining about without reading thousands of reviews.",
      "Get it in a format they already scroll.",
    ],
    problem:
      "Chart movements are public but scattered, and the reasons behind them are buried in update notes and thousands of reviews. Tools that connect those dots are expensive and built for studios, not for the wider community.",
    approach: [
      "Ran a data spike before writing the spec, to learn what public sources can and cannot provide, and changed the design based on what it found.",
      "Designed the output first: four slides, each answering one question (what happened, who moved, what players feel, what shipped).",
      "Built the pipeline end to end: daily snapshot, analysis, AI-written copy with fallbacks, and rendering to post-ready images.",
      "Added guards: an alert when the data source looks broken, and a visible sample-data badge whenever real data is not in use.",
    ],
    decisions: [
      {
        title: "Spike before spec",
        body: "Testing every source first changed the design: the chart carries no genre, review volume varies hugely between games, and many update notes are boilerplate.",
      },
      {
        title: "Be honest about weak signals",
        body: "Most \"what's new\" text is generic, so the update slide separates real content from \"bug fixes\" instead of counting every update as news.",
      },
      {
        title: "AI writes, data decides",
        body: "A low-cost model drafts the copy, a chain of fallbacks ends in a rule-based writer, and every number comes from the data, never from the model.",
      },
      {
        title: "Built for the format",
        body: "The carousel's constraints (portrait slides, JPEG, one story per slide) shaped the renderer from day one, not at the end.",
      },
    ],
    shipped: [
      "Daily chart snapshot",
      "Chart movers",
      "Rating shift from reviews",
      "Review theme clustering",
      "Update watch",
      "AI copy with fallbacks",
      "Slide renderer",
    ],
    cover: { src: "work/mobile-games-pulse/slide-1.jpg", alt: "Mobile Games Pulse slides: the week, chart movers and rating shift", kind: "slide" },
    coverStack: [
      { src: "work/mobile-games-pulse/slide-2.jpg", alt: "" },
      { src: "work/mobile-games-pulse/slide-1.jpg", alt: "" },
      { src: "work/mobile-games-pulse/slide-3.jpg", alt: "" },
    ],
    gallery: [
      { src: "work/mobile-games-pulse/slide-1.jpg", alt: "Cover slide: the week in one line", kind: "slide", caption: "1 · The week in one line" },
      { src: "work/mobile-games-pulse/slide-2.jpg", alt: "Chart movers slide", kind: "slide", caption: "2 · Who moved in the top 50" },
      { src: "work/mobile-games-pulse/slide-3.jpg", alt: "Rating shift slide", kind: "slide", caption: "3 · What players are saying" },
      { src: "work/mobile-games-pulse/slide-4.jpg", alt: "Update watch slide", kind: "slide", caption: "4 · What shipped, and the take" },
    ],
    note: "Slides shown are rendered by the pipeline from its sample data set, with made-up games. Live data mode is the next milestone.",
    docs: [{ title: "Data spike findings", slug: "mobile-games-pulse-data-spike", kind: "Research" }],
    repo: { url: "https://github.com/ajaynss6/content-pipeline", public: false },
  },
  {
    // Source: ajaynss6/Workout-Log (private for now). Personal project: no
    // numbers on purpose; the PRD's success metrics are targets, not results.
    slug: "workout-log",
    group: "personal",
    visual: "workout",
    status: "Personal project",
    title: "Workout Log: A Gym Tracker Built for Beginners",
    context: "iOS · Consumer fitness",
    description:
      "A workout tracker designed around the beginner lifter: log the set you just did in as few taps as possible, with sensible defaults and early signs of progress, so new lifters keep showing up long enough for the habit to stick.",
    tags: ["AI Product", "Consumer", "Fitness", "iOS", "UX Research"],
    value:
      "Lowers the cost of showing up: the fastest path to a logged set, so beginners stay long enough for the habit to form.",
    docs: [
      { title: "Product requirements", slug: "workout-log-prd", kind: "PRD" },
      { title: "UX audit and design exploration", slug: "workout-log-ux-audit", kind: "UX audit" },
    ],
    company: "Personal project",
    role: "Product owner and builder",
    period: "2026",
    team: "Solo, AI-assisted build",
    audience:
      "Beginner and casual lifters who want to start tracking their training but get lost in apps built for power users.",
    needs: [
      "Log a set fast, one-handed, with the phone propped on a rack.",
      "Not be asked for weights, reps or rest times they don't know yet.",
      "See progress early, long before it shows in the mirror.",
      "Never lose a workout or feel punished for a skipped set.",
    ],
    problem:
      "Popular gym trackers are built for experienced lifters: jargon like RPE and 1RM up front, setup before the first set, and an empty progress screen on day one. Beginners quit before the habit forms, and the app becomes one more thing they stopped using.",
    approach: [
      "Wrote a PRD: vision, audience, core user flows, MVP scope and the success metrics to aim for.",
      "Built the MVP, then audited it screen by screen through a beginner's eyes against leading trackers: Strong, Hevy, FitNotes, Liftd and Setlist.",
      "Turned the audit into beginner-first design principles and shipped the highest-priority fixes first.",
      "Rebuilt the core logging flow and covered the full logging journey with end-to-end UI tests.",
    ],
    decisions: [
      {
        title: "The fastest path to a logged set wins",
        body: "The hero task is logging the set you just did. The logger became list-first and the only place to edit sets, so there is one obvious way to do the most common thing.",
      },
      {
        title: "Defaults over decisions",
        body: "Beginners don't know what weight or rest to use. Everything is pre-filled to confirm rather than configure, template weights are sensible, and jargon like RPE and 1RM stays out of the way until someone opts in.",
      },
      {
        title: "One primary action per screen",
        body: "The MVP had several ways to start a workout, and new users hesitated. They collapsed into a single start button.",
      },
      {
        title: "No empty first impression",
        body: "A day-one dashboard full of zeroes is a cold welcome. Empty states encourage the first workout instead, and progress shows up as early as there is any to show.",
      },
      {
        title: "Forgiving by default",
        body: "Gym sessions get interrupted. The rest timer and the workout survive the app being closed mid-session, so nobody loses a session to a phone call.",
      },
    ],
    shipped: [
      "List-first workout logger",
      "Beginner onboarding",
      "Single start button",
      "Encouraging empty states",
      "Rest timer that survives restarts",
      "Finish summary",
      "Exercise library",
      "History and progress",
    ],
    repo: { url: "https://github.com/ajaynss6/Workout-Log", public: false },
  },
  {
    // Source: ajaynss6/heyj-ai (private). Screens captured from a local run on
    // live GitHub data.
    slug: "jarvis",
    group: "personal",
    visual: "dashboards",
    status: "Personal project",
    title: "Jarvis: One Command Center for Every Project",
    context: "Web app · Product operations",
    description:
      "A private command center for everything I build: a spoken briefing, live activity, health alerts and a deep dive per project, pulled from GitHub and each system's own health checks.",
    tags: ["Web App", "Product Ops", "Data Viz", "Next.js"],
    value:
      "One glance replaces a dozen tabs: what is broken, what is moving and what to do next.",
    company: "Personal project",
    role: "Product owner and builder",
    period: "2026",
    team: "Solo, AI-assisted build",
    audience:
      "A builder running several products at once, and any small team that needs one view across many repos and services.",
    needs: [
      "Know what needs attention right now without opening every repo.",
      "See momentum across projects, not just a list of commits.",
      "Catch broken builds and stalled work early.",
      "Check in from a phone in seconds.",
    ],
    problem:
      "Running several products in parallel scatters their status across commits, pull requests, CI runs, server health and plans in docs. Finding out what is broken costs more context switching than fixing it.",
    approach: [
      "Defined one short status format that every project keeps (phase, health, now, next, blocked), so the dashboard reads plans, not just activity.",
      "Turned raw signals into a plain-language briefing: what needs you, what to glance at, what to focus on today.",
      "Made it read-only by design: it never changes a repo or a server.",
      "Designed a mission-control interface that works on desktop and installs to the iPhone home screen.",
    ],
    decisions: [
      {
        title: "Read before write",
        body: "A dashboard that can break things is a liability. Actions come later, once the read side has earned trust.",
      },
      {
        title: "Plans as data",
        body: "A small status file in each repo turns the dashboard from an activity log into a plan tracker, and keeps the plan next to the code.",
      },
      {
        title: "Every colour has a reason",
        body: "Red, yellow, green and grey come from explicit rules such as failing CI, open pull requests or a project gone quiet, so an alert always explains itself.",
      },
    ],
    shipped: [
      "Command center with spoken briefing",
      "Cross-project timeline",
      "Project deep dives",
      "Live activity feed",
      "Health alerts",
      "Command palette",
      "iPhone home screen app",
    ],
    cover: { src: "work/jarvis/command.jpg", alt: "Jarvis command center: projects orbiting a live core, with briefing, activity and alerts", kind: "desktop" },
    gallery: [
      { src: "work/jarvis/command.jpg", alt: "Command center", kind: "desktop", caption: "Command: briefing, project orbit, live feed and alerts" },
      { src: "work/jarvis/timeline.jpg", alt: "Timeline across projects", kind: "desktop", caption: "Timeline: every project on one pulse" },
      { src: "work/jarvis/mobile.jpg", alt: "Jarvis on iPhone", kind: "phone", caption: "Installed on the iPhone home screen" },
    ],
    note: "Screens captured from a live run on real project data, including a real failing build it flagged.",
    repo: { url: "https://github.com/ajaynss6/heyj-ai", public: false },
  },
  {
    // Source: ajaynss6/trading-tool (private). Research framing only: no
    // amounts, brokers, holdings or personal trading.
    slug: "market-research",
    group: "personal",
    visual: "monetization",
    status: "Personal project",
    title: "Market Research Engine: Letting the Data Say No",
    context: "Data · Experimentation · Indian markets",
    description:
      "A research system that tests trading strategies for Indian markets honestly against simply holding the index, and sends one short daily brief. Its most valuable output so far was a no.",
    tags: ["Experimentation", "Backtesting", "Data", "Automation"],
    value:
      "Makes every strategy prove itself on data it has never seen, before anyone acts on it.",
    company: "Personal project",
    role: "Owner and builder",
    period: "2026",
    team: "Solo, AI-assisted build",
    audience: "Retail investors who want rules and evidence instead of tips.",
    needs: [
      "Know whether a strategy beats simply holding the index, after costs and tax.",
      "Trust that a backtest is not just fitted to the past.",
      "Get one short daily brief instead of noise.",
    ],
    problem:
      "Retail traders act on tips and on backtests that quietly overfit. Strategies that look great on past data often fail on new data, and the losses are real.",
    approach: [
      "Set the bar before testing: beat the index after all costs and tax, within a hard limit on how far a strategy may fall from its peak.",
      "Tested several strategy families with walk-forward and holdout periods, so every result comes from data the strategy never saw.",
      "Kept the output advisory: the system recommends, a person decides.",
      "Wrapped it in a daily brief: market regime and system health in one message.",
    ],
    decisions: [
      {
        title: "Gates before go-live",
        body: "No strategy is acted on without first passing gates agreed in advance, on out-of-sample data.",
      },
      {
        title: "The data said no",
        body: "In the walk-forward test none of the strategies beat holding the index, so none went live. Paper trading continues until a scheduled review. Shipping nothing was the right call.",
      },
      {
        title: "Advice, not automation",
        body: "Automation would scale mistakes faster than it scales returns, so a person stays in the loop.",
      },
    ],
    shipped: ["Strategy research and backtests", "Walk-forward and holdout testing", "Daily brief", "Dashboard"],
    cover: { src: "work/market-research/walk-forward.jpg", alt: "Walk-forward results: no strategy beat the index", kind: "chart" },
    gallery: [
      { src: "work/market-research/walk-forward.jpg", alt: "Walk-forward out-of-sample results of five strategies against the Nifty 50", kind: "chart", caption: "Out of sample, the index (dashed) beat every strategy. The answer was no." },
    ],
    repo: { url: "https://github.com/ajaynss6/trading-tool", public: false },
  },
  {
    slug: "ea-live-services-analytics",
    group: "ea",
    visual: "dashboards",
    title: "Live-Services Analytics Across EA Mobile Titles",
    context: "Electronic Arts (EA) · Product Analyst",
    description:
      "Owned end-to-end analytics for 5+ mobile titles (Bejeweled, Plants vs. Zombies, Need for Speed No Limits, The Sims Mobile) supporting a portfolio of 5M+ DAU and $45M+ annual revenue; built and maintained 50+ leadership dashboards.",
    tags: ["Analytics", "Live Services", "Dashboards"],
    value:
      "Gave producers and leadership one trusted read on every live title, so feature and live-ops calls were made on evidence.",
    company: "Electronic Arts",
    role: "Product Analyst",
    period: "Dec 2021 - Apr 2024",
    team: "Producers, PMs, designers, developers, QA, marketing",
    problem:
      "Five-plus live titles, each needing clear reads on acquisition, retention, engagement and monetization to decide what to ship next.",
    approach: [
      "Owned end-to-end analytics across Bejeweled, Plants vs. Zombies, Need for Speed No Limits and The Sims Mobile.",
      "Drove feature ideation plus pre- and post-production analysis.",
      "Led A/B test design, implementation and post-analysis across multiple live titles.",
      "Developed and deployed telemetry for precise, reliable data collection portfolio-wide.",
      "Designed an onboarding curriculum and mentored 3+ analysts.",
    ],
    shipped: [
      "50+ dashboards: acquisition, retention, engagement, ad monetization, root-cause analysis",
      "Portfolio-wide telemetry",
      "A/B tests across live titles",
    ],
    outcomes: [
      { value: "$500K+", label: "Incremental revenue from feature work" },
      { value: "5M+", label: "Daily active users in the portfolio" },
      { value: "50+", label: "Dashboards used by leadership" },
    ],
  },
  {
    slug: "ea-ad-monetization",
    group: "ea",
    visual: "monetization",
    title: "Ad Monetization & Telemetry Analytics",
    context: "Electronic Arts (EA) · Ad Monetization",
    description:
      "Ran analytics for the Ad Monetization team across multiple titles: tracking network trends, detecting anomalies, and running deep-dive performance analyses. Deployed telemetry ensuring precise, reliable data collection portfolio-wide.",
    tags: ["Monetization", "Telemetry", "A/B Testing"],
    value:
      "Caught revenue problems early and explained them, on telemetry the team could trust.",
    company: "Electronic Arts",
    role: "Product Analyst, Ad Monetization",
    period: "Dec 2021 - Apr 2024",
    team: "Ad Monetization team",
    problem:
      "Ad revenue depends on network performance that shifts over time. Trends and anomalies need to be caught and explained quickly, on data the team can trust.",
    approach: [
      "Tracked ad network trends across multiple titles.",
      "Detected anomalies and ran deep-dive performance analyses.",
      "Deployed telemetry so the underlying data could be trusted.",
    ],
    shipped: ["Ad network trend tracking", "Anomaly detection", "Deep-dive performance analyses"],
    outcomes: [
      { value: "$45M+", label: "Annual revenue portfolio supported" },
    ],
  },
  {
    // Mu Sigma client work. Clients stay anonymous; team projects are
    // described as team work. Source: Ajay's LinkedIn project list.
    slug: "kpi-forecasting",
    group: "musigma",
    visual: "forecast",
    title: "KPI Forecasting for a Search Advertising Leader",
    context: "Mu Sigma · Fortune 500 search advertising client",
    description:
      "Quarterly forecasts and weekly projections of the client's most important business KPIs across markets and segments, with a dashboard that turned the numbers into a story leadership could act on.",
    tags: ["Forecasting", "Time Series", "Dashboards", "Storytelling"],
    value:
      "Gave every market a forward view of its KPIs, so planning started from a forecast instead of last quarter's actuals.",
    company: "Mu Sigma, for a Fortune 500 search advertising company",
    role: "Decision Scientist",
    period: "2018 - 2021",
    team: "Mu Sigma analytics team, client business leads",
    audience: "Market and segment leads planning the quarter ahead.",
    needs: [
      "Know where key metrics are heading in each market, early enough to act.",
      "One shared forecast instead of every market planning on its own assumptions.",
      "Diagnose quickly why a market is drifting from plan.",
    ],
    problem:
      "A global business with many markets and segments needs to know where its key metrics are heading before the quarter plays out. Without a shared, regular forecast, planning runs on gut feel and last quarter's numbers.",
    approach: [
      "Produced quarterly forecasts and weekly projections of key business KPIs for different markets and segments.",
      "Built and maintained a dashboard around the key business metrics for market diagnosis.",
      "Shaped the dashboard for storytelling, so leaders could see not just the number but why it moved.",
    ],
    shipped: ["Quarterly KPI forecasts", "Weekly projections", "KPI and market diagnosis dashboard"],
  },
  {
    slug: "seasonality-event-tracker",
    group: "musigma",
    visual: "events",
    title: "Seasonality and Event Tracker",
    context: "Mu Sigma · Fortune 500 search advertising client",
    description:
      "Studied how users and advertisers behave across seasons and events, and built season-by-season dashboards that showed the impact of each event on key business metrics.",
    tags: ["Seasonality", "Event Analysis", "Dashboards"],
    value:
      "Separated what the calendar did from what the business did, so a holiday spike was never mistaken for a trend.",
    company: "Mu Sigma, for a Fortune 500 search advertising company",
    role: "Decision Scientist",
    period: "2018 - 2021",
    team: "Mu Sigma analytics team, client business leads",
    audience: "Business teams reading weekly and seasonal performance.",
    needs: [
      "Know how much of a change is seasonal and how much is real.",
      "See the impact of each event on the metrics that matter.",
      "Compare this season with the same season before.",
    ],
    problem:
      "Search advertising swings with holidays, shopping seasons and big events. Without separating seasonal effects, a normal holiday spike looks like growth and a seasonal dip looks like a problem.",
    approach: [
      "Studied user and customer seasonality and its impact on the market.",
      "Created and maintained multiple dashboards, one per season, with the key business metrics.",
      "Showed the impact of specific events against the seasonal baseline.",
    ],
    shipped: ["Seasonality study", "Season-specific dashboards", "Event impact views"],
  },
  {
    slug: "distribution-capacity-planning",
    group: "musigma",
    visual: "capacity",
    title: "Workforce and Capacity Planning for Distribution Centers",
    context: "Mu Sigma · Fortune 500 US retail client",
    description:
      "Forecast the volume moving in and out of distribution centers, planned the workforce needed to handle it, and flagged the days when expected volume would exceed capacity so they could be planned for in advance.",
    tags: ["Forecasting", "Optimization", "Operations", "Retail"],
    value:
      "Turned volume forecasts into staffing plans, so peak days were planned for instead of discovered.",
    company: "Mu Sigma, for a Fortune 500 US retailer",
    role: "Decision Scientist, team member",
    period: "2018 - 2021",
    team: "Mu Sigma forecasting and optimization team",
    audience: "Distribution center operations and workforce planners.",
    needs: [
      "Know how much volume is coming in and going out, and when.",
      "Staff to the volume: not too few, not too many.",
      "See capacity crunches days ahead, not on the day.",
    ],
    problem:
      "Distribution centers live and die by peak days. Too few people and shipments back up; too many and labor cost balloons. A capacity problem found on the day is too late to fix.",
    approach: [
      "As part of the team, planned the workforce required to handle the volume expected to come into and move out of the distribution centers.",
      "Identified days where expected volume was beyond the capacity that could be handled.",
      "Planned how those over-capacity days would be handled, ahead of time.",
    ],
    shipped: ["Inbound and outbound volume forecasts", "Workforce plans", "Over-capacity day alerts and handling plans"],
  },
  {
    slug: "wind-turbine-predictive-maintenance",
    group: "musigma",
    visual: "turbine",
    title: "Predictive Maintenance for Wind Turbines",
    context: "Mu Sigma · US electricity producer and distributor",
    description:
      "Anomaly detection and classification models that predict failures of wind turbine components, an automated diagnostic dashboard for the program, and site-level power generation forecasts for business planning.",
    tags: ["Anomaly Detection", "Classification", "Forecasting", "Energy"],
    value:
      "Moved maintenance from fixing failures to preventing them, and told planners how much power each site would produce.",
    company: "Mu Sigma, for a US electricity producer and distributor",
    role: "Decision Scientist, team member",
    period: "2018 - 2021",
    team: "Mu Sigma predictive maintenance team",
    audience: "Maintenance engineers and business planners at the utility.",
    needs: [
      "Know which turbine components are likely to fail before they do.",
      "One diagnostic view of the whole program, kept up to date automatically.",
      "Plan around how much power each site will generate.",
    ],
    problem:
      "An unplanned turbine failure means downtime, expensive emergency repairs and lost generation. Maintenance on a fixed schedule misses failures in between and services parts that are fine.",
    approach: [
      "As part of the team, built anomaly detection and classification models to predict the failure of wind turbine components.",
      "Created and automated an all-inclusive diagnostic dashboard for the predictive maintenance program.",
      "Forecast power generation at site level for business planning.",
    ],
    shipped: ["Failure prediction models", "Automated diagnostic dashboard", "Site-level generation forecasts"],
  },
];

export const publishedProjects = projects.filter((project) => !project.draft);

export default publishedProjects;
