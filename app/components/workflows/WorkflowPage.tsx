"use client";

import { CONTAINER_PAD, SECTION_Y, SECTION_Y_LG, TYPE, SURFACE } from "./scale";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { ButtonLink } from "@/components/Button";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { withBasePath } from "@/lib/assets";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeroPromptBox from "./HeroPromptBox";
import BentoSection from "./BentoSection";

const FONT = "var(--font-sans), sans-serif";


// ────────────────────────────────────────────────────────────────────────────
// Hero asset cards — rich brand creative outputs (UGC, ad, lookbook, etc.)
// ────────────────────────────────────────────────────────────────────────────

type CardSlot = {
  id: string;
  x: string;
  y: string;
  width: number;
  depth: number;   // cursor-parallax multiplier
  delay: string;   // drift animation offset
  /** transform-origin so hover scaling anchors the outside edge (keeps card on-screen). */
  origin: string;
  /** Render the card; receives `hovered` so the card can play its video etc. */
  render: (hovered: boolean) => React.ReactNode;
};

// Wrapper that handles parallax, drift, and per-card hover (lift, big zoom, video play)
function HeroCardSlot({ slot }: { slot: CardSlot }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-depth={slot.depth}
      style={{
        position: "absolute",
        left: slot.x,
        top: slot.y,
        width: slot.width,
        zIndex: hovered ? 12 : 1,
        transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      <div style={{ animation: `wp-drift 9s ease-in-out ${slot.delay} infinite` }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            transition:
              "transform 540ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 540ms ease",
            transform: hovered ? "scale(1.4)" : "scale(1)",
            transformOrigin: slot.origin,
            cursor: "pointer",
            boxShadow: hovered
              ? "0 60px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.1)"
              : undefined,
            borderRadius: 16,
          }}
        >
          {slot.render(hovered)}
        </div>
      </div>
    </div>
  );
}


// Shared card frame — straight, rounded, video-backed
function CardFrame({ children, ratio = "4/5", bg }: { children: React.ReactNode; ratio?: string; bg?: string }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: ratio,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 28px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
        background: bg ?? "#15151a",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

// Video that fills the frame — plays only while `playing` is true.
function CardVideo({ src, brightness, playing }: { src: string; brightness?: number; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      v.play().catch(() => {
        /* play() can reject if not user-initiated on some browsers; safe to ignore */
      });
    } else {
      v.pause();
    }
  }, [playing]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        filter: brightness != null ? `brightness(${brightness})` : undefined,
      }}
    />
  );
}

// 1) Performance — UGC frame
function PerformanceCard({ hovered }: { hovered: boolean }) {
  return (
    <CardFrame ratio="4/5">
      <CardVideo src="/workflow-hero.mp4" playing={hovered} />
    </CardFrame>
  );
}

// 2) Scale — batch generation
function ScaleCard({ hovered }: { hovered: boolean }) {
  return (
    <CardFrame ratio="4/5">
      <CardVideo src="/media/variable-demo.mp4" playing={hovered} />
    </CardFrame>
  );
}

// 3) UGC ads — creator frame
function UGCCard({ hovered }: { hovered: boolean }) {
  return (
    <CardFrame ratio="1/1">
      <CardVideo src="/simple-demo.mp4" playing={hovered} />
    </CardFrame>
  );
}

// 4) Marketing — Lookbook
function LookbookCard({ hovered }: { hovered: boolean }) {
  return (
    <CardFrame ratio="4/5">
      <CardVideo src="/editor-demo.mp4" playing={hovered} />
    </CardFrame>
  );
}

// 5) Trailers
function TrailerCard({ hovered }: { hovered: boolean }) {
  return (
    <CardFrame ratio="16/10">
      <CardVideo src="/models-bg.mp4" brightness={0.85} playing={hovered} />
    </CardFrame>
  );
}

// 6) Brand Kits & Moodboards
function BrandKitCard({ hovered }: { hovered: boolean }) {
  return (
    <CardFrame ratio="1/1" bg="#F2E6D8">
      <CardVideo src="/iterate-demo.mp4" brightness={0.95} playing={hovered} />
    </CardFrame>
  );
}

const HERO_SLOTS: CardSlot[] = [
  // origin anchors the OUTSIDE edge of each card so it scales toward the page center
  { id: "performance", x: "3%",  y: "8%",  width: 240, depth: 1.5, delay: "0s",   origin: "top left",     render: (h) => <PerformanceCard hovered={h} /> },
  { id: "scale",       x: "78%", y: "10%", width: 240, depth: 1.0, delay: "1.4s", origin: "top right",    render: (h) => <ScaleCard       hovered={h} /> },
  { id: "ugc",         x: "8%",  y: "55%", width: 220, depth: 1.6, delay: "0.7s", origin: "bottom left",  render: (h) => <UGCCard         hovered={h} /> },
  { id: "lookbook",    x: "78%", y: "53%", width: 240, depth: 1.2, delay: "2.1s", origin: "bottom right", render: (h) => <LookbookCard    hovered={h} /> },
  { id: "trailer",     x: "20%", y: "32%", width: 200, depth: 0.8, delay: "1s",   origin: "top left",     render: (h) => <TrailerCard     hovered={h} /> },
  { id: "brandkit",    x: "70%", y: "33%", width: 180, depth: 0.9, delay: "1.8s", origin: "top right",    render: (h) => <BrandKitCard    hovered={h} /> },
];

