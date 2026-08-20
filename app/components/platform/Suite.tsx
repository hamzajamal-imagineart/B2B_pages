import { SectionGuides } from "@/components/primitives/SectionGuides";
import { SuiteRail } from "./SuiteRail";

/**
 * The eight-tool suite.
 *
 * Rendered as a hairline attribute grid (the .attr-grid pattern from
 * globals.css, widened to four columns) rather than as eight illustrated
 * cards. Eight fabricated dashboard mockups is exactly what this redesign
 * moved away from, and there are no real captures for six of these tools —
 * an honest icon + label + blurb row beats an invented screenshot.
 */
/** Same origin the footer links against. */
const IA = "https://www.imagine.art";

export type Tool = {
  title: string;
  body: string;
  icon: React.ReactNode;
  /** Looping capture or still shown at the foot of the card. Omit and the
   *  card runs on its tone alone. */
  media?: { src: string; kind: "video" | "image" };
  /** Destination on imagine.art. Falls back to the enterprise page for tools
   *  that have no product page of their own yet. */
  href?: string;
};

/** The Business page runs a longer list — see BUSINESS_TOOLS below. */
export const PLATFORM_TOOLS: Tool[] = [
  {
    title: "Workflows",
    media: { src: "/media/variable-demo.mp4", kind: "video" },
    href: `${IA}/workflow`,
    body: "Build repeatable creative pipelines that turn one brief into a finished output, every time.",
    icon: <IconNodes />,
  },
  {
    title: "Brand Guidelines",
    media: { src: "/media/brandkit/brand-kits.webp", kind: "image" },
    body: "Lock in your colors, fonts, and visual identity so every generation stays on-brand.",
    icon: <IconSwatch />,
  },
  {
    title: "Video Extend",
    media: { src: "/media/apps/video-reframe.mp4", kind: "video" },
    href: `${IA}/video`,
    body: "Take any clip and seamlessly extend it, no reshoots, no awkward cuts.",
    icon: <IconExtend />,
  },
  {
    title: "Inpaint",
    media: { src: "/media/apps/sketch-to-render.mp4", kind: "video" },
    href: `${IA}/image`,
    body: "Edit precisely. Remove, replace, or refine any part of an image with a brush.",
    icon: <IconBrush />,
  },
  {
    title: "AI Influencer / UGC",
    media: { src: "/media/templates/character.mp4", kind: "video" },
    href: `${IA}/apps/heygen-avatar`,
    body: "Generate consistent, authentic-feeling creators and user-generated content at scale.",
    icon: <IconPersonSpark />,
  },
  {
    title: "Music",
    href: `${IA}/audio/music/elevenlabs-music`,
    body: "Score your content with original, royalty-free tracks generated to fit the moment.",
    icon: <IconNote />,
  },
  {
    title: "Ad Studio",
    media: { src: "/media/templates/ad-campaign.mp4", kind: "video" },
    href: `${IA}/ai-image-generator`,
    body: "Produce performance-ready ad creative in every format and ratio, fast.",
    icon: <IconRatios />,
  },
  {
    title: "Fashion Studio",
    media: { src: "/media/templates/fashion-tryon.mp4", kind: "video" },
    href: `${IA}/image`,
    body: "Bring apparel and product to life with on-model imagery and editorial-grade visuals.",
    icon: <IconHanger />,
  },
];

/**
 * Business-page list. Same eight tools plus the Image / Video Canvas, with the
 * spec's own wording for Workflows, which is more specific than Platform's.
 */
export const BUSINESS_TOOLS: Tool[] = [
  {
    title: "Workflows",
    media: { src: "/media/variable-demo.mp4", kind: "video" },
    href: `${IA}/workflow`,
    body: "Node-based, multi-step flows that turn a brief into finished assets. The repeatable backbone behind every campaign your team ships.",
    icon: <IconNodes />,
  },
  {
    title: "Image / Video Canvas",
    media: { src: "/media/cards/generate-prompt.mp4", kind: "video" },
    href: `${IA}/image`,
    body: "Full editing surfaces for both. Create and refine in the same place, no exports, no handoffs, no drift.",
    icon: <IconCanvas />,
  },
  ...PLATFORM_TOOLS.slice(1),
];

