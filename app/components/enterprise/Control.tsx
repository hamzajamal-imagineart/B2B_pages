"use client";

import { SectionGuides } from "@/components/primitives/SectionGuides";

import { useRef } from "react";
import { withBasePath } from "@/lib/assets";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";

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
        {/* Bento. 4 items / 3 cols tiles exactly as [2,1] [1,2] (Guidelines
            §6) — the two wide tiles carry the denser dashboards. */}
        <div className="pbento mt-20 md:mt-28">
          <Tile
            wide
            title="Complete Admin Control"
            body="One dashboard for your entire organization. Manage roles, monitor usage, and govern access across every team without losing visibility."
            visual={<UsagePanel />}
          />
          <Tile
            title="Efficient Asset Management"
            body="Every generation organized, searchable, and on-brand."
            visual={<AssetLibrary />}
          />
          <Tile
            title="Unlimited Members, No Added Cost"
            body="Bring your whole team. Seats don't cost extra."
            visual={<MembersPanel />}
          />
          <Tile
            wide
            title="Collaborate End to End"
            body="Comments, approvals, and shared review built in, so feedback happens where the work lives, not scattered across emails and threads."
            visual={<CollabPanel />}
          />
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
          bottom: 0;
          aspect-ratio: 16 / 9;
          border-radius: 14px 0 0 0;
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

        .pbento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (min-width: 768px) {
          .pbento { grid-auto-rows: minmax(400px, auto); }
        }
        .ptile {
          grid-column: span 1;
          display: flex;
          flex-direction: column;
          background: #e5ece5;
          border-radius: 24px;
          padding: 32px 32px 0;
          overflow: hidden;
        }
        .ptile-wide { grid-column: span 2; }
        .ptile-title {
          font-size: clamp(20px, 1.8vw, 26px);
          letter-spacing: -0.015em; line-height: 1.15; font-weight: 400;
        }
        /* Narrow tiles get a tighter measure than wide ones. */
        .ptile-body {
          margin-top: 10px;
          max-width: 34ch;
          color: var(--ink-3); font-size: 15px; line-height: 1.55;
        }
        .ptile-wide .ptile-body { max-width: 52ch; }
        /* Media absorbs the leftover height and is pinned to the bottom, so a
           tile grows rather than clipping its own dashboard. */
        .ptile-media {
          margin-top: auto;
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: flex-end;
          padding-top: 28px;
        }
        /* Bare wrapper: the dashboard inside is already a white bordered
           card, so a second white surface behind it just doubled the frame. */
        .ptile-surface { width: 100%; }
        @media (max-width: 900px) {
          .pbento { grid-template-columns: 1fr; }
          .ptile, .ptile-wide { grid-column: span 1; }
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

function Tile({
  title,
  body,
  visual,
  wide,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`ptile ${wide ? "ptile-wide" : ""}`}>
      <h3 className="ptile-title">{title}</h3>
      <p className="ptile-body">{body}</p>
      <div className="ptile-media">
        <div className="ptile-surface">{visual}</div>
      </div>
    </div>
  );
}

/* Fold 01, usage dashboard */
function UsagePanel() {
  return (
    <div className="viz-panel">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <PanelLabel>Manage</PanelLabel>
        <span className="viz-chip">Live</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
        <Ring />
        <div>
          <div style={{ color: "var(--ink)", fontSize: 26, letterSpacing: "-0.5px" }}>3,504,195</div>
          <div style={{ color: "var(--ink-3)", fontSize: 13 }}>Credits spent</div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            <Legend c="#171717" label="Video" />
            <Legend c="#7a7a7a" label="Image" />
            <Legend c="#c9c9c9" label="Audio / Speech" />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <Stat value="295,843" label="Total jobs run" />
        <Stat value="455" label="Unique users" />
        <Stat value="104" label="Models used" />
      </div>
    </div>
  );
}

