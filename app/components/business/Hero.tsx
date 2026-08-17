import { BannerHero } from "@/components/BannerHero";
import { CONTACT_HREF } from "../enterprise/ClosingCta";

/**
 * Business hero — the shared banner composition.
 *
 * The banner runs as a placeholder panel until real footage lands. Only the
 * Enterprise and Workflows pages carry video heroes; passing a `video` here
 * is the whole change when a clip is ready.
 */
export default function Hero() {
  return (
    <BannerHero
      eyebrow="ImagineArt for Business"
      title="On brand. Every asset."
      muted="At enterprise scale."
      titleMaxCh={17}
      grain="grain-sand"
      primary={{ label: "Contact Sales", href: CONTACT_HREF }}
      footText="ImagineArt gives your creative team the speed, structure, and control to ship campaign-ready assets. Humans and AI, built around how your operation actually runs."
      footLink={{ label: "See how workflows work →", href: "#workflows" }}
    />
  );
}
