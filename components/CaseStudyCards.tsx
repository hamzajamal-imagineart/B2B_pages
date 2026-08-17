/**
 * Card presentation for case studies, shared by the /case-studies index and
 * the Business page's proof section.
 *
 * Data comes from content/caseStudies — this file only renders it. Both
 * surfaces show the same featured card and the same story cards; only the
 * filtering affordance differs (chips on Business, search + chips on the
 * index).
 *
 * A card links to its detail page only once that study has written content;
 * otherwise it renders without a link rather than pointing at an empty page.
 */
import { withBasePath } from "@/lib/assets";
import {
  type CaseStudy,
  caseStudyHref,
  caseStudyIndustries,
  featuredCaseStudy,
  hasPage,
  supportingCaseStudies,
} from "@/content/caseStudies";

export const FEATURED = featuredCaseStudy();
export const STORIES = supportingCaseStudies();
export const INDUSTRIES = caseStudyIndustries();

/** Case-insensitive match across industry, metric, title and summary. */
export function matchesQuery(s: CaseStudy, q: string) {
  if (!q.trim()) return true;
  const hay = `${s.industry} ${s.metric} ${s.title} ${s.titleMuted ?? ""} ${s.summary}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

function ReadStory({ study, dark }: { study: CaseStudy; dark?: boolean }) {
  if (!hasPage(study)) return null;
  return (
    <a href={caseStudyHref(study)} className={`cs-link ${dark ? "cs-link-dark" : ""}`}>
      Read story →
    </a>
  );
}

export function FeaturedCard() {
  return (
    <div className="cs-featured grain grain-charcoal">
      <div className="cs-featured-copy">
        <span className="cs-eyebrow">Featured · {FEATURED.industry}</span>
        <h3 className="cs-featured-title mt-4">{FEATURED.title}</h3>
        <p className="cs-featured-body mt-4">{FEATURED.summary}</p>
        <div className="mt-6">
          <ReadStory study={FEATURED} />
        </div>
      </div>

      <dl className="cs-stats">
        {FEATURED.stats.map((s) => (
          <div key={s.label} className="cs-stat">
            <dt className="cs-stat-value">{s.value}</dt>
            <dd className="cs-stat-label">{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Story card: inset cover, then an industry/arrow row, title and summary.
 *
 * The whole card is the link when the study has a page — the arrow is the
 * affordance, which is why there is no separate "Read story" line and no
 * metric chip. The metric still lives on the study and drives search; it just
 * isn't a badge on the card any more.
 */
export function StoryCard({ story }: { story: CaseStudy }) {
  const linked = hasPage(story);
  const Tag = linked ? "a" : "div";

  return (
    <Tag
      {...(linked ? { href: caseStudyHref(story) } : {})}
      className={`cs-card ${linked ? "cs-card-linked" : ""}`}
    >
      {/* Rendered even without a cover, so a row of cards keeps its copy on a
          common baseline. An empty slot reads as a placeholder, not a bug. */}
      <div className="cs-card-media">
        {story.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBasePath(story.cover)} alt="" aria-hidden />
        )}
      </div>
      <div className="cs-card-inner">
        <div className="cs-card-top">
          <span className="cs-card-label">{story.industry}</span>
          {linked && (
            <span className="cs-card-arrow" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h13M12.5 6l6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
        <h3 className="cs-card-title">
          {story.title}
          {story.titleMuted ? ` ${story.titleMuted}` : ""}
        </h3>
        <p className="cs-card-body">{story.summary}</p>
      </div>
    </Tag>
  );
}

/** Filter chip row, shared by both surfaces. */
export function FilterChips({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="cs-filters" role="group" aria-label="Filter case studies by industry">
      {INDUSTRIES.map((f) => (
        <button
          key={f}
          type="button"
          className={`cs-chip ${f === active ? "cs-chip-on" : ""}`}
          aria-pressed={f === active}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

/** One copy of the shared CSS; render once per page that uses these cards. */
export function CaseStudyStyles() {
  return (
    <style>{`
      .cs-filters { display: flex; flex-wrap: wrap; gap: 8px; }
      .cs-chip {
        border: 1px solid var(--line);
        background: transparent;
        color: var(--ink-2);
        font-family: inherit;
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: -0.01em;
        padding: 8px 16px;
        border-radius: 999px;
        cursor: pointer;
        transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
      }
      .cs-chip:hover { border-color: var(--line-strong); color: var(--ink); }
      .cs-chip-on {
        background: var(--ink);
        border-color: transparent;
        color: #fff;
      }

      /* Featured: copy left, the numbers stacked right — the layout the
         reference uses, with the stats doing the persuading. */
      .cs-featured {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
        gap: clamp(28px, 5vw, 72px);
        align-items: center;
        border-radius: 28px;
        padding: clamp(28px, 4vw, 56px);
      }
      .cs-featured-title {
        font-size: clamp(24px, 2.6vw, 34px);
        line-height: 1.15;
        letter-spacing: -0.02em;
        font-weight: 500;
      }
      .cs-featured-body {
        font-size: 15px;
        line-height: 1.65;
        color: rgba(255, 255, 255, 0.72);
        max-width: 52ch;
      }
      .cs-stats { display: flex; flex-direction: column; }
      .cs-stat {
        padding: 16px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
      }
      .cs-stat:first-child { padding-top: 0; }
      .cs-stat:last-child { border-bottom: 0; padding-bottom: 0; }
      .cs-stat-value {
        font-size: clamp(28px, 3vw, 40px);
        line-height: 1.05;
        letter-spacing: -0.025em;
        font-weight: 500;
      }
      .cs-stat-label {
        margin-top: 4px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.6);
      }

      .cs-eyebrow {
        font-size: 11px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-weight: 600;
        opacity: 0.6;
      }
      .cs-eyebrow-dark { color: var(--ink-3); opacity: 1; }

      .cs-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
      }
      /* Sleek card: inset cover with its own radius, soft shadow, generous
         corner. Light fill rather than white — the cover carries the contrast,
         so the surface underneath should stay quiet. */
      .cs-card {
        display: flex;
        flex-direction: column;
        background: var(--panel);
        border-radius: 26px;
        padding: 8px 8px 4px;
        box-shadow: 0 1px 2px rgba(16, 20, 20, 0.04), 0 8px 24px rgba(16, 20, 20, 0.05);
        transition: box-shadow 0.22s ease, transform 0.22s ease;
      }
      .cs-card-linked { cursor: pointer; }
      .cs-card-linked:hover {
        box-shadow: 0 2px 4px rgba(16, 20, 20, 0.05), 0 18px 40px rgba(16, 20, 20, 0.1);
        transform: translateY(-3px);
      }
      .cs-card-linked:hover .cs-card-arrow { transform: translateX(3px); color: var(--ink); }

      .cs-card-inner {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 18px 16px 20px;
      }
      /* Rendered whether or not the study has a cover, so a row keeps its copy
         on a common baseline. */
      .cs-card-media {
        aspect-ratio: 4 / 3;
        border-radius: 19px;
        background: var(--panel-2);
        overflow: hidden;
      }
      .cs-card-media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Industry left, arrow right — the arrow is the card's only affordance,
         which is why there is no separate "Read story" line. */
      .cs-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .cs-card-label {
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: -0.01em;
        color: var(--ink-3);
      }
      .cs-card-arrow {
        color: var(--ink-3);
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        transition: transform 0.22s ease, color 0.22s ease;
      }

      .cs-card-title {
        margin-top: 10px;
        font-size: 17px;
        line-height: 1.32;
        letter-spacing: -0.015em;
        font-weight: 500;
        color: var(--ink);
      }
      .cs-card-body {
        margin-top: 8px;
        font-size: 14px;
        line-height: 1.55;
        color: var(--ink-3);
      }

      .cs-link {
        display: inline-block;
        align-self: flex-start;
        font-size: 13.5px;
        font-weight: 500;
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      }
      .cs-link-dark { color: var(--ink); border-bottom-color: var(--line-strong); }

      .cs-empty { font-size: 15px; color: var(--ink-3); }

      @media (max-width: 980px) {
        .cs-featured { grid-template-columns: 1fr; }
        .cs-grid { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}

/**
 * Staggered stat mosaic — the featured study's numbers in the reference
 * layout: three cards at varying vertical offsets with two tinted squares
 * filling the gaps.
 *
 * Positions are fixed rather than computed: top-left, centre, bottom-right,
 * with the squares in the two holes that leaves. Three stats is the shape the
 * layout is built for.
 */
export function StatMosaic({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  const [a, b, c] = stats;
  // Supplied noise gradients, one per card.
  const grounds = ["/media/noise/moss.jpg", "/media/noise/amber.jpg", "/media/noise/ember.jpg"];

  return (
    <div className="csm">
      <div className="csm-col">
        {a && <StatCard stat={a} ground={grounds[0]} />}
        <span className="csm-box csm-box-a" aria-hidden />
      </div>

      <div className="csm-col csm-col-mid">
        {b && <StatCard stat={b} ground={grounds[1]} tall />}
      </div>

      <div className="csm-col">
        <span className="csm-box csm-box-c" aria-hidden />
        {c && <StatCard stat={c} ground={grounds[2]} />}
      </div>

      <style>{`
        .csm {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }
        .csm-col { display: flex; flex-direction: column; gap: 16px; }
        /* The stagger. Fixed offsets rather than a masonry library — with
           three columns the rhythm is known, so it is one declaration. */
        .csm-col-mid { padding-top: 26px; }

        /* Small squares, not column-width blocks: they punctuate the stagger
           rather than reading as two more cards. One tucks under the first
           card toward the right, the other sits above the last card at the
           left, matching the reference. */
        .csm-box {
          width: clamp(96px, 11vw, 148px);
          aspect-ratio: 1;
          border-radius: 18px;
          background: var(--panel-2);
          border: 1px solid var(--line);
        }
        .csm-box-a { align-self: flex-end; margin-right: 12%; }
        .csm-box-c { align-self: flex-start; }

        .csm-stat {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          color: #fff;
          background: var(--ink);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 260px;
          padding: 26px;
          border-radius: 22px;
        }
        .csm-stat-tall { min-height: 340px; }
        .csm-stat-value {
          font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          font-weight: 500;
        }
        .csm-stat-label {
          margin-top: 8px;
          font-size: 14px;
          opacity: 0.78;
        }
        .csm-ground {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* The gradients are bright; the copy sits at the base, so darken only
           there and leave the top of each card at full saturation. */
        .csm-ground-scrim {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(to top, rgba(10,12,10,0.72) 0%, rgba(10,12,10,0.28) 42%, transparent 72%);
        }

        @media (max-width: 860px) {
          .csm { grid-template-columns: 1fr 1fr; }
          .csm-col-mid { padding-top: 0; }
          .csm-box { display: none; }
          .csm-stat, .csm-stat-tall { min-height: 190px; }
        }
      `}</style>
    </div>
  );
}

function StatCard({
  stat,
  ground,
  tall,
}: {
  stat: { value: string; label: string };
  ground: string;
  tall?: boolean;
}) {
  return (
    <div className={`csm-stat ${tall ? "csm-stat-tall" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="csm-ground" src={withBasePath(ground)} alt="" aria-hidden />
      <span className="csm-ground-scrim" aria-hidden />
      <div className="csm-stat-value">{stat.value}</div>
      <div className="csm-stat-label">{stat.label}</div>
    </div>
  );
}
