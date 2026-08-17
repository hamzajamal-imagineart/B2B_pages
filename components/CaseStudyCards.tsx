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

export function StoryCard({ story }: { story: CaseStudy }) {
  return (
    <article className="cs-card">
      <span className="cs-eyebrow cs-eyebrow-dark">{story.industry}</span>
      <span className="cs-metric mt-3">{story.metric}</span>
      <h3 className="cs-card-title mt-3">
        {story.title}
        {story.titleMuted ? ` ${story.titleMuted}` : ""}
      </h3>
      <p className="cs-card-body mt-3">{story.summary}</p>
      <div className="mt-auto pt-5">
        <ReadStory study={story} dark />
      </div>
    </article>
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
      .cs-card {
        display: flex;
        flex-direction: column;
        background: var(--panel-2);
        border-radius: 24px;
        padding: 28px;
      }
      /* The card's headline number, called out ahead of the title. */
      .cs-metric {
        align-self: flex-start;
        font-size: 12.5px;
        font-weight: 500;
        color: var(--ink);
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 5px 12px;
      }
      .cs-card-title {
        font-size: 18px;
        line-height: 1.3;
        letter-spacing: -0.015em;
        font-weight: 500;
        color: var(--ink);
      }
      .cs-card-body {
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
