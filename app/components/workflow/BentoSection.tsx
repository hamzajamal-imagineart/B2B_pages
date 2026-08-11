"use client";
import { useRef, useState } from "react";

const FONT = "var(--font-sans), sans-serif";
const CONTAINER_PAD = "calc((100vw - min(86vw, 1360px)) / 2)";

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
        src="https://static.cdn-luma.com/files/sanity/d1ef7d37-b306-43d4-ad3c-8c5ecf9b7d55.mp4#t=0.001"
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

// ── Real-time collaboration: cursors floating over a soft canvas ────────────
const CURSORS = [
  { name: "Nima",      color: "#7B9EFF", x: "16%", y: "32%", enter: "translateY(-60px)" },
  { name: "Sophia",    color: "#F47A7A", x: "78%", y: "26%", enter: "translateX(60px)"  },
  { name: "Bogdan",    color: "#5CB8FF", x: "70%", y: "70%", enter: "translateX(60px)"  },
  { name: "Francisco", color: "#F5C06A", x: "20%", y: "70%", enter: "translateX(-60px)" },
];

function CollaborationDemo() {
  const [hovered, setHovered] = useState(false);
  const youBubbleRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const b = youBubbleRef.current;
    if (!b) return;
    const rect = e.currentTarget.getBoundingClientRect();
    b.style.left = `${e.clientX - rect.left + 14}px`;
    b.style.top = `${e.clientY - rect.top + 6}px`;
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
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
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Soft mock canvas surface in the center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "62%",
          aspectRatio: "16/10",
          borderRadius: 10,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <img
          src="https://picsum.photos/seed/collab-canvas/640/400"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.65)" }}
        />
      </div>

      {/* Cursors */}
      {CURSORS.map((c, i) => (
        <div
          key={c.name}
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0,0)" : c.enter,
            transition: `opacity 420ms cubic-bezier(0.34,1.56,0.64,1) ${i * 65}ms, transform 420ms cubic-bezier(0.34,1.56,0.64,1) ${i * 65}ms`,
            pointerEvents: "none",
          }}
        >
          <svg width="18" height="22" viewBox="0 0 14 18" fill="none">
            <path d="M0 0L0 14L4 10.5L6.5 16L8 15.5L5.5 10L10.5 10Z" fill={c.color} />
          </svg>
          <div
            style={{
              marginTop: 4,
              marginLeft: 4,
              background: c.color,
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              ...TEXT_STYLE,
              padding: "4px 10px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            {c.name}
          </div>
        </div>
      ))}

      {/* "You" bubble — follows cursor */}
      <div
        ref={youBubbleRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 200ms ease",
          zIndex: 20,
        }}
      >
        <div
          style={{
            background: "#fff",
            color: "#0a0a0b",
            fontSize: 11,
            fontWeight: 600,
            ...TEXT_STYLE,
            padding: "4px 10px",
            borderRadius: 8,
            whiteSpace: "nowrap",
            letterSpacing: "-0.01em",
            boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          You
        </div>
      </div>
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
          <img src="https://picsum.photos/seed/portrait/220/220" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
          <img src="https://picsum.photos/seed/dark-studio/220/220" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.65) saturate(0.8)" }} />
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
      {/* TODO: replace with the attached headphones mosaic once saved at /public/scaled-production.jpg */}
      <img
        src="https://picsum.photos/seed/scaled-production-mosaic/1200/750"
        alt="Batched product variants — packaging, key shots, product pages"
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

// ── Integrations: parallax icon grid ────────────────────────────────────────
const GDRIVE_SRC = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 87.3 78'><path d='m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z' fill='%230066da'/><path d='m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z' fill='%2300ac47'/><path d='m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 11.5z' fill='%23ea4335'/><path d='m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z' fill='%2300832d'/><path d='m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z' fill='%232684fc'/><path d='m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z' fill='%23ffba00'/></svg>";

const ICON_POOL = [
  { name: "Google Drive",  slug: "googledrive",  color: "#0F9D58", src: GDRIVE_SRC },
  { name: "Meta",          slug: "meta",         color: "#0082FB" },
  { name: "Slack",         slug: "slack",        color: "#E879F9", src: "/slack.svg" },
  { name: "Shopify",       slug: "shopify",      color: "#7AB55C" },
  { name: "Zapier",        slug: "zapier",       color: "#FF4A00" },
  { name: "Make",          slug: "make",         color: "#9B59B6" },
  { name: "Google Sheets", slug: "googlesheets", color: "#34A853" },
];

function sr(seed: number) { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); }

