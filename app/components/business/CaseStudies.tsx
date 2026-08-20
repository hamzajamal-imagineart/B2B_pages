import { SectionGuides } from "@/components/primitives/SectionGuides";
import {
  CaseStudyStyles,
  FEATURED,
  STORIES,
  StoryCard,
} from "@/components/CaseStudyCards";

/**
 * Proof section: the case-study cards, with the featured study as their lede.
 *
 * Simplified from a two-part section. It used to open on the featured study's
 * own headline and its three numbers as a staggered stat mosaic, then start
 * again with a second heading for the cards. That put two h2s and a large
 * visual ahead of the thing the section is for, and two of the mosaic's cells
 * are deliberately empty squares, which read as missing assets rather than as
 * composition. The featured study keeps its summary as the lede, and its
 * numbers still run in full on /case-studies, which is where the mosaic lives.
 *
 * No filter chips here — this page is a shop window. Three cards is the whole
 * point: finding a specific study is what /case-studies is for, and the link
 * beside the heading goes there for the rest.
 */
/** Cards shown outside the index. The grid is three across, so three fills it
 *  exactly and a fourth would open a second row holding one card. */
const PREVIEW_COUNT = 3;
export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="cs-studies-head">
          <div>
            <p className="eyebrow">Proof</p>
            <h2 className="h2 cs-studies-heading mt-4">
              Case <span className="h-muted">studies</span>
            </h2>
          </div>
          <a href="/case-studies" className="cs-more-link">
            View More →
          </a>
        </div>

        <p className="lede mt-5 max-w-[62ch]">{FEATURED.summary}</p>

        <div className="cs-grid mt-12">
          {STORIES.slice(0, PREVIEW_COUNT).map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </div>

      <CaseStudyStyles />
      <style>{`
        /* Heading left, link right, on one row. */
        /* Heading left, link right, on one baseline row. */
        .cs-studies-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        /* Same treatment as the hero's foot link: a hairline under the text,
           not a filled control. Restated here rather than borrowing
           BannerHero's .hero-link, which only exists while that component is
           on the page. */
        .cs-more-link {
          flex: 0 0 auto;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink);
          border-bottom: 1px solid var(--line-strong);
          padding-bottom: 2px;
        }
      `}</style>
    </section>
  );
}
