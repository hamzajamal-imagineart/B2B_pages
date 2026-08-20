"use client";

import { useState } from "react";
import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * "Built for Enterprise" — the tab rail from the content spec.
 *
 * This one block absorbs three sections of the spec: "Your data stays yours",
 * "Secure by design" and "Centralized admin control". Run as separate sections
 * they restate SSO / SOC 2 / no-training / admin oversight, which the
 * Enterprise page already covers in its five-tile Security bento — the two
 * pages would have read as near-duplicates. Every line of copy survives; only
 * the section count changed.
 *
 * Left rail is the tab list, right column the panel. Implemented with the
 * WAI-ARIA tab pattern (roving tabindex + arrow keys) since it is a real tab
 * set, not a link list.
 */
type Item = { title: string; body: string };
type Tab = { id: string; label: string; items: Item[] };

export const PLATFORM_ENTERPRISE: Tab[] = [
  {
    id: "secure",
    label: "Scalable and Secure",
    items: [
      { title: "We don't train on your data", body: "Your prompts and outputs are never stored or used to train models." },
      { title: "SOC 2 Type 2", body: "Independently audited controls you can verify." },
      { title: "Encrypted at rest and in transit", body: "Your data protected at every stage." },
      { title: "Single Sign On (SSO) and MFA", body: "Multi-factor authentication enforced across every account." },
      { title: "Full ownership of your outputs", body: "Full commercial rights to everything you generate." },
      { title: "Full audit trail", body: "Every action logged and traceable for complete accountability." },
    ],
  },
  {
    id: "impact",
    label: "Transformative and Impactful",
    items: [
      { title: "Unlock bigger possibilities", body: "Turn impossible ideas into realities." },
      { title: "Smaller budgets", body: "10x your creative output at 10% the cost." },
      { title: "Creative control", body: "Your brand, your style, your IP, own what you create." },
    ],
  },
  {
    id: "admin",
    label: "Centralized Admin Control",
    items: [
      { title: "Centralized admin dashboard", body: "Manage your entire organization from one place." },
      { title: "Role-based access controls", body: "Grant the right permissions to the right people." },
      { title: "Usage visibility", body: "See who's creating what, and track spend across teams." },
    ],
  },
  {
    id: "teams",
    label: "Workflows for Every Team and Industry",
    items: [
      { title: "Platform", body: "Allowing creatives to ideate and execute with state of the art AI models, tools and workflows." },
      { title: "API", body: "Empowering developers to integrate the most powerful AI models directly into your apps, websites, custom pipelines and products." },
    ],
  },
];

export default function BuiltForEnterprise({
  tabs = PLATFORM_ENTERPRISE,
  heading = "Built for Enterprise",
  muted,
}: {
  tabs?: Tab[];
  heading?: string;
  /** Second clause, in the palette's light tint. */
  muted?: string;
} = {}) {
  const TABS = tabs;
  const [active, setActive] = useState(0);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + TABS.length) % TABS.length;
    setActive(next);
    document.getElementById(`bfe-tab-${TABS[next].id}`)?.focus();
  };

  return (
    <section
      id="enterprise"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="bfe-panel">
          <h2 className="h2 bfe-heading">
            {heading} {muted && <span className="h-muted">{muted}</span>}
          </h2>

          <div className="bfe-grid mt-10">
            <div
              className="bfe-rail"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Enterprise capabilities"
              onKeyDown={onKeyDown}
            >
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  id={`bfe-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls={`bfe-panel-${t.id}`}
                  tabIndex={i === active ? 0 : -1}
                  className={`bfe-tab ${i === active ? "bfe-tab-on" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="bfe-tab-mark" aria-hidden />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <div
              id={`bfe-panel-${TABS[active].id}`}
              role="tabpanel"
              aria-labelledby={`bfe-tab-${TABS[active].id}`}
              className="bfe-list"
            >
              {TABS[active].items.map((item) => (
                <div key={item.title} className="bfe-row">
                  <span className="bfe-arrow" aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h13M12.5 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <div className="bfe-row-title">{item.title}</div>
                    <p className="bfe-row-body">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* A single soft panel, not a bordered card — the spec's reference is a
           very light ground the rows float on. */
        .bfe-panel {
          background: var(--panel-2);
          border-radius: 28px;
          padding: clamp(28px, 4vw, 56px);
        }
        .bfe-heading { font-size: clamp(26px, 3vw, 38px); }

        .bfe-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          align-items: start;
        }

        .bfe-rail { display: flex; flex-direction: column; align-items: stretch; gap: 4px; }
        /* These read as plain paragraphs otherwise. A pill on hover and on the
           active tab makes the rail legible as a control, and the leading rule
           marks which one you are on: the same device the workflows use-case
           list uses, so the site has one way of saying "selected". */
        .bfe-tab {
          border: 0;
          background: transparent;
          padding: 9px 14px 9px 12px;
          border-radius: 10px;
          display: flex;
          align-items: baseline;
          gap: 10px;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.35;
          letter-spacing: -0.01em;
          font-weight: 500;
          /* Inactive tabs stay legible rather than dropping to a hint — this
             is the section's navigation, and all four labels are content. */
          color: var(--ink-3);
          transition: color 0.2s ease, background 0.2s ease;
          max-width: 26ch;
        }
        .bfe-tab:hover { color: var(--ink-heading); background: rgba(0, 0, 0, 0.035); }
        .bfe-tab-on { color: var(--ink-heading); background: rgba(0, 0, 0, 0.05); }

        /* Leading rule: reserved space always, so the labels keep one left
           edge, and scaled from a left origin so marking a tab never reflows
           the rail. */
        .bfe-tab-mark {
          flex: 0 0 auto;
          width: 16px;
          height: 1px;
          margin-bottom: 5px;
          background: currentColor;
          transform-origin: left center;
          transform: scaleX(0);
          opacity: 0;
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
        }
        .bfe-tab:hover .bfe-tab-mark { transform: scaleX(0.55); opacity: 0.5; }
        .bfe-tab-on .bfe-tab-mark { transform: scaleX(1); opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .bfe-tab-mark { transition: none; }
        }

        /* Rows are separated by hairlines only; the last one drops its rule so
           the list doesn't end on a floating line. */
        .bfe-list { display: flex; flex-direction: column; }
        .bfe-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
        }
        .bfe-row:first-child { padding-top: 0; }
        .bfe-row:last-child { border-bottom: 0; padding-bottom: 0; }
        .bfe-arrow { color: var(--ink-3); margin-top: 3px; flex: 0 0 auto; }
        .bfe-row-title {
          font-size: 15.5px;
          letter-spacing: -0.01em;
          color: var(--ink);
          font-weight: 500;
        }
        .bfe-row-body {
          margin-top: 4px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink-3);
          max-width: 52ch;
        }

        @media (max-width: 880px) {
          .bfe-grid { grid-template-columns: 1fr; gap: 28px; }
          .bfe-rail { flex-direction: row; flex-wrap: wrap; gap: 10px 18px; }
          .bfe-tab { max-width: none; }
        }
      `}</style>
    </section>
  );
}
