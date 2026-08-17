import { BannerHero } from "@/components/BannerHero";
import { CONTACT_HREF } from "./ClosingCta";

/**
 * Enterprise hero — the shared banner composition.
 *
 * ⚠ hero-v2.mp4 is a screen recording of Langdock, not ImagineArt: the URL bar
 * reads app.langdock.com and the sidebar carries their wordmark. Langdock was
 * one of the design references for this redesign and its capture appears to
 * have been used as the asset by mistake. Replace before launch —
 * HANDOFF §6 item 7.
 */
export default function Hero() {
  return (
    <BannerHero
      eyebrow="ImagineArt Enterprise"
      title="Create at the speed"
      muted="of your ambition"
      titleMaxCh={16}
      video="/media/hero-v2.mp4"
      grain="grain-sage"
      primary={{ label: "Contact Sales", href: CONTACT_HREF }}
      footText="The enterprise AI creative platform that turns ideas into production-ready images and video, securely, at scale, and without limits on who gets to create."
      footLink={{ label: "See how workflows work →", href: "/workflows" }}
    />
  );
}
