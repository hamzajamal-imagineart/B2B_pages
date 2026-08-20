"use client";

import { useRef } from "react";
import type { Tool } from "./Suite";

/**
 * The suite's card rail and its pagers.
 *
 * Split out of Suite because the rail needs a ref and click handlers, and
 * marking Suite itself "use client" would have turned its exported tool lists
 * into client-module bindings — which broke SOLUTIONS_CAPABILITIES for the
 * server component that slices it.
 *
 * Icons arrive as elements from the server component, which React serialises
 * across the boundary.
 */
export function SuiteRail({ tools }: { tools: Tool[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Animated by `scroll-behavior: smooth` on the track. Assigning scrollLeft
  // rather than calling scrollBy({behavior}), which some engines ignore.
  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".suite-card");
    const gap = 14;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const max = el.scrollWidth - el.clientWidth;
    const to = Math.max(0, Math.min(max, el.scrollLeft + dir * amount));
    if (to === el.scrollLeft) return;
    el.scrollLeft = to;
  };

  return (
    <>
      {/* A rail rather than a grid. Nine tools over four columns left a final
          row of one card and three empty cells, which read as a mistake. The
          rail also matches the platform stack and the industry cards, so the
          site has one way of presenting a set you scroll through. */}
      <div ref={trackRef} className="suite-track no-scrollbar mt-14">
        {tools.map((t) => (
          <div key={t.title} className="suite-card">
            <span className="attr-icon">{t.icon}</span>
            <h3 className="suite-card-title">{t.title}</h3>
            <p className="suite-card-body">{t.body}</p>
          </div>
        ))}
      </div>

      <div className="container-page">
        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={() => scrollByCards(-1)} aria-label="Previous tools" className="suite-pager">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={() => scrollByCards(1)} aria-label="Next tools" className="suite-pager">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <style>{`
        /* Gutters match .container-page so the first card lines up with the
           heading above it rather than hugging the viewport edge. */
        .suite-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-left: max(32px, calc((100vw - 1240px) / 2 + 32px));
          padding-right: max(32px, calc((100vw - 1240px) / 2 + 32px));
          scroll-behavior: smooth;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .suite-track { padding-left: 20px; padding-right: 20px; }
        }
        .suite-card {
          flex: 0 0 auto;
          width: clamp(232px, 21vw, 280px);
          min-height: clamp(230px, 22vw, 268px);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          /* Tile fill, so a card reads as its own band on the page wash. */
          background: var(--tile);
        }
        .suite-card .attr-icon { color: var(--ink-2); }
        /* Titles align across the rail. Bottom-anchoring the copy block let
           each one float by its own body length, which read as uneven. */
        .suite-card-title {
          margin-top: 26px;
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: var(--ink-heading);
        }
        .suite-card-body {
          margin-top: 8px;
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--ink-3);
        }
        .suite-pager {
          width: 38px; height: 38px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          color: var(--ink);
          display: grid; place-items: center;
        }
      `}</style>
    </>
  );
}
