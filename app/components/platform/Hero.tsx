import { ButtonLink } from "@/components/Button";

const CTA_HREF = "https://www.imagine.art/business/enterprise/contact-us";

/**
 * Type-only hero.
 *
 * The Enterprise hero leads with a full-bleed video banner; this one
 * deliberately doesn't, so the two pages don't open on the same shape. With no
 * media to carry the fold, the spec strip below the copy gives the section a
 * base and puts the four numbers a buyer scans for above the fold.
 */
const FACTS = [
  { value: "50+", label: "Frontier models" },
  { value: "SOC 2", label: "Type 2 audited" },
  { value: "Zero", label: "Data retention" },
  { value: "100%", label: "Commercial rights" },
];

export default function Hero() {
  return (
    <section id="top" className="platform-hero">
      <div className="container-page relative z-10">
        <p className="eyebrow platform-hero-eyebrow">ImagineArt Platform</p>

        <h1 className="display platform-hero-h1 mt-4 mx-auto max-w-[19ch] text-center">
          Enterprise-grade AI creative,{" "}
          <span className="h-muted">built for teams that ship</span>
        </h1>

        <p className="lede mx-auto mt-7 text-center">
          The complete platform for generating images, video, and creative
          assets at scale, with the security, control, and model breadth your
          organization actually needs.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={CTA_HREF} variant="brand" size="lg">
            Contact Sales
          </ButtonLink>
          <ButtonLink href="/workflows" variant="ghost" size="lg">
            See Workflows
          </ButtonLink>
        </div>

        <dl className="spec-strip mt-16 md:mt-20">
          {FACTS.map((f) => (
            <div key={f.label} className="spec-cell">
              <dt className="spec-value">{f.value}</dt>
              <dd className="spec-label">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        .platform-hero {
          position: relative;
          padding-top: clamp(140px, 17vh, 210px);
          padding-bottom: clamp(48px, 7vh, 88px);
        }
        .platform-hero-h1 { font-size: clamp(34px, 5vw, 62px); }
        .platform-hero-eyebrow { display: flex; justify-content: center; }

        /* Hairline cells rather than boxes — same grid logic as .attr-grid, so
           the strip reads as part of the page rule system, not a widget. */
        .spec-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .spec-cell {
          padding: 24px 26px 26px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .spec-value {
          color: var(--ink-heading);
          font-size: clamp(26px, 2.6vw, 34px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-weight: 500;
        }
        .spec-label {
          margin-top: 6px;
          font-size: 13.5px;
          line-height: 1.45;
          color: var(--ink-3);
        }
        @media (max-width: 720px) {
          .spec-strip { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
