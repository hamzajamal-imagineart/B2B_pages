import { BannerHero } from "@/components/BannerHero";
import { CONTACT_ANCHOR } from "./ClosingCta";

/**
 * Enterprise hero — the shared banner composition.
 *
 * The footage is shared with the Solutions hero rather than duplicated: it is
 * one film, and both pages open on it. A replacement meant for only one of
 * them needs its own path.
 *
 * It replaces hero-v2.mp4, which was a screen recording of Langdock rather
 * than ImagineArt — app.langdock.com in the URL bar, their wordmark in the
 * sidebar. That file is now unreferenced; do not wire it back in.
 */
export default function Hero() {
  return (
    <BannerHero
      eyebrow="ImagineArt Enterprise"
      title="Create at the speed"
      muted="of your ambition"
      titleMaxCh={16}
      video="/media/hero-enterprise.mp4"
      grain="grain-sage"
      primary={{ label: "Contact Sales", href: CONTACT_ANCHOR }}
      footText="The enterprise AI creative platform that turns ideas into production-ready images and video, securely, at scale, and without limits on who gets to create."
      footLink={{ label: "See how workflows work →", href: "/workflows" }}
    />
  );
}
