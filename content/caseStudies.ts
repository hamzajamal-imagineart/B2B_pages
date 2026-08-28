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
    slug: "smarters-knorr",
    company: "Smarters",
    industry: "CPG",
    metric: "586K unique users",
    title: "Scaling campaigns for MNCs with 586K unique users and 68% opt-in rate",
    summary:
      "Smarters ran a personalized generative AI campaign for Unilever's Knorr brand in Mexico, featuring real-time celebrity inpainting at scale. 586,000 unique users generated their own personalized images and opted in at nearly 3\u00d7 the market average.",
    stats: [
      { value: "586,000", label: "Unique users" },
      { value: "68%", label: "Opt-in rate" },
      { value: "3\u00d7", label: "The market average" },
    ],
    featured: true,
    pageTitle: "Scaling campaigns for MNCs with 586K unique users",
    deck: "Smarters ran a personalized generative AI campaign for Unilever's Knorr brand in Mexico, built on real-time celebrity inpainting. 586,000 unique users generated their own image and opted in at nearly three times the market average.",
    cover: "/media/case-studies/smarters-knorr.jpg",
    facts: [
      { label: "Company", value: "Smarters" },
      { label: "Industry", value: "Digital campaign solutions" },
      { label: "Client", value: "Unilever / Knorr (Mexico)" },
      { label: "Plan", value: "ImagineArt Enterprise" },
      { label: "Use Cases", value: "Real-time inpainting \u00b7 Lead capture \u00b7 Celebrity activation" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "Mass reach without losing the personal connection",
        blocks: [
          { kind: "para", text: "Mass-market campaigns need scale, and scale is usually what kills personalization. Generic creative builds awareness; personal creative drives conversion. Smarters needed both at once: individual-level output for hundreds of thousands of people at the same time." },
          { kind: "list", items: [
            "Standard campaign assets gave users little reason to opt in to ongoing communication",
            "Celebrity campaigns normally ship one identical asset to everyone, which removes personalization entirely",
            "High-volume activations need infrastructure that holds up under concurrent load without degrading output",
            "Regional opt-in rates for comparable activations sat well below the 68% this campaign reached",
          ] },
        ],
      },
      {
        label: "The Approach",
        heading: "Real-time personalization at consumer scale",
        blocks: [
          { kind: "para", text: "The mechanic was real-time generative inpainting. A user uploaded a portrait, which was merged with pre-selected imagery of the rapper and singer Malilla to produce a unique, shareable visual on the spot." },
          { kind: "list", items: [
            "Portrait inpainting merged user selfies with celebrity imagery in real time, so every asset was unique to the person who made it",
            "High-concurrency infrastructure served 586,000 users without latency spikes or a drop in output quality",
            "The personalized result was the opt-in incentive, wiring the creative directly into the lead funnel",
            "Users sharing their own asset extended reach organically, beyond what paid media bought",
          ] },
        ],
      },
      {
        label: "The Results",
        heading: "A campaign that converted at scale",
        blocks: [
          { kind: "metrics", rows: [
            { label: "Unique users engaged", value: "586,000" },
            { label: "Personalized images created", value: "222,000+" },
            { label: "Opt-in rate", value: "68%" },
            { label: "Active interaction with secondary content", value: "89%" },
          ] },
          { kind: "para", text: "The opt-in rate landed at nearly three times the regional market average, which is the clearest signal that personalized output is worth consenting to ongoing contact for. An 89% interaction rate with secondary content showed engagement went well past the moment of generation." },
        ],
      },
    ],
  },

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

  {
    slug: "xolour",
    company: "Xolour",
    industry: "Agency",
    metric: "0 film crews",
    title: "How an agency rebuilt its entire offering",
    titleMuted: "around AI",
    summary:
      "Xolour cut film crews out of its cost base entirely, built a new proposition delivering high-budget creative to small brands, and went from chasing clients to being chased by them.",

    pageTitle: "How an agency rebuilt its entire offering around AI",
    deck: "Xolour eliminated film crews, built a new proposition delivering high-budget creative to small brands, and flipped from outbound selling to inbound demand, by rebuilding its whole creative operation around ImagineArt.",
    cover: "/media/case-studies/xolour.jpg",
    stats: [
      { value: "0 film crews", label: "Largest cost line removed" },
      { value: "Pitch to delivery", label: "Whole pipeline on one platform" },
      { value: "3-person core", label: "Plus project-based freelancers" },
    ],
    facts: [
      { label: "Company", value: "Xolour" },
      { label: "Industry", value: "Creative and advertising agency" },
      { label: "Team Size", value: "3-person core team plus freelancers" },
      { label: "Plan", value: "ImagineArt Enterprise" },
      { label: "Use Cases", value: "Pitch decks · Concept development · Final delivery" },
      { label: "Contact", value: "Creative Director, Xolour" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "A crowded market, high overheads, nothing to differentiate on",
        blocks: [
          { kind: "para", text: "Xolour ran as a traditional advertising agency, and the constraints were structural rather than creative. Film crews and freelancers were the single largest expense. Traditional production was hard to sell into a saturated market. And because every agency produced work the same way, the output itself was hard to tell apart." },
          { kind: "quote", text: "The offering to clients was never new, lots of competition, large overheads and budget limited our creativity.", attribution: "Creative Director, Xolour" },
        ],
      },
      {
        label: "The Decision",
        heading: "One platform instead of a subscription per format",
        blocks: [
          { kind: "para", text: "ImagineArt was chosen for the interface and for having multiple models behind one login, which removed the need for a separate subscription per content format. The agency treated it as a change of operating model rather than a new tool in the existing one." },
          { kind: "para", text: "It now runs across the whole project lifecycle: concept imagery for the pitch deck taken into first client meetings, rapid visual iteration during concepting before anything is committed, and final brand advertising produced end to end without a crew." },
        ],
      },
      {
        label: "The Results",
        heading: "Cost removed, a new proposition, demand inverted",
        blocks: [
          { kind: "results", items: [
            { label: "Cost", text: "Film crews and on-location production, the largest expense category in the business, are gone from the model entirely." },
            { label: "Proposition", text: "Small-budget brands now get visual quality that used to require a major production budget, which became the agency's new pitch." },
            { label: "Sales", text: "AI-led creative proved materially easier to sell than traditional production." },
            { label: "Demand", text: "The agency stopped pursuing clients and started being approached by them." },
          ] },
          { kind: "quote", text: "I can now bring high-budget adverts to small brands, and that has become our new USP.", attribution: "Creative Director, Xolour" },
        ],
      },
    ],
  },

  {
    slug: "withfeeling",
    company: "WithFeeling",
    industry: "Agency",
    metric: "10 to 15 variations in 20 minutes",
    title: "How a sonic branding agency replaced stock libraries",
    titleMuted: "with work that is actually on brand",
    summary:
      "WithFeeling dropped four years of expensive stock subscriptions, now produces 10 to 15 on-brand variations in 20 minutes, and publishes AI-generated imagery in editorial magazines worldwide.",

    pageTitle: "How a sonic branding agency replaced stock libraries with work that is actually on brand",
    deck: "WithFeeling replaced off-brand stock subscriptions with ImagineArt, producing 10 to 15 on-brand visual variations in 20 minutes, publishing AI-generated imagery in worldwide editorial magazines, and consolidating its creative tools into one platform.",
    cover: "/media/case-studies/withfeeling.jpg",
    stats: [
      { value: "20 minutes", label: "For 10 to 15 on-brand concept variations" },
      { value: "1 platform", label: "Replacing several tools and stock subscriptions" },
      { value: "4 years", label: "On expensive stock libraries before the switch" },
    ],
    facts: [
      { label: "Company", value: "WithFeeling" },
      { label: "Industry", value: "Sonic branding and music" },
      { label: "Team Size", value: "7 full-time plus a freelance network" },
      { label: "Plan", value: "ImagineArt" },
      { label: "Use Cases", value: "Website animation · Social video · Pitch decks · Brand guides · Editorial" },
      { label: "Contact", value: "Chris Atkins, Co-Founder" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "Stock libraries could not do surreal",
        blocks: [
          { kind: "para", text: "WithFeeling's brand is surreal, bold and a little humorous, and stock libraries are none of those things. Anything specific enough to be on brand had to go to a freelancer, which took days, or to a photoshoot, which took weeks and real money." },
          { kind: "quote", text: "The content was cliché, overused, and miles off our brand.", attribution: "Chris Atkins, Co-Founder, WithFeeling" },
        ],
      },
      {
        label: "The Decision",
        heading: "One roof, a better credit ratio, and someone to talk to",
        blocks: [
          { kind: "para", text: "Three things decided it: every tool under one platform, a credits-to-output ratio that beat juggling separate subscriptions, and live support. The team had already tried most of the alternatives individually." },
          { kind: "para", text: "It now runs across website animation, social video, pitch deck imagery, brand guides and editorial thought-leadership visuals, using Elements to keep faces, logos, palettes and styles consistent between them." },
        ],
      },
      {
        label: "The Results",
        heading: "Days compressed into minutes, and work good enough to publish",
        blocks: [
          { kind: "results", items: [
            { label: "Speed", text: "Iterating on lighting, palette and composition takes minutes, where the same exploration used to take days." },
            { label: "Quality", text: "Output sits alongside commissioned photography well enough that it now runs in editorial magazines worldwide." },
            { label: "Cost", text: "Almost all production moved in-house, removing designer briefs, freelancer coordination and library licensing at once." },
            { label: "Consistency", text: "Elements carries the same faces, logos and palette across every image, so scale does not cost coherence." },
          ] },
        ],
      },
    ],
  },

  {
    slug: "fjwu",
    company: "Fatima Jinnah Women University",
    industry: "Education",
    metric: "67% higher creativity scores",
    title: "How FJWU drove a 67% surge",
    titleMuted: "in student creative performance",
    summary:
      "A 37-student cohort measured a 67% rise in creativity scores and a 41% fall in inconsistency, with every single student in the group improving.",

    pageTitle: "How FJWU drove a 67% surge in student creative performance",
    deck: "Fatima Jinnah Women University built ImagineArt's creative suite into project-based learning and measured the outcome: a 67% increase in creativity scores, a 41% reduction in inconsistency, and positive improvement across every student in the cohort.",
    cover: "/media/case-studies/fjwu.jpg",
    stats: [
      { value: "67%", label: "Increase in class creativity scores" },
      { value: "41%", label: "Reduction in creative inconsistency" },
      { value: "100%", label: "Of students improved" },
    ],
    facts: [
      { label: "Institution", value: "Fatima Jinnah Women University" },
      { label: "Industry", value: "Higher education, visual communication design" },
      { label: "Location", value: "Pakistan" },
      { label: "Cohort", value: "37 students" },
      { label: "Plan", value: "ImagineArt Enterprise" },
      { label: "Use Cases", value: "Project briefs · Prototyping · Portfolio work" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "Theory without the tools to execute it",
        blocks: [
          { kind: "para", text: "Creative teaching tends to constrain output at the point of execution. Students learn the theory but lack the means to produce quickly, which makes feedback loops slow, iteration expensive, and the gap between the strongest and weakest students wider over time. Graduates also left unfamiliar with the AI tooling the industry had already adopted." },
        ],
      },
      {
        label: "The Approach",
        heading: "Embedded across the whole project lifecycle",
        blocks: [
          { kind: "para", text: "ImagineArt was chosen for covering generation and iterative design in one place rather than requiring several tools. It was then built into the full arc of a project, from the initial brief through to the final portfolio piece." },
          { kind: "list", items: [
            "Instant prototyping, so an idea can be seen rather than only described",
            "Compressed feedback cycles between tutor and student",
            "Portfolio output at professional quality",
            "Instructor time freed to spend on design theory rather than production mechanics",
          ] },
        ],
      },
      {
        label: "The Results",
        heading: "Every student in the cohort improved",
        blocks: [
          { kind: "metrics", rows: [
            { label: "Mean creativity score", value: "13.38 → 22.65" },
            { label: "Increase in creativity scores", value: "67%" },
            { label: "Reduction in inconsistency", value: "41%" },
            { label: "Students showing improvement", value: "100%" },
            { label: "Largest individual gain", value: "72 points" },
          ] },
          { kind: "para", text: "The consistency figure matters as much as the headline one: the cohort did not simply get better on average, it got tighter, with the spread between strongest and weakest narrowing. Students previously capped around 72% reached full marks on creative excellence." },
          { kind: "quote", text: "The data doesn't just show improvement, it shows that AI levels the playing field. Every student gained.", attribution: "Visual Communication Design Department, FJWU" },
        ],
      },
    ],
  },

  {
    slug: "mnsaj",
    company: "Mnsaj",
    industry: "E-commerce",
    metric: "50% faster turnaround",
    title: "Halving content turnaround",
    titleMuted: "and bringing creative fully in-house",
    summary:
      "A lean GCC e-commerce team removed its external studio dependency entirely, halved time to market, and now tests as many creative directions as it likes at no extra cost per iteration.",

    pageTitle: "Halving content turnaround and bringing creative fully in-house",
    deck: "Mnsaj, a high-growth e-commerce startup in the GCC, removed its external studio dependencies, halved time to market, and now produces studio-grade visuals on demand without the costs that were blocking scale.",
    cover: "/media/case-studies/mnsaj.jpg",
    stats: [
      { value: "50% faster", label: "Concept to campaign launch" },
      { value: "0 studios", label: "External production dependency removed" },
      { value: "Hours, not days", label: "For a new product line to go live" },
    ],
    facts: [
      { label: "Company", value: "Mnsaj" },
      { label: "Industry", value: "E-commerce and fashion (GCC)" },
      { label: "Team Size", value: "Lean startup team" },
      { label: "Plan", value: "ImagineArt Teams" },
      { label: "Use Cases", value: "Product imagery · Campaign generation · Image upscaling" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "External studios were a bottleneck the business could not afford",
        blocks: [
          { kind: "para", text: "For a small team managing fast-rotating inventory, creative was the permanent chokepoint. New lines needed to launch quickly, and traditional photography took days, leaving finished products sitting unpublished while they waited on content." },
          { kind: "list", items: [
            "Multiple days of lag per product line before anything could go live",
            "Studio costs that rose in step with catalogue size",
            "Source imagery too low in quality to use as-is against a premium position",
            "No room to experiment, because every iteration started a budget conversation",
          ] },
        ],
      },
      {
        label: "The Approach",
        heading: "The whole creative stack, internalised",
        blocks: [
          { kind: "para", text: "ImagineArt Teams covered the three things the workflow actually needed: upscaling existing imagery, generating new campaign visuals, and allowing continuous experimentation without production overhead. Ideas get prototyped, approved and launched inside a single session." },
          { kind: "list", items: [
            "Upscaling turns low-quality product photos into high-resolution visuals immediately",
            "Campaign generation moves from concept to launch-ready in hours",
            "Several visual directions get tested per product at no additional cost",
            "Revisions happen in the same sitting rather than across days of back-and-forth",
          ] },
        ],
      },
      {
        label: "The Results",
        heading: "Speed, cost and quality all moved together",
        blocks: [
          { kind: "results", items: [
            { label: "Speed", text: "Concept-to-launch time cut by more than half, with new lines live in hours rather than days." },
            { label: "Cost", text: "Studio and freelance designer dependencies removed outright, dropping production overhead to near zero and improving margin per line." },
            { label: "Quality", text: "Upscaling brings existing product imagery up to the standard that previously needed a paid shoot." },
            { label: "Scale", text: "Experimentation carries no financial risk, so more directions get tested per launch than before." },
          ] },
          { kind: "quote", text: "We can now experiment, iterate, and launch premium visuals without waiting, or wasting budget.", attribution: "Mnsaj team" },
        ],
      },
    ],
  },

  {
    slug: "usa-home-improvement",
    company: "USA Home Improvement",
    industry: "Home Services",
    metric: "A day down to a few hours",
    title: "Cutting creative turnaround",
    titleMuted: "from days to hours",
    summary:
      "Replacing an external designer workflow and Photoshop with in-house generation took campaign production from a full day to a few hours, and removed the brief entirely from early-stage ideation.",

    pageTitle: "Cutting creative turnaround from days to hours",
    deck: "USA Home Improvement replaced an external designer workflow and Photoshop production with ImagineArt, generating social ads, SMS and MMS creative, hurricane-season promotions and campaign visuals in hours rather than waiting a day or more.",
    cover: "/media/case-studies/usa-home-improvement.jpg",
    stats: [
      { value: "1 day → hours", label: "Idea to usable visual" },
      { value: "6+ formats", label: "Produced in-house" },
      { value: "0 briefs", label: "Needed for early-stage ideation" },
    ],
    facts: [
      { label: "Company", value: "USA Home Improvement" },
      { label: "Industry", value: "Home services" },
      { label: "Location", value: "United States" },
      { label: "Plan", value: "ImagineArt" },
      { label: "Use Cases", value: "Social ads · SMS and MMS · Seasonal promotions · Product concepts · Internal mockups" },
      { label: "Contact", value: "Marketing team, USA Home Improvement" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "Everything started with a brief and a wait",
        blocks: [
          { kind: "para", text: "The team ran two tools: one connecting them to human designers, and Photoshop. Every visual meant a written brief, a wait, and revision rounds. Last-minute pivots were not possible, which is a poor fit for a seasonal business where hurricane promotions and deadline-driven campaigns are the norm. Testing several directions meant several briefs and several waits." },
        ],
      },
      {
        label: "The Approach",
        heading: "Generate first, brief later",
        blocks: [
          { kind: "para", text: "The workflow inverted. The team now generates multiple styles, layouts and directions in one session and decides afterwards what is worth developing. External designers were not dropped, they were moved to the end of the process for final polish instead of the beginning for concepts." },
          { kind: "quote", text: "Instead of waiting for a designer to turn around every concept, we can quickly generate different styles, layouts, and campaign directions ourselves before deciding what to use or refine.", attribution: "Marketing team, USA Home Improvement" },
        ],
      },
      {
        label: "The Results",
        heading: "Faster, more independent, and more things tested",
        blocks: [
          { kind: "results", items: [
            { label: "Speed", text: "Campaign production dropped from a day or more to a few hours." },
            { label: "Independence", text: "The brief cycle now starts only after an idea has been validated internally, not before." },
            { label: "Volume", text: "Several directions get evaluated at once, so more concepts reach review." },
            { label: "Confidence", text: "Ideas get shown rather than described, which makes experimenting cheap enough to be worth doing." },
          ] },
        ],
      },
    ],
  },

  {
    slug: "noise2signal",
    company: "Noise2Signal",
    industry: "Agency",
    metric: "2 days down to 1",
    title: "How Noise2Signal replaced multi-tool chaos",
    titleMuted: "with one creative platform",
    summary:
      "Consolidating a scattered AI stack onto one platform halved comparable project timelines, cut subscription spend, and brought work back in-house that had been going to freelancers.",

    pageTitle: "How Noise2Signal replaced multi-tool chaos with one creative platform",
    deck: "Noise2Signal removed the context-switching cost of working across fragmented AI ecosystems, reduced its freelancer dependency, and cut comparable project timelines from two days to one by consolidating its creative stack into ImagineArt.",
    cover: "/media/case-studies/noise2signal.jpg",
    stats: [
      { value: "2 days → 1", label: "On comparable projects" },
      { value: "1 platform", label: "Replacing several AI subscriptions" },
      { value: "Fewer freelancers", label: "Work brought back in-house" },
    ],
    facts: [
      { label: "Company", value: "Noise2Signal" },
      { label: "Industry", value: "Creative agency" },
      { label: "Plan", value: "ImagineArt" },
      { label: "Use Cases", value: "UGC · Social ads · Product imagery · Cinematic ads · Campaign visuals" },
      { label: "Contact", value: "Co-founder, Noise2Signal" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "The tooling was eating the time the tooling was meant to save",
        blocks: [
          { kind: "para", text: "The team ran several models across different ecosystems, each good at one thing. The fragmentation had a real cost: different interfaces, different prompting conventions, inconsistent output, and constant context-switching between them. Add the freelancers filling the remaining gaps, and the overhead was cancelling out the efficiency the tools were supposed to bring." },
        ],
      },
      {
        label: "The Decision",
        heading: "Stop chasing models, pick a platform",
        blocks: [
          { kind: "para", text: "Rather than keep up with every new model release across every platform, the agency committed to one environment where frontier models sit together and behave consistently, so attention could go back to the work instead of the tool management around it." },
          { kind: "quote", text: "You cannot be model chasing at this stage of the AI development curve.", attribution: "Co-founder, Noise2Signal" },
        ],
      },
      {
        label: "The Results",
        heading: "Half the time, less spend, more kept in-house",
        blocks: [
          { kind: "results", items: [
            { label: "Speed", text: "Production time halved on equivalent projects." },
            { label: "Cost", text: "Subscription spend fell as redundant tools were consolidated away." },
            { label: "Capability", text: "Internal tooling now covers work that used to be outsourced, reducing freelancer dependency." },
            { label: "Adoption", text: "The team picked it up immediately, and the efficiency gain made the case to leadership on its own." },
          ] },
        ],
      },
    ],
  },

  {
    slug: "design-culture-company",
    company: "Design Culture Company",
    industry: "Agency",
    metric: "25% → 55% thinking time",
    title: "How DCC rebuilt its creative workflow",
    titleMuted: "around ideas, not execution",
    summary:
      "A strategic design agency flipped the ratio of its project time, moving from 75% execution and 25% thinking to 45% execution and 55% thinking.",

    pageTitle: "How DCC rebuilt its creative workflow around ideas, not execution",
    deck: "Design Culture Company restructured how its team spends creative time, shifting from a workflow where 75% of a project went on execution to one where 55% goes on thinking, refinement and direction, by embedding ImagineArt across branding, campaigns, cinematic narratives and experiential design.",
    cover: "/media/case-studies/design-culture-company.jpg",
    stats: [
      { value: "75% → 45%", label: "Project time spent on execution" },
      { value: "25% → 55%", label: "Project time spent on thinking" },
      { value: "Days → hours", label: "To visualize and compare directions" },
    ],
    facts: [
      { label: "Company", value: "Design Culture Company (DCC)" },
      { label: "Industry", value: "Strategic design agency" },
      { label: "Plan", value: "ImagineArt Enterprise" },
      { label: "Use Cases", value: "Campaigns · Cinematic narratives · Character development · Brand strategy · Experiential design" },
      { label: "Contact", value: "Creative Director and Partner, DCC" },
    ],
    sections: [
      {
        label: "The Challenge",
        heading: "Ideas losing their momentum on the way to being seen",
        blocks: [
          { kind: "para", text: "DCC's work is narrative-driven, which means a client has to connect with an idea emotionally for it to land. The structural problem sat between conception and visualization: early-stage work depended on stock imagery, photomontage, photographic reference and custom illustration, all of it slow and spread across several tools." },
          { kind: "list", items: [
            "Concepts risked losing their emotional momentum before they ever reached a presentation",
            "Holding art direction consistent across a multidisciplinary team was hard at pace",
            "Running directions in parallel took disproportionate manual effort",
            "Execution consumed 75% of a project timeline, leaving 25% for the thinking",
          ] },
          { kind: "quote", text: "One of our biggest challenges was the amount of time required to translate ideas into tangible visual narratives.", attribution: "Creative Director, Design Culture Company" },
        ],
      },
      {
        label: "The Decision",
        heading: "Chosen on direction, not on speed",
        blocks: [
          { kind: "para", text: "DCC tried several platforms and selected on the consistency and quality of creative direction rather than raw speed or feature count. What decided it was that the output showed an understanding of art direction, cinematic composition and visual language, reading as intentional rather than arbitrary." },
          { kind: "quote", text: "ImagineArt feels genuinely aligned with the way a real creative team operates.", attribution: "Creative Director, Design Culture Company" },
        ],
      },
      {
        label: "The Results",
        heading: "The ratio between thinking and doing, inverted",
        blocks: [
          { kind: "metrics", rows: [
            { label: "Execution share of project time", value: "75% → 45%" },
            { label: "Thinking and direction share", value: "25% → 55%" },
            { label: "Time to compare creative directions", value: "Days → hours" },
          ] },
          { kind: "results", items: [
            { label: "Speed", text: "Directions that took days now develop in hours, so more can be compared before a decision is made." },
            { label: "Creative growth", text: "Designers built sharper judgement about how composition, lighting and atmosphere carry meaning." },
            { label: "Client alignment", text: "Presentations are more immersive from the first stage, which shortens decision cycles." },
            { label: "Cost", text: "Less dependency on outside support and subscriptions during early visualization, without giving up quality." },
          ] },
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

/** The study that leads the grid, rendered full-width ahead of the rest. */
const LEAD_SLUG = "unilever";

/** The card grid lists every study that has a page, lead first and the rest
 *  in registry order.
 *
 *  The featured study is excluded: it already occupies the block above the
 *  grid, and once it gained written content it started appearing in both
 *  places at once. */
export const allCaseStudies = () => {
  const featured = featuredCaseStudy();
  const withPage = CASE_STUDIES.filter((s) => hasPage(s) && s.slug !== featured.slug);
  return [
    ...withPage.filter((s) => s.slug === LEAD_SLUG),
    ...withPage.filter((s) => s.slug !== LEAD_SLUG),
  ];
};

/** Filter list, derived from the studies the grid actually shows, so a chip
 *  can never filter down to nothing. */
export const caseStudyIndustries = () => [
  "All",
  ...allCaseStudies()
    .map((s) => s.industry)
    .filter((v, i, a) => a.indexOf(v) === i),
];

export const caseStudyHref = (s: CaseStudy) => `/case-studies/${s.slug}`;

/**
 * Shared CTA destinations, supplied with the Buzz Lab copy.
 *
 * DEMO_HREF used to be an off-site contact form. Every reach-out CTA now lands
 * on this site's own form section instead. Case studies have no form of their
 * own, so this is the Enterprise one, and the call sites open it in a new tab
 * so a reader mid-case-study does not lose their place.
 */
export const DEMO_HREF = "/#contact";
// imagine.art/teams 404s; the subscription page is the live equivalent.
export const TEAMS_HREF = "https://www.imagine.art/enterprise/subscription";
