/**
 * Per-route colour.
 *
 * Each page picks one hue and uses it three ways: the page wash, the deep tone
 * the headings are set in, and the light tint the second clause of a two-tone
 * heading takes. Because all three come from the same palette, the heading can
 * never drift from the background behind it.
 *
 * `bg` is painted on the body itself (globals.css) rather than through the
 * grain layer, so it reads as a real page colour. The grain tile keeps the
 * hue too, so the tooth over the wash stays in family.
 *
 * Workflows is excluded: it paints its own near-black over the whole page.
 */
type Palette = {
  /** Page wash. */
  bg: string;
  /** Deep tone — headings, via --ink-heading. */
  ink: string;
  /** Light tint — the .h-muted clause. */
  muted: string;
  /** Hue of the noise tile, as an feColorMatrix rgb triple. */
  noise: [number, number, number];
};

const PALETTES = {
  /** Enterprise — sage green. */
  sage: { bg: "#f3f6f1", ink: "#2c332b", muted: "#9dab9c", noise: [0.42, 0.52, 0.4] },
  /** Platform — slate blue, the coolest of the set. */
  slate: { bg: "#eef1f5", ink: "#2f4358", muted: "#97aabd", noise: [0.4, 0.46, 0.58] },
  /** Business — warm sand, the only palette warmer than neutral. */
  sand: { bg: "#f4f2ed", ink: "#3a352b", muted: "#aca596", noise: [0.56, 0.5, 0.4] },
  /** Solutions — mineral, between the sage and the slate. */
  mineral: { bg: "#eef4f4", ink: "#283a3a", muted: "#93abab", noise: [0.38, 0.52, 0.53] },
  /** Case studies — muted stone with a lilac cast. */
  stone: { bg: "#f3f2f6", ink: "#332f3a", muted: "#a39dae", noise: [0.48, 0.44, 0.56] },
} satisfies Record<string, Palette>;

export type PageTintName = keyof typeof PALETTES;

/** Same tile as the default in globals.css, with the hue swapped in. */
function noiseUrl([r, g, b]: [number, number, number]) {
  const matrix = `0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 0.5 0`;
  return (
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E" +
    "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E" +
    `%3CfeColorMatrix type='matrix' values='${matrix}'/%3E` +
    "%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")"
  );
}

/**
 * Emits a :root override. Rendered inside the page rather than set as a class
 * on <html>, because the root element belongs to the shared layout and only
 * one page is mounted at a time.
 */
export function PageTint({ palette }: { palette: PageTintName }) {
  const { bg, ink, muted, noise } = PALETTES[palette];
  return (
    <style>{
      `:root{--page-bg:${bg};--ink-heading:${ink};--heading-muted:${muted};` +
      `--page-noise:${noiseUrl(noise)};}`
    }</style>
  );
}
