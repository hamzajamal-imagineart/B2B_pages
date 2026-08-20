"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * "Get started with ImagineArt Enterprise" — the live HubSpot form.
 *
 * The fields are not in this file and should not be recreated here: HubSpot
 * owns them, and the production enterprise page renders this same form. What
 * this component owns is the section around it — heading, layout, and the card
 * the form lands in.
 *
 * ── Why the embed script rather than next-hubspot ──────────────────────────
 * The brief offered both. This takes the plain embed via next/script, because
 * next-hubspot plus js-cookie adds two runtime dependencies to a project whose
 * entire dependency list is next, react and react-dom, and buys only the hook
 * wrapper around the same global that is called below.
 *
 * ── Deliberately NOT copied from the original implementation ───────────────
 * No UTM values are injected. The original appended hidden inputs in
 * onFormReady, which duplicated HubSpot's own hidden fields and left the real
 * ones empty; HubSpot submits from its own state rather than by serialising the
 * DOM, so those values likely never arrived. Passing them properly means
 * setFieldValue in onFormReady, verified against a real submission. Until
 * someone does that, this component claims nothing about attribution.
 *
 * No analytics payload either, so the two mapping bugs in the original (the
 * assistance dropdown never read, and three payload fields pointing at
 * HubSpot fields this form does not define) have nothing to reproduce.
 *
 * ⚠ Submissions land in the SAME HubSpot form as the production enterprise
 * page. Only the `pagename` hidden field separates them. Clone the form in
 * HubSpot and swap FORM_ID if they need to be separate.
 */

const PORTAL_ID = "244312374";
const FORM_ID = "5beeefe7-2f54-4b92-b0ef-23ddca21eebe";
const REGION = "na2";
const TARGET_ID = "hubspot-join-us-form-wrapper";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
          onFormReady?: () => void;
        }) => void;
      };
    };
  }
}

export function ContactForm({
  id = "contact",
  title = "Get started with",
  muted = "ImagineArt Enterprise",
  lede = "Tell us how your team works and we will come back with a rollout plan, security review, and pricing for your size.",
}: {
  id?: string;
  title?: string;
  /** Second clause of the two-tone heading. */
  muted?: string;
  /** Pass null for a heading-only column. */
  lede?: string | null;
} = {}) {
  const [ready, setReady] = useState(false);
  // The embed appends into the target; creating twice would stack two forms,
  // which React's development double-effect would otherwise do.
  const created = useRef(false);

  const create = () => {
    if (created.current || !window.hbspt) return;
    created.current = true;
    window.hbspt.forms.create({
      portalId: PORTAL_ID,
      formId: FORM_ID,
      region: REGION,
      target: `#${TARGET_ID}`,
      onFormReady: () => setReady(true),
    });
  };

  // Covers the case where the script was already loaded by an earlier mount,
  // in which case Script's onLoad never fires again.
  useEffect(() => {
    if (window.hbspt) create();
  }, []);

  /**
   * Keep the iframe as tall as the form inside it.
   *
   * HubSpot renders into an iframe and is supposed to size it itself, but it
   * ships at a 150px default and the resize did not fire here, leaving a
   * 776px form in a 150px frame. The iframe carries no src, so it is
   * same-origin and its content is measurable: this observes that content and
   * grows the frame to match. It only ever grows towards the content height,
   * so if HubSpot's own resize does run, the two agree rather than fight.
   */
  useEffect(() => {
    const host = document.getElementById(TARGET_ID);
    if (!host) return;

    let ro: ResizeObserver | undefined;
    let timer: number | undefined;

    /**
     * Polled rather than observed. The iframe is in the DOM before its document
     * has any content, so a MutationObserver on the host fires once, too early,
     * and then has nothing further to react to. Polling covers both the frame
     * arriving and its content filling in, and stops as soon as it can hand
     * over to a ResizeObserver.
     */
    const attach = () => {
      const frame = host.querySelector<HTMLIFrameElement>("iframe");
      const doc = frame?.contentDocument;
      const root = doc?.documentElement;
      if (!frame || !root || root.scrollHeight < 40) return false;

      const apply = () => {
        const h = root.scrollHeight;
        if (h > 0 && Math.abs(frame.offsetHeight - h) > 1) {
          frame.style.height = `${h}px`;
        }
      };
      apply();
      ro = new ResizeObserver(apply);
      ro.observe(root);
      return true;
    };

    if (!attach()) {
      // ~10s of 200ms checks, then give up and leave HubSpot's own height.
      let tries = 0;
      timer = window.setInterval(() => {
        if (attach() || ++tries > 50) window.clearInterval(timer);
      }, 200);
    }

    return () => {
      if (timer) window.clearInterval(timer);
      ro?.disconnect();
    };
  }, []);

  return (
    <section id={id} className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0">
      <SectionGuides edge="top" />

      <Script
        src={`https://js-na2.hsforms.net/forms/embed/v2.js`}
        strategy="afterInteractive"
        onLoad={create}
      />

      <div className="container-page relative z-10">
        <div className="cf-grid">
          <div className="cf-intro">
            <h2 className="h2">
              {title} <span className="h-muted">{muted}</span>
            </h2>
            {lede && <p className="lede mt-5">{lede}</p>}
          </div>

          <div className="cf-card">
            {/* HubSpot renders into this div. Left empty on purpose. */}
            <div id={TARGET_ID} />
            {!ready && (
              <div className="cf-loading" role="status" aria-live="polite">
                <span className="cf-spinner" aria-hidden />
                Loading the form…
              </div>
            )}
          </div>
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
        .cf-intro .lede { max-width: 40ch; }

        /* Translucent white: the card lifts off the wash without sealing it
           off. min-height reserves the form's own height so the section does
           not jump when HubSpot finishes rendering. */
        .cf-card {
          position: relative;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: clamp(20px, 2.4vw, 30px);
          min-height: 750px;
          max-width: 584px;
        }

        .cf-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 13.5px;
          color: var(--ink-3);
        }
        .cf-spinner {
          width: 15px;
          height: 15px;
          border-radius: 999px;
          border: 1.5px solid var(--line-strong);
          border-top-color: var(--ink);
          animation: cf-spin 700ms linear infinite;
        }
        @keyframes cf-spin { to { transform: rotate(360deg); } }
        /* The spinner is a loading state, not decoration, so it stays under
           reduced motion — but it stops spinning. */
        @media (prefers-reduced-motion: reduce) {
          .cf-spinner { animation: none; }
        }

        @media (max-width: 900px) {
          .cf-grid { grid-template-columns: 1fr; }
          .cf-intro .lede { max-width: 52ch; }
          .cf-card { max-width: none; min-height: 820px; }
        }
      `}</style>
    </section>
  );
}
