import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * Apps.
 *
 * The content spec lists five app names and nothing else, so these cards carry
 * the name alone rather than a fabricated one-liner each. The grain palettes
 * do the differentiating instead of invented copy.
 */
/* `light` selects the denser lens fill — the default .glass disappears into a
   pale palette, same reason Security's tile graphics carry .glass-on-light. */
const APPS = [
  { name: "Outfit Tryon", grain: "grain-mineral", light: true },
  { name: "Variate", grain: "grain-sand", light: true },
  { name: "Video Reframe", grain: "grain-olive" },
  { name: "Topaz Video Upscale", grain: "grain-steel" },
  { name: "Sketch to Render", grain: "grain-teal" },
];

export default function Apps() {
  return (
    <section
      id="apps"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[640px]">
          <p className="eyebrow">Apps</p>
          <h2 className="h2 mt-4">
            Apps for <span className="h-muted">everything</span>
          </h2>
          <p className="lede mt-5">
            Apps are an ever-growing collection of use-case-specific tools
            designed to make it easier than ever to get to great outputs.
          </p>
        </div>

        <div className="apps-row mt-14">
          {APPS.map((a) => (
            <div key={a.name} className={`app-card grain ${a.grain}`}>
              <span className="app-name">{a.name}</span>
              <span
                className={`app-arrow glass ${a.light ? "glass-on-light" : ""}`}
                aria-hidden
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .apps-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        /* Name and lens share the baseline row rather than stacking, so the
           card's copy reads as a label with an affordance beside it. */
        .app-card {
          border-radius: 20px;
          padding: 22px;
          aspect-ratio: 4 / 5;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .app-name {
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          font-weight: 500;
          color: currentColor;
          max-width: 11ch;
        }
        .app-arrow {
          width: 32px; height: 32px;
          border-radius: 999px;
          display: grid; place-items: center;
          color: currentColor;
          flex: 0 0 auto;
        }
        @media (max-width: 1000px) {
          .apps-row { grid-template-columns: repeat(3, 1fr); }
          .app-card { aspect-ratio: 5 / 4; }
        }
        @media (max-width: 600px) {
          .apps-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
