"use client";

import { CONTAINER_PAD, SECTION_Y, TYPE } from "./scale";
import { useRef, useState } from "react";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";
import { CollaborationDemo } from "@/components/CollaborationDemo";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { withBasePath } from "@/lib/assets";

const FONT = "var(--font-sans), sans-serif";

const CARD_BG = "#ffffff";
const CARD_BORDER = "1px solid rgba(0,0,0,0.08)";
const DEMO_BG = "#0F0F13";
const DEMO_BORDER = "1px solid rgba(255,255,255,0.05)";

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
            <MediaPlaceholder />
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
            <MediaPlaceholder />
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
      <MediaPlaceholder label="Batched product variants: packaging, key shots, product pages" />
    </div>
  );
}

// ── Card shell — text on top, demo on bottom ────────────────────────────────
function Card({
  num,
  title,
  desc,
  children,
  span = 1,
  height,
  big = false,
}: {
  num: string;
  title: string;
  desc: string;
  children: React.ReactNode;
  span?: number;
  height: number;
  big?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        display: "flex",
        flexDirection: "column",
        background: CARD_BG,
        border: CARD_BORDER,
        borderRadius: 22,
        padding: 28,
        boxSizing: "border-box",
        height,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22, maxWidth: big ? 520 : "none" }}>
        <div
          style={{
            ...TEXT_STYLE,
            fontSize: 10,
            color: "rgba(10,10,11,0.4)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {num}
        </div>
        <h3
          style={{
            ...TEXT_STYLE,
            fontSize: big ? "clamp(22px, 2vw, 28px)" : "clamp(17px, 1.5vw, 21px)",
            fontWeight: 500,
            color: "#0a0a0b",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            ...TEXT_STYLE,
            fontSize: 13.5,
            color: "rgba(10,10,11,0.62)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>

      {/* Visual frame fills the rest */}
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function BentoSection() {
  return (
    <section style={{ padding: `${SECTION_Y} ${CONTAINER_PAD}`, backgroundColor: "#ffffff", display: "flow-root" }}>
      <div style={{ marginBottom: 100 }} />

      {/* Heading */}
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            ...TEXT_STYLE,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(10,10,11,0.45)",
            marginBottom: 16,
          }}
        >
          Capabilities
        </div>
        <h2 style={{ ...TEXT_STYLE, fontSize: TYPE.h2, fontWeight: 400, color: "#0a0a0b", letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
          Built for teams that{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(10,10,11,0.5)" }}>scale.</em>
        </h2>
        <p style={{ ...TEXT_STYLE, fontSize: TYPE.body, color: "rgba(10,10,11,0.55)", marginTop: 12 }}>
          Real-time collaboration, brand consistency, and deep integrations — all in one place.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        {/* Top row — wide collaboration spans 2 cols, agents takes 1 col */}
        <Card
          num="01"
          title="Real-time collaboration."
          desc="See every change live. Comment, edit, and iterate alongside your whole team on the same canvas. No exports, no version sprawl."
          span={2}
          height={500}
          big
        >
          <CollaborationDemo tone="dark" />
        </Card>

        <Card
          num="02"
          title="Agents with shared context."
          desc="Creative agents that carry context across image, video, audio, and text, so work moves from concept to delivery without fragmentation."
          height={500}
        >
          <OrbitalAgents />
        </Card>

        {/* Bottom row — three equal cards */}
        <Card
          num="03"
          title="On-brand visuals."
          desc="Brand kits, moodboards, and style memory. Lock your identity once, generate infinite on-brand outputs."
          height={420}
        >
          <BrandKitDemo />
        </Card>

        <Card
          num="04"
          title="Scaled production."
          desc="Plug in a CSV or feed and batch-generate every locale, format, and SKU automatically."
          height={420}
        >
          <ScaledDemo />
        </Card>

        <Card
          num="05"
          title="Integrations."
          desc="Connect Figma, Slack, Notion, and 100+ tools your team already uses. No accounts required."
          height={420}
        >
          <IntegrationsGrid />
        </Card>
      </div>
    </section>
  );
}
