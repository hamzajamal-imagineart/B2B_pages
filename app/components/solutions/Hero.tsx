import { BannerHero } from "@/components/BannerHero";
import { CONTACT_HREF } from "../enterprise/ClosingCta";

/**
 * Solutions hero — the shared banner composition, no eyebrow.
 *
 * The banner runs as a placeholder panel until real footage lands; only the
 * Enterprise and Workflows pages carry video heroes.
 *
 * The foot copy is the spec's verbatim keyword-bearing subtext, which is
 * longer than a hero line usually wants; it sits in the caption column rather
 * than under the heading for exactly that reason.
 */
export default function Hero() {
  return (
    <BannerHero
      title="On brand. Every asset."
      muted="Built for how business actually runs."
      titleMaxCh={18}
      grain="grain-mineral"
      primary={{ label: "Contact Sales", href: CONTACT_HREF }}
      footText="ImagineArt is one of the best AI tools for business teams that need creative at scale, the speed, structure, and control to ship campaign-ready assets up to 90% faster and 75% more cost-effective. Humans and AI, built around how your operation actually works."
      footLink={{ label: "Find your industry →", href: "#industries" }}
    />
  );
}
