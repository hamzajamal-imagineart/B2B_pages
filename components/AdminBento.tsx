"use client";

import { CollaborationDemo } from "@/components/CollaborationDemo";
import { withBasePath } from "@/lib/assets";

/**
 * The four-tile admin bento.
 *
 * Lifted out of the Enterprise page's Control section so the Business page's
 * Z-fold renders the same component rather than a fork — both specs list the
 * identical four panels (complete admin control, efficient asset management,
 * unlimited members, collaborate end to end), and two copies would drift.
 *
 * Layout is 3 columns as [2,1] [1,2]: the two wide tiles carry the denser
 * dashboards (Guidelines §6).
 */
export function AdminBento({ className = "" }: { className?: string }) {
  return (
    <div className={`pbento ${className}`}>
      <Tile
        wide
        title="Complete Admin Control"
        body="One dashboard for your entire organization. Manage roles, monitor usage, and govern access across every team without losing visibility."
        bg="/media/admin/tile-admin.jpg"
        visual={<PlaceholderPanel />}
      />
      <Tile
        title="Efficient Asset Management"
        bg="/media/admin/tile-assets.jpg"
        body="Every generation organized, searchable, and on-brand."
        visual={<PlaceholderPanel />}
      />
      <Tile
        title="Unlimited Members, No Added Cost"
        bg="/media/admin/tile-members.jpg"
        body="Bring your whole team. Seats don't cost extra."
        visual={<PlaceholderPanel />}
      />
      <Tile
        wide
        title="Collaborate End to End"
        bg="/media/admin/tile-collab.jpg"
        body="Comments, approvals, and shared review built in, so feedback happens where the work lives, not scattered across emails and threads."
        visual={<CollabPanel />}
      />

      <style>{`
        .pbento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (min-width: 768px) {
          .pbento { grid-auto-rows: minmax(400px, auto); }
        }
        .ptile {
          grid-column: span 1;
          display: flex;
          flex-direction: column;
          background: var(--tile);
          border-radius: 24px;
          padding: 32px;
          overflow: hidden;
        }
        .ptile-wide { grid-column: span 2; }
        .ptile-title {
          font-size: clamp(20px, 1.8vw, 26px);
          letter-spacing: -0.015em; line-height: 1.15; font-weight: 400;
        }
        /* Narrow tiles get a tighter measure than wide ones. */
        .ptile-body {
          margin-top: 10px;
          max-width: 34ch;
          color: var(--ink-3); font-size: 15px; line-height: 1.55;
        }
        .ptile-wide .ptile-body { max-width: 52ch; }
        /* Media absorbs the leftover height and is pinned to the bottom, so a
           tile grows rather than clipping its own dashboard. */
        .ptile-media {
          margin-top: auto;
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: flex-end;
          padding-top: 28px;
        }
        /* The narrow tiles carry less copy, so their panel takes the slack as
           height rather than leaving a gap above it. */
        .ptile:not(.ptile-wide) .admin-placeholder { aspect-ratio: 16 / 13; }
        /* Bare wrapper: the dashboard inside is already a white bordered
           card, so a second white surface behind it just doubled the frame. */
        .ptile-surface { width: 100%; }
        @media (max-width: 900px) {
          .pbento { grid-template-columns: 1fr; }
          .ptile, .ptile-wide { grid-column: span 1; }
        }
      `}</style>
    </div>
  );
}

function Tile({
  title,
  body,
  visual,
  wide,
  bg,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
  wide?: boolean;
  /** Photograph behind the tile. The flat --tile fill stays underneath as the
   *  fallback, so nothing flashes before the image paints. A soft wash is
   *  layered over it to hold the dark heading; backgroundImage carries both,
   *  never the `background` shorthand, which would wipe the fill. */
  bg?: string;
}) {
  return (
    <div
      className={`ptile ${wide ? "ptile-wide" : ""}`}
      style={
        bg
          ? {
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.42) 46%, rgba(255,255,255,0.12) 100%), " +
                `url(${withBasePath(bg)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <h3 className="ptile-title">{title}</h3>
      <p className="ptile-body">{body}</p>
      <div className="ptile-media">
        <div className="ptile-surface">{visual}</div>
      </div>
    </div>
  );
}

/* Three of the four tiles are placeholders for now: a plain white panel
   holding the tile's media footprint, so real visuals drop in without any
   layout change. Only Collaborate End to End carries its real visual. */
function PlaceholderPanel() {
  return (
    <div className="admin-placeholder">
      <style>{`
        .admin-placeholder {
          aspect-ratio: 16 / 10;
          border-radius: 16px;
          background: var(--panel);
          border: 1px solid var(--line);
        }
      `}</style>
    </div>
  );
}

/* Fold 04, collaboration — the live cursor demo shared with the Workflows
   page, in place of the illustrated review panel that stood here before. */
function CollabPanel() {
  return (
    <div className="collab-frame">
      <CollaborationDemo />
      <style>{`
        /* Sets the height the demo fills; it is otherwise 100% of its box. */
        .collab-frame { aspect-ratio: 16 / 9; }
      `}</style>
    </div>
  );
}

/* ── small shared bits ── */
