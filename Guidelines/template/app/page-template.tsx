/**
 * PAGE TEMPLATE — copy to src/app/page.tsx and fill in.
 *
 * This is the canonical section order. Every section below is optional except
 * SiteNav / Hero / CTA / SiteFooter; delete what the page does not need rather
 * than leaving an empty shell.
 *
 * Anchors sit ABOVE each section so the fixed nav (~80px) does not cover the
 * scroll target. Keep the ids in sync with SiteNav's links.
 *
 * TODO markers show every spot that needs page-specific content.
 */

import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NAV_VARIANT } from "@/lib/theme";

// TODO: your own sections. See GUIDELINES.md §6 before picking a layout —
// the pattern should follow the content, not the other way round.
// import { HeroSection } from "@/components/HeroSection";
// import { FeatureBentoSection } from "@/components/FeatureBentoSection";
// import { CtaBannerSection } from "@/components/CtaBannerSection";

/** Offset anchor so the fixed nav doesn't overlap the scroll target. */
function Anchor({ id }: { id: string }) {
  return <div id={id} style={{ scrollMarginTop: 80 }} />;
}

// ─── SEO ──────────────────────────────────────────────────────
// TODO: fill in. Keep it in sync with layout.tsx's metadata.
// The FAQ section emits its own FAQPage JSON-LD — don't duplicate it here.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TODO: product name",
  applicationCategory: "TODO",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Nav variant stays in lockstep with the hero behind it — see lib/theme.ts */}
      <SiteNav variant={NAV_VARIANT} />

      <main>
        {/* ── Hero ──────────────────────────────────────────────
            TODO. Build it in its own component. Non-negotiables:
              • h-[90vh] (or 94/100) with min-h-[640px] so centred content
                cannot be clipped by overflow-hidden on a short window
              • className={`hero-bg ${HERO_SURFACE_CLASS} …`} so the theme
                switch reaches it
              • --hero-photo set inline via withBasePath() — a bare url() in
                CSS is NOT basePath-prefixed by Next and will 404 on deploy
        */}

        {/* ── Content sections ──────────────────────────────────
            TODO. Anchor + section, repeated. Example:

            <Anchor id="features" />
            <FeatureBentoSection />
        */}

        <TestimonialsSection />

        <Anchor id="faq" />
        <FAQSection />

        {/* ── Closing CTA ───────────────────────────────────────
            TODO. Keep it un-boxed: white section, one hairline top rule,
            centred copy, one action. A bordered card with its own gradient
            reads as a banner pasted onto the page.
        */}
      </main>

      <SiteFooter />
    </>
  );
}
