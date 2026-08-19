import { SectionGuides } from "@/components/primitives/SectionGuides";
import { withBasePath } from "@/lib/assets";

export default function Security() {
  return (
    <section id="security" className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0">
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[640px]">
          <p className="eyebrow">Security</p>
          <h2 className="h2 mt-4">
            Safe, secure,{" "}
            <span className="h-muted">and built for the enterprise</span>
          </h2>
          <p className="lede mt-5">
            Security isn&apos;t a feature you bolt on later, it&apos;s the
            foundation. Everything you create stays locked down and entirely
            yours.
          </p>
        </div>

        <div className="bento mt-14">
          <Tile grain="grain-mineral" n="01" title="SSO and MFA" body="Single sign-on across your identity provider, with multi-factor enforced on every account, so access follows the org chart you already have.">
            <Graphic><IconPeople /></Graphic>
          </Tile>

          <Tile grain="grain-charcoal" bg="/media/card-soc2.jpg" n="02" title="SOC 2 Type II" body="Independently audited controls you can verify, aligned to the highest security and audit standards.">
            <Graphic><IconCheckCircle /></Graphic>
          </Tile>

          <Tile grain="grain-sand" n="03" title="Your IP stays yours" body="Full commercial rights to everything you generate, with contract-backed legal coverage for the content your team produces.">
            <Graphic><IconScales /></Graphic>
          </Tile>

          <Tile grain="grain-olive" n="04" title="Centralized admin control" body="One dashboard for the whole organization: role-based access, and usage visibility across every team.">
            <Graphic><IconLayers /></Graphic>
          </Tile>

          <Tile grain="grain-steel" n="05" title="Encrypted end to end" body="Protected at rest and in transit, at every stage of the pipeline.">
            <Graphic><IconLock /></Graphic>
          </Tile>

          <Tile grain="grain-mineral" n="06" title="Full audit trail" body="Every action logged and traceable, for complete accountability.">
            <Graphic><IconTrail /></Graphic>
          </Tile>

          <Tile grain="grain-teal" bg="/media/card-generate-wide.jpg" n="07" title="Zero data retention" body="Your prompts and outputs are never stored or used to train models. Processed, delivered, and not kept." wide>
            <div className="flow">
              <div className="flow-node">
                <span className="flow-chip glass"><IconPerson /></span>
                <span className="flow-label">Your data</span>
              </div>
              <span className="flow-line" />
              <div className="flow-node">
                <span className="flow-chip flow-chip-lg glass glass-strong"><IconShield /></span>
                <span className="flow-label">Blocked in the boundary</span>
              </div>
              <span className="flow-x">×</span>
              <div className="flow-node">
                <span className="flow-chip glass"><IconSpark /></span>
                <span className="flow-label">AI model</span>
              </div>
            </div>
          </Tile>
        </div>
      </div>

      <style>{`
        .bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .tile {
          position: relative;
          grid-column: span 1;
          background-color: var(--grain-2);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: var(--grain-fg);
          min-height: 320px;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          padding: 32px;
          overflow: hidden;
        }
        .tile-wide { grid-column: span 2; min-height: 280px; }

        .tile-n {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: currentColor;
          opacity: 0.55;
        }
        .tile-title {
          margin-top: 12px;
          font-size: clamp(20px, 1.8vw, 26px);
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .tile-body {
          margin-top: 10px;
          max-width: 34ch;
          font-size: 15px;
          line-height: 1.55;
          color: currentColor;
          opacity: 0.72;
        }

        /* Small isolated graphic, pinned to the bottom-right with room to
           breathe — the tile's copy never competes with it for space. */
        .tile-graphic {
          margin-top: auto;
          align-self: flex-end;
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          color: currentColor;
        }
        .tile-graphic svg { width: 20px; height: 20px; }

        .flow {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .flow-node {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          max-width: 108px;
        }
        .flow-label { font-size: 12px; color: currentColor; opacity: 0.75; line-height: 1.35; text-align: center; }
        .flow-chip {
          width: 44px; height: 44px; border-radius: 14px;
          display: grid; place-items: center; flex: 0 0 auto;
          color: currentColor;
        }
        .flow-chip svg { width: 20px; height: 20px; }
        /* One step up: it's the focal node of the diagram. */
        .flow-chip-lg { width: 52px; height: 52px; border-radius: 16px; }
        .flow-chip-lg svg { width: 22px; height: 22px; }
        .flow-chip-lg svg { color: #fff; }
        .flow-line { width: 28px; height: 1px; margin-top: 24px; background: currentColor; opacity: 0.3; }
        .flow-x { margin-top: 14px; font-size: 16px; color: currentColor; opacity: 0.5; }

        @media (max-width: 640px) {
          .bento { grid-template-columns: 1fr; }
          .tile-wide { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
}

function Tile({
  n,
  title,
  body,
  wide,
  grain = "grain-mineral",
  bg,
  children,
}: {
  n: string;
  title: string;
  body: string;
  wide?: boolean;
  /** Optional image backdrop; the palette fill stays underneath as fallback. */
  bg?: string;
  /** Palette modifier from globals.css (.grain-fog / -sage / -moss / …). */
  grain?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`tile ${grain} ${wide ? "tile-wide" : ""}`}
      style={bg ? { backgroundImage: `url(${withBasePath(bg)})` } : undefined}
    >
      <span className="tile-n">{n}</span>
      <div className="tile-title">{title}</div>
      <p className="tile-body">{body}</p>
      {children}
    </div>
  );
}

function Graphic({ children }: { children: React.ReactNode }) {
  return <div className="tile-graphic glass glass-on-light">{children}</div>;
}

/* ── icons (monochrome, single stroke/fill weight throughout) ── */
function IconLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10.5" width="16" height="9.5" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconTrail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 6.5h14M5 12h14M5 17.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="19" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="9" cy="7.5" r="3.2" />
      <path d="M2.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6v.5h-13V19z" />
      <circle cx="17.3" cy="6.4" r="2.5" />
      <path d="M15.2 12.4c3 .1 5.3 2.1 5.3 5.1v.5h-3.2c0-2.2-.8-4.1-2.1-5.6z" />
    </svg>
  );
}
function IconCheckCircle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 12.2l3 3 6-6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconScales() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 8h14l-3.2 5.2H8.2L5 8z" />
      <path d="M5 8L2.6 13.2M19 8l2.4 5.2" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  );
}
function IconPerson() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c0-3.9 3.1-6.4 7-6.4s7 2.5 7 6.4v.5H5V20z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.5l7.5 3.2v5.6c0 4.8-3.2 8-7.5 9.7-4.3-1.7-7.5-4.9-7.5-9.7V5.7L12 2.5z" fill="rgba(255,255,255,0.16)" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.4 12l2.6 2.6 4.6-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5z" />
    </svg>
  );
}
