// ---------------------------------------------------------------------------
// Projects / case studies.
// Every statement maps to the resume; nothing is invented. Each project gets
// a page at /work/<slug>/.
//
// Fields
//   slug, visual          URL and artwork variant (see ProjectVisual.astro)
//   title, context        list heading and one-line context
//   description           list summary
//   company, role, period, team
//   problem               why it mattered (stated or directly implied by the resume)
//   approach[]            what I did
//   shipped[]             what went live
//   outcomes[]            { value, label } headline numbers
//   decisions[]           OPTIONAL { title, body } key calls and tradeoffs
//   learnings[]           OPTIONAL what I'd keep / change
//   draft                 true = excluded from the site until filled in
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
 *   shipped: string[], outcomes: Outcome[], decisions?: Decision[],
 *   learnings?: string[], draft?: boolean
 * }} Project
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: "ai-live-services-platform",
    visual: "modules",
    title: "AI-Native Gaming Analytics & Live-Services Platform",
    context: "Liquidnitro Games · Acting Product Manager",
    description:
      "Led the product function for the 0-1 build of an AI-native platform for gaming analytics and live services, shipping six core modules from the ground up: analytics dashboard, player segmentation, A/B experimentation, remote configuration, AI insights engine, and live-ops console.",
    tags: ["0-1 Product", "Platform", "Live Services", "AI"],
    company: "Liquidnitro Games",
    role: "Acting Product Manager",
    period: "2024 - Present",
    team: "Engineers, UX/UI designers, data analysts, data engineers, AI engineers, data architects",
    problem:
      "Live games run on a loop of measure, decide, change, repeat. Doing that well normally means stitching together separate tools for analytics, segmentation, experiments and config. The goal was one AI-native platform that covers the whole loop, built from zero.",
    approach: [
      "Owned the product function end to end as acting PM, working with a cross-functional team across engineering, design, data and AI.",
      "Authored all PRDs, feature specs and UX requirements.",
      "Built functional prototypes with AI to validate concepts before engineering committed to them.",
      "Owned prioritization and tradeoff decisions across sprints.",
    ],
    shipped: [
      "Analytics dashboard",
      "Player segmentation",
      "A/B experimentation",
      "Remote configuration",
      "AI insights engine",
      "Live-ops console",
    ],
    outcomes: [
      { value: "6", label: "Core modules scoped and shipped from zero" },
      { value: "0-1", label: "Product function led end to end" },
      { value: "<5 → 20+", label: "Internal product tech team growth" },
    ],
  },
  {
    slug: "multi-agent-insights",
    visual: "agents",
    title: "Multi-Agent AI Insights System",
    context: "Liquidnitro Games · Product & System Design",
    description:
      "Designed a multi-agent AI system with specialized roles (Performance Analyst, Monetization Specialist, Hypothesis Builder) that automates insight generation for live game operations.",
    tags: ["AI", "LLM", "Automation"],
    company: "Liquidnitro Games",
    role: "Designer of the agent system",
    period: "2024 - Present",
    team: "AI engineers, data engineers, data analysts",
    problem:
      "Insight generation for live games depended on analyst time. Live ops needs several specific lenses on the same data: performance, monetization, and what to test next.",
    approach: [
      "Split the analyst's job into specialized agent roles, each with its own focus.",
      "Performance Analyst reads game health; Monetization Specialist reads revenue; Hypothesis Builder turns findings into testable ideas.",
      "Designed the system to automate insight generation for live game operations.",
    ],
    shipped: ["Performance Analyst agent", "Monetization Specialist agent", "Hypothesis Builder agent"],
    outcomes: [
      { value: "3", label: "Specialized agent roles automating live-ops insight" },
    ],
  },
  {
    slug: "self-serve-ai-analytics",
    visual: "selfserve",
    title: "Self-Serve AI Analytics Tools",
    context: "Liquidnitro Games · Internal Tools",
    description:
      "Built self-serve, AI-powered tools that let non-technical stakeholders run their own analyses, reducing dependency on data-team bandwidth.",
    tags: ["AI", "Internal Tools", "Self-Serve"],
    company: "Liquidnitro Games",
    role: "Builder and product owner",
    period: "2024 - Present",
    team: "Data function (founding hire)",
    problem:
      "With one data hire serving the whole studio, from CXOs down, data-team bandwidth was the bottleneck.",
    approach: [
      "Established the studio's founding data function: competitive analysis, player insights and BI for CXOs.",
      "Built AI-powered tools so non-technical stakeholders could answer their own questions.",
    ],
    shipped: ["Self-serve AI analysis tools for non-technical stakeholders"],
    outcomes: [
      { value: "1st", label: "Data hire, founding the data function" },
    ],
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
  {
    // TODO: fill from Ajay's notes. Hidden until `draft` is removed.
    slug: "finance-app",
    visual: "modules",
    draft: true,
    title: "Finance App",
    context: "",
    description: "",
    tags: ["Consumer", "Fintech"],
    company: "",
    role: "",
    period: "",
    team: "",
    problem: "",
    approach: [],
    shipped: [],
    outcomes: [],
  },
];

export const publishedProjects = projects.filter((project) => !project.draft);

export default publishedProjects;
