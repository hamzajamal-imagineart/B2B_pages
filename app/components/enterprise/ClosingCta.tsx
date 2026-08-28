import { SectionGuides } from "@/components/primitives/SectionGuides";
import { ButtonLink } from "@/components/Button";
import { withBasePath } from "@/lib/assets";

/**
 * Contact destinations.
 *
 * The form is a section on this site now, not an off-site page. Two shapes:
 *
 * - CONTACT_ANCHOR — same-page scroll, for the two pages that render a form of
 *   their own (Enterprise and Solutions).
 * - CONTACT_HREF — the Enterprise page's form, for every other page. Opened in
 *   a new tab so a reader on a case study or the workflows page does not lose
 *   their place; pass CONTACT_TARGET alongside it.
 */
const CONTACT_ANCHOR = "#contact";
const CONTACT_HREF = "/#contact";
const CONTACT_TARGET = { target: "_blank", rel: "noopener noreferrer" } as const;
const START_HREF = "https://www.imagine.art";

type Cta = { label: string; href: string; target?: string; rel?: string };

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
  primary = { label: "Contact Sales", href: CONTACT_HREF, ...CONTACT_TARGET },
  secondary = { label: "See Workflows", href: "/workflows" },
  backdrop = "/media/cta-fog-grass.jpg",
}: {
  title?: string;
  /** Second clause, rendered with the clipped-image fill. */
  muted?: string;
  /** Pass null where the spec's closing copy is the heading alone. */
  lede?: string | null;
  primary?: Cta;
  secondary?: Cta;
  /** Photograph behind the band. Pass one matching the page's palette — the
   *  default fog/grass is cool green, which fights the warmer routes. */
  backdrop?: string;
} = {}) {
  return (
    <section
      className="cta-section relative border-t border-black/[0.08] py-28 md:py-36 lg:border-t-0"
      style={{
        ["--cta-bg" as string]: `url(${withBasePath(backdrop)})`,
      }}
    >
      <SectionGuides edge="top" />
      <div className="container-page relative z-10 text-center">
        <h2 className="h2 mx-auto max-w-[18ch]">
          {title} <span className="h-muted">{muted}</span>
        </h2>
        {lede && <p className="lede mx-auto mt-6">{lede}</p>}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={primary.href} target={primary.target} rel={primary.rel} variant="brand" size="lg">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} target={secondary.target} rel={secondary.rel} variant="ghost" size="lg">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>

      <style>{`
        /* Legibility scrim, between the photograph and the copy.
           z-index 1 puts it above ::after (0) and below the content (10), and
           keeping it a separate layer means the photo's top-fade mask doesn't
           also eat the scrim.

           A soft radial centred on the copy block rather than a flat wash: the
           text stays readable while the photograph is left untouched at the
           edges. Sized off the page wash so the covered area reads as the page
           itself, not as a panel laid over it. Needed once a backdrop has
           detail behind the text — the muted heading clause is a light tint by
           design and vanished over the reeded glass. */
        .cta-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            58% 52% at 50% 40%,
            color-mix(in srgb, var(--page-bg) 94%, transparent) 0%,
            color-mix(in srgb, var(--page-bg) 74%, transparent) 46%,
            transparent 76%
          );
        }

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

export { CONTACT_HREF, CONTACT_ANCHOR, CONTACT_TARGET, START_HREF };