function IntegrationsDemo() {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = e.clientX, my = e.clientY;
    const dx = (mx - rect.left - rect.width / 2) / rect.width;
    const dy = (my - rect.top - rect.height / 2) / rect.height;
    card.querySelectorAll<HTMLDivElement>("[data-depth]").forEach((el) => {
      const depth = parseFloat(el.dataset.depth ?? "1");
      const r = el.getBoundingClientRect();
      const dist = Math.sqrt((mx - (r.left + r.width / 2)) ** 2 + (my - (r.top + r.height / 2)) ** 2);
      const prox = Math.max(0, 1 - dist / 90);
      el.style.transform = `translate(${dx * 22 * depth}px, ${dy * 16 * depth}px) scale(${1 + prox * 0.18})`;
      el.style.filter = prox > 0.05 ? `brightness(${1 + prox * 0.6})` : "";
    });
  }

  function onMouseLeave() {
    cardRef.current?.querySelectorAll<HTMLDivElement>("[data-depth]").forEach((el) => {
      el.style.transform = "";
      el.style.filter = "";
    });
  }

  const SIZE = 50, GAP = 14, COLS = 9, ROWS = 6;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
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
      <div style={{ display: "flex", flexDirection: "column", padding: 12 }}>
        {Array.from({ length: ROWS }).map((_, row) => (
          <div
            key={row}
            style={{
              display: "flex",
              gap: GAP,
              marginBottom: GAP,
              marginLeft: row % 2 === 1 ? (SIZE + GAP) / 2 : 0,
            }}
          >
            {Array.from({ length: COLS }).map((_, col) => {
              const icon = ICON_POOL[Math.floor(sr(row * 37 + col * 17) * ICON_POOL.length)];
              const depth = (0.4 + sr(row * 41 + col * 23 + 7) * 1.4).toFixed(2);
              return (
                <div
                  key={col}
                  data-depth={depth}
                  style={{
                    flexShrink: 0,
                    width: SIZE,
                    height: SIZE,
                    borderRadius: "50%",
                    background: "#1f1f24",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.15s ease-out, filter 0.15s ease-out",
                    willChange: "transform",
                  }}
                >
                  <img
                    src={icon.src ?? `https://cdn.simpleicons.org/${icon.slug}/${icon.color.replace("#", "")}`}
                    alt={icon.name}
                    width={20}
                    height={20}
                    style={{ display: "block", objectFit: "contain", pointerEvents: "none" }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 65% 65% at 50% 50%, transparent 25%, ${DEMO_BG} 100%)`,
          pointerEvents: "none",
        }}
      />
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
    <section style={{ padding: `100px ${CONTAINER_PAD} 120px`, backgroundColor: "#ffffff", display: "flow-root" }}>
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
        <h2 style={{ ...TEXT_STYLE, fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 400, color: "#0a0a0b", letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
          Built for teams that{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(10,10,11,0.5)" }}>scale.</em>
        </h2>
        <p style={{ ...TEXT_STYLE, fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(10,10,11,0.55)", marginTop: 12 }}>
          Real-time collaboration, brand consistency, and deep integrations — all in one place.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        {/* Top row — wide collaboration spans 2 cols, agents takes 1 col */}
        <Card
          num="01"
          title="Real-time collaboration."
          desc="See every change live. Comment, edit, and iterate alongside your whole team on the same canvas — no exports, no version sprawl."
          span={2}
          height={500}
          big
        >
          <CollaborationDemo />
        </Card>

        <Card
          num="02"
          title="Agents with shared context."
          desc="Creative agents that carry context across image, video, audio, and text — so work moves from concept to delivery without fragmentation."
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
          <IntegrationsDemo />
        </Card>
      </div>
    </section>
  );
}
