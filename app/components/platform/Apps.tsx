import { SectionGuides } from "@/components/primitives/SectionGuides";
import { MediaCard, MediaCardStyles } from "@/components/MediaCard";

/**
 * Apps.
 *
 * The content spec lists five app names and nothing else, so these cards carry
 * the name alone rather than a fabricated one-liner each. The footage does the
 * differentiating instead of invented copy.
 */
/* All five carry footage. An app added before its capture still renders: the
   shared card falls back to the flat fill and drops the arrow. */
/* Each card links to its app. `href` is optional so an app can be listed
   before its page exists; without one the card renders as a plain div and
   drops the arrow, rather than showing an affordance that goes nowhere. */
const IA_APPS = "https://www.imagine.art/apps";

const APPS: { name: string; video?: string; href?: string }[] = [
  { name: "Outfit Tryon", video: "/media/apps/outfit-tryon.mp4", href: `${IA_APPS}/studio-tryon-male` },
  { name: "Variate", video: "/media/apps/variate.mp4", href: `${IA_APPS}/variate` },
  { name: "Video Reframe", video: "/media/apps/reframe-presets.mp4", href: `${IA_APPS}/video-reframe` },
  { name: "Topaz Video Upscale", video: "/media/apps/upscale.mp4", href: `${IA_APPS}/video-upscaler` },
  { name: "Sketch to Render", video: "/media/apps/sketch-render.mp4", href: `${IA_APPS}/sketch-to-render` },
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
          {APPS.map((a, i) => (
            <MediaCard
              key={a.name}
              href={a.href}
              video={a.video}
              title={a.name}
              /* Height, not a ratio: the two rows run at different widths, so
                 a shared ratio would make the wide pair enormous. Passed as a
                 custom property because the inline style the card sets would
                 otherwise outrank the media query below. */
              height="var(--app-card-h)"
              fill="#1c1d1a"
              eager={i < 3}
            />
          ))}
        </div>
      </div>

      <MediaCardStyles />

      <style>{`
        /* Two rows over six columns: three cards spanning two each, then two
           spanning three. Both rows fill exactly, and the cards are half again
           as wide as the old single row of five. */
        .apps-row {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }
        .apps-row > :nth-child(-n+3) { grid-column: span 2; }
        .apps-row > :nth-child(n+4) { grid-column: span 3; }
        /* Name and lens share the baseline row rather than stacking, so the
           card's copy reads as a label with an affordance beside it. */
        /* Footage sits behind the card's own copy but above the palette fill,
           which stays underneath so nothing flashes before the video paints.
           the card's own fill, hence -1 / -2 here. */
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

        /* Read by MediaCard via height="var(--app-card-h)". */
        .apps-row { --app-card-h: clamp(300px, 30vw, 420px); }
        @media (max-width: 1000px) {
          .apps-row { grid-template-columns: repeat(2, 1fr); }
          .apps-row > :nth-child(-n+3),
          .apps-row > :nth-child(n+4) { grid-column: span 1; }
          .apps-row { --app-card-h: clamp(240px, 40vw, 320px); }
        }
        @media (max-width: 620px) {
          .apps-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .apps-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
