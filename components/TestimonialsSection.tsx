import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * Split review section: a summary column on the left (badge, headline, headline
 * metrics) that sticks while a stacked column of individual reviews scrolls
 * past it on the right.
 *
 * Reviews are real, pulled from the public Trustpilot profile for
 * www.imagine.art on 28 Aug 2026, filtered to five stars. Kept short and
 * attributed to the reviewer's own display name and Trustpilot, because that
 * is all the source gives — a role and company would have to be invented, and
 * an invented source is worse than a thin one.
 *
 * Obvious typos are corrected and nothing else is changed. Two caveats worth
 * carrying forward:
 *
 * 1. These are consumer reviews of the consumer product. None of them mentions
 *    a team, brand consistency or scale, which is what this page sells. The
 *    surrounding copy still says "teams".
 * 2. The profile's overall score is 3.9, not 5. Showing only five-star reviews
 *    is normal marketing practice but it is a selected view, so do not pair it
 *    with an aggregate rating claim.
 */
type Review = { stars: number; quote: string; source: string };

const REVIEWS: Review[] = [
  {
    stars: 5,
    quote:
      "I tried multiple tools to create videos but only ImagineArt was able to give me crisp videos as per the prompt.",
    source: "Uzair Khan, via Trustpilot",
  },
  {
    stars: 5,
    quote:
      "I love this platform. Very easy to navigate through whatever you need to create, and the pricing is very reasonable.",
    source: "Robyn Delay, via Trustpilot",
  },
  {
    stars: 5,
    quote:
      "ImagineArt was very helpful to me. Their support was extremely responsive to what I needed.",
    source: "Heidi Anderson, via Trustpilot",
  },
  {
    stars: 5,
    quote:
      "It's the perfect portal for everything I need in AI. Easy to add credits. Quick and responsive.",
    source: "Aubrey Kurlansky, via Trustpilot",
  },
  {
    stars: 5,
    quote:
      "Easy to generate. Everything you need is here, and one clip and the task is completed.",
    source: "Event House, via Trustpilot",
  },
  {
    stars: 5,
    quote:
      "I'm really impressed with the quality. It works very well and completely met my expectations.",
    source: "Ali Haider, via Trustpilot",
  },
  {
    stars: 5,
    quote: "Love it. It's my go-to re-imaging tool.",
    source: "Karen Golding, via Trustpilot",
  },
  {
    stars: 5,
    quote: "Excellent results every time. Just loved it.",
    source: "Verified reviewer, via Trustpilot",
  },
  {
    stars: 5,
    quote: "Very nice work on this project, and the art is amazing.",
    source: "Giwrgos Avdiu, via Trustpilot",
  },
  {
    stars: 5,
    quote: "A great and comprehensive application.",
    source: "Bud Brure, via Trustpilot",
  },
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
