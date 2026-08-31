/* No "use client": the pager buttons were the only client code here, and the
   grid replaced them. Hover is CSS, so this renders on the server now. */
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { MediaCard, MediaCardStyles } from "@/components/MediaCard";

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
/* Cards deep-link into the template gallery, filtered to the closest category
   it offers. The seven slugs are confirmed, not derived from the chip labels —
   two of them do not follow from the label at all: "Fashion & Apparel" is
   ?category=fashion and "Fast Food" is ?category=fastfood, unhyphenated.

     cinematic · advertising · fashion · branding · fmcg · fastfood · editing

   Furniture and Electronics have no honest match among the seven, so they go
   to the gallery unfiltered rather than to a category that misdescribes them. */
const TEMPLATES_HREF = "https://www.imagine.art/enterprise/template";

const templateHref = (category?: string) =>
  category ? `${TEMPLATES_HREF}?category=${category}` : TEMPLATES_HREF;

const INDUSTRIES = [
  { name: "Fashion & Apparel", video: "/media/industries/fashion.mp4", category: "fashion", body: "Design, PDP and e-com imagery, editorials (stills + video), fashion films, lookbooks, social, banners, and static + motion ads." },
  { name: "CPG", video: "/media/industries/cpg.mp4", category: "fmcg", body: "End-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Fast Food", video: "/media/industries/fast-food.mp4", category: "fastfood", body: "Food photography, end-to-end campaigns, static + motion ads, product windows, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Food & Beverage", video: "/media/industries/food-beverage.mp4", category: "fmcg", body: "Food photography, end-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, and mascot design." },
  { name: "Furniture / Home Décor", video: "/media/industries/furniture.mp4", body: "Furniture and lifestyle renders, editorials (stills + video), social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Electronics", video: "/media/industries/electronics.mp4", body: "Product and lifestyle renders, editorials (stills + video), banners, social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Beauty & Cosmetics", video: "/media/industries/beauty.mp4", category: "fmcg", body: "End-to-end campaigns, static + motion ads, product windows, banners, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Automotive", video: "/media/industries/automotive.mp4", category: "cinematic", body: "Launch films, static + motion ads, banners, and video-based sales training." },
  { name: "Telecom", video: "/media/industries/telecom.mp4", category: "advertising", body: "Social, banners, static + motion ads, in-store POS, and video-based compliance training." },
  { name: "E-commerce / Marketplaces", video: "/media/industries/ecommerce.mp4", category: "advertising", body: "Seller PDP and listing imagery, on-page product motion, static + motion ads, and store banners." },
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
          <MediaCard
            key={i.name}
            href={templateHref(i.category)}
            video={i.video}
            title={i.name}
            body={i.body}
            aspect="3 / 4"
            /* The palette is the fill under the footage, so nothing flashes
               before the first frame, and it carries --grain-fg for a card
               that has no video yet. */
            className={`grain ${PALETTES[n % PALETTES.length]}`}
            eager={n < 4}
          />
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
      `}</style>

      <MediaCardStyles />
    </section>
  );
}
