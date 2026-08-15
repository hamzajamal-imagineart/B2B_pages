import { SectionGuides } from "@/components/primitives/SectionGuides";

/**
 * Ten industry cards, shared by the Business and Solutions pages.
 *
 * Both specs carry this section with identical heading, subtext and card copy,
 * so it lives here rather than being forked per page.
 *
 * The Business spec's UX note wants each card to deep-link to an industry
 * solution page. Those pages don't exist yet, so these render as plain cards
 * rather than as links to nowhere — wrapping each in an <a> is the only change
 * needed once the routes land.
 */
const INDUSTRIES = [
  { name: "Fashion & Apparel", body: "Design, PDP and e-com imagery, editorials (stills + video), fashion films, lookbooks, social, banners, and static + motion ads." },
  { name: "CPG", body: "End-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Fast Food", body: "Food photography, end-to-end campaigns, static + motion ads, product windows, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Food & Beverage", body: "Food photography, end-to-end campaigns, static + motion ads, product-window animations, in-store POS, DVCs / TVCs, and mascot design." },
  { name: "Furniture / Home Décor", body: "Furniture and lifestyle renders, editorials (stills + video), social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Electronics", body: "Product and lifestyle renders, editorials (stills + video), banners, social, static + motion ads, DVCs / TVCs, and in-store POS." },
  { name: "Beauty & Cosmetics", body: "End-to-end campaigns, static + motion ads, product windows, banners, in-store POS, DVCs / TVCs, mascot design, and trend-jacking video." },
  { name: "Automotive", body: "Launch films, static + motion ads, banners, and video-based sales training." },
  { name: "Telecom", body: "Social, banners, static + motion ads, in-store POS, and video-based compliance training." },
  { name: "E-commerce / Marketplaces", body: "Seller PDP and listing imagery, on-page product motion, static + motion ads, and store banners." },
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

        <div className="ind-grid mt-14">
          {INDUSTRIES.map((i) => (
            <div key={i.name} className="ind-card">
              <h3 className="ind-name">{i.name}</h3>
              <p className="ind-body">{i.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ind-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .ind-card {
          background: var(--panel-2);
          border-radius: 20px;
          padding: 26px 26px 28px;
          display: flex;
          flex-direction: column;
        }
        .ind-name {
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .ind-body {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink-3);
        }
        @media (max-width: 980px) {
          .ind-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 620px) {
          .ind-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
