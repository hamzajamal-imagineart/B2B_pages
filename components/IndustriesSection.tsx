/* No "use client": the pager buttons were the only client code here, and the
   grid replaced them. Hover is CSS, so this renders on the server now. */
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { withBasePath } from "@/lib/assets";

/**
 * Full-bleed looping backdrop, with a scrim so the copy on top stays legible
 * whatever the footage is doing underneath.
 */
function CardVideo({ src }: { src: string }) {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="ind-video"
        src={withBasePath(src)}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <span className="ind-scrim" aria-hidden />
    </>
  );
}

/**
 * Ten industry cards, shared by the Business and Solutions pages.
 *
 * Both specs carry this section with identical heading, subtext and card copy,
 * so it lives here rather than being forked per page, and both render it
 * identically: a horizontal card rail with chevron pagers, mirroring the
 * Enterprise page's platform stack.
 *
 * The Business spec's UX note wants each card to deep-link to an industry
 * solution page. Those pages don't exist yet, so these render as plain cards
 * rather than as links to nowhere — wrapping each in an <a> is the only change
 * needed once the routes land.
 */
/* All ten carry a capture now, Telecom included, which was the last gap.
   `video` stays optional so an industry can be added before its footage is. */
/* Every card points here. The Business spec wants a per-industry solution
   page, and none exist, so a single real destination beats ten links to
   nowhere. Swap this for a per-entry href once those routes land. */
const IA_ENTERPRISE = "https://www.imagine.art/business/enterprise";

const INDUSTRIES = [
  { name: "Fashion & Apparel", video: "/media/industries/fashion.mp4", body: "Design, PDP and e-com imagery, editorials (stills + video), fashion films, lookbooks, social, banners, and static + motion ads." },
  { name: "CPG", video: "/media/industries/cpg.mp4", body: "End-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Fast Food", video: "/media/industries/fast-food.mp4", body: "Food photography, end-to-end campaigns, static + motion ads, product windows, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Food & Beverage", video: "/media/industries/food-beverage.mp4", body: "Food photography, end-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, and mascot design." },
  { name: "Furniture / Home Décor", video: "/media/industries/furniture.mp4", body: "Furniture and lifestyle renders, editorials (stills + video), social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Electronics", video: "/media/industries/electronics.mp4", body: "Product and lifestyle renders, editorials (stills + video), banners, social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Beauty & Cosmetics", video: "/media/industries/beauty.mp4", body: "End-to-end campaigns, static + motion ads, product windows, banners, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Automotive", video: "/media/industries/automotive.mp4", body: "Launch films, static + motion ads, banners, and video-based sales training." },
  { name: "Telecom", video: "/media/industries/telecom.mp4", body: "Social, banners, static + motion ads, in-store POS, and video-based compliance training." },
  { name: "E-commerce / Marketplaces", video: "/media/industries/ecommerce.mp4", body: "Seller PDP and listing imagery, on-page product motion, static + motion ads, and store banners." },
];

/* Cycled across the ten cards. Each palette carries its own --grain-fg, so a
   dark card inverts its own copy without the card having to know. */
