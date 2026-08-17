import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import { NAV_VARIANT } from "@/lib/theme";

import Hero from "../components/platform/Hero";
import Suite from "../components/platform/Suite";
import Models from "../components/platform/Models";
import BuiltForEnterprise from "../components/platform/BuiltForEnterprise";
import Apps from "../components/platform/Apps";

// Partners and the closing CTA are shared with the Enterprise page rather than
// forked, so the logo wall and the sales hand-off stay in one place.
import Partners from "../components/enterprise/Partners";
import ClosingCta from "../components/enterprise/ClosingCta";

export const metadata: Metadata = {
  title: "ImagineArt Platform, Enterprise-Grade AI Creative",
  description:
    "The complete platform for generating images, video, and creative assets at scale, with the security, control, and model breadth your organization actually needs.",
};

export default function PlatformPage() {
  return (
    <>
      <PageTint palette="slate" />

      {/* Same light hero surface as the Enterprise page, so the nav theme
          resolves identically — see lib/theme.ts */}
      <SiteNav variant={NAV_VARIANT} />

      <main>
        <Hero />
        <Partners />
        <Suite />
        <Models />
        <BuiltForEnterprise />
        <Apps />
        <ClosingCta />
      </main>

      <SiteFooter />
    </>
  );
}
