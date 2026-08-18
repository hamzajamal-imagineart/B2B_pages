/**
 * Stand-in for imagery this page has not been given yet.
 *
 * It replaces the picsum.photos calls the clone shipped with. Random external
 * stock read as finished work while quietly making every page load depend on a
 * third party, and none of those images were ever ImagineArt output. A flat
 * surface is honest about the gap and costs no request, which is the same
 * choice AdminBento's white panels make on the light pages.
 *
 * Fills its positioned parent, so it drops straight into the slots the old
 * <img> occupied without touching any surrounding layout.
 */
export function MediaPlaceholder({
  tone = "dark",
  label,
}: {
  /** Match the surface it sits on: the templates rail is a light section. */
  tone?: "dark" | "light";
  /** Announced to assistive tech in place of the old alt text. */
  label?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        position: "absolute",
        inset: 0,
        display: "block",
        background: dark
          ? "linear-gradient(160deg, #1b1b21 0%, #131318 100%)"
          : "linear-gradient(160deg, #f4f4f6 0%, #eaeaee 100%)",
        boxShadow: dark
          ? "inset 0 0 0 1px rgba(255,255,255,0.05)"
          : "inset 0 0 0 1px rgba(10,10,11,0.05)",
      }}
    />
  );
}