const PALETTES = [
  "grain-mineral",
  "grain-charcoal",
  "grain-sand",
  "grain-teal",
  "grain-olive",
  "grain-steel",
];

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative border-t border-black/[0.08] py-24 md:py-32 lg:border-t-0"
    >
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="max-w-[640px]">
          <p className="eyebrow">Industries</p>
          <h2 className="h2 mt-4">
            Built for <span className="h-muted">your industry</span>
          </h2>
          <p className="lede mt-5">
            One platform, every sector. Use cases mapped to how your team
            already works, not how a tool wishes you did. Find yours below.
          </p>
        </div>
      </div>

      <div className="ind-track mt-12">
        {INDUSTRIES.map((i, n) => (
          <a
            key={i.name}
            href={IA_ENTERPRISE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={i.name}
            className={`ind-slide grain ${PALETTES[n % PALETTES.length]} ${i.video ? "ind-has-video" : ""}`}
          >
            {i.video && <CardVideo src={i.video} />}
            {/* Top right, out of the copy's way: the name and body stack from
                the bottom, and the arrow was competing with them for the same
                corner. */}
            <span className="ind-slide-arrow glass" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="ind-slide-name">{i.name}</h3>
            <p className="ind-slide-body">{i.body}</p>
          </a>
        ))}
      </div>

      <style>{`
        /* Grid, not a rail. Ten cards on one screen instead of two behind a
           pager, so nothing is hidden behind an interaction. Gutters match
           .container-page so the grid lines up with the heading above it.

           Four across at the widest, not five: at five each card fell to
           ~230px and the footage was the point. Ten cards over four columns
           leaves a short last row of two, which is the cost of the larger
           card. */
        .ind-track {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          padding-left: max(32px, calc((100vw - 1240px) / 2 + 32px));
          padding-right: max(32px, calc((100vw - 1240px) / 2 + 32px));
        }
        @media (min-width: 760px)  { .ind-track { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 1040px) { .ind-track { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        @media (max-width: 768px) {
          .ind-track { padding-left: 20px; padding-right: 20px; }
        }
        .ind-slide {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          /* The footage is 3:4, so the cell is too — no letterboxing, and every
             card in a row ends at the same baseline. */
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        /* Same subtle lift as the Enterprise platform rail. CSS only, since
           §2 rules out JS hover handlers, and cancelled under reduced motion. */
        .ind-slide {
          text-decoration: none;
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ind-slide:hover,
        .ind-slide:focus-visible { transform: scale(1.015); }
        @media (prefers-reduced-motion: reduce) {
          .ind-slide { transition: none; }
          .ind-slide:hover, .ind-slide:focus-visible { transform: none; }
        }

        /* A card with footage carries its own copy colours, overriding the
           palette's --grain-fg, since the scrim underneath is always dark. */
        .ind-slide.ind-has-video { color: #fff; }
        .ind-slide.ind-has-video .ind-slide-body { opacity: 0.78; }
        .ind-slide-name {
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        /* Colour comes from the palette's --grain-fg, dimmed rather than
           re-specified, so it stays legible on light and dark cards alike. */
        .ind-slide-body {
          margin-top: 10px;
          font-size: 13.5px;
          line-height: 1.55;
          opacity: 0.72;
        }
        /* ── shared: video backdrop ── */
        /* .grain's noise tile is a ::after at z-index 0, so on a card with
           footage it painted straight over the video — the media sits at -2.
           The palette itself stays: it is the fill underneath, so nothing
           flashes before the first frame, and it still carries --grain-fg. */
        .ind-slide.ind-has-video::after { content: none; }

        /* Sits behind the card's own copy but above the palette fill. */
        .ind-video {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* Off at rest: the footage is the card, and a permanent wash over ten
           of them flattened the whole section. It fades in on hover to carry
           the body copy, which only exists then. */
        .ind-scrim {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 300ms ease;
          background: linear-gradient(
            to top,
            rgba(8, 11, 9, 0.88) 0%,
            rgba(8, 11, 9, 0.6) 46%,
            rgba(8, 11, 9, 0.3) 100%
          );
        }
        .ind-slide:hover .ind-scrim,
        .ind-slide:focus-visible .ind-scrim { opacity: 1; }

        /* With no scrim at rest the title carries its own legibility. A tight
           halo does that locally without putting a visible layer over the
           footage, which is the thing being asked for. */
        .ind-slide.ind-has-video .ind-slide-name {
          text-shadow: 0 1px 3px rgba(8, 11, 9, 0.65), 0 2px 18px rgba(8, 11, 9, 0.5);
        }

        /* Body is hover-only on a card with footage. max-height rather than
           display, so it animates and so it stays in the accessibility tree
           for anyone who never triggers a hover. Cards with no footage keep
           their copy visible — there is nothing to reveal. */
        .ind-slide.ind-has-video .ind-slide-body {
          max-height: 0;
          margin-top: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 320ms ease, opacity 260ms ease, margin-top 320ms ease;
        }
        .ind-slide.ind-has-video:hover .ind-slide-body,
        .ind-slide.ind-has-video:focus-visible .ind-slide-body {
          max-height: 170px;
          margin-top: 10px;
          opacity: 0.82;
        }

        /* Nothing to hover on a touch screen, and a tap navigates away — so
           show both rather than making the copy unreachable there. */
        @media (hover: none) {
          .ind-scrim { opacity: 1; }
          .ind-slide.ind-has-video .ind-slide-body {
            max-height: 170px;
            margin-top: 10px;
            opacity: 0.82;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ind-scrim,
          .ind-slide.ind-has-video .ind-slide-body { transition: none; }
        }

        .ind-slide-arrow {
          position: absolute;
          top: 22px;
          right: 22px;
          z-index: 1;
          width: 34px; height: 34px;
          border-radius: 999px;
          display: grid; place-items: center;
          color: currentColor;
          flex: 0 0 auto;
        }
      `}</style>
    </section>
  );
}
