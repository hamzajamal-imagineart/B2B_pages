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
        visual={<FoldersPanel />}
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
                /* White at both ends, photographic through the middle. The
                   heading sits in the top band and the visual in the bottom
                   one, and those visuals are real UI: at 12% white the
                   photograph was reading straight through the folder list. */
                "linear-gradient(to bottom, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.34) 34%, rgba(255,255,255,0.62) 66%, rgba(255,255,255,0.93) 100%), " +
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

/* The product's team-folders panel, rebuilt in markup rather than shown as a
   screenshot. Real DOM means it takes the route's tokens, stays sharp at any
   density, and costs no image request. No outer card: it sits directly on the
   tile, so the tile is the surface rather than a frame around a second one. */
function FolderIcon({ shared = true }: { shared?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="af-ico">
      <path
        d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2l1.8 2h9A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {shared && <circle cx="16.5" cy="14" r="1.7" stroke="currentColor" strokeWidth="1.4" />}
    </svg>
  );
}

function FoldersPanel() {
  const team = ["All team creations", "Captions", "capta", "computer-skill", "Chris Evans"];
  return (
    <div className="af">
      <div className="af-head">
        <span className="af-head-l">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3.5 19c0-2.8 2.5-4.6 5.5-4.6s5.5 1.8 5.5 4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 19c0-2.2-.9-3.7-2.3-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Team folders
        </span>
        <span className="af-plus" aria-hidden>+</span>
      </div>

      <ul className="af-list">
        {team.map((name, i) => (
          <li key={name} className={`af-row ${i === 0 ? "af-row-on" : ""}`}>
            <FolderIcon />
            <span className="af-name">{name}</span>
          </li>
        ))}
        <li className="af-row af-more">
          <span className="af-dots" aria-hidden>&#8943;</span>
          <span className="af-name">See more</span>
        </li>
      </ul>

      <div className="af-rule" />

      <div className="af-head">
        <span className="af-head-l">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Private folders
        </span>
        <span className="af-plus" aria-hidden>+</span>
      </div>

      <ul className="af-list">
        <li className="af-row">
          <FolderIcon shared={false} />
          <span className="af-name">All private creations</span>
        </li>
      </ul>

      <style>{`
        .af {
          width: 100%;
          font-size: 13.5px;
          line-height: 1.2;
          color: var(--ink);
          /* Bottom-anchored inside the tile's media area, like the other
             visuals, and clipped so the list reads as continuing below. */
          mask-image: linear-gradient(to bottom, #000 82%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, #000 82%, transparent 100%);
        }
        .af-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6px 8px;
        }
        .af-head-l {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--ink-3);
        }
        .af-plus {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 15px;
          color: var(--ink-2);
          background: rgba(0, 0, 0, 0.05);
        }
        .af-list { list-style: none; margin: 0 0 4px; padding: 0; }
        .af-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 8px;
          border-radius: 8px;
        }
        /* The selected row is the only fill: everything else is text on tile. */
        .af-row-on { background: rgba(0, 0, 0, 0.055); }
        .af-ico { color: var(--ink-2); flex: 0 0 auto; }
        .af-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .af-dots { width: 16px; text-align: center; color: var(--ink-3); flex: 0 0 auto; }
        .af-more .af-name { color: var(--ink-2); }
        .af-rule { height: 1px; background: var(--line); margin: 10px 6px; }
      `}</style>
    </div>
  );
}

/* Two of the four tiles are placeholders for now: a plain white panel
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
