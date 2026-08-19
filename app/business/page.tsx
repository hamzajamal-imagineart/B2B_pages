import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";

import { navVariantFor } from "@/lib/theme";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ContactForm } from "@/components/ContactForm";

import Hero from "../components/business/Hero";
import Pitch from "../components/business/Pitch";
import Workflows from "../components/business/Workflows";
import CaseStudies from "../components/business/CaseStudies";

// Shared with the Enterprise and Platform pages rather than forked.
import Partners from "../components/enterprise/Partners";
import ClosingCta, { CONTACT_HREF, START_HREF } from "../components/enterprise/ClosingCta";
import Suite, { BUSINESS_TOOLS } from "../components/platform/Suite";
import Models from "../components/platform/Models";
import BuiltForEnterprise from "../components/platform/BuiltForEnterprise";
import Apps from "../components/platform/Apps";

export const metadata: Metadata = {
  title: "ImagineArt for Business, On Brand at Enterprise Scale",
  description:
    "ImagineArt gives your creative team the speed, structure, and control to ship campaign-ready assets. Humans and AI, built around how your operation actually runs.",
};

export default function BusinessPage() {
  return (
    <>
      <PageTint palette="sand" />

      {/* Light banner hero, same as / and /solutions. */}
      <SiteNav variant={navVariantFor("light")} />

      <main>
        <Hero />
        <Partners caption="Partnering with global industry leaders to power your creative output" />
        <ContactForm />
        <Pitch />
        <IndustriesSection />
        <Suite tools={BUSINESS_TOOLS} />
        <Workflows />
        <BuiltForEnterprise />
        <Models />
        <Apps />
        <CaseStudies />
        <ClosingCta
          title="A creative suite that scales"
          muted="with your business."
          lede="From your first asset to your thousandth campaign, ImagineArt grows with your team."
          primary={{ label: "Get Started", href: START_HREF }}
          secondary={{ label: "Contact Sales", href: CONTACT_HREF }}
          /* Warm cream and olive, so the band matches the sand palette. The
             default fog/grass is cool green and read as off-page here. */
          backdrop="/media/cta-reeded-glass.jpg"
        />
      </main>

      <SiteFooter />
    </>
  );
}