/* Fold 02, asset library */
function AssetLibrary() {
  // Monochrome placeholder tiles — real thumbnails would supply the colour.
  const tiles = [
    "linear-gradient(135deg,#d8d8d8,#bdbdbd)",
    "linear-gradient(135deg,#cbcbcb,#a9a9a9)",
    "linear-gradient(135deg,#e0e0e0,#c6c6c6)",
    "linear-gradient(135deg,#c2c2c2,#9f9f9f)",
    "linear-gradient(135deg,#dcdcdc,#b8b8b8)",
    "linear-gradient(135deg,#d0d0d0,#b0b0b0)",
  ];
  return (
    <div className="viz-panel">
      <div className="viz-search">
        <SearchIcon />
        <span>Search 12,480 assets…</span>
        <span style={{ marginLeft: "auto" }} className="viz-chip">On-brand</span>
      </div>
      <div style={{ display: "flex", gap: 7, marginTop: 12, flexWrap: "wrap" }}>
        {["All", "Images", "Video", "Campaigns", "Logos"].map((f, i) => (
          <span key={f} className={i === 0 ? "viz-filter viz-filter-on" : "viz-filter"}>{f}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 12 }}>
        {tiles.map((g, i) => (
          <div key={i} style={{ aspectRatio: "1 / 1", borderRadius: 10, background: g }} />
        ))}
      </div>
    </div>
  );
}

/* Fold 03, members / unlimited seats */
function MembersPanel() {
  return (
    <div className="viz-panel">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <PanelLabel>Access management</PanelLabel>
        <span className="viz-chip">Unlimited seats · $0</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column" }}>
        <Row email="alina@imagine.art" role="Owner" spend="No limit" you />
        <Row email="kadir@imagine.art" role="Admin" spend="500 / 2.5k" />
        <Row email="maya@imagine.art" role="Editor" spend="120 / 1k" />
        <Row email="devon@imagine.art" role="Editor" spend="88 / 1k" />
      </div>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Toggle label="Auto-refill credits" on={false} />
        <Toggle label="Top-up credits" on />
      </div>
    </div>
  );
}

/* Fold 04, collaboration / approvals */
function CollabPanel() {
  return (
    <div className="viz-panel">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <PanelLabel>Review</PanelLabel>
        <span className="viz-chip viz-chip-approved"><CheckMini /> Approved</span>
      </div>
      <div style={{ marginTop: 14, position: "relative", aspectRatio: "16 / 8", borderRadius: 12, background: "linear-gradient(135deg,#3a3a3a,#6b6b6b)", overflow: "hidden" }}>
        <Pin x="26%" y="34%" n="1" />
        <Pin x="63%" y="60%" n="2" />
      </div>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <Comment initial="M" name="Maya" text="Love this direction, can we warm up the grade?" />
        <Comment initial="A" name="Alina" text="Approved for the Q3 launch set." solid />
      </div>
    </div>
  );
}

/* ── small shared bits ── */
function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 600 }}>
      {children}
    </span>
  );
}
function Legend({ c, label }: { c: string; label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--ink-2)" }}>
      <span style={{ width: 8, height: 8, borderRadius: 2, background: c }} /> {label}
    </span>
  );
}
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ flex: 1, background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px" }}>
      <div style={{ color: "var(--ink)", fontSize: 17, letterSpacing: "-0.5px" }}>{value}</div>
      <div style={{ color: "var(--ink-3)", fontSize: 11, marginTop: 3 }}>{label}</div>
    </div>
  );
}
function Ring() {
  return (
    <div style={{ position: "relative", width: 104, height: 104, flex: "0 0 auto" }}>
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx="52" cy="52" r="43" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="11" />
        <circle cx="52" cy="52" r="43" fill="none" stroke="var(--ink)" strokeWidth="11" strokeLinecap="round" strokeDasharray="270" strokeDashoffset="76" transform="rotate(-90 52 52)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--ink)", fontSize: 14 }}>72%</div>
    </div>
  );
}
function Row({ email, role, spend, you }: { email: string; role: string; spend: string; you?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.9fr 1fr", alignItems: "center", gap: 8, padding: "10px 4px", borderBottom: "1px solid var(--line)", fontSize: 12.5 }}>
      <span style={{ color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {email} {you && <span style={{ color: "var(--ink-3)" }}>(you)</span>}
      </span>
      <span style={{ color: role === "Owner" ? "var(--ink)" : "var(--ink-2)", fontWeight: role === "Owner" ? 500 : 400 }}>{role}</span>
      <span style={{ color: "var(--ink-3)", textAlign: "right" }}>{spend}</span>
    </div>
  );
}
function Toggle({ label, on }: { label: string; on: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px" }}>
      <span style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.3 }}>{label}</span>
      <span style={{ width: 34, height: 20, borderRadius: 999, background: on ? "var(--ink)" : "rgba(0,0,0,0.14)", position: "relative", flex: "0 0 auto" }}>
        <span style={{ position: "absolute", top: 2, left: on ? 16 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
      </span>
    </div>
  );
}
function Pin({ x, y, n }: { x: string; y: string; n: string }) {
  return (
    <span style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", width: 24, height: 24, borderRadius: "50% 50% 50% 2px", background: "#fff", color: "var(--ink)", display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 500 }}>
      {n}
    </span>
  );
}
function Comment({ initial, name, text, solid }: { initial: string; name: string; text: string; solid?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: "50%", background: solid ? "var(--ink)" : "var(--panel-2)", color: solid ? "#fff" : "var(--ink)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 500 }}>
        {initial}
      </span>
      <div style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "8px 12px" }}>
        <span style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500 }}>{name}</span>
        <p style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2, lineHeight: 1.4 }}>{text}</p>
      </div>
    </div>
  );
}
function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.2-3.2" strokeLinecap="round" /></svg>;
}
function CheckMini() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
