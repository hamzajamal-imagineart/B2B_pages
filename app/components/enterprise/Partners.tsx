import { SectionGuides } from "@/components/primitives/SectionGuides";
import { withBasePath } from "@/lib/assets";

/**
 * Partner marks.
 *
 * The supplied SVGs are single-colour black paths, so they're painted via
 * CSS mask + background rather than <img>: the mask takes the glyph's alpha
 * and the background supplies the colour. That's what lets a flat file carry
 * a gradient (Kling) as well as a solid.
 *
 * Real brand marks are the one sanctioned exception to the monochrome rule
 * (Guidelines §2), so these keep their own colours.
 *
 * `paint` values are set from the colour references supplied for MiniMax and
 * Kling; ByteDance uses its brand blue and Grok's mark is genuinely
 * monochrome black. Wan and fal have no asset yet and fall back to a
 * wordmark — drop a file in and add `logo`/`paint` to light them up.
 */
type Brand = { name: string; logo?: string; paint?: string };

const BRANDS: Brand[] = [
  { name: "ByteDance", logo: "/media/partners/bytedance.svg", paint: "#325AB4" },
  { name: "Kling AI", logo: "/media/partners/kling.svg", paint: "linear-gradient(135deg, #6D4AE0 0%, #8B5CF6 55%, #A78BFA 100%)" },
  { name: "MINIMAX", logo: "/media/partners/minimax.svg", paint: "#EB0045" },
  { name: "Wan", logo: "/media/partners/wan.png" },
  { name: "fal", logo: "/media/partners/fal.png" },
  { name: "Grok", logo: "/media/partners/grok.svg", paint: "#0A0A0A" },
];

export default function Partners() {
  return (
    <section className="relative border-t border-black/[0.08] py-16 md:py-20 lg:border-t-0">
      <SectionGuides edge="top" />
      <div className="container-page">
        <p className="text-center text-[13px] font-medium tracking-[-0.01em] text-[var(--ink-3)]">
          Trusted by the brands you benchmark against
        </p>

        <div className="logo-row mt-8">
          {BRANDS.map((b) => (
            <span key={b.name} className="partner">
              {b.logo && !b.paint ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={withBasePath(b.logo)} alt="" aria-hidden className="partner-img" />
              ) : b.logo ? (
                <span
                  aria-hidden
                  className="partner-logo"
                  style={{
                    ["--logo" as string]: `url(${withBasePath(b.logo)})`,
                    background: b.paint,
                  }}
                />
              ) : null}
              <span className="partner-name">{b.name}</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .partner {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .partner-name {
          font-size: clamp(15px, 1.3vw, 18px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--ink);
          white-space: nowrap;
        }
        .partner-img {
          display: block;
          width: clamp(22px, 2.1vw, 27px);
          height: clamp(22px, 2.1vw, 27px);
          flex: 0 0 auto;
          object-fit: contain;
        }
        .partner-logo {
          display: block;
          width: clamp(22px, 2.1vw, 27px);
          height: clamp(22px, 2.1vw, 27px);
          flex: 0 0 auto;
          -webkit-mask-image: var(--logo);
          mask-image: var(--logo);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-size: contain;
          mask-size: contain;
        }
      `}</style>
    </section>
  );
}
