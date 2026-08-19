import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactForm } from "@/components/ContactForm";
import { NAV_VARIANT } from "@/lib/theme";
import Hero from "./components/enterprise/Hero";
import Partners from "./components/enterprise/Partners";
import Security from "./components/enterprise/Security";
import Control from "./components/enterprise/Control";
import ClosingCta from "./components/enterprise/ClosingCta";

// SEO. Kept in sync with layout.tsx's metadata.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ImagineArt Enterprise",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

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
        <Partners caption="Partnering with global industry leaders to power your creativity output" />
        <Control />
        <ContactForm />
        <Security />
        <TestimonialsSection />
        <ClosingCta backdrop="/media/cta-hills.jpg" />
      </main>

      <SiteFooter />
    </>
  );
}