// ────────────────────────────────────────────────────────────────────────────
// Collaborator cursors — minimal Figma-style multiplayer presence
// ────────────────────────────────────────────────────────────────────────────
type CollabCursor = {
  name: string;
  color: string;
  startX: string;
  startY: string;
  pattern: 1 | 2 | 3;
  duration: string;
  delay: string;
};

const COLLAB_CURSORS: CollabCursor[] = [
  { name: "Sophia",  color: "#F47A7A", startX: "32%", startY: "26%", pattern: 1, duration: "16s", delay: "0s"   },
  { name: "Daniel",  color: "#5CB8FF", startX: "62%", startY: "60%", pattern: 2, duration: "18s", delay: "1.2s" },
  { name: "Maya",    color: "#A78BFA", startX: "44%", startY: "70%", pattern: 3, duration: "20s", delay: "2.4s" },
];

function CollaboratorCursor({ c }: { c: CollabCursor }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: c.startY,
        left: c.startX,
        zIndex: 4,
        pointerEvents: "none",
        animation: `wp-cursor-${c.pattern} ${c.duration} ease-in-out ${c.delay} infinite`,
        willChange: "transform",
      }}
    >
      <svg width="14" height="18" viewBox="0 0 14 18" fill={c.color} style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>
        <path d="M0 0L0 14L4 10.5L6.5 16L8 15.5L5.5 10L10.5 10Z" />
      </svg>
      <span
        style={{
          display: "inline-block",
          marginTop: 2,
          marginLeft: 4,
          padding: "2px 8px",
          borderRadius: 6,
          background: c.color,
          color: "#fff",
          fontFamily: FONT,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "-0.005em",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {c.name}
      </span>
    </div>
  );
}

// Brand Kits cursor — stable (no drift) and oversized so it reads as a distinct
// product affordance vs. the smaller floating collaborator cursors. Hovering
// reveals a brand-kit image that zooms in (same easing as the hero cards).
function BrandKitCursor() {
  const [hovered, setHovered] = useState(false);
  const GRADIENT = "linear-gradient(135deg, #FFB454 0%, #F47A7A 22%, #A78BFA 48%, #5A85FF 72%, #A6E3C5 100%)";
  return (
    <div
      style={{
        position: "absolute",
        top: "16%",
        left: "44%",
        zIndex: hovered ? 13 : 5,
      }}
    >
      {/* Cursor + label — the hover trigger */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
      >
        <svg width="22" height="28" viewBox="0 0 14 18" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.45))" }}>
          <defs>
            <linearGradient id="brandkit-cursor-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFB454" />
              <stop offset="22%" stopColor="#F47A7A" />
              <stop offset="48%" stopColor="#A78BFA" />
              <stop offset="72%" stopColor="#5A85FF" />
              <stop offset="100%" stopColor="#A6E3C5" />
            </linearGradient>
          </defs>
          <path d="M0 0L0 14L4 10.5L6.5 16L8 15.5L5.5 10L10.5 10Z" fill="url(#brandkit-cursor-grad)" />
        </svg>
        <span
          style={{
            display: "inline-block",
            marginTop: 4,
            marginLeft: 6,
            padding: "5px 12px",
            borderRadius: 8,
            background: GRADIENT,
            color: "#fff",
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "-0.005em",
            textShadow: "0 1px 2px rgba(10,10,11,0.4)",
            boxShadow: "0 6px 18px rgba(10,10,11,0.35), 0 0 24px rgba(247,122,122,0.2), 0 0 32px rgba(90,133,255,0.18)",
          }}
        >
          Brand Kits
        </span>
      </div>

      {/* Hover-revealed brand kit asset — zooms in like the other hero cards */}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 22,
          width: 260,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1.4)" : "scale(0.7)",
          transformOrigin: "top left",
          transition: "opacity 320ms ease, transform 540ms cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: "none",
        }}
      >
        <CardFrame ratio="4/5" bg="#F2E6D8">
          <CardVideo src="/iterate-demo.mp4" brightness={0.95} playing={hovered} />
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              padding: "4px 10px",
              borderRadius: 8,
              background: "rgba(10,10,11,0.7)",
              color: "#fff",
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              backdropFilter: "blur(6px)",
            }}
          >
            Brand Kit · acme.com
          </span>
        </CardFrame>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// HERO — magicpatterns-style scattered videos + cursor parallax + bottom prompt
