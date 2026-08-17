import { BannerHero } from "@/components/BannerHero";
import { CONTACT_HREF } from "../enterprise/ClosingCta";

/**
 * Solutions hero — the shared banner composition, no eyebrow.
 *
 * Runs card-generate.mp4, a genuine ImagineArt capture (prompt box through to
 * a generated asset, 11.7s), rather than the Enterprise hero's hero-v2.mp4 —
 * that file is a Langdock screen recording. See HANDOFF §6 item 7.
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
      video="/media/card-generate.mp4"
      grain="grain-mineral"
      primary={{ label: "Contact Sales", href: CONTACT_HREF }}
      footText="ImagineArt is one of the best AI tools for business teams that need creative at scale, the speed, structure, and control to ship campaign-ready assets up to 90% faster and 75% more cost-effective. Humans and AI, built around how your operation actually works."
      footLink={{ label: "Find your industry →", href: "#industries" }}
    />
  );
}
