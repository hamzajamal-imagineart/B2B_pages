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
        <div className="cs-featured-head">
          <p className="eyebrow">Proof</p>
          <h2 className="h2 cs-featured-heading mt-4">{FEATURED.title}</h2>
          <p className="lede mt-5">{FEATURED.summary}</p>
        </div>

        <div className="mt-14">
          <StatMosaic stats={FEATURED.stats} />
        </div>

        <div className="mt-24 md:mt-32">
          <div className="cs-studies-head">
            <h2 className="h2 cs-studies-heading">
              Case <span className="h-muted">studies</span>
            </h2>
            <a href="/case-studies" className="cs-more-link">
              View More →
            </a>
          </div>

          <div className="cs-grid mt-10">
            {STORIES.slice(0, PREVIEW_COUNT).map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>

        </div>
      </div>

      <CaseStudyStyles />
      <style>{`
        .cs-studies-heading { font-size: clamp(26px, 3vw, 38px); }
        /* Centred and given a wider measure: at 22ch the headline broke onto
           three cramped lines against a lot of empty space to its right. */
        .cs-featured-head { text-align: center; }
        .cs-featured-head .eyebrow { display: flex; justify-content: center; }
        .cs-featured-heading { max-width: 30ch; margin-inline: auto; }
        .cs-featured-head .lede { max-width: 66ch; margin-inline: auto; }
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
