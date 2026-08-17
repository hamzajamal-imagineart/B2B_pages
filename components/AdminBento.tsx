"use client";

import { CollaborationDemo } from "@/components/CollaborationDemo";
import { withBasePath } from "@/lib/assets";

/**
 * The four-tile admin bento.
 *
 * Lifted out of the Enterprise page's Control section so the Business page's
 * Z-fold renders the same component rather than a fork — both specs list the
 * identical four panels (complete admin control, efficient asset management,
 * unlimited members, collaborate end to end), and two copies would drift.
 *
 * Layout is 3 columns as [2,1] [1,2]: the two wide tiles carry the denser
 * dashboards (Guidelines §6).
 */
export function AdminBento({ className = "" }: { className?: string }) {
  return (
    <div className={`pbento ${className}`}>
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

      <style>{`
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
          background: var(--tile);
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

/* Fold 02, asset library — the real folders panel, in place of the search
   bar and grey placeholder thumbnails that stood here before. */
function AssetLibrary() {
  return (
    <div className="asset-shot">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBasePath("/media/admin/asset-folders.jpg")} alt="" aria-hidden />
      <style>{`
        /* The source is tall and portrait while the tile is wide, so it is
           anchored top-left and cropped from the bottom: that keeps the
           "Team folders" heading and the folder list in view. */
        .asset-shot {
          aspect-ratio: 16 / 10;
          border-radius: 16px;
          border: 1px solid var(--line);
          background: var(--panel);
          overflow: hidden;
        }
        .asset-shot img {
          display: block;
          width: 100%;
          height: auto;
        }
      `}</style>
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

/* Fold 04, collaboration — the live cursor demo shared with the Workflows
   page, in place of the illustrated review panel that stood here before. */
function CollabPanel() {
  return (
    <div className="collab-frame">
      <CollaborationDemo />
      <style>{`
        /* Sets the height the demo fills; it is otherwise 100% of its box. */
        .collab-frame { aspect-ratio: 16 / 9; }
      `}</style>
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
