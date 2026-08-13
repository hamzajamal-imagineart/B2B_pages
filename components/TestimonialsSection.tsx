import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * Split review section: a summary column on the left (badge, headline, headline
 * metrics) that sticks while a stacked column of individual reviews scrolls
 * past it on the right.
 *
 * TODO: every value below is placeholder. Replace the quotes, the sources and
 * the metrics with real figures before this ships — a fabricated rating or
 * review is worse than showing no social proof at all.
 */
type Review = { stars: number; quote: string; source: string };

const REVIEWS: Review[] = [
  {
    stars: 5,
    quote:
      "TODO: a quote about the specific problem this solved, in the customer's own voice. Name the situation, not the feature.",
    source: "TODO: Role, Company",
  },
  {
    stars: 5,
    quote:
      "TODO: a second quote from a different kind of user, so the set doesn't read as one persona.",
    source: "TODO: Role, Company",
  },
  {
    stars: 5,
    quote:
      "TODO: a third quote. Ideally one that names a constraint — time, budget, headcount — that the product removed.",
    source: "TODO: Role, Company",
  },
  {
    stars: 5,
    quote: "TODO: a fourth quote. Keep the four roles distinct from each other.",
    source: "TODO: Role, Company",
  },
];

const METRICS: { icon: React.ReactNode; value: string; label: string }[] = [
  { icon: <IconSpark />, value: "TODO", label: "TODO: metric" },
  { icon: <IconUsers />, value: "TODO", label: "TODO: metric" },
  { icon: <IconCheck />, value: "TODO", label: "TODO: metric" },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page relative z-10">
        <div className="rv-split">
          <div className="rv-summary">
            <span className="rv-badge">
              <IconHeart />
              <span>Loved by teams</span>
            </span>

            <h2 className="h2 mt-5 max-w-[14ch]">
              Trusted by teams{" "}
              <span className="h-muted">who ship every day</span>
            </h2>

            <ul className="rv-metrics">
              {METRICS.map((m, i) => (
                <li key={i} className="rv-metric">
                  <span className="rv-metric-icon glass glass-on-light">{m.icon}</span>
                  <span>
                    <span className="rv-metric-value">{m.value}</span>
                    <span className="rv-metric-label">{m.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Viewport clips and fades; the track holds the reviews twice so
              the loop restarts on an identical frame and reads as continuous. */}
          <div className="rv-viewport">
            <ul className="rv-track">
              {[...REVIEWS, ...REVIEWS].map((r, i) => (
                <li
                  key={i}
                  className="rv-card"
                  /* The duplicate pass is decorative — hide it from AT so the
                     reviews aren't announced twice. */
                  aria-hidden={i >= REVIEWS.length}
                >
                  <span className="rv-stars" aria-label={`${r.stars} out of 5`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <IconStar key={s} on={s < r.stars} />
                    ))}
                  </span>
                  <p className="rv-quote">{r.quote}</p>
                  <p className="rv-source">{r.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .rv-split {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(32px, 6vw, 88px);
          align-items: start;
        }
        /* Summary rides along while the reviews scroll past it. */
        .rv-summary { position: sticky; top: 120px; }

        .rv-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--ink-2);
        }
        .rv-badge svg {
          width: 32px; height: 32px;
          padding: 9px;
          border-radius: 999px;
          background: var(--ink);
          color: #fff;
          box-sizing: border-box;
          flex: 0 0 auto;
        }

        .rv-metrics {
          list-style: none;
          margin: 30px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .rv-metric { display: flex; align-items: center; gap: 12px; }
        .rv-metric-icon {
          width: 32px; height: 32px;
          border-radius: 11px;
          color: var(--ink);
          display: grid; place-items: center;
          flex: 0 0 auto;
        }
        .rv-metric-value { display: block; font-size: 17px; line-height: 1.25; }
        .rv-metric-label { display: block; font-size: 13.5px; color: var(--ink-3); }

        .rv-viewport {
          position: relative;
          height: clamp(420px, 62vh, 620px);
          overflow: hidden;
          /* Fade both ends so cards dissolve rather than being cut off. */
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%);
        }
        .rv-track {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          /* Travels exactly half its height: with the set duplicated, that
             lands the loop on an identical card and the seam is invisible. */
          animation: rv-scroll 38s linear infinite;
          will-change: transform;
        }
        .rv-viewport:hover .rv-track { animation-play-state: paused; }

        @keyframes rv-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(calc(-50% - 7px)); }
        }

        /* Ambient motion is opt-out: hold still and just let it scroll. */
        @media (prefers-reduced-motion: reduce) {
          .rv-track { animation: none; }
          .rv-viewport { height: auto; overflow: visible; -webkit-mask-image: none; mask-image: none; }
        }
        .rv-card {
          background: #f7f7f8;
          border-radius: 18px;
          padding: 22px 24px;
        }
        .rv-stars { display: inline-flex; gap: 3px; }
        .rv-stars svg { width: 14px; height: 14px; }
        .rv-quote {
          margin-top: 14px;
          font-size: 15.5px;
          line-height: 1.6;
          color: var(--ink-2);
        }
        .rv-source {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          font-size: 13.5px;
          color: var(--ink-3);
        }

        @media (max-width: 900px) {
          .rv-split { grid-template-columns: 1fr; gap: 32px; }
          .rv-summary { position: static; }
        }
      `}</style>
    </section>
  );
}

function IconStar({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={on ? "#F5A524" : "rgba(0,0,0,0.14)"} aria-hidden>
      <path d="M12 2.6l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7 6.1 20.8l1.2-6.6L2.5 9.6l6.6-.9L12 2.6z" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 20.7l-1.4-1.3C5.4 14.7 2 11.6 2 7.9 2 5 4.2 2.9 7 2.9c1.6 0 3.1.7 4 1.9.9-1.2 2.4-1.9 4-1.9 2.8 0 5 2.1 5 5 0 3.7-3.4 6.8-8.6 11.5L12 20.7z" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5z" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="9" cy="7.5" r="3.2" />
      <path d="M2.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6v.5h-13V19z" />
      <circle cx="17.3" cy="6.4" r="2.5" />
      <path d="M15.2 12.4c3 .1 5.3 2.1 5.3 5.1v.5h-3.2c0-2.2-.8-4.1-2.1-5.6z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
