// ---------------------------------------------------------------------------
// Projects / case studies.
// Professional work maps to the resume; personal projects map to their own
// repos. Nothing is invented. Liquidnitro work is unreleased and under NDA:
// never name its features, modules, agents, clients or numbers. Each project gets a page at /work/<slug>/.
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
//   visual variants       redacted, ledger, workout, dashboards, monetization
//
// To strengthen a case study, add `decisions` and `learnings`. Sections render
// only when present.
// ---------------------------------------------------------------------------

/**
 * @typedef {{ value: string, label: string }} Outcome
 * @typedef {{ title: string, body: string }} Decision
 * @typedef {{
 *   slug: string, visual: string, title: string, context: string,
 *   description: string, tags: string[], company: string, role: string,
 *   period: string, team: string, problem: string, approach: string[],
 *   shipped: string[], outcomes?: Outcome[], decisions?: Decision[],
 *   learnings?: string[], status?: string, audience?: string,
 *   needs?: string[], repo?: { url: string, public: boolean }, note?: string,
 *   draft?: boolean
 * }} Project
 */

/** @type {Project[]} */
export const projects = [
  {
    // Unreleased product under NDA. Describe the role and the way of working
    // only: no product names, features, modules, numbers or clients.
    slug: "ai-platform-under-nda",
    visual: "redacted",
    status: "Under NDA",
    title: "A 0-1 AI Platform for Live Games",
    context: "Liquidnitro Games · Acting Product Manager",
    description:
      "Acting PM on an unreleased, AI-native platform for live games, built from zero at a Series A studio. The product is under NDA, so this page covers how I work rather than what we built.",
    tags: ["0-1 Product", "AI Product", "Live Services", "Platform"],
    company: "Liquidnitro Games",
    role: "Acting Product Manager (Senior Product Analyst)",
    period: "2024 - Present",
    team: "Engineering, design, data and AI",
    problem:
      "A founding team building an AI-native product from zero, with no product function in place. Someone had to turn ambition into specs, decide what to build first, and keep a cross-functional team pointed at the same thing.",
    approach: [
      "Joined as the studio's first data hire and stepped into the PM role, owning the product function end to end.",
      "Wrote the PRDs, feature specs and UX requirements, and owned prioritization and tradeoffs across sprints.",
      "Built working AI prototypes to test ideas before engineering committed time to them.",
      "Designed multi-agent AI workflows and self-serve AI tools so non-technical teammates could get answers without waiting on the data team.",
      "Partnered with the founders on client pitches, GTM and early hiring.",
    ],
    shipped: [],
    note:
      "Product details are confidential. Happy to walk through how I made decisions and tradeoffs on this work in conversation, within what I can share.",
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
    company: "Personal project",
    role: "Product owner and builder",
    period: "2026",
    team: "Solo, with Claude Code as the engineering team",
    audience:
      "Salaried iPhone users in India juggling UPI, cards and EMIs across several banks, who want to know where their money goes without becoming bookkeepers.",
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
    slug: "ea-live-services-analytics",
    visual: "dashboards",
    title: "Live-Services Analytics Across EA Mobile Titles",
    context: "Electronic Arts (EA) · Product Analyst",
    description:
      "Owned end-to-end analytics for 5+ mobile titles (Bejeweled, Plants vs. Zombies, Need for Speed No Limits, The Sims Mobile) supporting a portfolio of 5M+ DAU and $45M+ annual revenue; built and maintained 50+ leadership dashboards.",
    tags: ["Analytics", "Live Services", "Dashboards"],
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