/**
 * Solutions-page list: "Built for success", rendered as a bento by
 * solutions/BuiltForSuccess rather than by this component. It lives here so
 * all the tool copy and its icons stay in one file. Five capabilities rather
 * than the full inventory — note Teams & Enterprise is a capability, not a
 * tool, which is why this list is hand-built instead of sliced from the
 * others.
 */
export const SOLUTIONS_CAPABILITIES: Tool[] = [
  BUSINESS_TOOLS[0], // Workflows
  BUSINESS_TOOLS[1], // Image / Video Canvas
  {
    title: "Fashion Studio",
    body: "Purpose-built for design, PDP imagery, editorials, and lookbooks.",
    icon: <IconHanger />,
  },
  {
    title: "Ads Studio",
    body: "Advertising creation engineered for static, motion, and end-to-end campaigns.",
    icon: <IconRatios />,
  },
  {
    title: "Teams & Enterprise",
    body: "SOC 2 Type II, SSO, and Zero Data Retention. Admin controls that keep every output accountable.",
    icon: <IconShieldPeople />,
  },
];

export default function Suite({ tools = PLATFORM_TOOLS }: { tools?: Tool[] } = {}) {
  return (
    <section
      id="suite"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[640px]">
          <p className="eyebrow">The suite</p>
          <h2 className="h2 mt-4">
            Everything your team{" "}
            <span className="h-muted">needs to create</span>
          </h2>
          <p className="lede mt-5">
            A full suite of tools that take you from idea to finished asset, no
            stitching together five different products.
          </p>
        </div>
      </div>

      <SuiteRail tools={tools} />
    </section>
  );
}

/* ── icons (monochrome, single stroke weight, matching Security's set) ── */
function IconNodes() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="9" width="6" height="6" rx="1.6" />
      <rect x="15.5" y="3" width="6" height="6" rx="1.6" />
      <rect x="15.5" y="15" width="6" height="6" rx="1.6" />
      <path d="M8.5 12h3.5V6h3.5M12 12v6h3.5" />
    </svg>
  );
}
function IconCanvas() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M2.5 15.5l4.8-4.2 3.4 3 3.2-2.8 7.6 6" />
      <circle cx="8.6" cy="8.6" r="1.5" />
    </svg>
  );
}
function IconSwatch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <circle cx="17.25" cy="17.25" r="3.75" />
    </svg>
  );
}
function IconExtend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="6" width="11" height="12" rx="1.8" />
      <path d="M16.5 12h5M19 9.5l2.5 2.5-2.5 2.5" />
    </svg>
  );
}
function IconBrush() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.5 3.5c-1.6 0-9 5.9-10.6 8.4l2.2 2.2C14.6 12.5 20.5 5.1 20.5 3.5z" />
      <path d="M9.4 13.5c-1.7 0-3 1.3-3 3 0 1.1-.6 2-2 2.6 1 1.1 2.4 1.4 3.6 1.4 2 0 3.7-1.6 3.7-3.6 0-1.7-1.3-3.4-2.3-3.4z" />
    </svg>
  );
}
function IconPersonSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="7.5" r="3.5" />
      <path d="M3.5 20.5c0-3.6 2.9-6.2 6.5-6.2 1.4 0 2.7.4 3.8 1.1" />
      <path d="M18.5 13.5l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z" />
    </svg>
  );
}
function IconNote() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6.5" cy="17.5" r="3" />
      <circle cx="17.5" cy="15" r="3" />
      <path d="M9.5 17.5V6l11-2.5V15" />
    </svg>
  );
}
function IconRatios() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="7" width="12" height="10" rx="1.8" />
      <rect x="16.5" y="3.5" width="5" height="17" rx="1.8" />
    </svg>
  );
}
function IconShieldPeople() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2.8l7 3v5.3c0 4.5-3 7.5-7 9.1-4-1.6-7-4.6-7-9.1V5.8l7-3z" />
      <circle cx="12" cy="10.2" r="2" />
      <path d="M8.6 16.2c0-1.9 1.5-3.1 3.4-3.1s3.4 1.2 3.4 3.1" />
    </svg>
  );
}
function IconHanger() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 8.5V7a2.2 2.2 0 1 1 2.2-2.2" />
      <path d="M12 8.5l8.4 6.1c1.1.8.5 2.6-.9 2.6H4.5c-1.4 0-2-1.8-.9-2.6L12 8.5z" />
    </svg>
  );
}
