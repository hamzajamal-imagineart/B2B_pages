import { ButtonLink } from "@/components/Button";
import { withBasePath } from "@/lib/assets";
import { CONTACT_HREF, START_HREF } from "../enterprise/ClosingCta";

/**
 * Full-bleed hero with a darkened overlay and left-aligned copy, per the spec.
 *
 * The spec asks for looping video; there is no clean product capture to run
 * here (hero-v2.mp4 is a Langdock recording — see HANDOFF §6), so the fog/grass
 * still carries it instead. Swapping in a <video> later is a drop-in: the
 * overlay and copy layer don't depend on which media sits underneath.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="biz-hero"
      style={{
        ["--hero-bg" as string]: `url(${withBasePath("/media/cta-fog-grass.jpg")})`,
      }}
    >
      <div className="container-page biz-hero-inner">
        <h1 className="display biz-hero-h1">
          On brand. Every asset.
          <br />
          At enterprise scale.
        </h1>

        <p className="biz-hero-sub mt-6">
          ImagineArt gives your creative team the speed, structure, and control
          to ship campaign-ready assets. Humans and AI, built around how your
          operation actually runs.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href={CONTACT_HREF} variant="white" size="lg">
            Contact Sales
          </ButtonLink>
          <ButtonLink href={START_HREF} size="lg" className="biz-hero-ghost">
            Get Started
          </ButtonLink>
        </div>
      </div>

      <style>{`
        /* Full-bleed: the section escapes .container-page's max width and runs
           edge to edge, with only the copy held to the page container. */
        .biz-hero {
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: flex-end;
          min-height: min(88vh, 860px);
          padding-top: clamp(160px, 20vh, 240px);
          padding-bottom: clamp(56px, 8vh, 104px);
          background-color: #10130f;
          background-image: var(--hero-bg);
          background-size: cover;
          background-position: center 62%;
          background-repeat: no-repeat;
        }
        /* Darkening layer. Heavier at the bottom-left where the copy sits, so
           the photograph stays readable in the top-right rather than being
           flattened by an even scrim. */
        .biz-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(to top, rgba(8, 11, 9, 0.88) 0%, rgba(8, 11, 9, 0.52) 46%, rgba(8, 11, 9, 0.34) 100%),
            linear-gradient(to right, rgba(8, 11, 9, 0.5) 0%, transparent 62%);
        }

        .biz-hero-inner { width: 100%; }
        .biz-hero-h1 {
          color: #fff;
          font-size: clamp(34px, 5.4vw, 68px);
          max-width: 18ch;
          text-wrap: initial;
        }
        .biz-hero-sub {
          max-width: 54ch;
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.76);
        }

        /* Light-outline secondary — Button's "ghost" is dark-on-light and
           disappears here. */
        .biz-hero-ghost {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.42);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .biz-hero-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </section>
  );
}
