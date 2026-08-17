"use client";

import { useState } from "react";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import {
  CaseStudyStyles,
  FEATURED,
  FeaturedCard,
  FilterChips,
  STORIES,
  StoryCard,
} from "@/components/CaseStudyCards";

/**
 * Proof section: one featured card plus a 3-up row, with industry filtering.
 *
 * The spec asks for a search bar above the grid. On this page the section is a
 * teaser, so it ships chips only and links through to /case-studies, which
 * carries the full search. Cards and data are shared — see
 * components/CaseStudyCards.
 */
export default function CaseStudies() {
  const [active, setActive] = useState("All");

  const showFeatured = active === "All" || active === FEATURED.industry;
  const stories = STORIES.filter((s) => active === "All" || s.industry === active);

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

        <div className="mt-10">
          <FilterChips active={active} onChange={setActive} />
        </div>

        {showFeatured && (
          <div className="mt-8">
            <FeaturedCard />
          </div>
        )}

        <div className="cs-grid mt-4">
          {stories.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>

        {!showFeatured && stories.length === 0 && (
          <p className="cs-empty mt-8">No case studies in this industry yet.</p>
        )}

        <a href="/case-studies" className="cs-all mt-10">
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
