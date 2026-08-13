"use client";

import { useState } from "react";
import { SectionPattern } from "@/components/primitives/SectionPattern";
// TODO: replace every entry with this page's real questions.
//
// Notes that matter:
//   · Keep rows defaultOpen so answers sit in the initial SSR HTML for crawlers.
//   · Answers are plain strings, no markup. Write them as full sentences —
//     they are indexed as the page's FAQPage schema (see faqSchema below).
//   · 6–12 questions is the useful range. Fewer looks thin; more buries them.
const FAQS = [
  {
    q: "TODO: what is <product>?",
    a: "TODO: one-paragraph answer. Lead with the plain definition, then what makes this product's version of it different.",
  },
  {
    q: "TODO: is it free?",
    a: "TODO: state the free tier plainly, then what a paid plan adds.",
  },
  {
    q: "TODO: what can I use it for?",
    a: "TODO: list the three or four most common jobs people actually do with it.",
  },
];

// FAQPage structured data, sourced from FAQS so it never drifts from the visible Q&A.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// Circular ± toggle — the vertical bar collapses to a minus when open.
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
        color: "rgb(23,23,23)",
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
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
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
            color: "rgb(23,23,23)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {q}
        </span>
        <PlusMinus open={open} />
      </button>

      {/* grid-template-rows 0fr → 1fr gives a smooth height animation with no JS measuring. */}
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
              color: "rgb(87,87,87)",
              fontFamily: "var(--font-sans)",
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

export function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f5f5 60%, #ffffff 100%)", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionPattern variant="dots" />
      <div className="container-page relative z-10">
        <div className="py-16 md:py-24 flex flex-col lg:flex-row gap-10 lg:gap-20">

          {/* Left: heading + subtext */}
          <div className="lg:w-[360px] shrink-0">
            <h2
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-0.5px",
                color: "rgb(23,23,23)",
                fontFamily: "var(--font-sans)",
                margin: 0,
              }}
            >
              Got any questions{" "}
              <span style={{ color: "var(--color-heading-muted)" }}>left?</span>
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "rgb(87,87,87)",
                fontFamily: "var(--font-sans)",
                maxWidth: "36ch",
                marginTop: 20,
              }}
            >
              {/* TODO */}We&apos;ve answered the most frequently asked questions about &lt;product&gt;.
            </p>
          </div>

          {/* Right: accordion — clean divided list, all open by default.
              Rows render immediately — no scroll animation anywhere in this kit, so no
              row is ever left stranded invisible below the fold. */}
          <div className="flex-1 min-w-0" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            {FAQS.map((faq) => (
              <FaqRow key={faq.q} q={faq.q} a={faq.a} defaultOpen />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
