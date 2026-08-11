import Navbar from "../components/Navbar";
import WorkflowPage from "../components/workflow/WorkflowPage";
import ModelsSection from "../components/workflow/ModelsSection";
import FAQ from "../components/workflow/FAQ";
import FinalCTA from "../components/workflow/FinalCTA";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Workflows · ImagineArt",
  description:
    "Three modes for the way creative actually happens — agentic agents, node-based workflows, and simple one-shot prompts.",
};

export default function WorkflowsRoute() {
  return (
    <div style={{ background: "#0A0A0B", color: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <WorkflowPage />
      <ModelsSection />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
