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
 * A study only gets a detail page once it has `sections`. Until then its card
 * renders without a link rather than pointing at an empty page, which is why
 * `hasPage()` exists.
 *
 * Note the card copy and the page copy are deliberately separate fields. The
 * card is a teaser with its own shorter headline; the page opens on the full
 * one. Sharing them forced one to read badly.
 */

export type Block =
  | { kind: "para"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string; attribution?: string }
  /** Labelled result items — the "Volume / Speed / Capacity / Margins" grid. */
  | { kind: "results"; items: { label: string; text: string }[] };

/** A titled run of blocks. `label` is the small eyebrow above the heading. */
export type Section = {
  label?: string;
  heading?: string;
  blocks: Block[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;

  /* ── card ── */
  /** Chip on the card. */
  metric: string;
  /** Card heading, first clause. */
  title: string;
  /** Card heading, second clause — the palette's light tint. */
  titleMuted?: string;
  /** Card body and meta description. */
  summary: string;

  /* ── page ── */
  /** Full headline for the detail page. Falls back to `title`. */
  pageTitle?: string;
  /** Standfirst under the page headline. Falls back to `summary`. */
  deck?: string;
  /** Cover image, full-bleed under the hero. */
  cover?: string;
  /** Hero stat strip. Three reads best; two or four also lay out. */
  stats: { value: string; label: string }[];
  /** The "Company details" rail at the foot of the page. */
  facts?: { label: string; value: string }[];
  /** Empty until the written content lands — see hasPage(). */
  sections: Section[];

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
    sections: [],
  },

  {
    slug: "buzz-lab",
    company: "Buzz Lab",
    industry: "Agency",
    metric: "60x output in the same window",
    title: "How a social media agency produces",
    titleMuted: "in 2 hours what used to take days",
    summary:
      "Buzz Lab runs hybrid production: real footage extended through AI. ImagineArt covers their full content stack: social campaigns, branded video, and fast-turnaround client deliverables.",

    pageTitle:
      "How Buzz Lab produces 60+ visuals in the same session that previously yielded one",
    deck: "Buzz Lab rebuilt its social media production workflow around ImagineArt, moving from approximately one visual per two-hour session to 60+, eliminating multi-day revision cycles, and scaling client capacity without adding a single headcount.",
    cover: "/media/case-studies/buzz-lab.jpg",
    stats: [
      { value: "1 → 60+", label: "Visuals per two-hour session" },
      { value: "Real-time", label: "Iteration, from multi-day cycles to now" },
      { value: "0 headcount", label: "Added to scale output capacity" },
    ],
    facts: [
      { label: "Company", value: "Buzz Lab" },
      { label: "Industry", value: "Social Media Agency" },
      { label: "Team", value: "Small agency team" },
      { label: "Plan", value: "ImagineArt" },
      {
        label: "Use Cases",
        value:
          "Social campaigns · AI-enhanced branded video · Fast-turnaround deliverables",
      },
    ],
    sections: [
      {
        label: "About",
        heading: "About Buzz Lab",
        blocks: [
          {
            kind: "para",
            text: "Buzz Lab is a social media agency producing high-volume creative content for brands. The team builds almost entirely AI-powered content workflows: filming base footage and real-world content first, then enhancing or extending through AI.",
          },
          {
            kind: "para",
            text: "ImagineArt was their first AI subscription and remains foundational to the production model.",
          },
        ],
      },
      {
        label: "The Challenge",
        heading:
          "One visual per two hours. A hard ceiling on revenue and growth.",
        blocks: [
          {
            kind: "para",
            text: "Before AI, production economics were straightforward and constrained: approximately 1 visual in 2 hours. Traditional videography set a ceiling that couldn't be moved without hiring.",
          },
          {
            kind: "list",
            items: [
              "Multi-day revision cycles meant client feedback wasn't acted on until the following week",
              "More clients required more headcount, and the only path to scale was cost",
              "Output volume capped at a level that made certain campaign briefs undeliverable",
            ],
          },
        ],
      },
      {
        label: "The Decision",
        heading: "The platform the team actually adopted",
        blocks: [
          {
            kind: "para",
            text: "Rapid ideation and generation capabilities drew the team in. Younger creatives explore trends and new effects organically through ImagineArt, and internal adoption spread without a formal training programme.",
          },
          {
            kind: "para",
            text: "ImagineArt was the first AI subscription they committed to, and they haven't replaced it.",
          },
        ],
      },
      {
        label: "How They Use It",
        heading: "A hybrid production model built for volume",
        blocks: [
          {
            kind: "list",
            items: [
              "Film base footage first: real-world content as the brand foundation",
              "Enhance and extend through ImagineArt, so AI multiplies outputs from a single shoot",
              "Social media campaigns, branded video, fast-turnaround client deliverables",
              "Creative concept generation and rapid visual experimentation",
            ],
          },
        ],
      },
      {
        label: "The Impact",
        heading:
          "Volume, speed, capacity, and margins all moved in the right direction",
        blocks: [
          {
            kind: "results",
            items: [
              {
                label: "Volume",
                text: "Previously ~1 visual per 2-hour session. Now 60+ in the same window, without changing team size or timeline.",
              },
              {
                label: "Speed",
                text: "Iteration that required multi-day revision cycles now happens in real time. Client feedback is acted on the same day.",
              },
              {
                label: "Capacity",
                text: "The team handles significantly more clients and campaigns simultaneously, without adding headcount or extending delivery timelines.",
              },
              {
                label: "Margins",
                text: "AI adoption enabled lower costs for clients while increasing internal efficiency, improving both retention and margins.",
              },
            ],
          },
          {
            kind: "quote",
            text: "The ROI and time savings strongly validated the subscription value. We can now handle significantly more clients, and we've been able to lower costs for them while increasing our own efficiency.",
            attribution: "Buzz Lab",
          },
        ],
      },
      {
        label: "What's Next",
        heading: "More volume, new workflows",
        blocks: [
          {
            kind: "para",
            text: "Buzz Lab continues developing its hybrid model: real footage as the foundation, AI as the multiplier. The core workflow isn't changing; the scale of it is.",
          },
        ],
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
    sections: [],
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
    sections: [],
  },
];

/** A study is linkable only once it has written content. */
export const hasPage = (s: CaseStudy) => s.sections.length > 0;

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

/** Shared CTA destinations, supplied with the Buzz Lab copy. */
export const DEMO_HREF =
  "https://www.imagine.art/business/enterprise#enterprise-contact-form";
export const TEAMS_HREF = "https://www.imagine.art/teams";
