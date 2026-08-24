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
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={withBasePath("/media/bento/agents.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
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

// ── On-brand visuals: the real brand-kit board ─────────────────────────────
/* The supplied board, now as footage rather than the still that stood here.
   Bottom-anchored under the same mask fade as the other visuals in this bento.

   One thing changed with the swap: the still was a transparent PNG and sat
   frameless, the artwork's own cards reading as the visual. Video carries no
   alpha, so this is an opaque rectangle and the clip's own background is now
   part of the card.

   The orange is a customer's brand colour, which is the sanctioned exception
   to monochrome, the same way the partner logos keep theirs.

   The still it replaced is still the Brand Guidelines card in the suite rail,
   so it is in use, not orphaned — do not prune it. */
function BrandKitDemo() {
  return (
    <div className="bk">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={withBasePath("/media/brandkit/brand-kits.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <style>{`
        .bk {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: stretch;
          overflow: hidden;
        }
        .bk video {
          width: 100%;
          /* Fills the media box rather than sitting at its natural height,
             which bottom-aligned the clip and left dead space above it. Cover
             rather than contain: contain letterboxes inside a box whose
             aspect is set by the tile, not by the footage. */
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </div>
  );
}

// ── Scaled production: batched output mosaic ────────────────────────────────
/* Scaled production: the batch itself. A feed comes in, rows fan out across
   locale and format, and the run reports progress. That is the claim of the
   card, so the panel states it as a job rather than as decoration. */
const BATCH = [
  { sku: "SKU-4417", locale: "en-GB", fmt: "1:1", done: true },
  { sku: "SKU-4417", locale: "de-DE", fmt: "4:5", done: true },
  { sku: "SKU-4418", locale: "fr-FR", fmt: "9:16", done: true },
  { sku: "SKU-4418", locale: "ja-JP", fmt: "16:9", done: false },
];

function ScaledDemoPanel() {
  return (
    <div className="sd">
      <div className="sd-head">
        <span className="sd-file">autumn-drop.csv</span>
        <span className="sd-count">128 rows</span>
      </div>

      <ul className="sd-rows">
        {BATCH.map((r, i) => (
          <li key={i}>
            <span className="sd-sku">{r.sku}</span>
            <span className="sd-meta">{r.locale}</span>
            <span className="sd-meta">{r.fmt}</span>
            <span className={`sd-dot ${r.done ? "sd-dot-on" : ""}`} aria-hidden />
          </li>
        ))}
      </ul>

      <div className="sd-foot">
        <div className="sd-bar" aria-hidden><span /></div>
        <span className="sd-prog">94 / 128 generated</span>
      </div>

      <style>{`
        .sd { padding: 14px 14px 0; font-size: 12px; }
        .sd-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
        }
        .sd-file { color: var(--ink); }
        .sd-count { font-size: 11px; color: var(--ink-3); }
        .sd-rows { list-style: none; margin: 0; padding: 0; }
        .sd-rows li {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto auto 10px;
          align-items: center; gap: 10px;
          padding: 8px 0;
          border-top: 1px solid var(--line);
        }
        .sd-sku { color: var(--ink); }
        .sd-meta { font-size: 11px; color: var(--ink-3); }
        .sd-dot {
          width: 7px; height: 7px; border-radius: 999px;
          border: 1px solid var(--line-strong);
        }
        .sd-dot-on { background: var(--ink); border-color: var(--ink); }
        .sd-foot { padding: 12px 0 16px; border-top: 1px solid var(--line); }
        .sd-bar {
          height: 4px; border-radius: 999px;
          background: rgba(0,0,0,0.07); overflow: hidden;
        }
        .sd-bar span { display: block; width: 73%; height: 100%; background: var(--ink); }
        .sd-prog { display: block; margin-top: 7px; font-size: 11px; color: var(--ink-3); }
      `}</style>
    </div>
  );
}

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
      <ScaledDemoPanel />
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
        {/* Top row — wide brand-kit tile spans 2 cols, agents takes 1 col.
            On-brand visuals holds the wide slot because it is the only tile
            here carrying real footage, and it was the least legible of the
            three narrow ones at a third of the row. Collaboration traded
            places with it and reads fine narrow: its visual is a cursor
            board that crops without losing the point. */}
        <Card
          title="On-brand visuals."
          desc="Brand kits, moodboards, and style memory. Lock your identity once, generate infinite on-brand outputs."
          span={2}
          big
        >
          <BrandKitDemo />
        </Card>

        <Card
          title="Agents with shared context."
          desc="Creative agents that carry context across image, video, audio, and text, so work moves from concept to delivery without fragmentation."
        >
          <OrbitalAgents />
        </Card>

        {/* Bottom row — three equal cards */}
        <Card
          title="Real-time collaboration."
          desc="See every change live. Comment, edit, and iterate alongside your whole team on the same canvas. No exports, no version sprawl."
        >
          <CollaborationDemo tone="light" />
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
          <IntegrationsGrid vignette={false} tone="light" />
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
