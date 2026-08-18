"use client";

import { SectionGuides } from "@/components/primitives/SectionGuides";

import { CONTAINER_PAD, SECTION_Y, TYPE } from "./scale";
import { useRef, useState } from "react";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";
import { CollaborationDemo } from "@/components/CollaborationDemo";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { withBasePath } from "@/lib/assets";

const FONT = "var(--font-sans), sans-serif";

const CARD_BG = "#ffffff";
const CARD_BORDER = "1px solid rgba(0,0,0,0.08)";
const DEMO_BG = "var(--panel)";
const DEMO_BORDER = "1px solid var(--line)";

const TEXT_STYLE: React.CSSProperties = { fontFamily: FONT };

// ── Hero card visual: Luma-hosted agents loop ───────────────────────────────
function OrbitalAgents() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: DEMO_BG,
        border: DEMO_BORDER,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <video
        src={withBasePath("/media/apps/video-reframe.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

// ── On-brand visuals: brand kit tile grid ───────────────────────────────────
function BrandKitDemo() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: DEMO_BG,
        border: DEMO_BORDER,
        borderRadius: 16,
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8, height: "100%" }}>
        {/* 1 — Abstract shapes */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            background: "#edeae4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hov ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 420ms cubic-bezier(0.34,1.56,0.64,1) 0ms",
          }}
        >
          <svg viewBox="0 0 100 100" style={{ width: "70%", height: "70%" }} fill="none">
            <path d="M28,16 C50,2 78,20 73,48 C68,76 40,84 24,68 C8,52 6,30 28,16Z" fill="#111" />
            <path d="M60,56 C70,44 84,58 79,73 C74,88 58,84 53,73 C48,62 50,68 60,56Z" fill="#111" opacity="0.65" />
          </svg>
        </div>

        {/* 2 — Portrait */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            transform: hov ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 420ms cubic-bezier(0.34,1.56,0.64,1) 55ms",
          }}
        >
          <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
            <MediaPlaceholder tone="light" />
          </div>
        </div>

        {/* 3 — Color swatches */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            transform: hov ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 420ms cubic-bezier(0.34,1.56,0.64,1) 110ms",
          }}
        >
          {[{ c: "#D95F3B", l: "VERMILLION" }, { c: "#1E1E1E", l: "COD GRAY" }, { c: "#888", l: "GRAY" }, { c: "#EFEFEF", l: "WHITE" }].map((s, i) => (
            <div key={i} style={{ flex: 1, background: s.c, display: "flex", alignItems: "center", padding: "0 6px" }}>
              <span style={{ ...TEXT_STYLE, fontSize: 4.5, fontWeight: 700, letterSpacing: "0.1em", color: i >= 2 ? "#333" : "#fff" }}>{s.l}</span>
            </div>
          ))}
        </div>

        {/* 4 — Dark product */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            transform: hov ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 420ms cubic-bezier(0.34,1.56,0.64,1) 30ms",
          }}
        >
          <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
            <MediaPlaceholder tone="light" />
          </div>
        </div>

        {/* 5 — Brand identity grid */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            transform: hov ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 420ms cubic-bezier(0.34,1.56,0.64,1) 75ms",
          }}
        >
          <div style={{ background: "#D95F3B" }} />
          <div style={{ background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...TEXT_STYLE, color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: "-0.02em" }}>AR</span>
          </div>
          <div style={{ background: "#222", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...TEXT_STYLE, color: "rgba(255,255,255,0.35)", fontSize: 4.5, fontWeight: 600, letterSpacing: "0.15em" }}>BRAND</span>
          </div>
          <div style={{ background: "#D95F3B" }} />
        </div>

        {/* 6 — Typography */}
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            background: "#f2f0eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hov ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 420ms cubic-bezier(0.34,1.56,0.64,1) 130ms",
          }}
        >
          <span style={{ fontFamily: "Georgia, serif", fontSize: 46, fontWeight: 700, color: "#111", lineHeight: 1, letterSpacing: "-0.04em" }}>Gg</span>
        </div>
      </div>
    </div>
  );
}

