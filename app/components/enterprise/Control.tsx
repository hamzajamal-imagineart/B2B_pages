"use client";

import { SectionGuides } from "@/components/primitives/SectionGuides";

import { useRef } from "react";
import { withBasePath } from "@/lib/assets";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";
import { AdminBento } from "@/components/AdminBento";

export default function Control() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Animated manually rather than via scrollBy({behavior:"smooth"}): native
  // smooth scrolling is ignored in some engines (and under reduced-motion),
  // which left these buttons silently doing nothing.
  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>(".stack-card");
    const gap = 14;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;

    const max = el.scrollWidth - el.clientWidth;
    const from = el.scrollLeft;
    const to = Math.max(0, Math.min(max, from + dir * amount));
    if (to === from) return;

    // Plain assignment, animated by `scroll-behavior: smooth` on the track.
    // A rAF-driven tween stalls wherever rAF is throttled (background tabs),
    // and scrollBy({behavior:"smooth"}) is ignored by some engines.
    el.scrollLeft = to;
  };

  return (
    <section id="platform" className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0">
      <SectionGuides edge="top" />
      <div className="container-page">
        <h2 className="h2">
          The essential AI stack{" "}
          <span className="h-muted">for your creative team</span>
        </h2>
        <p className="h2 platform-subhead mt-1">Simple for one creator. Ready for the whole org.</p>
      </div>

      <div ref={trackRef} className="stack-track no-scrollbar mt-12">
        <StackCard
          tone="1"
          title="Generate"
          body="Model agnostic. For everyone in the company."
          bg="/media/card-generate.jpg"
        >
          <CardVideo src="/media/card-generate.mp4" />
        </StackCard>
        <StackCard tone="2" title="Workflows" body="Build powerful, node-based AI pipelines.">
          <CardVideo src="/media/variable-demo.mp4" />
        </StackCard>
        <StackCard tone="3" title="Models" body="Every leading model, one interface.">
          <ModelsMock />
        </StackCard>
        <StackCard tone="4" title="Integrations" body="Fits into the tools your team already runs.">
          <div className="stack-embed">
            <IntegrationsGrid />
          </div>
        </StackCard>
        <StackCard tone="5" title="Control" body="Central governance and admin oversight.">
          <ControlMock />
        </StackCard>
      </div>

      <div className="container-page">
        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={() => scrollByCards(-1)} aria-label="Previous" className="stack-pager">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={() => scrollByCards(1)} aria-label="Next" className="stack-pager">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <div className="container-page">
        {/* Shared with the Business page's Z-fold — see components/AdminBento. */}
        <AdminBento className="mt-20 md:mt-28" />
      </div>

      <style>{`
        .platform-subhead { color: var(--ink-3); font-weight: 400; }

        .stack-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          /* Match .container-page's gutter so the first card lines up with the
             heading above it, instead of hugging the viewport edge. */
          padding-left: max(32px, calc((100vw - 1240px) / 2 + 32px));
          padding-right: max(32px, calc((100vw - 1240px) / 2 + 32px));
          scroll-behavior: smooth;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .stack-track { padding-left: 20px; padding-right: 20px; }
        }
        .stack-card {
          flex: 0 0 auto;
          width: clamp(260px, 27vw, 380px);
          height: clamp(420px, 46vw, 520px);
          border-radius: 20px 20px 0 0;
          padding: 28px 26px 0;
          display: flex;
          flex-direction: column;
          color: #fff;
          overflow: hidden;
        }
        /* A card with an image keeps its flat tone as the fallback fill, so
           nothing flashes before the image paints. */
        .stack-card {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .stack-tone-1 { background-color: #2b2a28; }
        .stack-tone-2 { background-color: #33393e; }
        .stack-tone-3 { background-color: #3d3b34; }
        .stack-tone-4 { background-color: #24302f; }
        .stack-tone-5 { background-color: #141414; }

        .stack-title { font-size: 19px; font-weight: 400; }
        .stack-body { margin-top: 8px; font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,0.6); max-width: 22ch; }
        .stack-arrow {
          margin-top: 16px;
          width: 34px; height: 34px;
          border-radius: 999px;
          display: grid; place-items: center;
          color: #fff;
          flex: 0 0 auto;
        }
        /* Embeds bleed to the card's edges and are clipped by it, so a demo
           reads as part of the card rather than a pasted-in box. */
        /* One 16:9 frame for every card, bottom-anchored, so the media lines
           up across cards regardless of each source's own ratio. Sources are
           full width and cropped only top/bottom — never at the sides, which
           is where trimming would actually cut content off. */
        .stack-embed {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 22px;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
        }
        .stack-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        /* Each model sits on its own lens rather than being separated by a
           divider rule — reads calmer, and matches the glass used elsewhere. */
        .models-list {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: #fff;
        }
        /* Flat translucent fill, no rim or shadow: the glass treatment read
           as a button and these are just a list. */
        .model-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.055);
        }
        .model-tick {
          width: 17px; height: 17px;
          border-radius: 999px;
          display: grid; place-items: center;
          flex: 0 0 auto;
          background: rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.85);
        }
        .model-name { font-size: 12.5px; letter-spacing: -0.01em; }

        .stack-mock {
          margin-top: auto;
          flex: 1;
          position: relative;
          min-height: 0;
        }
        .stack-pager {
          width: 38px; height: 38px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          color: var(--ink);
          display: grid; place-items: center;
        }
      `}</style>
    </section>
  );
}

/** Muted, looping product capture that fills the bottom of a card. */
function CardVideo({ src }: { src: string }) {
  return (
    <div className="stack-embed">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="stack-video"
        src={withBasePath(src)}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
    </div>
  );
}

function StackCard({
  tone,
  title,
  body,
  bg,
  children,
}: {
  tone: "1" | "2" | "3" | "4" | "5";
  title: string;
  body: string;
  /** Optional image backdrop; the flat tone stays underneath as the fill. */
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`stack-card stack-tone-${tone}`}
      style={
        bg
          ? { backgroundImage: `url(${withBasePath(bg)})` }
          : undefined
      }
    >
      <div className="stack-title">{title}</div>
      <p className="stack-body">{body}</p>
      <span className="stack-arrow glass">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <div className="stack-mock">{children}</div>
    </div>
  );
}


/* ── Models: real model names from the logo wall, as glass rows. ── */
function ModelsMock() {
  const rows = ["Gen-4 Image", "Gen-4 Video", "Kling AI", "MINIMAX"];
  return (
    <div className="models-list">
      {rows.map((r) => (
        <div key={r} className="model-row">
          <span className="model-tick" aria-hidden>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="model-name">{r}</span>
        </div>
      ))}
    </div>
  );
}


/* ── Control: the same credit-usage stat from the admin panel below. ── */
function ControlMock() {
  return (
    <div style={{ position: "absolute", left: 0, right: -8, bottom: 0, background: "#fff", borderRadius: "14px 0 0 0", padding: 12, color: "var(--ink)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10.5, color: "var(--ink-3)" }}>
        <span>Manage</span><span style={{ background: "var(--panel-2)", borderRadius: 999, padding: "3px 8px" }}>Live</span>
      </div>
      <div style={{ marginTop: 9, fontSize: 20, letterSpacing: "-0.01em" }}>3,504,195</div>
      <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Credits spent this month</div>
    </div>
  );
}
