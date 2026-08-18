"use client";

import { useRef } from "react";

/**
 * Integration icon grid with a parallax/proximity hover.
 *
 * Lifted out of the Workflows page's BentoSection so both pages render the
 * same component rather than two drifting copies — that page now imports it
 * from here.
 *
 * Icons come from simpleicons' CDN, so they are the real marks rather than
 * approximations; GDRIVE_SRC is inlined because Drive's mark is multi-colour
 * and the CDN only serves single-colour fills.
 */
const BG = "transparent";
const BORDER = "1px solid rgba(255,255,255,0.05)";

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

export function IntegrationsGrid({ vignette = true }: { vignette?: boolean } = {}) {
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
        background: BG,
        border: 0,
        borderRadius: 0,
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

      {/* Vignette. Fades the grid into a dark card on the Enterprise stack
          rail; on a light tile it reads as a dark blob, so that caller turns
          it off. Default on, so existing usage is unchanged. */}
      {vignette && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.35) 100%)',
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
