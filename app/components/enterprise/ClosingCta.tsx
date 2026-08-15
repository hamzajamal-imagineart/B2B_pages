import { SectionGuides } from "@/components/primitives/SectionGuides";
import { ButtonLink } from "@/components/Button";
import { withBasePath } from "@/lib/assets";

const CONTACT_HREF = "https://www.imagine.art/business/enterprise/contact-us";
const START_HREF = "https://www.imagine.art";

type Cta = { label: string; href: string };

/**
 * Closing CTA band, shared across the Enterprise, Platform and Business pages.
 *
 * Copy and buttons are props because the Business spec closes on a different
 * line and flips the CTA order (Get Started primary, Contact Sales secondary);
 * the defaults are the Enterprise/Platform wording.
 */
export default function ClosingCta({
  title = "Bring your whole team",
  muted = "into one creative platform",
  lede = "Talk to us about rollout, security review, and what unlimited seats look like for an organization your size.",
  primary = { label: "Contact Sales", href: CONTACT_HREF },
  secondary = { label: "See Workflows", href: "/workflows" },
}: {
  title?: string;
  /** Second clause, rendered with the clipped-image fill. */
  muted?: string;
  /** Pass null where the spec's closing copy is the heading alone. */
  lede?: string | null;
  primary?: Cta;
  secondary?: Cta;
} = {}) {
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
          {title} <span className="h-muted">{muted}</span>
        </h2>
        {lede && <p className="lede mx-auto mt-6">{lede}</p>}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={primary.href} variant="brand" size="lg">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="ghost" size="lg">
            {secondary.label}
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

export { CONTACT_HREF, START_HREF };
