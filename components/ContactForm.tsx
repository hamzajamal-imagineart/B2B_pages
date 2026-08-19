"use client";

import { useId, useState } from "react";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { Button } from "@/components/Button";

/**
 * "Get started with ImagineArt Enterprise" — the contact form from the B2B
 * specs, as a shared section.
 *
 * Built to be reused: every string that differs per page is a prop, and the
 * field set is data below rather than markup, so adding a question is one
 * entry. Business mounts it first; Enterprise and Solutions can take it with
 * a different `title` and nothing else.
 *
 * Three things deliberately diverge from the supplied mock, which predates
 * this design system:
 *   · the purple submit becomes the shared brand Button. Colour comes from
 *     imagery only (Guidelines §2), and a violet fill is the one saturated
 *     element on an otherwise monochrome page.
 *   · the red required asterisks become a muted mark plus a single legend.
 *     Red is the same rule, and an asterisk repeated eight times in an accent
 *     colour reads as eight errors.
 *   · inputs take the recessed panel fill with a hairline, matching the chips
 *     and cards elsewhere, instead of the mock's heavier boxes.
 *
 * NOT WIRED. There is no endpoint in the spec, so submit is intercepted and
 * nothing is sent. `action` and `onSubmit` are both passed through for
 * whoever connects it. The assistance and industry options match the live
 * form; company size is still a placeholder.
 */

type Field =
  | { kind: "text"; name: string; label: string; type?: string; required?: boolean; autoComplete?: string }
  | { kind: "select"; name: string; label: string; required?: boolean; options: string[] }
  | { kind: "textarea"; name: string; label: string; required?: boolean };

/** The live form's own list, supplied by the team. It is deliberately not the
 *  same set as the Industries section, which sells sectors rather than
 *  qualifying leads. */
const INDUSTRIES = [
  "Consumer Packaged Goods / FMCG",
  "Fashion & Apparel",
  "Furniture / Home Decor / Interior Design",
  "E-commerce / Marketplace",
  "Creative / Marketing / Advertising Agency",
  "Food / Beverage",
  "Automotive",
  "Healthcare",
  "Education / E-learning",
  "Creator Economy / UGC Production",
  "Other",
];

