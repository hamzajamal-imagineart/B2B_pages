import { SectionGuides } from "@/components/primitives/SectionGuides";
import { ButtonLink } from "@/components/Button";

const CTA_HREF = "https://www.imagine.art/business/enterprise/contact-us";

export default function ClosingCta() {
  return (
    <section className="relative border-t border-black/[0.08] py-28 md:py-36 lg:border-t-0">
      <SectionGuides edge="top" />
      <div className="container-page relative z-10 text-center">
        <h2 className="h2 mx-auto max-w-[18ch]">
          Bring your whole team{" "}
          <span className="h-muted">into one creative platform</span>
        </h2>
        <p className="lede mx-auto mt-6">
          Talk to us about rollout, security review, and what unlimited seats
          look like for an organization your size.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={CTA_HREF} variant="brand" size="lg">
            Contact Sales
          </ButtonLink>
          <ButtonLink href="/workflows" variant="ghost" size="lg">
            See Workflows
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
