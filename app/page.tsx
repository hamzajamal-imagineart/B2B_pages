import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactForm } from "@/components/ContactForm";
import { IndustriesSection } from "@/components/IndustriesSection";
import WorkflowsSection from "@/components/WorkflowsSection";
import { NAV_VARIANT } from "@/lib/theme";

import Hero from "./components/enterprise/Hero";
import Partners from "./components/enterprise/Partners";
import Security from "./components/enterprise/Security";
import ClosingCta, { CONTACT_HREF, START_HREF } from "./components/enterprise/ClosingCta";

// Sections that arrived with the Business page when the two merged.
import Pitch from "./components/business/Pitch";
import CaseStudies from "./components/business/CaseStudies";
import Suite, { BUSINESS_TOOLS } from "./components/platform/Suite";
import Models from "./components/platform/Models";
import Apps from "./components/platform/Apps";

// SEO. Kept in sync with layout.tsx's metadata.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ImagineArt Enterprise",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

/**
 * Enterprise, now carrying the Business page as well.
 *
 * The two pages shared five sections outright and their heroes and closing
 * bands differed only by props, so they were two routes telling one story.
 * This is the union: Enterprise's platform rail and testimonials, Business's
 * pitch, industries, tools, models, apps and proof. `/business` redirects here
 * (see next.config.ts).
 *
 * Order follows the Business spec's funnel, with two exceptions: the platform
 * rail sits before the tool grid, since it introduces what the grid then
 * enumerates, and the contact form stays directly under the rail where it was
 * placed deliberately.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <PageTint palette="sage" />

      {/* Nav variant stays in lockstep with the hero behind it — see lib/theme.ts */}
      <SiteNav variant={NAV_VARIANT} />

      <main>
        <Hero />
        <Partners caption="Partnering with global industry leaders to power your creative output" />
        <Pitch />
        <ContactForm />
        <IndustriesSection />
        <Suite tools={BUSINESS_TOOLS} />
        <WorkflowsSection />
        <Security />
        <Models />
        <Apps />
        <CaseStudies />
        <TestimonialsSection />
        <ClosingCta
          title="A creative suite that scales"
          muted="with your business."
          lede="From your first asset to your thousandth campaign, ImagineArt grows with your team."
          primary={{ label: "Get Started", href: START_HREF }}
          secondary={{ label: "Contact Sales", href: CONTACT_HREF }}
          backdrop="/media/cta-hills.jpg"
        />
      </main>

      <SiteFooter />
    </>
  );
}
