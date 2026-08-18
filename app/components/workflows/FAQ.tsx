"use client";

import { useState } from "react";
import { CONTAINER_PAD, SECTION_Y_LG } from "./scale";

/**
 * FAQ, on the kit's layout.
 *
 * The clone ran a centred heading over a single 880px column. The kit's
 * FAQSection puts the heading in a fixed left rail with the accordion beside
 * it, which is the shape the rest of the site uses and the reason this section
 * previously read as belonging to a different page.
 *
 * Two things carried over from the kit template deliberately:
 *   · rows are open by default, so the answers sit in the initial SSR HTML
 *     where crawlers can see them
 *   · FAQPage structured data is derived from ITEMS, so it cannot drift from
 *     the visible copy
 */

const ITEMS = [
  {
    q: "How is ImagineArt Workflows different from other creative AI tools?",
    a: "Most creative AI tools give you a single model and a single output. Workflows let you chain image, video, audio, and text models into a single pipeline: generate, iterate, and ship from one canvas without re-exporting between four apps.",
  },
  {
    q: "What content types does it support?",
    a: "Image, video, audio, and text, all in one workflow. Pull from any model in our catalog (Seedance, Kling, Nano Banana, OpenAI, and 60+ more) and combine them in a single canvas.",
  },
  {
    q: "Can I train it with my own brand assets?",
    a: "Yes. Upload your brand kit once, with logos, fonts, color tokens, and reference imagery, and every output across the workflow stays on-brand by default.",
  },
  {
    q: "Will the agents follow my brand style, including do's and don'ts (colors, fonts, tone, layout)?",
    a: "Absolutely. Our Brand Agent ingests your guidelines as structured constraints, not just style hints, so it respects voice, layout grids, palette rules, and forbidden combinations across every generation.",
  },
  {
    q: "Can I train a custom LoRA model?",
    a: "Yes. Upload as few as 15-20 reference images and we'll fine-tune a private LoRA you can call from any node in your workflow. Training takes minutes, not hours.",
  },
  {
    q: "Who is ImagineArt Workflows for?",
    a: "Creative teams shipping at scale: brand studios, in-house marketing, content agencies, and solo creators who want production-grade output without cobbling together four tools.",
  },
  {
    q: "Does ImagineArt train on my creations?",
    a: "No. Your assets, prompts, and outputs are private to your workspace. We never use customer content to train our models, and Enterprise plans include data residency and audit logs.",
  },
];

/** FAQPage structured data, sourced from ITEMS so it never drifts from the Q&A. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/** Circular toggle: the vertical bar collapses to a minus when open. */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.05)",
        color: "var(--ink)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line
          x1="7"
          y1="1"
          x2="7"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{
            transition: "transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1), opacity 200ms ease",
            transformOrigin: "center",
            transform: open ? "scaleY(0)" : "scaleY(1)",
            opacity: open ? 0 : 1,
          }}
        />
      </svg>
    </span>
  );
}

function FaqRow({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-8 py-6 text-left cursor-pointer"
        style={{ background: "transparent", border: "none" }}
      >
        <span
          style={{
            fontSize: "clamp(16px, 1.4vw, 19px)",
            fontWeight: 500,
            lineHeight: 1.35,
            color: "var(--ink-heading)",
          }}
        >
          {q}
        </span>
        <PlusMinus open={open} />
      </button>

      {/* grid-template-rows 0fr → 1fr animates the height with no JS measuring. */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 280ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--ink-2)",
              maxWidth: "72ch",
              paddingBottom: 24,
              margin: 0,
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      style={{
        position: "relative",
        backgroundColor: "var(--page-bg)",
        padding: `${SECTION_Y_LG} ${CONTAINER_PAD}`,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        {/* Left rail: heading and subtext, on the shared type classes */}
        <div className="lg:w-[360px] shrink-0">
          <p className="eyebrow">FAQ</p>
          <h2 className="h2" style={{ marginTop: 12 }}>
            Got any questions <span className="h-muted">left?</span>
          </h2>
          <p className="lede" style={{ marginTop: 20, maxWidth: "36ch" }}>
            The things teams ask most before moving their creative production onto Workflows.
          </p>
        </div>

        {/* Right: divided accordion, open by default so answers ship in the HTML */}
        <div className="flex-1 min-w-0" style={{ borderTop: "1px solid var(--line)" }}>
          {ITEMS.map((item) => (
            <FaqRow key={item.q} q={item.q} a={item.a} defaultOpen />
          ))}
        </div>
      </div>
    </section>
  );
}
