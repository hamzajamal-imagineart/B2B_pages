import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { withBasePath } from "@/lib/assets";
import { IndustriesSection } from "@/components/IndustriesSection";

import Hero from "../components/solutions/Hero";

// Shared with the Business, Platform and Enterprise pages rather than forked.
import Partners from "../components/enterprise/Partners";
import ClosingCta, { CONTACT_HREF, START_HREF } from "../components/enterprise/ClosingCta";
import Suite, { SOLUTIONS_CAPABILITIES } from "../components/platform/Suite";
import CaseStudies from "../components/business/CaseStudies";

// Meta copy is verbatim from the content spec — this page targets
// "ai tools for business", so the title and description are the deliverable,
// not boilerplate.
export const metadata: Metadata = {
  title: "AI Tools for Business: One Platform, Every Industry | ImagineArt",
  description:
    "Looking for the best AI tools for business creative? ImagineArt gives enterprise teams on-brand assets at scale",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Dark full-bleed hero, same as /business, so the nav opens onDark. */}
      <SiteNav variant="onDark" />

      {/* One source for every two-tone heading's clipped fill. */}
      <main
        style={{
          ["--fill" as string]: `url(${withBasePath("/media/card-generate.jpg")})`,
        }}
      >
        <Hero />
        <IndustriesSection />
        <Partners caption="Partnering with global industry leaders to power your creativity output" />
        <Suite
          id="capabilities"
          eyebrow="Capabilities"
          heading="Built for"
          mutedHeading="success"
          lede="Everything your creative operation needs to produce on-brand assets at scale, governed, consistent, and in one platform."
          tools={SOLUTIONS_CAPABILITIES}
        />
        <CaseStudies />
        <ClosingCta
          title="The AI tools for business teams"
          muted="who need a creative suite that scales."
          lede={null}
          primary={{ label: "Get Started", href: START_HREF }}
          secondary={{ label: "Contact Sales", href: CONTACT_HREF }}
        />
      </main>

      <SiteFooter />
    </>
  );
}
