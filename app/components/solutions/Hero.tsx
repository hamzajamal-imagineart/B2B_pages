import { ButtonLink } from "@/components/Button";
import { withBasePath } from "@/lib/assets";
import { CONTACT_HREF, START_HREF } from "../enterprise/ClosingCta";

/**
 * Full-bleed hero with a darkened overlay and left-aligned copy.
 *
 * Deliberately the same treatment as the Business hero: this is the SEO
 * sibling of that page, so a different hero shape would read as a different
 * product rather than a different entry point. As there, the spec asks for
 * looping video and there is no clean product capture to run (HANDOFF §6
 * item 7), so the fog/grass still carries it.
 *
 * The subtext is the spec's verbatim keyword-bearing copy — longer than a
 * hero line usually wants, which is why the measure is wider here than on
 * Business and the type a step smaller.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="sol-hero"
      style={{
        ["--hero-bg" as string]: `url(${withBasePath("/media/cta-fog-grass.jpg")})`,
      }}
    >
      <div className="container-page sol-hero-inner">
        <h1 className="display sol-hero-h1">
          On brand. Every asset.
          <br />
          Built for how business actually runs.
        </h1>

        <p className="sol-hero-sub mt-6">
          ImagineArt is one of the best AI tools for business teams that need
          creative at scale, the speed, structure, and control to ship
          campaign-ready assets up to 90% faster and 75% more cost-effective.
          Humans and AI, built around how your operation actually works.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href={CONTACT_HREF} variant="white" size="lg">
            Contact Sales
          </ButtonLink>
          <ButtonLink href={START_HREF} size="lg" className="sol-hero-ghost">
            Get Started
          </ButtonLink>
        </div>
      </div>

      <style>{`
        .sol-hero {
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
        /* Heavier at the bottom-left where the copy sits, so the photograph
           stays readable top-right rather than being flattened by an even
           scrim. */
        .sol-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(to top, rgba(8, 11, 9, 0.9) 0%, rgba(8, 11, 9, 0.56) 48%, rgba(8, 11, 9, 0.34) 100%),
            linear-gradient(to right, rgba(8, 11, 9, 0.52) 0%, transparent 66%);
        }

        .sol-hero-inner { width: 100%; }
        .sol-hero-h1 {
          color: #fff;
          font-size: clamp(32px, 4.8vw, 60px);
          max-width: 20ch;
          text-wrap: initial;
        }
        .sol-hero-sub {
          max-width: 64ch;
          font-size: clamp(14.5px, 1.3vw, 17px);
          line-height: 1.62;
          color: rgba(255, 255, 255, 0.74);
        }

        /* Light-outline secondary — Button's "ghost" is dark-on-light and
           disappears here. */
        .sol-hero-ghost {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.42);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .sol-hero-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </section>
  );
}
