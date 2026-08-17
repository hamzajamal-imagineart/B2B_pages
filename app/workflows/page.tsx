import { SiteNav } from "@/components/SiteNav";
import { navVariantFor } from "@/lib/theme";
import WorkflowPage from "../components/workflows/WorkflowPage";
import ModelsSection from "../components/workflows/ModelsSection";
import FAQ from "../components/workflows/FAQ";
import FinalCTA from "../components/workflows/FinalCTA";
import SiteFooter from "../components/workflows/SiteFooter";

export const metadata = {
  title: "Workflows · ImagineArt",
  description:
    "Three modes for the way creative actually happens — agentic agents, node-based workflows, and simple one-shot prompts.",
};

export default function WorkflowsRoute() {
  return (
    <div style={{ background: "#0A0A0B", color: "#fff", minHeight: "100vh" }}>
      {/* Dark page throughout, so the nav opens in its onDark colours. */}
      <SiteNav variant={navVariantFor("dark")} />
      <WorkflowPage />
      <ModelsSection />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
