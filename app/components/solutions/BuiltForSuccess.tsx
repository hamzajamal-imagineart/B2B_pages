import { SectionGuides } from "@/components/primitives/SectionGuides";
import { SOLUTIONS_CAPABILITIES } from "../platform/Suite";

/**
 * "Built for success" as a bento.
 *
 * Row one takes the two surfaces a creative actually works in (Workflows,
 * Image / Video Canvas); row two the three things wrapped around them. A
 * six-column grid gives the split cleanly — 3+3 over 2+2+2 — without needing
 * two separate grids.
 *
 * The capability list and its icons live alongside the other tool lists in
 * platform/Suite so all four pages draw their copy from one place.
 */
export default function BuiltForSuccess() {
  const [primary, secondary] = [
    SOLUTIONS_CAPABILITIES.slice(0, 2),
    SOLUTIONS_CAPABILITIES.slice(2),
  ];

  return (
    <section
      id="capabilities"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[640px]">
          <p className="eyebrow">Capabilities</p>
          <h2 className="h2 mt-4">
            Built for <span className="h-muted">success</span>
          </h2>
          <p className="lede mt-5">
            Everything your creative operation needs to produce on-brand assets
            at scale, governed, consistent, and in one platform.
          </p>
        </div>

        <div className="bfs-bento mt-14">
          {primary.map((c) => (
            <Tile key={c.title} tool={c} wide />
          ))}
          {secondary.map((c) => (
            <Tile key={c.title} tool={c} />
          ))}
        </div>
      </div>

      <style>{`
        /* Six columns so row one is 3+3 and row two 2+2+2. */
        .bfs-bento {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        .bfs-tile {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          background: #e5ece5;
          border-radius: 24px;
          padding: 30px;
          min-height: 216px;
        }
        .bfs-tile-wide { grid-column: span 3; min-height: 260px; }

        .bfs-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.72);
          color: var(--ink);
          flex: 0 0 auto;
        }
        /* Copy sits at the base so titles line up across a row whatever the
           body length. */
        .bfs-title {
          margin-top: auto;
          padding-top: 26px;
          font-size: clamp(18px, 1.6vw, 22px);
          letter-spacing: -0.015em;
          line-height: 1.2;
          font-weight: 500;
          color: var(--ink);
        }
        .bfs-body {
          margin-top: 9px;
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--ink-3);
          max-width: 42ch;
        }

        /* Two-up keeps the pairing readable before collapsing to one. */
        @media (max-width: 1000px) {
          .bfs-bento { grid-template-columns: repeat(2, 1fr); }
          .bfs-tile, .bfs-tile-wide { grid-column: span 1; min-height: 0; }
        }
        @media (max-width: 620px) {
          .bfs-bento { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function Tile({
  tool,
  wide,
}: {
  tool: { title: string; body: string; icon: React.ReactNode };
  wide?: boolean;
}) {
  return (
    <div className={`bfs-tile ${wide ? "bfs-tile-wide" : ""}`}>
      <span className="bfs-icon">{tool.icon}</span>
      <h3 className="bfs-title">{tool.title}</h3>
      <p className="bfs-body">{tool.body}</p>
    </div>
  );
}
