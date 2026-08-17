/**
 * Per-route page tint.
 *
 * The page grain (`body::before`, globals.css) is a flat wash plus a noise
 * tile. Both are custom properties, so a route only has to redeclare two
 * values to carry its own colour. Each page gets a distinct hue so the set
 * reads as one family rather than one page repeated.
 *
 * Values are deliberately near-white — these should register as a temperature
 * shift, not as a coloured background. The wash sits under a 0.5 opacity, so
 * the effective difference from #ffffff is a couple of percent.
 *
 * Workflows is excluded: it paints its own near-black over the whole page, so
 * this layer never shows there.
 */
type Palette = { tint: string; noise: [number, number, number] };

const PALETTES = {
  /** Enterprise — the original sage green. Unchanged. */
  sage: { tint: "#f7f9f6", noise: [0.42, 0.52, 0.4] },
  /** Platform — cool slate, a step bluer than the sage. */
  slate: { tint: "#f6f8fb", noise: [0.4, 0.46, 0.58] },
  /** Business — warm sand, the only palette warmer than neutral. */
  sand: { tint: "#faf8f4", noise: [0.56, 0.5, 0.4] },
  /** Solutions — mineral, sitting between the sage and the slate. */
  mineral: { tint: "#f5f9f9", noise: [0.38, 0.52, 0.53] },
  /** Case studies — muted stone with a lilac cast. */
  stone: { tint: "#f8f7fa", noise: [0.48, 0.44, 0.56] },
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
  const { tint, noise } = PALETTES[palette];
  return (
    <style>{`:root{--page-tint:${tint};--page-noise:${noiseUrl(noise)};}`}</style>
  );
}
