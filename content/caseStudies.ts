/**
 * Case-study registry — the single source for every surface that shows one.
 *
 * Consumed by:
 *   /case-studies            the searchable index
 *   /case-studies/[slug]     the detail template
 *   /business                the proof teaser
 *
 * Adding a study is one entry in CASE_STUDIES. The route, the cards, the
 * industry filter chips and the page metadata all derive from it — no
 * component needs editing.
 *
 * A study only gets a detail page once it has `body` content. Until then its
 * card renders without a link rather than pointing at an empty page, which is
 * why `hasPage()` exists.
 */

export type Block =
  | { kind: "heading"; text: string }
  | { kind: "para"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string; attribution?: string };

export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;
  /** The one number that sells it — card chip and hero kicker. */
  metric: string;
  /** Card and hero heading, first clause. */
  title: string;
  /** Second clause, rendered in the palette's light tint. Optional. */
  titleMuted?: string;
  /** Card body and meta description. Keep to ~2 sentences. */
  summary: string;
  /** Hero stat strip. Three reads best; two or four also lay out. */
  stats: { value: string; label: string }[];
  /** Right-rail facts on the detail page. */
  facts?: { label: string; value: string }[];
  /** Empty until the written content lands — see hasPage(). */
  body: Block[];
  featured?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "smarters-knorr",
    company: "Smarters",
    industry: "CPG",
    metric: "586K unique users",
    title: "Scaling campaigns for MNCs",
    summary:
      "Smarters ran a personalized generative AI campaign for Unilever's Knorr brand in Mexico, featuring real-time celebrity inpainting at scale. 586,000 unique users generated their own personalized images and opted in at nearly 3× the market average.",
    stats: [
      { value: "586,000", label: "Unique users" },
      { value: "68%", label: "Opt-in rate" },
      { value: "3×", label: "The market average" },
    ],
    featured: true,
    body: [],
  },
  {
    slug: "buzz-lab",
    company: "Buzz Lab",
    industry: "Agency",
    metric: "2 hours instead of days",
    title: "How a social media agency produces",
    titleMuted: "in 2 hours what used to take days",
    summary:
      "Buzz Lab runs a hybrid AI production model: real footage extended through ImagineArt, 60+ visuals in one session, and more clients served without added headcount.",
    stats: [
      { value: "2 hrs", label: "Per deliverable, down from days" },
      { value: "60+", label: "Visuals in one session" },
      { value: "0", label: "Added headcount" },
    ],
    facts: [
      { label: "Industry", value: "Social media agency" },
      { label: "Model", value: "Hybrid — real footage extended with AI" },
      { label: "Used for", value: "Social campaigns, branded video, client deliverables" },
    ],
    body: [
      {
        kind: "para",
        text: "Buzz Lab is a social media agency running a hybrid production model: real footage shot in-house, then extended and multiplied through ImagineArt. What used to take days of turnaround now takes about two hours.",
      },
      {
        kind: "heading",
        text: "The approach",
      },
      {
        kind: "para",
        text: "Rather than replacing production, ImagineArt sits on top of it. The team shoots the anchor footage, then uses the platform to extend clips, generate variants and fill out a full content stack from a single session.",
      },
      {
        kind: "list",
        items: [
          "Social campaigns across formats and ratios",
          "Branded video extended from real footage",
          "Fast-turnaround client deliverables",
        ],
      },
      {
        kind: "heading",
        text: "The outcome",
      },
      {
        kind: "para",
        text: "One session now yields 60+ visuals. The agency has taken on more clients without adding headcount, because the constraint moved from production capacity to creative direction.",
      },
    ],
  },
  {
    slug: "framon",
    company: "Framon",
    industry: "Manufacturing",
    metric: "Production time cut in half",
    title: "How an Italian lighting manufacturer",
    titleMuted: "brought visual creation fully in-house",
    summary:
      "Framon brought all product and campaign imagery in-house, cutting production time in half and removing the dependency on external freelancers.",
    stats: [
      { value: "50%", label: "Less production time" },
      { value: "3", label: "Person marketing team" },
      { value: "80", label: "Person company" },
    ],
    body: [],
  },
  {
    slug: "knd-naval-design",
    company: "KND Naval Design",
    industry: "Engineering",
    metric: "1–4 hours per concept",
    title: "How a naval architecture firm",
    titleMuted: "visualizes vessels before they're built",
    summary:
      "KND Naval Design produces concept art and operational visuals in 1 to 4 hours instead of weeks, for vessels that don't exist yet.",
    stats: [
      { value: "1–4 hrs", label: "Per concept, down from weeks" },
      { value: "0", label: "External rendering artists" },
      { value: "100%", label: "Confidential programs kept in-house" },
    ],
    body: [],
  },
];

/** A study is linkable only once it has written content. */
export const hasPage = (s: CaseStudy) => s.body.length > 0;

export const publishedCaseStudies = () => CASE_STUDIES.filter(hasPage);

export const getCaseStudy = (slug: string) =>
  CASE_STUDIES.find((s) => s.slug === slug);

export const featuredCaseStudy = () =>
  CASE_STUDIES.find((s) => s.featured) ?? CASE_STUDIES[0];

/** Everything except the featured one — the card grid. */
export const supportingCaseStudies = () =>
  CASE_STUDIES.filter((s) => !s.featured);

/** Filter list, derived so a new study's industry appears without an edit. */
export const caseStudyIndustries = () => [
  "All",
  ...CASE_STUDIES.map((s) => s.industry).filter((v, i, a) => a.indexOf(v) === i),
];

export const caseStudyHref = (s: CaseStudy) => `/case-studies/${s.slug}`;
