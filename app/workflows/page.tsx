import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import ClosingCta, { CONTACT_HREF, CONTACT_TARGET } from "../components/enterprise/ClosingCta";
import { navVariantFor } from "@/lib/theme";
import WorkflowPage from "../components/workflows/WorkflowPage";
import ModelsSection from "../components/workflows/ModelsSection";
import FAQ from "../components/workflows/FAQ";

export const metadata = {
  title: "Workflows · ImagineArt",
  description:
    "Three modes for the way creative actually happens: agentic agents, node-based workflows, and simple one-shot prompts.",
};

export default function WorkflowsRoute() {
  return (
    <div style={{ background: "var(--page-bg)", minHeight: "100vh" }}>
      {/* Only the hero is dark. Everything below it is a light section, so
          the page takes the neutral tint like every other route and the nav
          still opens in its onDark colours over the hero. */}
      <PageTint palette="neutral" />
      <SiteNav variant={navVariantFor("dark")} />
      <WorkflowPage />
      <ModelsSection />
      <FAQ />
      {/* Shared closing band, in place of a 392-line local copy whose aurora
          backdrop broke both the monochrome and the no-ambient-motion rules. */}
      <ClosingCta
        title="What will you build"
        muted="today?"
        lede={null}
        primary={{ label: "Get Started", href: "https://imagine.art/enterprise" }}
        secondary={{ label: "Book a demo", href: CONTACT_HREF, ...CONTACT_TARGET }}
      />
      <SiteFooter />
    </div>
  );
}