// ────────────────────────────────────────────────────────────────────────────
function CanvasHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor parallax: every card moves proportionally to its data-depth.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onMove(e: MouseEvent) {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      // Cursor position drives the dot-grid spotlight via CSS variables.
      section.style.setProperty("--mx", `${mx}px`);
      section.style.setProperty("--my", `${my}px`);
      section.style.setProperty("--spot", "1");
      // Card parallax (unchanged).
      const x = (mx - rect.width / 2) / rect.width;
      const y = (my - rect.height / 2) / rect.height;
      const cards = section.querySelectorAll<HTMLElement>("[data-depth]");
      cards.forEach((card) => {
        const depth = parseFloat(card.dataset.depth ?? "1");
        card.style.transform = `translate(${x * 28 * depth}px, ${y * 20 * depth}px)`;
      });
    }

    function onLeave() {
      if (!section) return;
      section.style.setProperty("--spot", "0");
      const cards = section.querySelectorAll<HTMLElement>("[data-depth]");
      cards.forEach((card) => {
        card.style.transform = "";
      });
    }

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#0A0A0B",
        color: "#ffffff",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes wp-drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .canvas-spot {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.32) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0;
          mask-image: radial-gradient(circle 180px at var(--mx, -400px) var(--my, -400px), #000 0%, rgba(0,0,0,0.45) 45%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle 180px at var(--mx, -400px) var(--my, -400px), #000 0%, rgba(0,0,0,0.45) 45%, transparent 80%);
          opacity: var(--spot, 0);
          transition: opacity 260ms ease;
        }
        @keyframes wp-cursor-1 {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(60px, -38px); }
          50%      { transform: translate(120px, 24px); }
          75%      { transform: translate(40px, 70px); }
        }
        @keyframes wp-cursor-2 {
          0%, 100% { transform: translate(0, 0); }
          33%      { transform: translate(-72px, 42px); }
          66%      { transform: translate(36px, -52px); }
        }
        @keyframes wp-cursor-3 {
          0%, 100% { transform: translate(0, 0); }
          20%      { transform: translate(48px, 28px); }
          50%      { transform: translate(-28px, 56px); }
          80%      { transform: translate(-58px, -22px); }
        }
      `}</style>

      {/* Infinite dot-grid canvas — dim base layer */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse 95% 85% at 50% 50%, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 50% 50%, black 40%, transparent 95%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Cursor spotlight — bright dots revealed within a soft circle that follows the pointer */}
      <div aria-hidden className="canvas-spot" />

      {/* Asset cards — straight, drifting, parallax-aware, hover lift+zoom */}
      {HERO_SLOTS.map((slot) => (
        <HeroCardSlot key={slot.id} slot={slot} />
      ))}

      {/* Collaborator cursors — minimal multiplayer presence */}
      {COLLAB_CURSORS.map((c) => (
        <CollaboratorCursor key={c.name} c={c} />
      ))}

      {/* Brand Kits cursor — hover to reveal a brand kit asset that zooms in */}
      <BrandKitCursor />

      {/* Foreground content — bottom-aligned eyebrow + heading + prompt */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "clamp(40px, 5vh, 64px)",
          padding: `${SECTION_Y_LG} ${CONTAINER_PAD} ${SECTION_Y}`,
          textAlign: "center",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", pointerEvents: "auto" }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginBottom: 24,
              textShadow: "0 1px 16px rgba(0,0,0,0.5)",
            }}
          >
            ImagineArt Workflows
          </div>
          <h1
            style={{
              fontFamily: FONT,
              fontSize: TYPE.h1,
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              margin: 0,
              maxWidth: 980,
              textShadow: "0 2px 32px rgba(0,0,0,0.5)",
            }}
          >
            Every creative tool.
            <br />
            <span style={{ color: "rgba(255,255,255,0.7)" }}>One workflow.</span>
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: TYPE.lede,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "-0.01em",
              lineHeight: 1.6,
              maxWidth: 540,
              margin: "22px auto 0",
              textShadow: "0 1px 18px rgba(0,0,0,0.4)",
            }}
          >
            AI generation, brand assets, and real-time collaboration, wired into one canvas, built for teams that ship.
          </p>
        </div>

        <div style={{ width: "100%", pointerEvents: "auto" }}>
          <HeroPromptBox />
        </div>
      </div>
    </section>
  );
}


// ────────────────────────────────────────────────────────────────────────────
// KYOSO-style mode sections — centered text + sub-tabs + 3 device-frame cards
// ────────────────────────────────────────────────────────────────────────────

// Tiny utility components for the inner UI mockups
function MiniLine({ width, dim = false }: { width: string; dim?: boolean }) {
  return (
    <div
      style={{
        height: 6,
        width,
        borderRadius: 4,
        background: dim ? "rgba(10,10,11,0.06)" : "rgba(10,10,11,0.12)",
        marginBottom: 8,
      }}
    />
  );
}

function CursorPointer({
  bottom = 90,
  right = 90,
  label,
  labelBg = "#0a0a0b",
}: {
  bottom?: number;
  right?: number;
  label?: string;
  labelBg?: string;
}) {
  return (
    <div style={{ position: "absolute", bottom, right, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
      <svg width="22" height="26" viewBox="0 0 14 18" fill="none">
        <path d="M0 0L0 14L4 10.5L6.5 16L8 15.5L5.5 10L10.5 10Z" fill="#0a0a0b" stroke="#fff" strokeWidth="0.4" />
      </svg>
      {label && (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 22,
            background: labelBg,
            color: "#fff",
            fontFamily: FONT,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}


// ── AGENTIC mode — three card visuals (redesigned for 16:9) ────────────────
function AgenticCard1() {
  const channels = [
    { name: "Instagram", aspect: "1/1",  bg: "linear-gradient(135deg, #FF5E5B, #FFB454)" },
    { name: "Stories",   aspect: "9/16", bg: "linear-gradient(135deg, #7C3AED, #FF5E5B)" },
    { name: "TikTok",    aspect: "9/16", bg: "linear-gradient(135deg, #5DC9CA, #1E1E1E)" },
    { name: "LinkedIn",  aspect: "16/9", bg: "linear-gradient(135deg, #5A85FF, #1E1E1E)" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, padding: 32, background: "#fafafa", display: "flex", flexDirection: "column" }}>
      <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: "rgba(10,10,11,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
        Same brand · Every channel
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "center" }}>
        {channels.map((c) => (
          <div key={c.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{
              width: "100%",
              aspectRatio: c.aspect,
              borderRadius: 16,
              background: c.bg,
              border: "1px solid rgba(10,10,11,0.06)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.14)",
            }} />
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: "#0a0a0b" }}>{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgenticCard2() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fafafa", padding: 40, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top: scattered output thumbs in mixed aspect ratios */}
      <div style={{ flex: 1, display: "flex", gap: 14, justifyContent: "center", alignItems: "center" }}>
        {[
          { aspect: "16/9", w: 220, bg: "linear-gradient(135deg, #FFB454, #F87060)" },
          { aspect: "1/1",  w: 140, bg: "linear-gradient(135deg, #5A85FF, #7C3AED)" },
          { aspect: "9/16", w: 90,  bg: "linear-gradient(135deg, #A6E3C5, #5DC9CA)" },
          { aspect: "4/5",  w: 120, bg: "linear-gradient(135deg, #A78BFA, #FF5E5B)" },
        ].map((o, i) => (
          <div key={i} style={{
            width: o.w,
            aspectRatio: o.aspect,
            borderRadius: 14,
            background: o.bg,
            border: "1px solid rgba(10,10,11,0.06)",
            boxShadow: "0 14px 36px rgba(0,0,0,0.12)",
            transform: `rotate(${(i - 1.5) * 2}deg)`,
          }} />
        ))}
      </div>
      {/* Bottom: prompt + status pill */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        <span style={{
          padding: "5px 12px",
          borderRadius: 14,
          background: "rgba(10,10,11,0.78)",
          color: "#fff",
          fontFamily: FONT,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "-0.005em",
        }}>
          Adapting to 4 aspect ratios…
        </span>
        <div style={{
          width: "min(520px, 80%)",
          padding: "14px 18px",
          borderRadius: 16,
          background: "#fff",
          border: "1px solid rgba(10,10,11,0.08)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontFamily: FONT, fontSize: 13, color: "rgba(10,10,11,0.55)" }}>
            Generate every channel format
          </span>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#0a0a0b", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>↑</span>
        </div>
      </div>
    </div>
  );
}

function AgenticCard3() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fafafa", display: "grid", gridTemplateColumns: "1.4fr 1fr" }}>
      {/* Left: ad preview */}
      <div style={{ padding: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: 360,
          aspectRatio: "4/5",
          borderRadius: 16,
          background: "linear-gradient(135deg, #FF5E5B 0%, #FFB454 100%)",
          border: "1px solid rgba(10,10,11,0.06)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 16, left: 16, padding: "4px 10px", background: "#fff", borderRadius: 12, fontFamily: FONT, fontSize: 10, fontWeight: 600, color: "#0a0a0b", letterSpacing: "0.06em" }}>BRAND</div>
          <div style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
            <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 500, color: "#fff", lineHeight: 1.1, marginBottom: 6 }}>Holiday 2026</div>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>Limited drop · Shop now</div>
          </div>
        </div>
      </div>
      {/* Right: chat-style brand review */}
      <div style={{ padding: 24, borderLeft: "1px solid rgba(10,10,11,0.06)", background: "#fff", display: "flex", flexDirection: "column", gap: 10, fontFamily: FONT, fontSize: 11.5, color: "rgba(10,10,11,0.78)", lineHeight: 1.55, overflow: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 12, height: 6, borderRadius: 3, background: "rgba(10,10,11,0.18)" }} />
          <span style={{ fontWeight: 600, color: "#0a0a0b", fontSize: 13 }}>Brand Review</span>
        </div>
        <div style={{ color: "rgba(10,10,11,0.55)" }}>
          Reviewing composition, colors, fonts, and copywriting against your brand guidelines.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <span style={{ width: 12, height: 6, borderRadius: 3, background: "rgba(10,10,11,0.18)" }} />
          <span style={{ fontWeight: 600, color: "#0a0a0b" }}>Analyzed for 5 seconds</span>
        </div>
        <div style={{ color: "rgba(10,10,11,0.78)" }}>
          • Logo: Safe zone respected ✓<br />
          • Font: Off-brand typeface<br />
          • Composition: Pattern violation<br />
          • Copywriting: Tone mismatch
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <span style={{ width: 12, height: 6, borderRadius: 3, background: "rgba(10,10,11,0.18)" }} />
          <span style={{ fontWeight: 600, color: "#0a0a0b" }}>Proposing 3 alternatives…</span>
        </div>
      </div>
    </div>
  );
}

// ── WORKFLOW mode — three card visuals (redesigned) ────────────────────────
function WorkflowCard1() {
  const NODES = [
    { x: 80,  y: 80,  w: 130, h: 60, title: "Input · CSV"        },
    { x: 80,  y: 240, w: 130, h: 60, title: "Style · Brand"      },
    { x: 280, y: 160, w: 150, h: 75, title: "Generate · Seedance", active: true },
    { x: 500, y: 80,  w: 130, h: 60, title: "Refine · Edit"      },
    { x: 500, y: 240, w: 130, h: 60, title: "Output · Approved"  },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(10,10,11,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#0a0a0b" }}>Workflow Canvas · v3</span>
        <span style={{ padding: "6px 14px", borderRadius: 14, background: "#0a0a0b", color: "#fff", fontFamily: FONT, fontSize: 12, fontWeight: 600 }}>Run</span>
      </div>
      <div style={{ flex: 1, position: "relative", background: "#fafafa", backgroundImage: "radial-gradient(circle, rgba(10,10,11,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        <svg viewBox="0 0 720 360" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="wf1-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5A85FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5A85FF" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {[[0, 2], [1, 2], [2, 3], [2, 4]].map(([f, t], i) => {
            const a = NODES[f]; const b = NODES[t];
            return (
              <path
                key={i}
                d={`M ${a.x + a.w} ${a.y + a.h / 2} C ${a.x + a.w + 40} ${a.y + a.h / 2}, ${b.x - 40} ${b.y + b.h / 2}, ${b.x} ${b.y + b.h / 2}`}
                stroke="url(#wf1-edge)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8"
                style={{ animation: "wp-flow 2.2s linear infinite" }}
              />
            );
          })}
          {NODES.map((n) => (
            <g key={n.title}>
              <rect
                x={n.x} y={n.y} width={n.w} height={n.h}
                rx={12} ry={12}
                fill={n.active ? "rgba(90,133,255,0.12)" : "#fff"}
                stroke={n.active ? "rgba(90,133,255,0.6)" : "rgba(10,10,11,0.12)"}
                strokeWidth="1.5"
              />
              <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 4} textAnchor="middle" fontFamily={FONT} fontSize="13" fontWeight="600" fill="#0a0a0b">
                {n.title}
              </text>
            </g>
          ))}
        </svg>
        <CursorPointer bottom={48} right={140} label="Drop node" labelBg="#5A85FF" />
      </div>
    </div>
  );
}

function WorkflowCard2() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "260px 1fr" }}>
      <div style={{ padding: 20, borderRight: "1px solid rgba(10,10,11,0.06)", background: "#fff", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "rgba(10,10,11,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
          Pipeline · v47
        </div>
        {[
          { name: "Input · CSV",        state: "locked" },
          { name: "Style · Brand",      state: "locked" },
          { name: "Generate · Seedance", state: "active" },
          { name: "Refine · Edit",      state: "draft" },
          { name: "Output · Approved",  state: "draft" },
        ].map((n) => (
          <div key={n.name} style={{
            padding: "10px 12px",
            borderRadius: 10,
            background: n.state === "active" ? "rgba(90,133,255,0.08)" : n.state === "locked" ? "rgba(166,227,197,0.14)" : "#fafafa",
            border: n.state === "active" ? "1px solid rgba(90,133,255,0.32)" : n.state === "locked" ? "1px solid rgba(10,150,90,0.22)" : "1px solid rgba(10,10,11,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 500,
            color: "#0a0a0b",
          }}>
            <span>{n.name}</span>
            {n.state === "locked" && <span style={{ fontSize: 11, color: "#0a3a26" }}>🔒</span>}
            {n.state === "active" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5A85FF" }} />}
          </div>
        ))}
      </div>
      <div style={{ background: "#fafafa", padding: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: 380,
          aspectRatio: "4/5",
          borderRadius: 18,
          background: "linear-gradient(135deg, #5A85FF, #7C3AED)",
          border: "1px solid rgba(10,10,11,0.06)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
          position: "relative",
        }}>
          <div style={{ position: "absolute", top: 16, right: 16, padding: "5px 12px", background: "rgba(10,10,11,0.7)", borderRadius: 12, fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#fff", display: "inline-flex", alignItems: "center", gap: 5 }}>
            🔒 Locked
          </div>
          <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
            <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Brand approved</div>
            <div style={{ fontFamily: FONT, fontSize: TYPE.h3, fontWeight: 500, color: "#fff", lineHeight: 1.15 }}>Style · Brand Kit</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Kyoso-style mode section — shared shell ────────────────────────────────
type KyosoSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tabs: string[];
  cards: [React.ReactNode, React.ReactNode, React.ReactNode];
};

// Generic video card — drops a real <video> into the slideshow card slot.
function VideoCard({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

// Arrow button used by the slideshow nav — light-theme styling to match the
// home Customers band.
function SlideArrow({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous" : "Next"}
      /* Same pager as the Enterprise platform rail and the industry rail:
         38px circle, hairline border, white fill, no shadow. */
      style={{
        width: 38,
        height: 38,
        borderRadius: 999,
        border: "1px solid var(--line)",
        background: "#fff",
        color: disabled ? "var(--ink-3)" : "var(--ink)",
        cursor: disabled ? "default" : "pointer",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function KyosoModeSection({ id, eyebrow, title, description, tabs, cards }: KyosoSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const total = cards.length;
  const goPrev = () => setActiveTab((t) => (t > 0 ? t - 1 : t));
  const goNext = () => setActiveTab((t) => (t < total - 1 ? t + 1 : t));

  // Slideshow geometry — smaller peek so the active card runs bigger.
  const PEEK = 36; // px of adjacent card visible on each side
  const GAP = 20;
  // Slideshow gets its own wider container so the active card is larger than
  // the centered heading column above it.
  // The rail sits on the page container like every other section, so the
  // active card is exactly container width instead of overhanging it.
  const SLIDESHOW_PAD = CONTAINER_PAD;

  const trackTransform = `translateX(calc(${PEEK}px - ${activeTab} * (100% - ${2 * PEEK}px) - ${activeTab * GAP}px))`;

  // Scroll-driven zoom: slideshow starts at ~70% scale when the section is
  // entering the viewport and grows to full size as the user scrolls through.
  // Style is written directly to the DOM (no React state) so we don't re-render
  // on every frame and the transform stays on the compositor.
  const kSectionRef = useRef<HTMLElement | null>(null);
  const kSlideshowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 1.0;
    function update() {
      const sec = kSectionRef.current;
      const slide = kSlideshowRef.current;
      if (!sec || !slide) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;           // section top at viewport bottom
      const end = vh * 0.30;      // section top near viewport top — fully in view
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * p;
      slide.style.transform = `scale(${scale})`;
    }
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={kSectionRef}
      id={id}
      style={{
        position: "relative",
        background: "#ffffff",
        color: "#0a0a0b",
        padding: `${SECTION_Y} 0`,
        overflow: "hidden",
        scrollMarginTop: 100,
      }}
    >
      {/* Centered heading + arrows on the right (grid keeps heading visually centered) */}
      <div
        style={{
          padding: `0 ${CONTAINER_PAD}`,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24,
          marginBottom: 36,
        }}
      >
        <div aria-hidden />

        <div style={{ maxWidth: 760, textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(10,10,11,0.55)",
              letterSpacing: "-0.005em",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
          <h2
            style={{
              fontFamily: FONT,
              fontSize: TYPE.h2,
              fontWeight: 500,
              color: "#0a0a0b",
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              margin: "0 0 18px",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 16,
              color: "rgba(10,10,11,0.6)",
              lineHeight: 1.55,
              letterSpacing: "-0.005em",
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <SlideArrow dir="left"  onClick={goPrev} disabled={activeTab === 0} />
          <SlideArrow dir="right" onClick={goNext} disabled={activeTab === total - 1} />
        </div>
      </div>

      <div style={{ padding: `0 ${CONTAINER_PAD}` }}>
        {/* Tabs — rounded rectangle (radius < half height) so corners read as corners, not a pill */}
        <div
          style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 48, flexWrap: "wrap" }}
          role="tablist"
          aria-label={`${title} features`}
        >
          {tabs.map((tab, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${id}-panel`}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "12px 20px",
                  borderRadius: 14,
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                  background: isActive ? "#0a0a0b" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(10,10,11,0.65)",
                  border: isActive ? "1px solid #0a0a0b" : "1px solid rgba(10,10,11,0.12)",
                  transition: "background 200ms ease, color 200ms ease, border-color 200ms ease",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slideshow carousel — transform is updated imperatively from the
          scroll handler above so we don't re-render the whole section. */}
      <div
        ref={kSlideshowRef}
        id={`${id}-panel`}
        role="tabpanel"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: `0 ${SLIDESHOW_PAD}`,
          transform: "scale(0.5)",
          transformOrigin: "center top",
          willChange: "transform",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: GAP,
            transform: trackTransform,
            transition: "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {cards.map((card, i) => {
            const isActive = activeTab === i;
            return (
              <div
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  flex: `0 0 calc(100% - ${2 * PEEK}px)`,
                  aspectRatio: "16 / 9",
                  borderRadius: 24,
                  background: "#ffffff",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid var(--line)",
                  transition: "transform 520ms cubic-bezier(0.22,1,0.36,1)",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                {card}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}


