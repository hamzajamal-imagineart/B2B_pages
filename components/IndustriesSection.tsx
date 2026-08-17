"use client";

import { useRef } from "react";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { withBasePath } from "@/lib/assets";

/**
 * Full-bleed looping backdrop, with a scrim so the copy on top stays legible
 * whatever the footage is doing underneath.
 */
function CardVideo({ src }: { src: string }) {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="ind-video"
        src={withBasePath(src)}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <span className="ind-scrim" aria-hidden />
    </>
  );
}

/**
 * Ten industry cards, shared by the Business and Solutions pages.
 *
 * Both specs carry this section with identical heading, subtext and card copy,
 * so it lives here rather than being forked per page.
 *
 * Two presentations:
 *  - "grid"  (default) — the panel grid /business uses.
 *  - "track" — the horizontal card rail with chevron pagers, mirroring the
 *    Enterprise page's platform stack. /solutions uses this.
 *
 * The Business spec's UX note wants each card to deep-link to an industry
 * solution page. Those pages don't exist yet, so these render as plain cards
 * rather than as links to nowhere — wrapping each in an <a> is the only change
 * needed once the routes land.
 */
/* Four of the ten have a real capture; the rest run their flat palette until
   more land. `video` is optional precisely so adding one is a one-line edit. */
const INDUSTRIES = [
  { name: "Fashion & Apparel", video: "/media/industries/fashion.mp4", body: "Design, PDP and e-com imagery, editorials (stills + video), fashion films, lookbooks, social, banners, and static + motion ads." },
  { name: "CPG", body: "End-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Fast Food", body: "Food photography, end-to-end campaigns, static + motion ads, product windows, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Food & Beverage", body: "Food photography, end-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, and mascot design." },
  { name: "Furniture / Home Décor", body: "Furniture and lifestyle renders, editorials (stills + video), social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Electronics", video: "/media/industries/electronics.mp4", body: "Product and lifestyle renders, editorials (stills + video), banners, social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Beauty & Cosmetics", video: "/media/industries/beauty.mp4", body: "End-to-end campaigns, static + motion ads, product windows, banners, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Automotive", body: "Launch films, static + motion ads, banners, and video-based sales training." },
  { name: "Telecom", body: "Social, banners, static + motion ads, in-store POS, and video-based compliance training." },
  { name: "E-commerce / Marketplaces", video: "/media/industries/ecommerce.mp4", body: "Seller PDP and listing imagery, on-page product motion, static + motion ads, and store banners." },
];

/* Cycled across the ten cards. Each palette carries its own --grain-fg, so a
   dark card inverts its own copy without the card having to know. */
const PALETTES = [
  "grain-mineral",
  "grain-charcoal",
  "grain-sand",
  "grain-teal",
  "grain-olive",
  "grain-steel",
];

