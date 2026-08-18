/**
 * The kit's layout and type scale, as plain constants.
 *
 * This page is built from inline style objects rather than Tailwind, so it
 * cannot reach `.container-page` or the `globals.css` type steps the other five
 * pages use. Mirroring the values here is the bridge: the numbers become the
 * same numbers, without rewriting 4,000 lines of styling approach first.
 *
 * Every value below is from Guidelines §3. If one changes there, change it
 * here too — these are a copy, not a source.
 */

/**
 * Horizontal gutter matching `.container-page` exactly: 1240px max width with
 * 32px gutters, so a section here lines up with the same grid as Enterprise.
 * Replaces the clone's `calc((100vw - min(86vw, 1360px)) / 2)`, which was a
 * wider container on a different basis and was duplicated in five files.
 */
export const CONTAINER_PAD = "max(32px, calc((100vw - 1240px) / 2 + 32px))";

/** Section rhythm. `py-28` standard, `py-28 md:py-40` for taller sections. */
export const SECTION_Y = "clamp(72px, 8vw, 112px)";
export const SECTION_Y_LG = "clamp(96px, 11vw, 160px)";

/** Type steps. Headings are weight 500, never higher. */
export const TYPE = {
  /** Hero h1. */
  h1: "clamp(34px, 4.4vw, 54px)",
  /** Standard section h2. */
  h2: "clamp(28px, 3.6vw, 44px)",
  /** FAQ h2, deliberately larger. */
  h2Faq: "clamp(36px, 4vw, 52px)",
  /** Closing CTA h2, the page's largest. */
  h2Cta: "clamp(32px, 4.4vw, 56px)",
  /** Card and tile h3. */
  h3: "clamp(19px, 1.5vw, 22px)",
  /** Wide-tile h3. */
  h3Wide: "clamp(20px, 1.7vw, 25px)",
  /** Section intro paragraph. */
  lede: "17px",
  /** Card body. */
  body: "14.5px",
} as const;

/** Heading tracking and leading, per Guidelines §3. */
export const HEADING = {
  fontWeight: 500,
  letterSpacing: "-0.03em",
  lineHeight: 1.08,
} as const;

/**
 * Light-surface values, from Guidelines §3's colour table.
 *
 * Only the hero stays dark on this page; every section below it is light. The
 * clone was built the other way round, so these are the values its inline
 * styles were converted to.
 */
export const SURFACE = {
  /** Default section background. */
  page: "#ffffff",
  /** Bento tile / feature card fill. */
  tile: "#f1f2f3",
  /** Headings and primary text. */
  ink: "#171717",
  /** Section intro paragraphs. */
  ink2: "rgb(87,87,87)",
  /** Card and tile body text. */
  ink3: "rgb(100,100,100)",
  /** Tertiary: inactive tabs, meta. */
  ink4: "rgb(122,122,122)",
  /** Hairline border. */
  line: "rgba(0,0,0,0.08)",
  /** Slightly stronger hairline, for hover states. */
  lineStrong: "rgba(0,0,0,0.14)",
  /** Chip / pill fill on a light surface. */
  chip: "rgba(0,0,0,0.04)",
  /** Cool-neutral elevation, never black. */
  shadow: "0 18px 50px rgba(23,35,56,0.16)",
} as const;