// ────────────────────────────────────────────────────────────────────────────
// FLORA-style use-cases section — vertical category list + visual
// ────────────────────────────────────────────────────────────────────────────
type UseCase = {
  id: string;
  label: string;
  visualTitle: string;
  desc: string;
  // TODO: replace with Fal-generated category video
  video: string;
};

const USE_CASES: UseCase[] = [
  { id: "vfx",          label: "Visual Effects", visualTitle: "Character & Background Swaps", desc: "Swap scenes. Add objects. Reimagine anything.",            video: "/workflow-hero.mp4" },
  { id: "fashion",      label: "Fashion",        visualTitle: "Editorial Lookbooks",          desc: "Editorial fashion stories. On-model, every time.",         video: "/editor-demo.mp4"   },
  { id: "advertising",  label: "Advertising",    visualTitle: "Performance Ad Pack",          desc: "Hooks, statics, motion. Built for paid social.",           video: "/simple-demo.mp4"   },
  { id: "photography",  label: "Photography",    visualTitle: "Studio Product Shots",         desc: "Photoreal SKU shots. No studio.",                          video: "/iterate-demo.mp4"  },
  { id: "concepting",   label: "Concepting",     visualTitle: "Concept Art & Worldbuilding",  desc: "Characters, environments, props, on-style.",             video: "/media/variable-demo.mp4" },
  { id: "branding",     label: "Branding",       visualTitle: "Brand Kit Application",        desc: "Lock your brand once. Generate forever.",                  video: "/models-bg.mp4"     },
  { id: "product",      label: "Product",        visualTitle: "Packshots & Renders",          desc: "Studio-grade visuals for every PDP.",                      video: "/workflow-hero.mp4" },
  { id: "motion",       label: "Motion",         visualTitle: "Animated Brand Moments",       desc: "Statics into motion. Loops, transitions, hero moments.",   video: "/editor-demo.mp4"   },
  { id: "character",    label: "Character",      visualTitle: "Consistent Characters",        desc: "Characters that stay on-model. Always.",                   video: "/iterate-demo.mp4"  },
  { id: "architecture", label: "Architecture",   visualTitle: "Spaces & Environments",        desc: "Spaces with photoreal lighting. Any scale.",               video: "/simple-demo.mp4"   },
];

