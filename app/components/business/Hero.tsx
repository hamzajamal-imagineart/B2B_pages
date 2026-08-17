import { BannerHero } from "@/components/BannerHero";
import { CONTACT_HREF } from "../enterprise/ClosingCta";

/**
 * Business hero — the shared banner composition.
 *
 * The spec originally asked for a dark full-bleed video with left-aligned
 * copy; this now matches Enterprise and Solutions instead, so the three
 * top-level pages open on the same shape.
 *
 * Runs variable-demo.mp4, the real node-canvas capture. It also appears in
 * this page's own Workflows section further down — the only alternative was
 * card-generate.mp4, which is already the Solutions hero, and two identical
 * heroes read worse than one repeat within a page. See HANDOFF §6 item 7.
 */
export default function Hero() {
  return (
    <BannerHero
      eyebrow="ImagineArt for Business"
      title="On brand. Every asset."
      muted="At enterprise scale."
      titleMaxCh={17}
      video="/media/variable-demo.mp4"
      grain="grain-sand"
      primary={{ label: "Contact Sales", href: CONTACT_HREF }}
      footText="ImagineArt gives your creative team the speed, structure, and control to ship campaign-ready assets. Humans and AI, built around how your operation actually runs."
      footLink={{ label: "See how workflows work →", href: "#workflows" }}
    />
  );
}
