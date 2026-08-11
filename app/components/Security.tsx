import Reveal from "./Reveal";

export default function Security() {
  return (
    <section id="security" className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div style={{ maxWidth: 720 }}>
          <Reveal>
            <h2 className="h2">Safe, secure, and built for the enterprise</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ marginTop: 18, maxWidth: 640 }}>
              Security isn&apos;t a feature you bolt on later, it&apos;s the
              foundation. Zero data retention, SOC&nbsp;2 compliance, enforced
              MFA, and full audit trails mean your creative work and your IP
              stay locked down and entirely yours.
            </p>
          </Reveal>
        </div>

        {/* Dark bento panel */}
        <Reveal delay={120}>
          <div className="bento-panel">
            <div className="bento-header">
              <span className="bento-eyebrow">Safety</span>
              <h3 className="bento-heading">Your data is fully protected</h3>
              <p className="bento-sub">
                Private workspaces, granular access control, and enterprise-grade
                security. Everything you create is cleared for commercial use.
              </p>
            </div>

            <div className="bento-grid">
              {/* SSO */}
              <div className="bcard" style={{ gridArea: "sso" }}>
                <div className="bcard-head">
                  <IconPeople />
                  <span className="btitle">SSO</span>
                </div>
                <p className="bbody">
                  <b>Single</b> sign-on across your identity provider
                </p>
              </div>

              {/* Indemnification */}
              <div className="bcard bcard-stack" style={{ gridArea: "indem" }}>
                <span className="btitle">Indemnification</span>
                <span className="chip-dark chip-center">
                  <IconScales />
                </span>
                <p className="bbody bbody-center">
                  <b>Contract-backed legal coverage</b> for your content
                </p>
              </div>

              {/* No data training (center) */}
              <div className="bcard bcard-center" style={{ gridArea: "center" }}>
                <span className="btitle btitle-lg">No data training</span>

                <div className="flow">
                  <div className="flow-node">
                    <span className="chip-accent">
                      <IconPerson />
                    </span>
                    <span className="flow-label">Your data</span>
                  </div>

                  <span className="flow-line" />

                  <div className="flow-node">
                    <span className="chip-accent chip-lg">
                      <IconShield />
                    </span>
                    <span className="flow-label">Blocked in the boundary</span>
                  </div>

                  <span className="flow-x">×</span>

                  <div className="flow-node">
                    <span className="chip-dark">
                      <IconSpark />
                    </span>
                    <span className="flow-label">AI model</span>
                  </div>
                </div>

                <div className="flow-pill">We never train our models on your data</div>
              </div>

              {/* Provisioning (image-backed) */}
              <div className="bcard bcard-image" style={{ gridArea: "provision" }}>
                <span aria-hidden className="bcard-image-bg" />
                <div className="bcard-image-inner">
                  <span className="btitle btitle-onimg">Provisioning</span>
                  <p className="bbody bbody-onimg">
                    Central control over users, roles, and access, mirror your
                    org structure
                  </p>
                </div>
              </div>

              {/* SOC 2 */}
              <div className="bcard" style={{ gridArea: "soc" }}>
                <div className="bcard-head">
                  <IconCheckCircle />
                  <span className="btitle">SOC 2</span>
                </div>
                <p className="bbody">
                  Aligned to the <b>highest</b> security and audit standards
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .bento-panel {
          margin-top: 44px;
          background: #fff;
          border-radius: var(--radius-lg);
          padding: clamp(16px, 2.4vw, 26px);
          border: 1px solid var(--line);
          box-shadow: 0 40px 90px -60px rgba(11,11,12,0.25);
        }
        .bento-header { text-align: center; padding: 14px 16px 30px; }
        .bento-eyebrow {
          font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-3); font-weight: 500;
        }
        .bento-heading {
          margin-top: 12px; text-transform: uppercase; color: var(--ink);
          font-size: clamp(1.5rem, 3vw, 2.15rem); letter-spacing: -0.02em; font-weight: 500;
        }
        .bento-sub {
          margin-top: 10px; max-width: 480px; margin-inline: auto;
          color: var(--ink-2); font-size: 14px; line-height: 1.5;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr;
          grid-template-areas: "sso center provision" "indem center soc";
          gap: 14px;
        }

        /* ── card shell ── */
        .bcard {
          position: relative;
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          min-height: 168px;
          overflow: hidden;
        }
        .bcard-head { display: flex; align-items: center; gap: 12px; }
        .bcard-stack { align-items: stretch; }
        .bcard-center { align-items: center; text-align: center; }

        /* ── carved gradient titles ── */
        .btitle {
          font-size: clamp(1.15rem, 1.9vw, 1.6rem);
          font-weight: 500;
          line-height: 1.05;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          overflow-wrap: anywhere;
          background: linear-gradient(180deg, #26262b 0%, #a6a6ac 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .btitle-lg { font-size: clamp(1.7rem, 3vw, 2.5rem); }
        .btitle-onimg {
          background: linear-gradient(180deg, #26262b 0%, #a6a6ac 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ── body copy: key phrase bright, rest muted ── */
        .bbody {
          margin-top: auto;
          padding-top: 18px;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--ink-3);
        }
        .bbody b { color: var(--ink); font-weight: 500; }
        .bbody-center { text-align: center; }

        /* ── icon chips ── */
        .chip-accent, .chip-dark {
          width: 52px; height: 52px; border-radius: 15px;
          display: grid; place-items: center; flex: 0 0 auto;
        }
        .chip-accent {
          color: #fff;
          background: linear-gradient(150deg, #a172ff 0%, var(--lime) 55%, #6f24e6 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35),
                      0 10px 22px -10px rgba(138,63,252,0.75);
        }
        .chip-lg {
          width: 60px; height: 60px; border-radius: 17px;
          background: linear-gradient(150deg, #b189ff 0%, #9a5bff 45%, var(--lime) 100%);
        }
        .chip-dark {
          color: var(--ink-2);
          background: var(--paper-3);
          border: 1px solid var(--line);
        }
        .chip-center { align-self: center; margin: 20px 0; }

        /* SSO / SOC 2 accent glyphs (no chip, just colored icon) */
        .bicon { width: 30px; height: 30px; color: var(--lime); flex: 0 0 auto; }

        /* ── flow diagram ── */
        .flow {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 12px;
          margin: 30px 0 24px;
          flex-wrap: wrap;
        }
        .flow-node {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          max-width: 96px;
        }
        .flow-label { font-size: 11px; color: var(--ink-2); line-height: 1.3; }
        .flow-line {
          width: 28px; height: 2px; border-radius: 2px; margin-top: 25px;
          background: linear-gradient(90deg, var(--lime), rgba(138,63,252,0.25));
        }
        .flow-x { margin-top: 16px; font-size: 18px; color: var(--ink-3); }
        .flow-pill {
          font-size: 12px; color: var(--ink-2);
          background: var(--paper-2);
          border: 1px solid var(--line);
          border-radius: 999px; padding: 9px 16px; align-self: center;
        }

        /* ── provisioning image card ── */
        .bcard-image { padding: 0; }
        .bcard-image-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(90% 55% at 50% 0%, rgba(138,63,252,0.07), transparent 62%),
            repeating-linear-gradient(90deg, rgba(11,11,12,0.04) 0 1px, transparent 1px 34px),
            linear-gradient(180deg, #f4f4f2 0%, #ededeb 62%, #e7e7e4 100%);
        }
        .bcard-image-bg::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(255,255,255,0.45) 100%);
        }
        .bcard-image-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; justify-content: flex-end;
          height: 100%; padding: 24px;
        }
        .bbody-onimg { color: var(--ink-2); }
        .bbody-onimg b { color: var(--ink); }

        @media (max-width: 880px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas: "center center" "sso provision" "indem soc";
          }
        }
        @media (max-width: 560px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "center" "sso" "indem" "provision" "soc";
          }
        }
      `}</style>
    </section>
  );
}

/* ── icons ── */
function IconPeople() {
  return (
    <svg className="bicon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="9" cy="7.5" r="3.2" />
      <path d="M2.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6v.5h-13V19z" />
      <circle cx="17.3" cy="6.4" r="2.5" />
      <path d="M15.2 12.4c3 .1 5.3 2.1 5.3 5.1v.5h-3.2c0-2.2-.8-4.1-2.1-5.6z" />
    </svg>
  );
}
function IconCheckCircle() {
  return (
    <svg className="bicon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M7.5 12.2l3 3 6-6.4" stroke="#12210a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconScales() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 8h14l-3.2 5.2H8.2L5 8z" />
      <path d="M5 8L2.6 13.2M19 8l2.4 5.2" />
    </svg>
  );
}
function IconPerson() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c0-3.9 3.1-6.4 7-6.4s7 2.5 7 6.4v.5H5V20z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.5l7.5 3.2v5.6c0 4.8-3.2 8-7.5 9.7-4.3-1.7-7.5-4.9-7.5-9.7V5.7L12 2.5z" fill="rgba(255,255,255,0.14)" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.4 12l2.6 2.6 4.6-5" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5z" />
    </svg>
  );
}
