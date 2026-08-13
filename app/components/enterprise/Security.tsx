import { SectionGuides } from "@/components/primitives/SectionGuides";

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
          <Tile grain="grain-mineral" n="01" title="SSO" body="Single sign-on across your identity provider, so access follows the org chart you already have.">
            <Graphic><IconPeople /></Graphic>
          </Tile>

          <Tile grain="grain-charcoal" n="02" title="SOC 2" body="Aligned to the highest security and audit standards, independently verified.">
            <Graphic><IconCheckCircle /></Graphic>
          </Tile>

          <Tile grain="grain-sand" n="03" title="Indemnification" body="Contract-backed legal coverage for the content your team produces.">
            <Graphic><IconScales /></Graphic>
          </Tile>

          <Tile grain="grain-olive" n="04" title="Provisioning" body="Central control over users, roles, and access, mirroring your org structure.">
            <Graphic><IconLayers /></Graphic>
          </Tile>

          <Tile grain="grain-teal" n="05" title="No data training" body="We never train our models on your data. It's processed, delivered, and not kept." wide>
            <div className="flow">
              <div className="flow-node">
                <span className="flow-chip"><IconPerson /></span>
                <span className="flow-label">Your data</span>
              </div>
              <span className="flow-line" />
              <div className="flow-node">
                <span className="flow-chip flow-chip-lg"><IconShield /></span>
                <span className="flow-label">Blocked in the boundary</span>
              </div>
              <span className="flow-x">×</span>
              <div className="flow-node">
                <span className="flow-chip flow-chip-dark"><IconSpark /></span>
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
          background: var(--grain-2);
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
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: var(--grain-chip, #fff);
          border: 1px solid var(--grain-chip-bd, var(--line));
          color: currentColor;
        }

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
          width: 48px; height: 48px; border-radius: 13px;
          display: grid; place-items: center; flex: 0 0 auto;
          background: var(--grain-chip, #fff); border: 1px solid var(--grain-chip-bd, var(--line)); color: currentColor;
        }
        .flow-chip-lg { width: 56px; height: 56px; border-radius: 15px; background: currentColor; border-color: transparent; }
        .flow-chip-lg svg { color: var(--grain-2); }
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
  children,
}: {
  n: string;
  title: string;
  body: string;
  wide?: boolean;
  /** Palette modifier from globals.css (.grain-fog / -sage / -moss / …). */
  grain?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`tile ${grain} ${wide ? "tile-wide" : ""}`}>
      <span className="tile-n">{n}</span>
      <div className="tile-title">{title}</div>
      <p className="tile-body">{body}</p>
      {children}
    </div>
  );
}

function Graphic({ children }: { children: React.ReactNode }) {
  return <div className="tile-graphic">{children}</div>;
}

/* ── icons (monochrome, single stroke/fill weight throughout) ── */
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
