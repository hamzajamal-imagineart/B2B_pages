"use client";
import { useState } from "react";

const FONT = "var(--font-sans), sans-serif";
const CONTAINER_PAD = "calc((100vw - min(86vw, 1360px)) / 2)";

const ITEMS = [
  {
    q: "How is ImagineArt Workflows different from other creative AI tools?",
    a: "Most creative AI tools give you a single model and a single output. Workflows let you chain image, video, audio, and text models into a single pipeline — generate, iterate, and ship from one canvas without re-exporting between four apps.",
  },
  {
    q: "What content types does it support?",
    a: "Image, video, audio, and text — all in one workflow. Pull from any model in our catalog (Seedance, Kling, Nano Banana, OpenAI, and 60+ more) and combine them in a single canvas.",
  },
  {
    q: "Can I train it with my own brand assets?",
    a: "Yes. Upload your brand kit — logos, fonts, color tokens, and reference imagery — once, and every output across the workflow stays on-brand by default.",
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
    a: "Creative teams shipping at scale — brand studios, in-house marketing, content agencies, and solo creators who want production-grade output without cobbling together four tools.",
  },
  {
    q: "Does ImagineArt train on my creations?",
    a: "No. Your assets, prompts, and outputs are private to your workspace. We never use customer content to train our models, and Enterprise plans include data residency and audit logs.",
  },
];

const PlusIcon = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
    <path
      d="M12 5v14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      style={{
        transition: "transform 280ms cubic-bezier(0.4,0,0.2,1), opacity 280ms ease",
        transformOrigin: "12px 12px",
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        opacity: open ? 0 : 1,
      }}
    />
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: `120px ${CONTAINER_PAD}`,
      }}
    >
      {/* Heading — centered */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 760,
          marginInline: "auto",
          marginBottom: 72,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(10,10,11,0.45)",
            marginBottom: 16,
          }}
        >
          FAQ
        </div>
        <h2
          style={{
            fontFamily: FONT,
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 400,
            color: "#0a0a0b",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            margin: "0 0 16px",
          }}
        >
          Frequently asked questions
        </h2>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 16,
            color: "rgba(10,10,11,0.55)",
            letterSpacing: "-0.005em",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Get your questions answered.
        </p>
      </div>

      {/* Accordion — left/right padded so list sits centered with comfortable measure */}
      <div style={{ maxWidth: 880, marginInline: "auto" }}>
        {ITEMS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 24,
                  padding: "26px 4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#0a0a0b",
                  transition: "color 200ms ease",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(16px, 1.4vw, 19px)",
                    fontWeight: 500,
                    color: "#0a0a0b",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.35,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    color: "rgba(10,10,11,0.55)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PlusIcon open={isOpen} />
                </span>
              </button>

              {/* Answer — animated max-height + opacity */}
              <div
                style={{
                  maxHeight: isOpen ? 360 : 0,
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "max-height 480ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease",
                }}
              >
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 15,
                    color: "rgba(10,10,11,0.62)",
                    lineHeight: 1.65,
                    letterSpacing: "-0.005em",
                    margin: 0,
                    padding: "0 4px 28px",
                    maxWidth: 720,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
