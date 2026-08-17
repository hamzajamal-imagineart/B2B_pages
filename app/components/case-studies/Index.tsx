"use client";

import { useMemo, useState } from "react";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import {
  CaseStudyStyles,
  FilterChips,
  matchesQuery,
  STORIES,
  StoryCard,
} from "@/components/CaseStudyCards";

/**
 * Case-study index.
 *
 * The page hero carries the heading and standfirst; this section is the
 * search bar, the industry chips and the grid, in that order and close
 * together, so the controls sit with the cards they filter rather than
 * floating above unrelated content.
 *
 * Search and the chips compose: a query narrows within whatever industry is
 * selected.
 */
export default function CaseStudyIndex() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const stories = useMemo(
    () =>
      STORIES.filter(
        (s) => (active === "All" || s.industry === active) && matchesQuery(s, query),
      ),
    [active, query],
  );

  const total = stories.length;

  return (
    <section id="index" className="relative py-24 md:py-28">
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="cs-toolbar">
          <label className="cs-search">
            <span className="cs-search-icon" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search case studies"
              aria-label="Search case studies"
              className="cs-search-input"
            />
            {query && (
              <button
                type="button"
                className="cs-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </label>

          <FilterChips active={active} onChange={setActive} />
        </div>

        {/* Announced politely so a screen reader hears the count change as the
            query is typed, rather than the grid silently rearranging. */}
        <p className="cs-count mt-6" role="status" aria-live="polite">
          {total} {total === 1 ? "case study" : "case studies"}
        </p>

        <div className="cs-grid mt-8">
          {stories.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>

        {total === 0 && (
          <p className="cs-empty mt-8">
            No case studies match that search. Try a different term, or clear
            the filters.
          </p>
        )}
      </div>

      <CaseStudyStyles />
      <style>{`
        .cs-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .cs-search {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1 1 280px;
          max-width: 360px;
          background: var(--panel-2);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 11px 16px;
          color: var(--ink-3);
          transition: border-color 0.18s ease;
        }
        .cs-search:focus-within { border-color: var(--line-strong); }
        .cs-search-icon { display: grid; place-items: center; flex: 0 0 auto; }
        .cs-search-input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .cs-search-input::placeholder { color: var(--ink-3); }
        /* The UA's own clear affordance would sit alongside ours. */
        .cs-search-input::-webkit-search-cancel-button { display: none; }
        .cs-search-clear {
          border: 0;
          background: transparent;
          color: var(--ink-3);
          cursor: pointer;
          display: grid;
          place-items: center;
          padding: 0;
          flex: 0 0 auto;
        }
        .cs-search-clear:hover { color: var(--ink); }

        .cs-count {
          font-size: 13px;
          color: var(--ink-3);
        }
        .csi-featured-title { font-size: clamp(26px, 3vw, 38px); }

        @media (max-width: 720px) {
          .cs-search { max-width: none; }
        }
      `}</style>
    </section>
  );
}
