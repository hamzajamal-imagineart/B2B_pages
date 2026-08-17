import { SectionGuides } from "@/components/primitives/SectionGuides";
import { withBasePath } from "@/lib/assets";

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
  { name: "Outfit Tryon", grain: "grain-mineral", video: "/media/apps/outfit-tryon.mp4" },
  { name: "Variate", grain: "grain-sand", light: true },
  { name: "Video Reframe", grain: "grain-olive", video: "/media/apps/video-reframe.mp4" },
  { name: "Topaz Video Upscale", grain: "grain-steel", video: "/media/apps/upscale.mp4" },
  { name: "Sketch to Render", grain: "grain-teal", video: "/media/apps/sketch-to-render.mp4" },
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
            <div
              key={a.name}
              className={`app-card grain ${a.grain} ${a.video ? "app-has-video" : ""}`}
            >
              {a.video && (
                <>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    className="app-video"
                    src={withBasePath(a.video)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden
                  />
                  <span className="app-scrim" aria-hidden />
                </>
              )}
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
        /* Footage sits behind the card's own copy but above the palette fill,
           which stays underneath so nothing flashes before the video paints.
           .grain's noise tile is z-index 0, hence -1 / -2 here. */
        .app-video {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .app-scrim {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(to top, rgba(8,11,9,0.82) 0%, rgba(8,11,9,0.4) 52%, rgba(8,11,9,0.16) 100%);
        }
        /* A card with footage carries its own copy colour, since the scrim
           underneath is dark whatever the palette is. */
        .app-has-video { color: #fff; }

        .app-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
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
