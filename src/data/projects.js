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
//   visual variants       ledger, workout, dashboards, monetization (used
//                         when there is no cover)
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
 *   draft?: boolean
 * }} Project
 */

/** @type {Project[]} */
export const projects = [
  {
    // Source: ajaynss6/project_life (private). Screens from simulator testing,
    // chosen to show no real places. Personal project: no numbers on purpose.
    slug: "life-archivist",
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
    cover: { src: "work/life-archivist/ask.jpg", alt: "Life Archivist screens: patterns, Ask your life and permissions", kind: "phone" },
    coverStack: [
      { src: "work/life-archivist/patterns.jpg", alt: "" },
      { src: "work/life-archivist/ask.jpg", alt: "" },
      { src: "work/life-archivist/permissions.jpg", alt: "" },
    ],
    gallery: [
      { src: "work/life-archivist/welcome.jpg", alt: "Welcome screen", kind: "phone", caption: "The promise in one line" },
      { src: "work/life-archivist/permissions.jpg", alt: "Permissions screen with a reason for each source", kind: "phone", caption: "Every permission explained, all optional" },
      { src: "work/life-archivist/patterns.jpg", alt: "Explore patterns: where your time went", kind: "phone", caption: "Patterns from your own days" },
      { src: "work/life-archivist/ask.jpg", alt: "Ask your life: answers with how they were read", kind: "phone", caption: "Answers that show their source" },
      { src: "work/life-archivist/settings.jpg", alt: "Tracking settings", kind: "phone", caption: "You decide what is recorded" },
    ],
    docs: [{ title: "Product requirements", slug: "life-archivist-prd", kind: "PRD" }],
    repo: { url: "https://github.com/ajaynss6/project_life", public: false },
  },
  {
    // Source: ajaynss6/finance_tracker (private for now). Personal project:
    // no numbers on purpose.
    slug: "finance-tracker",
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
    // Source: ajaynss6/trading-tool (private). No amounts, brokers or holdings.
    slug: "market-research",
    visual: "monetization",
    status: "Personal project",
    title: "Market Research Engine: Letting the Data Say No",
    context: "Data · Experimentation · Personal finance",
    description:
      "A personal research system for Indian markets that tests trading strategies honestly against simply holding the index, watches a long-term portfolio's health and sends one daily brief. Its most valuable output so far was a no.",
    tags: ["Experimentation", "Backtesting", "Data", "Automation"],
    value:
      "Protects real money by making every strategy prove itself on data it has never seen before a rupee is risked.",
    company: "Personal project",
    role: "Owner and builder",
    period: "2026",
    team: "Solo, AI-assisted build",
    audience: "A retail investor who wants rules and evidence instead of tips.",
    needs: [
      "Know whether a strategy beats simply holding the index, after costs and tax.",
      "Catch portfolio problems before they get expensive.",
      "Get one short daily brief instead of noise.",
    ],
    problem:
      "Retail traders act on tips and on backtests that quietly overfit. Strategies that look great on past data often fail on new data, and the losses are real money.",
    approach: [
      "Set the rules before testing: success meant beating the index after all costs and tax, with a hard limit on how far it may fall from its peak.",
      "Tested several strategy families with walk-forward and holdout periods, so every result comes from data the strategy never saw.",
      "Kept it advice only: the system recommends, a person decides.",
      "Built the portfolio side as tracking and health checks, with no stock picks.",
    ],
    decisions: [
      {
        title: "Gates before go-live",
        body: "No strategy trades without first passing gates agreed in advance, on out-of-sample data.",
      },
      {
        title: "The data said no",
        body: "In the walk-forward test none of the strategies beat holding the index. So the money stays out of them, with paper trading until a scheduled review. Shipping nothing was the right call.",
      },
      {
        title: "Advice, not automation",
        body: "Orders are placed by hand. Automation would have scaled mistakes faster than it scaled returns.",
      },
    ],
    shipped: ["Strategy research and backtests", "Portfolio tracking and health checks", "Daily brief", "Dashboard"],
    cover: { src: "work/market-research/walk-forward.jpg", alt: "Walk-forward results: no strategy beat the index", kind: "chart" },
    gallery: [
      { src: "work/market-research/walk-forward.jpg", alt: "Walk-forward out-of-sample growth of each strategy against the Nifty 50", kind: "chart", caption: "Out of sample, the index (dashed) beat every strategy. The answer was no." },
    ],
    repo: { url: "https://github.com/ajaynss6/trading-tool", public: false },
  },
  {
    slug: "ea-live-services-analytics",
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
];

export const publishedProjects = projects.filter((project) => !project.draft);

export default publishedProjects;
