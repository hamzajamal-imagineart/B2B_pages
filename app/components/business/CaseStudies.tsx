import { SectionGuides } from "@/components/primitives/SectionGuides";
import {
  CaseStudyStyles,
  FEATURED,
  STORIES,
  StatMosaic,
  StoryCard,
} from "@/components/CaseStudyCards";

/**
 * Proof section: the featured study, then the case-study cards.
 *
 * The featured study leads with its heading and paragraph, and its three
 * numbers run as the staggered stat mosaic. The other studies follow under
 * their own heading as cards.
 *
 * No filter chips here — this page is a shop window. Finding a specific study
 * is what /case-studies is for, and this section links to it.
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
          <h2 className="h2 mt-4">{FEATURED.title}</h2>
          <p className="lede mt-5 max-w-[62ch]">{FEATURED.summary}</p>
        </div>

        <div className="mt-14">
          <StatMosaic stats={FEATURED.stats} />
        </div>

        <div className="mt-24 md:mt-32">
          <h2 className="h2 cs-studies-heading">
            Case <span className="h-muted">studies</span>
          </h2>

          <div className="cs-grid mt-10">
            {STORIES.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>

          <a href="/case-studies" className="cs-all mt-12">
            See all case studies →
          </a>
        </div>
      </div>

      <CaseStudyStyles />
      <style>{`
        .cs-studies-heading { font-size: clamp(26px, 3vw, 38px); }
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
