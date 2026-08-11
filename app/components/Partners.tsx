import Reveal from "./Reveal";

const BRANDS = ["ByteDance", "Kling AI", "MINIMAX", "Wan", "fal", "Grok"];

export default function Partners() {
  return (
    <section className="section" style={{ paddingBlock: "clamp(56px,7vw,88px)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: 14.5, color: "var(--ink-3)", fontWeight: 400 }}>
            Partnering with global industry leaders to power your creative output
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="marquee" style={{ marginTop: 30 }}>
            <div className="marquee-track">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span key={i} className="brand">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p
            style={{
              marginTop: 34,
              fontSize: "clamp(1.1rem,1.6vw,1.35rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Trusted by the brands you benchmark against.
          </p>
        </Reveal>
      </div>

      <style>{`
        .marquee {
          position: relative;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 64px;
          width: max-content;
          animation: scroll-x 34s linear infinite;
        }
        .brand {
          font-size: clamp(1.25rem, 2.1vw, 1.7rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--ink-3);
          opacity: 0.62;
          white-space: nowrap;
          transition: opacity .2s ease, color .2s ease;
        }
        .brand:hover { opacity: 1; color: var(--ink); }
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
