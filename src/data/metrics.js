// ---------------------------------------------------------------------------
// Metrics / impact numbers.
// Every value is drawn directly from outcomes stated in the resume.
// `value` is used for the count-up animation; `display` (optional) overrides
// the final rendered string when the number alone isn't enough.
// ---------------------------------------------------------------------------

export const metrics = [
  {
    value: 5,
    suffix: "M+",
    label: "Daily active users supported",
    detail: "Global game portfolio",
  },
  {
    value: 45,
    prefix: "$",
    suffix: "M+",
    label: "Annual revenue supported",
    detail: "Live-services portfolio",
  },
  {
    value: 500,
    prefix: "$",
    suffix: "K+",
    label: "Incremental revenue driven",
    detail: "Feature ideation & analysis",
  },
  {
    value: 6,
    suffix: "",
    label: "Core platform modules shipped",
    detail: "0-1 AI-native platform",
  },
  {
    value: 50,
    suffix: "+",
    label: "Dashboards built & maintained",
    detail: "Acquisition → monetization",
  },
  {
    value: 70,
    suffix: "%",
    label: "Reduction in operational errors",
    detail: "Improved pipeline reliability",
  },
];

export default metrics;