import { SectionGuides } from "@/components/primitives/SectionGuides";

const STATS = [
  { value: "90% faster", label: "From brief to campaign-ready asset" },
  { value: "75% lower cost", label: "Versus traditional production" },
  { value: "One platform", label: "Image, video, audio, and ads in a single place" },
];

export default function Pitch() {
  return (
    <section
      id="pitch"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[720px]">
          <h2 className="h2">
            10× the output.{" "}
            <span className="h-muted">A fraction of the cost.</span>
          </h2>
          <p className="lede mt-5 max-w-[62ch]">
            ImagineArt replaces the patchwork of point tools, freelancers, and
            slow production cycles with one platform, so your team turns ideas
            into finished, on-brand assets in minutes, not weeks.
          </p>
        </div>

        <div className="pitch-stats mt-14">
          {STATS.map((s) => (
            <div key={s.value} className="pitch-card">
              <div className="pitch-value">{s.value}</div>
              <p className="pitch-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Three equal cards, big number up top and the label beneath, as the
           spec's UX note asks. Filled panels rather than hairline cells — the
           numbers are the section's whole payload and want the weight. */
        .pitch-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .pitch-card {
          background: var(--panel-2);
          border-radius: 24px;
          padding: clamp(24px, 2.6vw, 36px);
          min-height: 200px;
          display: flex;
          flex-direction: column;
        }
        .pitch-value {
          color: var(--ink-heading);
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          font-weight: 500;
        }
        .pitch-label {
          margin-top: auto;
          padding-top: 24px;
          font-size: 15px;
          line-height: 1.55;
          color: var(--ink-3);
          max-width: 26ch;
        }
        @media (max-width: 860px) {
          .pitch-stats { grid-template-columns: 1fr; }
          .pitch-card { min-height: 0; }
          .pitch-label { padding-top: 12px; }
        }
      `}</style>
    </section>
  );
}
