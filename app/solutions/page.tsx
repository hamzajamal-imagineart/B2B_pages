import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { NAV_VARIANT } from "@/lib/theme";
import { IndustriesSection } from "@/components/IndustriesSection";
import WorkflowsSection from "@/components/WorkflowsSection";

import Hero from "../components/solutions/Hero";
import BuiltForSuccess from "../components/solutions/BuiltForSuccess";

// Moved off the Enterprise page, which was carrying thirteen sections.
import Apps from "../components/platform/Apps";

// Shared with the Business and Enterprise pages rather than forked.
import Partners from "../components/enterprise/Partners";
import ClosingCta, { CONTACT_ANCHOR, START_HREF } from "../components/enterprise/ClosingCta";

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
      <PageTint palette="mineral" />

      {/* Light hero, same composition as the Enterprise page, so the nav
          theme resolves the same way — see lib/theme.ts */}
      <SiteNav variant={NAV_VARIANT} />

      <main>
        <Hero />
        <IndustriesSection />
        <Partners caption="Partnering with global industry leaders to power your creativity output" />
        <BuiltForSuccess />
        <WorkflowsSection />
        <Apps />
        {/* Same form as Enterprise, so this page's Contact Sales links have
            somewhere on-page to go. Second last, ahead of the closing band. */}
        <ContactForm />
        <ClosingCta
          title="The AI tools for business teams"
          muted="who need a creative suite that scales."
          lede={null}
          primary={{ label: "Get Started", href: START_HREF }}
          secondary={{ label: "Contact Sales", href: CONTACT_ANCHOR }}
        />
      </main>

      <SiteFooter />
    </>
  );
}
