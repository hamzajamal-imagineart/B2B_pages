import Reveal from "./Reveal";

export default function Workflows() {
  return (
    <section id="workflows" className="section">
      <div className="wrap">
        <div style={{ maxWidth: 720 }}>
          <Reveal>
            <h2 className="h2">
              Workflows that work for you
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ marginTop: 18, maxWidth: 640 }}>
              Stop adapting your team to the tool. Build creative pipelines
              around how your organization actually operates, from first brief
              to final approval, all in one place.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Canvas />
        </Reveal>
      </div>
    </section>
  );
}

function Canvas() {
  return (
    <div
      style={{
        marginTop: 44,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--line)",
        background:
          "linear-gradient(180deg,#fbfbfa,#f3f3f1)",
        padding: "clamp(20px,4vw,48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* dotted grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(11,11,12,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(180deg,transparent,#000 20%,#000 80%,transparent)",
        }}
      />

      <div style={{ position: "relative", maxWidth: 440, marginBottom: 28 }}>
        <h3 style={{ fontSize: "clamp(1.3rem,2.2vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--ink)" }}>
          Build the Workflows That Work for You.
        </h3>
        <p style={{ marginTop: 12, color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.5 }}>
          Create your own custom node-based workflows that chain together
          multiple models, modalities and intermediary steps for even more
          control of your generations.
        </p>
      </div>

      <div className="canvas-flow">
        <Node
          kind="input"
          title="Text input"
          body="Winter campaign, a snow-covered street in New York City, lit by warm street lamps."
        />
        <Connector />
        <Node kind="image" title="Gen-4 Image" step="1 / 4" />
        <Connector />
        <Node kind="video" title="Gen-4 Video" step="1 / 4" />
        <Connector />
        <Node kind="align" title="Align" step="1 / 4" />
      </div>

      <style>{`
        .canvas-flow {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          padding-bottom: 6px;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
}

function Connector() {
  return (
    <div style={{ flex: "0 0 46px", height: 2, position: "relative", alignSelf: "center" }}>
      <svg width="100%" height="24" viewBox="0 0 46 24" preserveAspectRatio="none" style={{ position: "absolute", top: -11 }}>
        <path
          d="M0 12 C 18 12, 28 12, 46 12"
          stroke="rgba(11,11,12,0.22)"
          strokeWidth="1.6"
          fill="none"
        />
      </svg>
      <span
        style={{
          position: "absolute",
          right: -3,
          top: -3,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--lime-deep)",
        }}
      />
    </div>
  );
}

function Node({
  kind,
  title,
  body,
  step,
}: {
  kind: "input" | "image" | "video" | "align";
  title: string;
  body?: string;
  step?: string;
}) {
  const isInput = kind === "input";
  const grad =
    kind === "image"
      ? "linear-gradient(135deg,#c9d2ff,#e7c8ff)"
      : kind === "video"
      ? "linear-gradient(135deg,#ffd9b0,#ff9d7a)"
      : "linear-gradient(135deg,#cfeee0,#a7dccb)";

  return (
    <div
      style={{
        flex: "0 0 auto",
        width: isInput ? 210 : 180,
        borderRadius: 16,
        background: "#fff",
        border: "1px solid var(--line)",
        boxShadow: "0 22px 40px -30px rgba(11,11,12,0.4)",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "10px 12px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--lime-deep)" }} />
        <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)" }}>{title}</span>
        <span style={{ marginLeft: "auto", color: "var(--ink-3)", fontSize: 14 }}>⋯</span>
      </div>

      {isInput ? (
        <p style={{ padding: "12px 12px 14px", fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.45 }}>
          {body}
        </p>
      ) : (
        <div style={{ padding: 10 }}>
          <div style={{ aspectRatio: "1 / 0.82", borderRadius: 10, background: grad, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 10,
                background: "radial-gradient(80% 60% at 50% 120%, rgba(0,0,0,0.18), transparent)",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{step} · 1024²</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--lime-ink)",
                background: "var(--lime)",
                borderRadius: 7,
                padding: "3px 9px",
              }}
            >
              Run ▸
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
