import Reveal from "./Reveal";

export default function Control() {
  return (
    <section id="control" className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        {/* Z-fold, 4 folds, alternating text / visual down the page */}
        <div className="folds">
          <Fold
            title="Complete admin control"
            body="One dashboard for your entire organization. Manage roles, monitor usage, and govern access across every team without losing visibility."
            visual={<UsagePanel />}
          />
          <Fold
            flip
            title="Efficient asset management"
            body="Every generation organized, searchable, and on-brand. Find what you made, reuse what works, and never lose an asset again."
            visual={<AssetLibrary />}
          />
          <Fold
            title="Unlimited members, no added cost"
            body="Bring your whole team. Seats don't cost extra, so creativity is never gated by your headcount or your budget."
            visual={<MembersPanel />}
          />
          <Fold
            flip
            title="Collaborate end to end"
            body="Comments, approvals, and shared review built in, so feedback happens where the work lives, not scattered across emails and threads."
            visual={<CollabPanel />}
          />
        </div>
      </div>

      <style>{`
        .folds { margin-top: 0; }
        .fold-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 86px);
          align-items: center;
          padding-block: clamp(36px, 5vw, 72px);
        }
        .fold-row + .fold-row { border-top: 1px solid var(--line); }
        .fold-row[data-flip="true"] .fold-text { order: 2; }
        .fold-title {
          font-size: clamp(1.5rem, 2.6vw, 2.1rem);
          letter-spacing: -0.025em; line-height: 1.1; font-weight: 500;
        }
        .fold-body {
          margin-top: 14px; max-width: 440px;
          color: var(--ink-2); font-size: clamp(1rem, 1.3vw, 1.12rem); line-height: 1.5;
        }
        .fold-visual { min-width: 0; }
        @media (max-width: 860px) {
          .fold-row { grid-template-columns: 1fr; gap: 26px; }
          .fold-row .fold-text { order: 2 !important; }
          .fold-row .fold-visual { order: 1; }
        }
      `}</style>
    </section>
  );
}

function Fold({
  title,
  body,
  visual,
  flip,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="fold-row" data-flip={flip ? "true" : "false"}>
      <Reveal className="fold-text">
        <h3 className="fold-title">{title}</h3>
        <p className="fold-body">{body}</p>
      </Reveal>
      <Reveal delay={90} className="fold-visual">
        <div className="viz-shell">{visual}</div>
      </Reveal>
    </div>
  );
}

/* ── Shared dark visual shell ── */
// (styling lives in globals: .viz-shell / .viz-panel etc.)

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
          <div style={{ color: "var(--ink)", fontSize: 26, letterSpacing: "-0.02em" }}>3,504,195</div>
          <div style={{ color: "var(--ink-3)", fontSize: 13 }}>Credits spent</div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            <Legend c="var(--lime)" label="Video" />
            <Legend c="#8a7bff" label="Image" />
            <Legend c="#57e3b0" label="Audio / Speech" />
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
  const tiles = [
    "linear-gradient(135deg,#5b6cff,#9b5bff)",
    "linear-gradient(135deg,#ff7a59,#ffbf59)",
    "linear-gradient(135deg,#22c7a9,#57e3b0)",
    "linear-gradient(135deg,#ec5cff,#ff8bd0)",
    "linear-gradient(135deg,#3a8bff,#5be0ff)",
    "linear-gradient(135deg,#ffd166,#ff9f45)",
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
          <div key={i} style={{ aspectRatio: "1 / 1", borderRadius: 10, background: g, position: "relative" }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: 10, background: "radial-gradient(80% 60% at 50% 120%, rgba(0,0,0,0.28), transparent)" }} />
          </div>
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
      {/* preview with comment pins */}
      <div style={{ marginTop: 14, position: "relative", aspectRatio: "16 / 8", borderRadius: 12, background: "linear-gradient(135deg,#2b2f4a,#4a3d6b)", overflow: "hidden" }}>
        <span style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 70% 30%, rgba(255,255,255,0.14), transparent)" }} />
        <Pin x="26%" y="34%" n="1" />
        <Pin x="63%" y="60%" n="2" />
      </div>
      {/* comment threads */}
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <Comment initial="M" name="Maya" text="Love this direction, can we warm up the grade?" />
        <Comment initial="A" name="Alina" text="Approved for the Q3 launch set. 🎬" lime />
      </div>
    </div>
  );
}

/* ── small shared bits (light mode) ── */
function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 500 }}>
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
    <div style={{ flex: 1, background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px" }}>
      <div style={{ color: "var(--ink)", fontSize: 17, letterSpacing: "-0.01em" }}>{value}</div>
      <div style={{ color: "var(--ink-3)", fontSize: 11, marginTop: 3 }}>{label}</div>
    </div>
  );
}
function Ring() {
  return (
    <div style={{ position: "relative", width: 104, height: 104, flex: "0 0 auto" }}>
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx="52" cy="52" r="43" fill="none" stroke="rgba(11,11,12,0.08)" strokeWidth="11" />
        <circle cx="52" cy="52" r="43" fill="none" stroke="var(--lime)" strokeWidth="11" strokeLinecap="round" strokeDasharray="270" strokeDashoffset="76" transform="rotate(-90 52 52)" />
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
      <span style={{ color: role === "Owner" ? "var(--lime-deep)" : "var(--ink-2)" }}>{role}</span>
      <span style={{ color: "var(--ink-3)", textAlign: "right" }}>{spend}</span>
    </div>
  );
}
function Toggle({ label, on }: { label: string; on: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px" }}>
      <span style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.3 }}>{label}</span>
      <span style={{ width: 34, height: 20, borderRadius: 999, background: on ? "var(--lime)" : "rgba(11,11,12,0.14)", position: "relative", flex: "0 0 auto" }}>
        <span style={{ position: "absolute", top: 2, left: on ? 16 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(11,11,12,0.28)" }} />
      </span>
    </div>
  );
}
function Pin({ x, y, n }: { x: string; y: string; n: string }) {
  return (
    <span style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", width: 24, height: 24, borderRadius: "50% 50% 50% 2px", background: "var(--lime)", color: "var(--lime-ink)", display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 500, boxShadow: "0 6px 16px -6px rgba(0,0,0,0.6)" }}>
      {n}
    </span>
  );
}
function Comment({ initial, name, text, lime }: { initial: string; name: string; text: string; lime?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: "50%", background: lime ? "var(--lime)" : "var(--paper-3)", color: lime ? "var(--lime-ink)" : "var(--ink)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 500 }}>
        {initial}
      </span>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "8px 12px" }}>
        <span style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500 }}>{name}</span>
        <p style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2, lineHeight: 1.4 }}>{text}</p>
      </div>
    </div>
  );
}
function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.2-3.2" strokeLinecap="round" /></svg>;
}
function CheckMini() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
