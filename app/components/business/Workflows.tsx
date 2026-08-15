import { SectionGuides } from "@/components/primitives/SectionGuides";
import { AdminBento } from "@/components/AdminBento";
import { withBasePath } from "@/lib/assets";

/**
 * Workflows + the four-panel Z-fold.
 *
 * The spec's UX note asks for an animated node-graph (brief → image model →
 * video model → output). Rather than illustrate that as a diagram, this runs
 * the real node-canvas capture — the same asset the Workflows page uses — so
 * the "signature moment" is the actual product rather than a drawing of it.
 *
 * The four panels below are AdminBento, shared with the Enterprise page.
 */
export default function Workflows() {
  return (
    <section
      id="workflows"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[680px]">
          <p className="eyebrow">Workflows</p>
          <h2 className="h2 mt-4">
            Workflows that <span className="h-muted">work for you</span>
          </h2>
          <p className="lede mt-5 max-w-[58ch]">
            Stop adapting your team to the tool. Build creative pipelines around
            how your organization actually operates, from first brief to final
            approval, all in one place.
          </p>
        </div>

        <div className="wf-banner grain grain-diagonal grain-teal mt-12">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className="wf-video"
            src={withBasePath("/media/variable-demo.mp4")}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        </div>

        <AdminBento className="mt-16 md:mt-20" />
      </div>

      <style>{`
        /* The grain palette sits underneath as the fill so nothing flashes
           before the video paints. */
        .wf-banner {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 22px;
          padding: 0;
          overflow: hidden;
        }
        .wf-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </section>
  );
}
