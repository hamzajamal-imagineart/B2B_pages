/**
 * Decorative container guide lines (ElevenLabs-style) scoped to ONE section.
 *
 * Drop this as the first child of any section you want framed, and make that
 * section `relative`. It draws faint vertical rules at the page-container
 * edges (1240px) spanning the section's height, plus a horizontal rule along
 * whichever edge the section is bordered on. Every line stops short of its
 * corner dot via a CSS mask gap — dots never touch a line, and unlike a
 * white "eraser" patch this works over any background (including colored
 * section gradients), not just solid white.
 *
 * `edge` should match the section's own border — the section keeps its
 * `border-t`/`border-b` for mobile and hides it at `lg:` where this takes
 * over, via `lg:border-t-0` / `lg:border-b-0` on the section itself.
 * Desktop only; purely decorative and non-interactive.
 */
export function SectionGuides({ edge }: { edge: "top" | "bottom" }) {
  const GAP = 10; // px of clear space on each side of a dot before the line resumes

  const vMask = `linear-gradient(to bottom, transparent 0, transparent ${GAP}px, black ${GAP}px, black calc(100% - ${GAP}px), transparent calc(100% - ${GAP}px), transparent 100%)`;
  const hMask = `linear-gradient(to right, transparent 0, transparent ${GAP}px, black ${GAP}px, black calc(100% - ${GAP}px), transparent calc(100% - ${GAP}px), transparent 100%)`;

  return (
    /* Inset by the dot's 3px radius: the corner dots are centred on this
       frame's edges, so at inset-0 their outer half fell outside the section
       and got sliced off by the section's own overflow-hidden. Insetting keeps
       every dot a full circle; the rules move in by 3px, which is invisible. */
    <div aria-hidden="true" className="hidden lg:block pointer-events-none absolute inset-[3px] z-20">
      <div className="relative mx-auto h-full w-full max-w-[1240px]">
        {/* Vertical rules — gapped at both ends so they stop short of every dot */}
        <span
          className="absolute left-0 top-0 bottom-0 w-px bg-border-primary"
          style={{ WebkitMaskImage: vMask, maskImage: vMask }}
        />
        <span
          className="absolute right-0 top-0 bottom-0 w-px bg-border-primary"
          style={{ WebkitMaskImage: vMask, maskImage: vMask }}
        />

        {/* Horizontal rule on the section's bordered edge — gapped at both ends */}
        <span
          className={`absolute left-0 right-0 h-px bg-border-primary ${edge === "top" ? "top-0" : "bottom-0"}`}
          style={{ WebkitMaskImage: hMask, maskImage: hMask }}
        />

        {/* Corner dots */}
        <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-content-primary" />
        <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-content-primary" />
        <span className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 w-[6px] h-[6px] rounded-full bg-content-primary" />
        <span className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[6px] h-[6px] rounded-full bg-content-primary" />
      </div>
    </div>
  );
}
