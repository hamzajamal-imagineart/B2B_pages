/**
 * Subtle decorative texture for a section background. Renders an absolutely
 * positioned, non-interactive overlay — the parent section must be `relative`
 * and its real content should sit in a `relative z-10` wrapper so it stays
 * above the pattern.
 *
 * `dots`     — faint monochrome dot grid (default)
 * `grid`     — faint monochrome line grid (graph-paper)
 * `diagonal` — irregular 45° hatch (three coprime line spacings layered so it
 *              reads as random rather than a uniform screen)
 *
 * A top/bottom mask fades the texture where sections meet so it never reads
 * as a hard band.
 */
type Variant = "dots" | "grid" | "diagonal";

const PATTERNS: Record<Variant, { backgroundImage: string; backgroundSize: string }> = {
  dots: {
    backgroundImage: "radial-gradient(rgba(23,23,23,0.14) 1.4px, transparent 1.6px)",
    backgroundSize: "24px 24px",
  },
  grid: {
    backgroundImage:
      "linear-gradient(rgba(23,23,23,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.09) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
  },
  diagonal: {
    backgroundImage:
      "repeating-linear-gradient(45deg, rgba(23,23,23,0.03) 0, rgba(23,23,23,0.03) 1px, transparent 1px, transparent 11px), " +
      "repeating-linear-gradient(45deg, rgba(23,23,23,0.022) 0, rgba(23,23,23,0.022) 1px, transparent 1px, transparent 27px), " +
      "repeating-linear-gradient(45deg, rgba(23,23,23,0.018) 0, rgba(23,23,23,0.018) 1px, transparent 1px, transparent 44px)",
    backgroundSize: "auto",
  },
};

export function SectionPattern({
  variant = "dots",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const p = PATTERNS[variant];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        ...p,
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
      }}
    />
  );
}
