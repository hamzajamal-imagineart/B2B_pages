"use client";

import { SectionGuides } from "@/components/primitives/SectionGuides";

import { useRef } from "react";
import { withBasePath } from "@/lib/assets";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";

/** Same origin the footer links against. */
const IA = "https://www.imagine.art";

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
          href={`${IA}/ai-image-generator`}
          title="Generate"
          body="Model agnostic. For everyone in the company."
          bg="/media/card-generate.jpg"
        >
          <GenerateMock />
        </StackCard>
        <StackCard tone="2" href={`${IA}/workflow`} title="Workflows" body="Build powerful, node-based AI pipelines.">
          <CardVideo src="/media/variable-demo.mp4" />
        </StackCard>
        <StackCard tone="3" href={`${IA}/ai-video-generator`} title="Models" body="Every leading model, one interface." bg="/media/card-models.jpg" scrim>
          <ModelsMock />
        </StackCard>
        <StackCard tone="4" href={`${IA}/imagine-computer`} title="Integrations" body="Fits into the tools your team already runs.">
          {/* Fills the card's remaining height rather than sitting in the
              16:9 embed frame: the grid has no fixed aspect of its own, and
              at 16:9 pinned to the bottom the logos bunched at the base of
              the card. Vignette off, so the marks stay evenly lit. */}
          <div className="stack-fill">
            <IntegrationsGrid vignette={false} />
          </div>
        </StackCard>
        <StackCard tone="5" href={`${IA}/teams-plan`} title="Control" body="Central governance and admin oversight.">
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
          /* Room for the hover scale. overflow-x: auto coerces overflow-y to
             auto, so a card that grows past the track's box gets clipped
             instead of overflowing it. Padding is the only fix that keeps the
             horizontal scroll. */
          padding-block: 12px;
        }
        @media (max-width: 768px) {
          .stack-track { padding-left: 20px; padding-right: 20px; }
        }
        .stack-card {
          flex: 0 0 auto;
          width: clamp(260px, 27vw, 380px);
          height: clamp(420px, 46vw, 520px);
          /* Full radius. These were square-bottomed to bleed into the admin
             bento that used to close this section; with the bento moved into
             WorkflowsSection the rail ends here, and a flat bottom edge read
             as the cards being cut off. */
          border-radius: 20px;
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

        /* Subtle lift on hover, compositor-only and CSS-driven: §2 rules out
           JS hover handlers. Cancelled under reduced motion. */
        .stack-card {
          text-decoration: none;
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .stack-card:hover { transform: scale(1.015); }
        .stack-card:focus-visible { transform: scale(1.015); }
        @media (prefers-reduced-motion: reduce) {
          .stack-card { transition: none; }
          .stack-card:hover, .stack-card:focus-visible { transform: none; }
        }

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
        /* Same clip as .stack-embed, but top-anchored and free of a fixed
           ratio, so content starts right under the card's copy. */
        .stack-fill {
          position: absolute;
          inset: 0 0 22px 0;
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
        /* Both built mocks sit on the same white sheet, anchored to the
           card's bottom edge and bleeding off it. */
        .mock-sheet {
          position: absolute;
          left: 0;
          right: -8px;
          bottom: 0;
          background: #fff;
          border-radius: 14px 0 0 0;
          padding: 12px;
          color: var(--ink);
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
  scrim,
  href,
  children,
}: {
  tone: "1" | "2" | "3" | "4" | "5";
  title: string;
  body: string;
  /** Optional image backdrop; the flat tone stays underneath as the fill. */
  bg?: string;
  /** Darken a bright photograph so the white copy over it still reads. Layered
   *  as a gradient in background-image rather than a pseudo-element: the card
   *  is not a positioned ancestor, so an absolute overlay would escape it. */
  scrim?: boolean;
  /** Destination on imagine.art. */
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={title}
      className={`stack-card stack-tone-${tone}`}
      style={
        bg
          ? {
              backgroundImage: [
                scrim &&
                  "linear-gradient(to bottom, rgba(12,16,14,0.62) 0%, rgba(12,16,14,0.34) 42%, rgba(12,16,14,0.70) 100%)",
                `url(${withBasePath(bg)})`,
              ]
                .filter(Boolean)
                .join(", "),
            }
          : undefined
      }
    >
      <div className="stack-title">{title}</div>
      <p className="stack-body">{body}</p>
      <span className="stack-arrow glass">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <div className="stack-mock">{children}</div>
    </a>
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


/* ── Generate: the prompt surface, built rather than captured. One field, a
   model row, and a result strip, which is the whole claim of the card: any
   model, one place, for everyone. ── */
function GenerateMock() {
  return (
    <div className="mock-sheet">
      <div className="gm-prompt">
        <span className="gm-caret" aria-hidden />
        A product shot on wet stone, morning light
      </div>

      <div className="gm-models">
        {["ImagineArt 2.0", "Flux 2", "Seedance"].map((m, i) => (
          <span key={m} className={`gm-chip ${i === 0 ? "gm-chip-on" : ""}`}>{m}</span>
        ))}
      </div>

      <div className="gm-strip" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="gm-frame" style={{ opacity: 1 - i * 0.22 }} />
        ))}
      </div>

      <style>{`
        .gm-prompt {
          display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; color: var(--ink-2);
          border: 1px solid var(--line); border-radius: 9px;
          padding: 9px 10px;
        }
        .gm-caret { width: 1.5px; height: 12px; background: var(--ink); flex: 0 0 auto; }
        .gm-models { display: flex; gap: 5px; margin-top: 9px; }
        .gm-chip {
          font-size: 10.5px; padding: 4px 9px; border-radius: 999px;
          border: 1px solid var(--line); color: var(--ink-3);
        }
        .gm-chip-on { background: var(--ink); border-color: var(--ink); color: #fff; }
        .gm-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 10px; }
        .gm-frame {
          aspect-ratio: 1 / 1; border-radius: 6px;
          background: var(--panel-2); border: 1px solid var(--line);
        }
      `}</style>
    </div>
  );
}

/* ── Control: the admin panel in miniature. The spend figure matches the
   bento's usage panel, so the two cannot disagree on the same page. ── */
function ControlMock() {
  return (
    <div className="mock-sheet">
      <div className="cm-head">
        <span>Manage</span>
        <span className="cm-live">Live</span>
      </div>

      <div className="cm-big">3,504,195</div>
      <div className="cm-cap">Credits spent this month</div>

      <div className="cm-bar" aria-hidden>
        {[46, 28, 17, 9].map((w, i) => (
          <span key={i} style={{ width: `${w}%`, opacity: 1 - i * 0.22 }} />
        ))}
      </div>

      <ul className="cm-rows">
        {[["Seats", "Unlimited"], ["Roles", "4 configured"]].map(([k, v]) => (
          <li key={k}><span>{k}</span><span className="cm-v">{v}</span></li>
        ))}
      </ul>

      <style>{`
        .cm-head {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 10.5px; color: var(--ink-3);
        }
        .cm-live { background: var(--panel-2); border-radius: 999px; padding: 3px 8px; }
        .cm-big { margin-top: 9px; font-size: 20px; letter-spacing: -0.01em; }
        .cm-cap { font-size: 11px; color: var(--ink-3); }
        .cm-bar { display: flex; gap: 3px; margin-top: 10px; }
        .cm-bar span { height: 5px; border-radius: 3px; background: var(--ink); }
        .cm-rows { list-style: none; margin: 10px 0 0; padding: 0; font-size: 11px; color: var(--ink-3); }
        .cm-rows li {
          display: flex; justify-content: space-between;
          padding: 6px 0; border-top: 1px solid var(--line);
        }
        .cm-v { color: var(--ink); }
      `}</style>
    </div>
  );
}
