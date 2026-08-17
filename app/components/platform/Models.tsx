import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * Model breadth.
 *
 * Only the three models the content spec actually names are listed. The
 * remainder is stated as a count rather than padded out with guesses — a wrong
 * model name on an enterprise page is a support ticket, and the spec's own
 * framing ("...and 45+ more") already treats the tail as a number.
 */
const NAMED = ["Nano Banana Pro", "Seedance 2.0", "Kling 3.0"];

export default function Models() {
  return (
    <section
      id="models"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="split">
          <div>
            <p className="eyebrow">Models</p>
            <h2 className="h2 mt-4">
              50+ state-of-the-art{" "}
              <span className="h-muted">models</span>
            </h2>
            <p className="lede mt-5">
              The best models in the world, all in one place, and growing every
              week.
            </p>
            <p className="models-note mt-6">
              Switch between the latest frontier models without switching tools
              or renegotiating contracts.
            </p>
          </div>

          <div className="grain grain-teal models-panel">
            <div className="models-rows">
              {NAMED.map((name) => (
                <div key={name} className="model-row">
                  <span className="model-tick" aria-hidden>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="model-name">{name}</span>
                </div>
              ))}
              <div className="model-row model-row-rest">
                <span className="model-tick" aria-hidden>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="model-name">and 45+ more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .models-note {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--ink-3);
          max-width: 44ch;
        }

        .models-panel {
          padding: clamp(24px, 3vw, 40px);
          border-radius: 24px;
        }
        /* Rows are laid out in flow here, unlike the Control card's absolutely
           positioned list, so the panel grows with its contents. */
        .models-rows { display: flex; flex-direction: column; gap: 10px; }
        .models-panel .model-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 16px;
          border: 0;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.055);
          color: #fff;
        }
        .models-panel .model-tick {
          width: 20px; height: 20px;
          border-radius: 999px;
          display: grid; place-items: center;
          flex: 0 0 auto;
          background: rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.85);
        }
        .models-panel .model-name { font-size: 15px; letter-spacing: -0.01em; }
        /* The tail row is a count, not a model, so it reads one step back. */
        .model-row-rest { background: transparent; }
        .model-row-rest .model-name { color: rgba(255, 255, 255, 0.6); }
      `}</style>
    </section>
  );
}