export function IndustriesSection({
  variant = "grid",
}: {
  variant?: "grid" | "track";
} = {}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Plain assignment, animated by `scroll-behavior: smooth` on the track.
  // scrollBy({behavior:"smooth"}) is ignored by some engines, which left the
  // equivalent buttons on the Enterprise page silently doing nothing.
  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ind-slide");
    const gap = 14;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const max = el.scrollWidth - el.clientWidth;
    const to = Math.max(0, Math.min(max, el.scrollLeft + dir * amount));
    if (to === el.scrollLeft) return;
    el.scrollLeft = to;
  };

  return (
    <section
      id="industries"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[640px]">
          <p className="eyebrow">Industries</p>
          <h2 className="h2 mt-4">
            Built for <span className="h-muted">your industry</span>
          </h2>
          <p className="lede mt-5">
            One platform, every sector. Use cases mapped to how your team
            already works, not how a tool wishes you did. Find yours below.
          </p>
        </div>
      </div>

      {variant === "track" ? (
        <>
          <div ref={trackRef} className="ind-track no-scrollbar mt-12">
            {INDUSTRIES.map((i, n) => (
              <div
                key={i.name}
                className={`ind-slide grain ${PALETTES[n % PALETTES.length]} ${i.video ? "ind-has-video" : ""}`}
              >
                {i.video && <CardVideo src={i.video} />}
                <h3 className="ind-slide-name">{i.name}</h3>
                <p className="ind-slide-body">{i.body}</p>
                <span className="ind-slide-arrow glass" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            ))}
          </div>

          <div className="container-page">
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => scrollByCards(-1)} aria-label="Previous industries" className="ind-pager">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={() => scrollByCards(1)} aria-label="Next industries" className="ind-pager">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="container-page">
          <div className="ind-grid mt-14">
            {INDUSTRIES.map((i) => (
              <div key={i.name} className={`ind-card ${i.video ? "ind-has-video" : ""}`}>
                {i.video && <CardVideo src={i.video} />}
                <h3 className="ind-name">{i.name}</h3>
                <p className="ind-body">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        /* ── grid variant ── */
        .ind-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .ind-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: var(--panel-2);
          border-radius: 20px;
          padding: 26px 26px 28px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .ind-name {
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .ind-body {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink-3);
        }
        /* A card with footage carries its own copy colours, since the scrim
           underneath is dark whatever the page tint is. */
        .ind-card.ind-has-video .ind-name { color: #fff; }
        .ind-card.ind-has-video .ind-body { color: rgba(255, 255, 255, 0.76); }
        @media (max-width: 980px) {
          .ind-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 620px) {
          .ind-grid { grid-template-columns: 1fr; }
        }

        /* ── track variant ── */
        /* Gutters match .container-page so the first card lines up with the
           heading above it rather than hugging the viewport edge. */
        .ind-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-left: max(32px, calc((100vw - 1240px) / 2 + 32px));
          padding-right: max(32px, calc((100vw - 1240px) / 2 + 32px));
          scroll-behavior: smooth;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .ind-track { padding-left: 20px; padding-right: 20px; }
        }
        /* No scroll-snap here: a "start" snap alignment aligns to the
           scrollport edge, which cancels the container's gutter padding and
           left the first card hanging off the page grid. */
        .ind-slide {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          flex: 0 0 auto;
          width: clamp(258px, 26vw, 340px);
          min-height: clamp(360px, 38vw, 440px);
          border-radius: 20px;
          padding: 26px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        /* A card with footage carries its own copy colours, overriding the
           palette's --grain-fg, since the scrim underneath is always dark. */
        .ind-slide.ind-has-video { color: #fff; }
        .ind-slide.ind-has-video .ind-slide-body { opacity: 0.78; }
        .ind-slide-name {
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        /* Colour comes from the palette's --grain-fg, dimmed rather than
           re-specified, so it stays legible on light and dark cards alike. */
        .ind-slide-body {
          margin-top: 10px;
          font-size: 13.5px;
          line-height: 1.55;
          opacity: 0.72;
        }
        /* ── shared: video backdrop ── */
        /* Sits behind the card's own copy but above the palette fill, which
           stays underneath as the colour so nothing flashes before the video
           paints. .grain's noise tile is z-index 0, hence -1 / -2 here. */
        .ind-video {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ind-scrim {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(8, 11, 9, 0.86) 0%,
            rgba(8, 11, 9, 0.5) 46%,
            rgba(8, 11, 9, 0.24) 100%
          );
        }

        .ind-slide-arrow {
          margin-top: 18px;
          width: 34px; height: 34px;
          border-radius: 999px;
          display: grid; place-items: center;
          color: currentColor;
          flex: 0 0 auto;
        }
        .ind-pager {
          width: 38px; height: 38px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          color: var(--ink);
          display: grid; place-items: center;
          cursor: pointer;
        }
        .ind-pager:hover { border-color: var(--line-strong); }
      `}</style>
    </section>
  );
}