function UseCasesFlora() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cardVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const current = USE_CASES[activeIndex];

  useEffect(() => {
    let ticking = false;
    function update() {
      ticking = false;
      const focusY = window.innerHeight * 0.4;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Only decode the active video. Inactive videos stay mounted (so the
  // crossfade is instant) but are paused so the browser stops decoding them.
  useEffect(() => {
    cardVideoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) {
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeIndex]);

  function jumpTo(i: number) {
    const el = itemRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const target = rect.top + window.scrollY - window.innerHeight * 0.4 + rect.height / 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section
      style={{
        position: "relative",
        background: SURFACE.page,
        color: SURFACE.ink,
        padding: `${SECTION_Y} 0`,
      }}
    >
      {/* Background — only the active category's video is mounted, blurred and
          dimmed. Keyed by id so React swaps the element on change (no decoder
          pile-up). Blur kept light (32px) to halve paint cost vs. the original. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <video
          key={current.id}
          src={current.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.15)",
            filter: "blur(32px) brightness(0.45) saturate(1.1)",
            animation: "wp-bg-fade 600ms ease both",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              // Inverted with the surface: the section is light now, so the
              // scrim lifts the blurred category video toward the page wash
              // instead of sinking it toward black.
              "linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.94) 100%)",
          }}
        />
      </div>

      {/* Foreground content — left scrolls normally, right is sticky */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: `0 ${CONTAINER_PAD}`,
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.78fr) minmax(0, 1.22fr)",
          gap: 64,
          alignItems: "stretch",
        }}
      >
        {/* Left — header + vertical category list, normal flow.
            paddingBottom extends the row height so the sticky right column
            stays pinned through every category, not just the first few. */}
        <div style={{ paddingBottom: "30vh" }}>
          <h2
            style={{
              fontFamily: FONT,
              fontSize: TYPE.h2,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 16px",
            }}
          >
            Scale every idea into a workflow.
          </h2>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 15,
              color: SURFACE.ink2,
              lineHeight: 1.5,
              letterSpacing: "-0.005em",
              margin: "0 0 28px",
              maxWidth: 480,
            }}
          >
            From product shots to VFX, from lookbooks to motion ads, a workflow for every kind of creative work.
          </p>
          <div style={{ display: "flex", gap: 10, marginBottom: 80 }}>
            <ButtonLink href="#" variant="ghost" size="md">
              Open the app
            </ButtonLink>
            <ButtonLink href="/templates" variant="muted" size="md">
              Browse workflows
            </ButtonLink>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
            {USE_CASES.map((u, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={u.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  style={{ minHeight: "8vh", display: "flex", alignItems: "center" }}
                >
                  <button
                    onClick={() => jumpTo(i)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontFamily: FONT,
                      // Single base font-size for every item — animating font-size
                      // forces a layout reflow on every active-index change, which
                      // is what was shifting the page mid-scroll. Active state is
                      // now expressed via transform: scale (compositor-only).
                      fontSize: TYPE.h2,
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      color: isActive ? SURFACE.ink : SURFACE.ink4,
                      transform: isActive ? "scale(1)" : "scale(0.74)",
                      transformOrigin: "left center",
                      willChange: "transform",
                      transition: "color 360ms ease, transform 360ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {u.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right — sticky video card with crossfade between categories.
            Outer div is a stretching grid item; the inner div is sticky so it
            stays pinned through the full height of the left column. */}
        <div>
          <div style={{ position: "sticky", top: 100 }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid ${SURFACE.line}`,
              background: SURFACE.tile,
              boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
            }}
          >
            {USE_CASES.map((u, i) => (
              <video
                key={u.id}
                ref={(el) => {
                  cardVideoRefs.current[i] = el;
                }}
                src={u.video}
                loop
                muted
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: i === activeIndex ? 1 : 0,
                  transition: "opacity 600ms ease",
                }}
              />
            ))}
          </div>
          <div style={{ marginTop: 24, minHeight: 130 }}>
            <h3
              key={`title-${current.id}`}
              style={{
                fontFamily: FONT,
                fontSize: TYPE.h3,
                fontWeight: 600,
                color: SURFACE.ink,
                letterSpacing: "-0.03em",
                margin: "0 0 8px",
                animation: "wp-fade 360ms cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              {current.visualTitle}
            </h3>
            <p
              key={`desc-${current.id}`}
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 500,
                color: SURFACE.ink3,
                lineHeight: 1.55,
                margin: "0 0 18px",
                maxWidth: 540,
                animation: "wp-fade 360ms cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              {current.desc}
            </p>
            <ButtonLink href="/templates" variant="ghost" size="md">
              Explore this Flow →
            </ButtonLink>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Templates section — same shape as the home TemplatesSection (categories + grid)
// ────────────────────────────────────────────────────────────────────────────
const TPL_CATEGORIES = ["All", "Fashion", "Advertising", "Product", "VFX", "Branding", "Character"];

const TEMPLATES = [
  { cat: "Fashion",     title: "Garment Try-Ons",         desc: "Outfit swaps and lifestyle visuals from a single product image.",    seed: "wf-tpl-fashion-tryon"   },
  { cat: "Advertising", title: "Campaign Variants",       desc: "One brief into every format and market, on-brand by default.",       seed: "wf-tpl-ad-campaign"     },
  { cat: "Product",     title: "Studio Product Shots",    desc: "Photorealistic SKU imagery in any setting. No studio required.",    seed: "wf-tpl-product-studio"  },
  { cat: "VFX",         title: "Scene Compositing",       desc: "Chain image and video models into one narrative pipeline.",          seed: "wf-tpl-vfx-scene"       },
  { cat: "Branding",    title: "Brand Kit Application",   desc: "Lock your identity once. Generate infinite on-brand assets.",        seed: "wf-tpl-brand-kit"       },
  { cat: "Character",   title: "Consistent Characters",   desc: "Build characters that stay on-model across every medium.",           seed: "wf-tpl-character"       },
];

function TemplatesPreview() {
  const [activeCat, setActiveCat] = useState<string>("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const visible = activeCat === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.cat === activeCat);

  return (
    <section style={{ position: "relative", background: "#ffffff", padding: `${SECTION_Y} ${CONTAINER_PAD}`, color: "#0a0a0b" }}>
      <SectionGuides edge="top" />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p className="eyebrow">Templates</p>
          <h2 className="h2" style={{ marginTop: 12 }}>
            Pre-built workflows, <span className="h-muted">ready to use</span>
          </h2>
        </div>
        <ButtonLink href="/templates" variant="ghost" size="md">
          See all the templates
        </ButtonLink>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
        {TPL_CATEGORIES.map((cat) => {
          const isActive = activeCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                padding: "9px 16px",
                borderRadius: 100,
                cursor: "pointer",
                background: isActive ? "#0a0a0b" : "transparent",
                color: isActive ? "#ffffff" : "rgba(10,10,11,0.65)",
                border: isActive ? "1px solid #0a0a0b" : "1px solid rgba(10,10,11,0.14)",
                transition: "background 180ms ease, color 180ms ease, border-color 180ms ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Uniform card grid: the templates are peers with one shared 4:3
          aspect, which is exactly the case Guidelines §6 reserves it for. */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }}>
        {visible.map((t, i) => {
          const isHov = hovered === i;
          return (
            <Link
              key={t.seed}
              href="/templates"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  background: "var(--panel-2)",
                  position: "relative",
                  transition: "transform 400ms cubic-bezier(0.22,1,0.36,1), border-color 300ms",
                  transform: isHov ? "translateY(-3px)" : "translateY(0)",
                  /* A hairline does the work; §3 prefers no shadow. */
                  border: `1px solid ${isHov ? "var(--line-strong)" : "var(--line)"}`,
                }}
              >
                <MediaPlaceholder tone="light" label={t.title} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(10,10,11,0.45)",
                    marginBottom: 6,
                  }}
                >
                  {t.cat}
                </div>
                <h3
                  style={{
                    fontFamily: FONT,
                    fontSize: TYPE.h3,
                    fontWeight: 500,
                    color: "#0a0a0b",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    margin: "0 0 6px",
                  }}
                >
                  {t.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    color: "rgba(10,10,11,0.55)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
export default function WorkflowPage() {
  return (
    <main>
      <CanvasHero />

      <style>{`
        @keyframes wp-fade {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes wp-bg-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Agentic — single consolidated section covering agentic creativity,
          workflow control, and simple mode via three videos */}
      <KyosoModeSection
        id="agentic"
        eyebrow="Creative modes"
        title="On-brand creative production, at scale."
        description="Iterate fast on ideas. Scale production with repeatable workflows. Multiply output with creative agents."
        tabs={["Quick Iterations", "Full Creative Pipelines", "Autonomous Agent"]}
        cards={[
          <VideoCard key="a1" src={withBasePath("/media/card-generate.mp4")} />,
          <VideoCard key="a2" src={withBasePath("/media/variable-demo.mp4")} />,
          <VideoCard key="a3" src={withBasePath("/media/apps/sketch-to-render.mp4")} />,
        ]}
      />

      <UseCasesFlora />
      <BentoSection />
      <TemplatesPreview />
    </main>
  );
}