const FIELDS: Field[] = [
  { kind: "text", name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { kind: "text", name: "firstName", label: "First name", required: true, autoComplete: "given-name" },
  { kind: "text", name: "lastName", label: "Last name", required: true, autoComplete: "family-name" },
  { kind: "text", name: "country", label: "Country / Region", required: true, autoComplete: "country-name" },
  {
    kind: "select",
    name: "companySize",
    label: "Company size",
    required: true,
    options: ["1–10", "11–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"],
  },
  { kind: "select", name: "industry", label: "Industry", required: true, options: INDUSTRIES },
  {
    kind: "select",
    name: "assistance",
    label: "What do you need assistance with?",
    required: true,
    /* The live form's own options, supplied by the team. */
    options: [
      "Support / Billing",
      "Design Assistance",
      "Platform Features",
      "Team Plans / Enterprise",
      "Other",
    ],
  },
  { kind: "textarea", name: "query", label: "Help us understand your query", required: true },
];

export function ContactForm({
  id = "contact",
  title = "Get started with",
  muted = "ImagineArt Enterprise",
  lede = "Tell us how your team works and we will come back with a rollout plan, security review, and pricing for your size.",
  action,
  onSubmit,
}: {
  id?: string;
  title?: string;
  /** Second clause of the two-tone heading. */
  muted?: string;
  /** Pass null for a heading-only column. */
  lede?: string | null;
  action?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
} = {}) {
  const uid = useId();
  const [attempted, setAttempted] = useState(false);

  return (
    <section id={id} className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0">
      <SectionGuides edge="top" />

      <div className="container-page relative z-10">
        <div className="cf-grid">
          <div className="cf-intro">
            <h2 className="h2">
              {title} <span className="h-muted">{muted}</span>
            </h2>
            {lede && <p className="lede mt-5">{lede}</p>}
          </div>

          <form
            className="cf-card"
            action={action}
            noValidate={false}
            onSubmit={(e) => {
              setAttempted(true);
              if (onSubmit) {
                onSubmit(e);
                return;
              }
              // No endpoint yet: never let this navigate away silently.
              if (!action) e.preventDefault();
            }}
          >
            <p className="cf-legend">
              Fields marked <span aria-hidden>*</span> are required.
            </p>

            {FIELDS.map((f) => {
              const fid = `${uid}-${f.name}`;
              return (
                <div key={f.name} className="cf-field">
                  <label htmlFor={fid} className="cf-label">
                    {f.label}
                    {f.required && (
                      <span className="cf-req" aria-hidden>
                        *
                      </span>
                    )}
                  </label>

                  {f.kind === "text" && (
                    <input
                      id={fid}
                      name={f.name}
                      type={f.type ?? "text"}
                      required={f.required}
                      autoComplete={f.autoComplete}
                      className="cf-input"
                    />
                  )}

                  {f.kind === "select" && (
                    <div className="cf-select-wrap">
                      <select id={fid} name={f.name} required={f.required} defaultValue="" className="cf-input cf-select">
                        <option value="" disabled>
                          Please select
                        </option>
                        {f.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <svg className="cf-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  {f.kind === "textarea" && (
                    <textarea id={fid} name={f.name} required={f.required} rows={4} className="cf-input cf-textarea" />
                  )}
                </div>
              );
            })}

            <div className="cf-actions">
              <Button type="submit" variant="brand" size="lg">
                Submit
              </Button>
            </div>

            {/* Announced only once the user has tried, so it is not read as an
                error state on first render. */}
            <p className="cf-note" aria-live="polite">
              {attempted && !action
                ? "This form is not connected yet. Please contact sales directly in the meantime."
                : "We reply within one business day."}
            </p>
          </form>
        </div>
      </div>

      <style>{`
        /* Copy left, form right, matching the FAQ's rail-and-body split. */
        .cf-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
          gap: clamp(32px, 5vw, 80px);
          align-items: start;
        }
        /* The column governs the heading measure; a ch cap here broke
           "ImagineArt Enterprise" across three lines. */
        .cf-intro .lede { max-width: 40ch; }

        /* Translucent white: the card lifts off the wash without sealing it
           off, and the inputs inside stay solid so they read as the surfaces
           you type into. */
        .cf-card {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: clamp(24px, 3vw, 36px);
        }
        .cf-legend {
          font-size: 12.5px;
          color: var(--ink-3);
          margin-bottom: 22px;
        }
        .cf-field { margin-bottom: 18px; }
        .cf-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-2);
          margin-bottom: 7px;
        }
        /* Muted, not red: the mark says "required", it does not say "wrong". */
        .cf-req { color: var(--ink-3); margin-left: 2px; }

        .cf-input {
          width: 100%;
          height: 46px;
          padding: 0 14px;
          font: inherit;
          font-size: 15px;
          color: var(--ink);
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 12px;
          outline: none;
          transition: border-color 180ms ease, background 180ms ease;
        }
        .cf-input::placeholder { color: var(--ink-3); }
        .cf-input:hover { border-color: var(--line-strong); }
        .cf-input:focus-visible {
          border-color: var(--ink);
        }
        .cf-textarea {
          height: auto;
          min-height: 116px;
          padding: 12px 14px;
          line-height: 1.6;
          resize: vertical;
        }

        /* Native select, restyled: the chevron is ours so it matches the rails. */
        .cf-select-wrap { position: relative; }
        .cf-select {
          appearance: none;
          -webkit-appearance: none;
          padding-right: 40px;
          cursor: pointer;
        }
        .cf-select:invalid { color: var(--ink-3); }
        .cf-chevron {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--ink-3);
          pointer-events: none;
        }

        .cf-actions { margin-top: 26px; }
        .cf-note {
          margin-top: 14px;
          font-size: 12.5px;
          color: var(--ink-3);
        }

        @media (max-width: 900px) {
          .cf-grid { grid-template-columns: 1fr; }
          .cf-intro .lede { max-width: 52ch; }
        }
      `}</style>
    </section>
  );
}
