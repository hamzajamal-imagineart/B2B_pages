import { SectionGuides } from "@/components/primitives/SectionGuides";
import { ButtonLink } from "@/components/Button";
import { withBasePath } from "@/lib/assets";

const CTA_HREF = "https://www.imagine.art/business/enterprise/contact-us";

export default function ClosingCta() {
  return (
    <section
      className="cta-section relative border-t border-black/[0.08] py-28 md:py-36 lg:border-t-0"
      style={{
        ["--cta-bg" as string]: `url(${withBasePath("/media/cta-fog-grass.jpg")})`,
      }}
    >
      <SectionGuides edge="top" />
      <div className="container-page relative z-10 text-center">
        <h2 className="h2 mx-auto max-w-[18ch]">
          Bring your whole team{" "}
          <span className="h-muted">into one creative platform</span>
        </h2>
        <p className="lede mx-auto mt-6">
          Talk to us about rollout, security review, and what unlimited seats
          look like for an organization your size.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={CTA_HREF} variant="brand" size="lg">
            Contact Sales
          </ButtonLink>
          <ButtonLink href="/workflows" variant="ghost" size="lg">
            See Workflows
          </ButtonLink>
        </div>
      </div>

      <style>{`
        /* The photograph's own composition does the work: fog fills the top
           where the heading sits, grass masses along the bottom. Anchored to
           the bottom so the horizon lands under the copy rather than through
           it, and faded out at the top so the section boundary stays soft. */
        .cta-section::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: var(--cta-bg);
          background-repeat: no-repeat;
          background-position: center bottom;
          background-size: cover;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 38%, #000 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 38%, #000 100%);
        }
      `}</style>
    </section>
  );
}
