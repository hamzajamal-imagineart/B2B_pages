import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" style={{ background: "#0b0c10" }}>
      <div style={{ padding: "96px clamp(12px, 2vw, 20px) clamp(12px, 2vw, 20px)" }}>
        <div className="hero-banner">
          {/* Background media, swap /hero.png for a real image or <video>. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.png" alt="" aria-hidden className="hero-media" />
          <div aria-hidden className="hero-scrim" />

          {/* Overlaid copy, aligned to the shared page container */}
          <div className="hero-copy">
            <div className="wrap">
              <div className="hero-copy-inner">
                <Reveal>
                  <h1 className="hero-title">
                    Create at the speed
                    <br />
                    of your ambition
                  </h1>
                </Reveal>
                <Reveal delay={150}>
                  <p className="hero-sub">
                    The enterprise AI creative platform that turns ideas into
                    production-ready images and video, securely, at scale, and
                    without limits on who gets to create.
                  </p>
                </Reveal>
                <Reveal delay={220}>
                  <div className="hero-actions">
                    <a href="#contact" className="btn hero-btn-primary">
                      Contact Sales <span className="btn-arrow" aria-hidden>→</span>
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

