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
  /** Metric / result rows, rendered as a hairline table. */
  | { kind: "metrics"; rows: { label: string; value: string }[] }
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
  /** Caption under the cover. */
  coverCaption?: string;
  /** Hero stat strip. Three reads best; two or four also lay out. */
  stats: { value: string; label: string }[];
  /** The "Company details" rail at the foot of the page. */
  facts?: { label: string; value: string }[];
  /** Secondary link in the details rail. Defaults to the Teams plan. */
  planLink?: { label: string; href: string };
  /** Empty until the written content lands — see hasPage(). */
  sections: Section[];

  featured?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "unilever",
    company: "Unilever",
    industry: "FMCG",
    metric: "25x cheaper image production",
    title: "How ImagineArt rebuilt Unilever's",
    titleMuted: "creative production engine",
    summary:
      "Unilever's B&W Division ran its entire creative pipeline through ImagineArt for six weeks. The cost and time structure of production changed immediately, and so did the volume a fixed team could ship, without adding a single new hire.",

    pageTitle: "How ImagineArt rebuilt Unilever's creative production engine",
    deck: "Unilever's B&W Division ran its entire creative pipeline through ImagineArt for six weeks. The cost and time structure of production changed immediately, and so did the volume a fixed team could ship, without adding a single new hire.",
    cover: "/media/case-studies/unilever.jpg",
    coverCaption: "Unilever brand creative produced with ImagineArt",
    stats: [
      { value: "25x cheaper", label: "Image production cost" },
      { value: "7x faster", label: "Image turnaround speed" },
      { value: "8x higher", label: "Output volume, same team and budget" },
    ],
    facts: [
      { label: "Company", value: "Unilever, B&W Division" },
      { label: "Industry", value: "FMCG & Consumer Goods" },
      { label: "Region", value: "Pakistan & MENA" },
      { label: "Agency Partner", value: "Team Reactivate" },
      { label: "Plan", value: "ImagineArt Enterprise" },
      {
        label: "Use Cases",
        value: "Campaign imagery \u00b7 Video reels \u00b7 Localized creative \u00b7 Brand-guideline compliance",
      },
      { label: "Contact", value: "Humza Mahfooz, Social-First Transformation Lead" },
    ],
    featured: true,
    sections: [
      {
        label: "Executive Snapshot",
        heading: "Six weeks, one pipeline, every number moved",
        blocks: [
          {
            kind: "para",
            text: "One Unilever division ran its entire creative pipeline through ImagineArt for six weeks. The cost and time structure of production changed immediately. So did the volume a fixed team could ship, without adding a single new hire.",
          },
          {
            kind: "para",
            text: "The figures below come from the initial pilot reporting period. They are the numbers the rest of this case study builds on.",
          },
          {
            kind: "metrics",
            rows: [
              { label: "Image production cost", value: "25x cheaper" },
              { label: "Video production cost", value: "3x cheaper" },
              { label: "Image turnaround speed", value: "7x faster" },
              { label: "Video turnaround speed", value: "4x faster" },
              { label: "Output volume, same resources", value: "8x higher" },
            ],
          },
          {
            kind: "para",
            text: "Three teams. One shared workflow. 1,200 static assets and 300 video reels, produced inside ImagineArt in six weeks.",
          },
        ],
      },
      {
        label: "The Trigger",
        heading: "A scale problem no agency could solve alone",
        blocks: [
          {
            kind: "para",
            text: "Unilever's B&W Division had a scale problem. Local markets needed campaign assets fast, and every one of those assets still had to clear a strict global brand check. Agency resources were already stretched thin before that demand even landed.",
          },
          {
            kind: "para",
            text: "Humza Mahfooz, Social-First Transformation Lead at B&W, saw the mismatch clearly. He identified ImagineArt's core method: use large language models with structured system prompts to produce on-brand, locally specific concepts fast enough to match Unilever's campaign pace. That single insight is what got the pilot off the ground.",
          },
        ],
      },
      {
        label: "The Problem",
        heading: "A system straining at every joint",
        blocks: [
          {
            kind: "para",
            text: "This was not one broken step. It was a system straining at every joint.",
          },
          {
            kind: "list",
            items: [
              "High production costs were eating into campaign budgets across the division",
              "Agency resources were maxed out against the volume of briefs coming in, with no room left for a second pass",
              "No formal process existed for producing localised work that still met global brand guidelines",
              "Iteration cycles moved slower than Unilever's campaign calendar demanded",
              "Local nuance got cut first whenever a deadline tightened",
            ],
          },
          {
            kind: "para",
            text: "Put those five together and the real cost shows up: campaigns that shipped late, cost more than they should have, and said less about the local market than they needed to. The design team absorbed the overflow at every stage, which turned a finishing step into the biggest bottleneck in the process.",
          },
        ],
      },
      {
        label: "The Solution",
        heading: "How Unilever runs on ImagineArt today",
        blocks: [
          {
            kind: "para",
            text: "Unilever now runs its creative production through ImagineArt's Workflows feature. Copilot nodes handle the AI reasoning behind each brief. Multi-input reference nodes keep every new asset anchored to brand guidelines and prior creative, so nothing drifts off-brand between markets.",
          },
          {
            kind: "para",
            text: "Image nodes run on models including NB Pro. Video nodes run on Veo 3.1. AI Resize takes a finished asset and reshapes it for whatever platform it needs to hit next, so one piece of creative becomes a full set of placements without a second production cycle.",
          },
          {
            kind: "para",
            text: "That is the machine. Three teams run it, each with a distinct job.",
          },
          {
            kind: "results",
            items: [
              {
                label: "Unilever Brand Managers",
                text: "Brand managers now write campaign briefs with ImagineArt's system prompts already built into how they think. Teams built AI fluency over the course of the pilot, and now write briefs assuming the platform will execute them: a workflow fully absorbed into how the division works, not a tool bolted onto an old process.",
              },
              {
                label: "Team Reactivate, Creative Agency",
                text: "Team Reactivate's strategists operate ImagineArt directly. Concept generation, copy, and full artwork production all happen inside the platform, start to finish. The agency already works with most Unilever brands across Pakistan and the wider MENA region, so this pilot was never a narrow, single-brand test.",
              },
              {
                label: "Design Team",
                text: "The in-house design team now steps in only for final touchups. That one change removed the biggest bottleneck in the old process: work that used to queue for days now clears in hours, and the design team's time goes to polish instead of production.",
              },
            ],
          },
        ],
      },
      {
        label: "The Results",
        heading: "Every number moved in the pilot's favour",
        blocks: [
          {
            kind: "para",
            text: "Image production costs dropped 25x. Video production costs dropped 3x. Image turnaround got 7x faster, and video turnaround got 4x faster. Output volume, using the same team and the same budget, came in 8x higher.",
          },
          {
            kind: "para",
            text: "Numbers on a page are one thing. What they produced is another: 1,200 static assets and 300 video reels, built inside ImagineArt in six weeks, by three teams working off one shared system. Senior Unilever leadership noticed. They now send concepts for high-priority campaigns straight to the platform, which is as clear a trust signal as an enterprise pilot gets.",
          },
        ],
      },
      {
        label: "The Adoption Story",
        heading: "Earning trust through work that shipped",
        blocks: [
          {
            kind: "para",
            text: "The rollout was not frictionless. But the resistance was never about AI. It was about capacity. Team Reactivate had an ambitious pilot scope and a small team to run it.",
          },
          {
            kind: "para",
            text: "ImagineArt sent forward-deployed creatives to close that gap: hands-on training, in-house support, real work done side by side instead of a manual handed over and left behind.",
          },
          {
            kind: "para",
            text: "That investment paid off well past the pilot's original scope. Team Reactivate now runs ImagineArt independently across live campaigns. Brand managers write briefs assuming the platform's capabilities are already there. Senior leadership routes high-priority work to it directly. None of that happens without real trust, earned through work that actually shipped.",
          },
        ],
      },
      {
        label: "Expansion",
        heading: "The plug-and-play playbook",
        blocks: [
          {
            kind: "para",
            text: "Team Reactivate's reach across Pakistan and MENA means this deployment was never going to stay contained to one market. The infrastructure built during the pilot, the prompts, the reference workflows and the trained team, already spans more ground than a single division.",
          },
          {
            kind: "para",
            text: "The model travels because its parts travel. Structured system prompts hold the brand guidelines steady. Reference-anchored workflows keep every market's output consistent with the last. Forward-deployed support gets a new team running fast. Any Unilever market with a similar production bottleneck can pick this up with minimal setup.",
          },
          { kind: "para", text: "That expansion is already moving:" },
          {
            kind: "list",
            items: [
              "Unilever's project champion is introducing ImagineArt to Personal Care, Home Care, and Food & Beverage, each with several brands of its own and the same production bottleneck B&W had",
              "ImagineArt is in active conversations with Unilever Bangladesh about a similar rollout",
              "ImagineArt is also talking with Unilever B&W Global about extending the model past a single country",
            ],
          },
        ],
      },
      {
        label: "Why This Matters",
        heading: "Proof of a playbook, not a one-off win",
        blocks: [
          {
            kind: "para",
            text: "Unilever's B&W pilot is proof of a playbook, not a one-off win. Large organisations with complex, multi-market brand portfolios, exactly the segment that matters most in creative software, can run high-volume, on-brand, locally specific production through ImagineArt at a fraction of what it used to cost.",
          },
          {
            kind: "para",
            text: "How this adoption happened matters as much as the result. No one handed down a mandate from the top. One internal champion made a bet. The work backed it up, and the platform spread on its own until senior leadership was routing its most important campaigns through it. That is what real product-market fit looks like inside an enterprise account.",
          },
          {
            kind: "para",
            text: "Structured prompts, reference-anchored workflows, and hands-on onboarding add up to something hard to remove once it is in place, and easy to extend once it is proven. Global FMCG, retail, and consumer brands carry the same structural problem Unilever had. ImagineArt now has a documented case that speaks directly to it.",
          },
          {
            kind: "para",
            text: "The Unilever pilot answers a bigger question than what ImagineArt can do for one brand. It proves enterprise adoption works, and that the playbook to repeat it already exists.",
          },
        ],
      },
    ],
  },

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
    company: "Framon Group",
    industry: "Manufacturing",
    metric: "Production time cut in half",
    title: "How an Italian lighting manufacturer",
    titleMuted: "brought visual production fully in-house",
    summary:
      "Framon Group's 3-person marketing team eliminated external freelancers, cut asset production from a full day to a few hours, and now generates all commercial imagery in-house.",

    pageTitle:
      "How an Italian lighting manufacturer brought visual production fully in-house",
    deck: "Framon Group's 3-person marketing team eliminated external freelancers, cut asset production from a full day to a few hours, and now generates all commercial imagery, from catalogues and brochures to LinkedIn and Instagram, without any external dependency.",
    cover: "/media/case-studies/framon.jpg",
    stats: [
      { value: "1 day → hours", label: "Turnaround per custom project or datasheet" },
      { value: "0 freelancers", label: "External production dependency eliminated" },
      { value: "3–4 people", label: "Marketing team for an 80-person company" },
    ],
    facts: [
      { label: "Company", value: "Framon Group (Framon Spa)" },
      { label: "Industry", value: "Lighting Manufacturer" },
      { label: "Company Size", value: "~80 employees" },
      { label: "Plan", value: "ImagineArt" },
      {
        label: "Use Cases",
        value: "Catalogues · Brochures · Product datasheets · Social media imagery",
      },
      { label: "Contact", value: "Pierfulvio Montini, Sales Manager" },
    ],
    sections: [
      {
        label: "About",
        heading: "About Framon Group",
        blocks: [
          { kind: "para", text: "Framon Spa is an Italian lighting manufacturer with approximately 80 employees. A 3 to 4 person marketing team produces all visual output for catalogues, brochures, website sponsorships, LinkedIn, Instagram, and custom project presentations." },
          { kind: "para", text: "ImagineArt is now the primary tool for all commercial and marketing visual production." },
        ],
      },
      {
        label: "The Challenge",
        heading: "Freelancer dependency, day-long timelines, no flexibility",
        blocks: [
          { kind: "para", text: "Every marketing visual followed the same expensive loop: write a brief, send it to a freelancer, wait, revise if it missed." },
          { kind: "list", items: [
            "Each custom project or datasheet took at least a full day from brief to usable asset",
            "Revisions required reopening the freelancer loop, costing more time and more money",
            "No direct creative control over output or timeline",
            "A 3-person team managing 80-person company output couldn't scale without external dependency",
          ] },
          { kind: "quote", text: "Reduce time and costs: that's exactly what it delivers.", attribution: "Pierfulvio Montini, Sales Manager, Framon Group" },
        ],
      },
      {
        label: "The Decision",
        heading: "Found it. Tried it. Stayed.",
        blocks: [
          { kind: "quote", text: "I searched on the internet and found ImagineArt. I gave a shot to this new tool and since then we are still working together." },
          { kind: "para", text: "No long evaluation. The platform worked, and the team kept using it." },
        ],
      },
      {
        label: "How They Use It",
        heading: "Everything commercial and marketing",
        blocks: [
          { kind: "list", items: [
            "Product catalogues and brochures: professional imagery for every SKU without scheduling a shoot",
            "Website and sponsorship content: LinkedIn and Instagram assets produced same-day",
            "Custom project presentations: tailored visuals for specific client and tender packages",
            "Product datasheets: imagery updated in-house at the pace of the product catalogue",
          ] },
        ],
      },
      {
        label: "The Impact",
        heading: "Speed, independence, quality, and scale all moved in the right direction",
        blocks: [
          { kind: "results", items: [
            { label: "Speed", text: "Turnaround cut by more than half per custom project, from at least a full day of briefing and waiting to a few hours of direct production." },
            { label: "Independence", text: "Stopped working with external freelancers entirely. Brief, execution, revision, and final asset are all managed in-house." },
            { label: "Quality", text: "Quality has increased. The team brings product knowledge and brand direction that no external freelancer can replicate." },
            { label: "Scale", text: "A 3 to 4 person team now handles full visual output for an 80-person manufacturing company, without hiring or outsourcing." },
          ] },
        ],
      },
      {
        label: "What's Next",
        heading: "Using it for everything they need",
        blocks: [
          { kind: "para", text: "Framon Group's plan: keep using ImagineArt as the primary tool for creating what the business needs. Reliable, self-sufficient visual production at the pace the business requires." },
        ],
      },
    ],
  },

  {
    slug: "knd-naval-design",
    company: "KND Naval Design",
    industry: "Engineering",
    metric: "3–7 days to 1–4 hours",
    title: "How a naval architecture firm",
    titleMuted: "visualizes vessels before they're built",
    summary:
      "KND Naval Design cut concept visual turnaround from 3 to 7 days down to 1 to 4 hours, enabling competitive tender submissions with marketing-grade imagery produced entirely in-house.",

    pageTitle: "How a naval architecture firm visualizes vessels before they're built",
    deck: "KND Naval Design cut concept visual turnaround from 3 to 7 days down to 1 to 4 hours, enabling competitive tender submissions with marketing-grade imagery produced entirely in-house, even for confidential military programs where no photography exists.",
    cover: "/media/case-studies/knd-naval-design.jpg",
    stats: [
      { value: "3–7 days → 1–4 hrs", label: "Turnaround per concept visual or tender asset" },
      { value: "0 external artists", label: "Visualization now fully in-house" },
      { value: "Worldwide", label: "Tenders across international markets" },
    ],
    facts: [
      { label: "Company", value: "KND Naval Design" },
      { label: "Industry", value: "Naval Architecture & Marine Engineering" },
      { label: "Location", value: "South Africa (global clients)" },
      { label: "Plan", value: "ImagineArt Enterprise" },
      {
        label: "Primary Use Cases",
        value: "Tender visualizations · Military vessel concepts · Marketing imagery · Client proposals",
      },
    ],
    planLink: {
      label: "View Enterprise Plan →",
      href: "https://www.imagine.art/business/enterprise",
    },
    sections: [
      {
        label: "About",
        heading: "About KND Naval Design",
        blocks: [
          { kind: "para", text: "KND Naval Design is a naval architecture and marine engineering company based in South Africa, working with clients worldwide. The firm designs patrol boats, military craft, ferries, ambulance boats, workboats, and high-speed vessels in aluminum, HDPE, and composite construction." },
          { kind: "para", text: "The team uses ImagineArt for vessel concept visualization, tender presentations, marketing content, and client-facing renderings, often for vessels that don't yet physically exist." },
        ],
      },
      {
        label: "The Challenge",
        heading: "Selling a product that doesn't exist yet",
        blocks: [
          { kind: "para", text: "Naval architecture operates in a gap most industries don't face: the product is sold before it exists. Before ImagineArt:" },
          { kind: "list", items: [
            "A single high-quality concept visual took 3 to 7 days to produce for tender submission",
            "External rendering artists and freelance designers were required for every presentation-quality image",
            "Rapid changes, such as different colors, environments or operational scenarios, required reopening the production loop",
            "Confidential programs couldn't be shared with external artists without creating security and IP risk",
            "Tender windows are short, and the previous workflow often couldn't keep pace",
          ] },
          { kind: "quote", text: "One particularly valuable feature is the ability to recreate our vessel designs in realistic operational scenes, even when no real photographs exist. This has transformed how we present concepts to clients and stakeholders.", attribution: "Principal Naval Architect & Director, KND Naval Design" },
        ],
      },
      {
        label: "The Decision",
        heading: "Speed, flexibility, and confidentiality at the same time",
        blocks: [
          { kind: "para", text: "ImagineArt was selected for its ability to produce highly realistic visuals from simple inputs, fast enough to matter during live tender negotiations. Three factors were decisive:" },
          { kind: "list", items: [
            "Fast generation of realistic vessel imagery from CAD and design references",
            "Ability to experiment with operational environments, color schemes, and branding without external coordination",
            "Full confidentiality maintained, since designs are never shared with external artists",
          ] },
        ],
      },
      {
        label: "How They Use It",
        heading: "From concept to client-ready in hours",
        blocks: [
          { kind: "list", items: [
            "Military patrol boat and naval vessel visualizations for international tenders",
            "Marketing imagery for social media and LinkedIn, presenting vessels before construction begins",
            "Client-specific color scheme mockups, for rapid branding changes per tender",
            "Realistic operational scene generation, showing vessels in environments that don't yet exist",
            "Concept development for future vessel programs",
          ] },
        ],
      },
      {
        label: "The Impact",
        heading: "Speed, independence, confidence, and confidentiality",
        blocks: [
          { kind: "results", items: [
            { label: "Speed", text: "Before: 3 to 7 days per concept visual. After: 1 to 4 hours. The difference is decisive during tender windows and fast-moving client negotiations." },
            { label: "Independence", text: "The design office produces marketing-grade imagery internally, without a dedicated visualization department or external artists." },
            { label: "Client Confidence", text: "Stakeholders respond positively because the visuals bridge the gap between technical engineering drawings and real-world understanding. Tender submissions are more professional and more persuasive." },
            { label: "Confidentiality", text: "For military and restricted programs, ImagineArt allows full visual presentation without any external exposure of confidential program details." },
          ] },
        ],
      },
      {
        label: "What's Next",
        heading: "Expanding global reach through better presentations",
        blocks: [
          { kind: "para", text: "As KND Naval Design grows internationally, ImagineArt remains a core tool for client visualization. Plans include expanded use in international tenders, marketing campaigns, client proposal packages, and early-stage vessel configuration studies." },
        ],
      },
    ],
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
