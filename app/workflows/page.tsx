import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import ClosingCta from "../components/enterprise/ClosingCta";
import { navVariantFor } from "@/lib/theme";
import WorkflowPage from "../components/workflows/WorkflowPage";
import ModelsSection from "../components/workflows/ModelsSection";
import FAQ from "../components/workflows/FAQ";

export const metadata = {
  title: "Workflows · ImagineArt",
  description:
    "Three modes for the way creative actually happens — agentic agents, node-based workflows, and simple one-shot prompts.",
};

export default function WorkflowsRoute() {
  return (
    <div style={{ background: "#0A0A0B", color: "#fff", minHeight: "100vh" }}>
      {/* The page paints its own near-black behind a dark hero, so the nav
          opens in its onDark colours. The tint still runs: the sections below
          the hero are light, and the shared closing band and footer read their
          surfaces from these tokens. */}
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
        secondary={{ label: "Book a demo", href: "/#demo" }}
      />
      <SiteFooter />
    </div>
  );
}
