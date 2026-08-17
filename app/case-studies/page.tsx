import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import { NAV_VARIANT } from "@/lib/theme";

import Hero from "../components/case-studies/Hero";
import CaseStudyIndex from "../components/case-studies/Index";
import ClosingCta, { CONTACT_HREF, START_HREF } from "../components/enterprise/ClosingCta";

export const metadata: Metadata = {
  title: "ImagineArt Case Studies, How Brands Scale Creative Production",
  description:
    "Businesses, agencies, and marketing teams around the world use ImagineArt Enterprise to produce on-brand content at scale, and spend less doing it.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageTint palette="stone" />

      <SiteNav variant={NAV_VARIANT} />

      <main>
        <Hero />
        <CaseStudyIndex />
        <ClosingCta
          title="Put your team"
          muted="on the next one."
          lede="Talk to us about what production at this scale looks like for an organization your size."
          primary={{ label: "Contact Sales", href: CONTACT_HREF }}
          secondary={{ label: "Get Started", href: START_HREF }}
        />
      </main>

      <SiteFooter />
    </>
  );
}
