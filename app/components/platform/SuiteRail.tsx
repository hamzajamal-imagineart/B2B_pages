"use client";

import { useRef } from "react";
import type { Tool } from "./Suite";
import { withBasePath } from "@/lib/assets";

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
/** Fallback for tools with no product page of their own. */
const IA_ENTERPRISE = "https://www.imagine.art/business/enterprise";

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
        {tools.map((t, i) => (
          <a
            key={t.title}
            href={t.href ?? IA_ENTERPRISE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.title}
            className={`suite-card suite-tone-${(i % 5) + 1}`}
          >
            <h3 className="suite-card-title">{t.title}</h3>
            <p className="suite-card-body">{t.body}</p>
            <span className="suite-arrow glass" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <div className="suite-mock">
              {t.media && (
                <div className="suite-embed">
                  {t.media.kind === "video" ? (
                    /* eslint-disable-next-line jsx-a11y/media-has-caption */
                    <video
                      className="suite-media"
                      src={withBasePath(t.media.src)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={i < 3 ? "auto" : "metadata"}
                      aria-hidden
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img className="suite-media" src={withBasePath(t.media.src)} alt="" />
                  )}
                </div>
              )}
            </div>
          </a>
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
          /* overflow-x: auto coerces overflow-y to auto, so the hover scale
             needs headroom or the card is clipped. */
          padding-block: 12px;
        }
        @media (max-width: 768px) {
          .suite-track { padding-left: 20px; padding-right: 20px; }
        }
        /* Same card as the platform stack it replaces: a dark tone, copy at
           the top, a glass arrow, and the media clipped to the card's foot. */
        .suite-card {
          position: relative;
          flex: 0 0 auto;
          width: clamp(260px, 27vw, 380px);
          height: clamp(420px, 46vw, 520px);
          border-radius: 20px;
          padding: 28px 26px 0;
          display: flex;
          flex-direction: column;
          color: #fff;
          overflow: hidden;
          text-decoration: none;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .suite-card:hover,
        .suite-card:focus-visible { transform: scale(1.015); }
        @media (prefers-reduced-motion: reduce) {
          .suite-card { transition: none; }
          .suite-card:hover, .suite-card:focus-visible { transform: none; }
        }
        .suite-tone-1 { background-color: #2b2a28; }
        .suite-tone-2 { background-color: #33393e; }
        .suite-tone-3 { background-color: #3d3b34; }
        .suite-tone-4 { background-color: #24302f; }
        .suite-tone-5 { background-color: #141414; }

        .suite-card-title {
          font-size: 19px;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .suite-card-body {
          margin-top: 8px;
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.6);
          max-width: 24ch;
        }
        .suite-arrow {
          margin-top: 16px;
          width: 34px; height: 34px;
          border-radius: 999px;
          display: grid; place-items: center;
          color: #fff;
          flex: 0 0 auto;
        }
        /* One 16:9 frame per card, bottom-anchored, so the media lines up
           across the rail whatever each source's own ratio is. */
        .suite-mock { margin-top: auto; flex: 1; position: relative; min-height: 0; }
        .suite-embed {
          position: absolute;
          left: 0; right: 0; bottom: 22px;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
        }
        .suite-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
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