// ── Scaled production: batched output mosaic ────────────────────────────────
function ScaledDemo() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: DEMO_BG,
        border: DEMO_BORDER,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Awaiting the batched-variants mosaic; see HANDOFF open items. */}
      <MediaPlaceholder tone="light" label="Batched product variants: packaging, key shots, product pages" />
    </div>
  );
}

// ── Card shell — text on top, demo on bottom ────────────────────────────────
function Card({
  title,
  desc,
  children,
  span = 1,
  big = false,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
  span?: number;
  big?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        display: "flex",
        flexDirection: "column",
        /* Tile fill, not white on white with a border: on the other pages a
           tile is its own band and the white surfaces are the things inside
           it. Guidelines §3. */
        background: "var(--tile)",
        borderRadius: 24,
        padding: 32,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h3
          style={{
            ...TEXT_STYLE,
            fontSize: big ? TYPE.h3Wide : TYPE.h3,
            fontWeight: 500,
            color: "var(--ink-heading)",
            letterSpacing: "-0.015em",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            ...TEXT_STYLE,
            fontSize: TYPE.body,
            color: "var(--ink-3)",
            lineHeight: 1.55,
            /* Wide tiles get a wider measure than narrow ones. */
            maxWidth: big ? "52ch" : "34ch",
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>

      {/* Media absorbs the leftover height and pins to the bottom, so a tile
          grows rather than clipping its own visual. Guidelines §6. */}
      <div style={{ marginTop: "auto", flex: 1, minHeight: 0, paddingTop: 28 }}>{children}</div>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function BentoSection() {
  return (
    <section style={{ position: "relative", padding: `${SECTION_Y} ${CONTAINER_PAD}`, backgroundColor: "#ffffff", display: "flow-root" }}>
      <SectionGuides edge="top" />
      {/* Heading, on the shared type classes rather than a local copy of them */}
      <div style={{ marginBottom: 48 }}>
        <p className="eyebrow">Capabilities</p>
        <h2 className="h2" style={{ marginTop: 12 }}>
          Built for teams that <span className="h-muted">scale</span>
        </h2>
        <p className="lede" style={{ marginTop: 14 }}>
          Real-time collaboration, brand consistency, and deep integrations, all in one place.
        </p>
      </div>

      <div className="wf-bento">
        {/* Top row — wide collaboration spans 2 cols, agents takes 1 col */}
        <Card
          title="Real-time collaboration."
          desc="See every change live. Comment, edit, and iterate alongside your whole team on the same canvas. No exports, no version sprawl."
          span={2}
          big
        >
          <CollaborationDemo tone="light" />
        </Card>

        <Card
          title="Agents with shared context."
          desc="Creative agents that carry context across image, video, audio, and text, so work moves from concept to delivery without fragmentation."
        >
          <OrbitalAgents />
        </Card>

        {/* Bottom row — three equal cards */}
        <Card
          title="On-brand visuals."
          desc="Brand kits, moodboards, and style memory. Lock your identity once, generate infinite on-brand outputs."
        >
          <BrandKitDemo />
        </Card>

        <Card
          title="Scaled production."
          desc="Plug in a CSV or feed and batch-generate every locale, format, and SKU automatically."
        >
          <ScaledDemo />
        </Card>

        <Card
          title="Integrations."
          desc="Connect Figma, Slack, Notion, and 100+ tools your team already uses. No accounts required."
        >
          <IntegrationsGrid vignette={false} />
        </Card>

        <style>{`
          /* 5 tiles over 3 columns: [2,1] then [1,1,1]. Tiles exactly, with a
             flagship in the first row and peers in the second, so the mixed
             spans are earned rather than decorative. Guidelines §6. */
          .wf-bento {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
          }
          @media (min-width: 768px) {
            .wf-bento { grid-auto-rows: minmax(360px, auto); }
          }
          @media (max-width: 900px) {
            .wf-bento { grid-template-columns: 1fr; }
            .wf-bento > * { grid-column: span 1 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
