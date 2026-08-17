import { SectionGuides } from "@/components/primitives/SectionGuides";
import { CaseStudyMosaic, CaseStudyStyles } from "@/components/CaseStudyCards";

/**
 * Proof section: the staggered showcase mosaic.
 *
 * This page is a shop window, so it shows the studies rather than offering
 * tools to sift them. The filter chips moved to /case-studies, which is the
 * page built for finding a specific one, and which this section links to.
 * Cards and data are shared — see components/CaseStudyCards.
 */
export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[660px]">
          <p className="eyebrow">Proof</p>
          <h2 className="h2 mt-4">
            How brands scale creative{" "}
            <span className="h-muted">production with ImagineArt</span>
          </h2>
          <p className="lede mt-5 max-w-[58ch]">
            Businesses, agencies, and marketing teams around the world use
            ImagineArt Enterprise to produce on-brand content at scale, and
            spend less doing it.
          </p>
        </div>

        <div className="mt-12">
          <CaseStudyMosaic />
        </div>

        <a href="/case-studies" className="cs-all mt-12">
          See all case studies →
        </a>
      </div>

      <CaseStudyStyles />
      <style>{`
        .cs-all {
          display: inline-block;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          border-bottom: 1px solid var(--line-strong);
        }
      `}</style>
    </section>
  );
}
