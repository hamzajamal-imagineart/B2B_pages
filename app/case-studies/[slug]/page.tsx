import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import { NAV_VARIANT } from "@/lib/theme";
import { withBasePath } from "@/lib/assets";
import { ButtonLink } from "@/components/Button";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { CaseStudyStyles, StoryCard } from "@/components/CaseStudyCards";
import ClosingCta from "../../components/enterprise/ClosingCta";
import {
  type Block,
  type CaseStudy,
  type Section,
  CASE_STUDIES,
  DEMO_HREF,
  TEAMS_HREF,
  getCaseStudy,
  hasPage,
  publishedCaseStudies,
} from "@/content/caseStudies";

/**
 * Case-study detail template.
 *
 * One component renders every study; the content lives in
 * content/caseStudies. Only studies with written sections get a route — see
 * hasPage() — so an unfinished entry can sit in the registry powering its card
 * without producing an empty page.
 *
 * Visual language is the existing kit: stone PageTint (matching the
 * /case-studies index it is reached from), SectionGuides, the .display and .h2
 * type scale, the Platform hero's hairline stat cells, and the shared cards
 * and closing CTA.
 */
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return publishedCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.company} — ${study.pageTitle ?? study.title} | ImagineArt`,
    description: study.deck ?? study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const study = getCaseStudy((await params).slug);
  if (!study || !hasPage(study)) notFound();

  // Others to read next, preferring ones that have a page of their own.
  const withPages = CASE_STUDIES.filter((s) => s.slug !== study.slug && hasPage(s));
  const withoutPages = CASE_STUDIES.filter(
    (s) => s.slug !== study.slug && !hasPage(s),
  );
  const readNext = [...withPages, ...withoutPages].slice(0, 3);

  return (
    <>
      <PageTint palette="stone" />
      <SiteNav variant={NAV_VARIANT} />

      <main>
        <article>
          <Hero study={study} />
          {study.cover && <Cover study={study} />}
          <Body study={study} />
        </article>

        {readNext.length > 0 && (
          <section className="relative border-t border-black/[0.08] py-20 md:py-28 lg:border-t-0">
            <SectionGuides edge="top" />
            <div className="container-page">
              <h2 className="h2 csd-next-heading">
                Read <span className="h-muted">next</span>
              </h2>
              <div className="cs-grid mt-10">
                {readNext.map((s) => (
                  <StoryCard key={s.slug} story={s} />
                ))}
              </div>
            </div>
          </section>
        )}

        <ClosingCta
          title="Ready to transform"
          muted="your creative production?"
          lede="Join the teams using ImagineArt to produce high-volume, on-brand content without the overhead."
          primary={{ label: "Book a Demo", href: DEMO_HREF }}
          secondary={{ label: "More Case Studies", href: "/case-studies" }}
        />
      </main>

      <CaseStudyStyles />
      <style>{`.csd-next-heading { font-size: clamp(24px, 2.6vw, 34px); }`}</style>
      <SiteFooter />
    </>
  );
}

function Hero({ study }: { study: CaseStudy }) {
  return (
    <section id="top" className="csd-hero">
      <div className="container-page">
        <a href="/case-studies" className="csd-back">
          ← All case studies
        </a>

        <p className="eyebrow mt-6">
          {study.industry} · {study.company}
        </p>

        <h1 className="display csd-title mt-4">{study.pageTitle ?? study.title}</h1>

        <p className="lede mt-6 max-w-[68ch]">{study.deck ?? study.summary}</p>

        <dl className="csd-stats mt-14">
          {study.stats.map((s) => (
            <div key={s.label} className="csd-stat">
              <dt className="csd-stat-value">{s.value}</dt>
              <dd className="csd-stat-label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        .csd-hero {
          position: relative;
          padding-top: clamp(130px, 16vh, 190px);
          padding-bottom: clamp(28px, 4vh, 44px);
        }
        /* Block, not inline-block: .eyebrow is inline-flex, so an inline back
           link let the two share a line. */
        .csd-back {
          display: block;
          width: fit-content;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink-3);
          transition: color 0.18s ease;
        }
        .csd-back:hover { color: var(--ink); }
        .csd-title { font-size: clamp(30px, 3.9vw, 52px); max-width: 24ch; }

        /* Same hairline cells as the Platform hero, so a study's numbers read
           the way the platform's do. */
        .csd-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .csd-stat {
          padding: 24px 26px 26px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .csd-stat-value {
          color: var(--ink-heading);
          font-size: clamp(24px, 2.4vw, 32px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-weight: 500;
        }
        .csd-stat-label {
          margin-top: 6px;
          font-size: 13.5px;
          line-height: 1.45;
          color: var(--ink-3);
          max-width: 26ch;
        }
        @media (max-width: 720px) {
          .csd-stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function Cover({ study }: { study: CaseStudy }) {
  return (
    <div className="container-page">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="csd-cover"
        src={withBasePath(study.cover!)}
        alt={`${study.company} work produced with ImagineArt`}
      />
      {study.coverCaption && (
        <p className="csd-cover-caption">{study.coverCaption}</p>
      )}
      <style>{`
        .csd-cover {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 22px;
          margin-top: clamp(16px, 2vw, 24px);
        }
        .csd-cover-caption {
          margin-top: 12px;
          font-size: 13px;
          color: var(--ink-3);
        }
      `}</style>
    </div>
  );
}

function Body({ study }: { study: CaseStudy }) {
  return (
    <section className="relative border-t border-black/[0.08] py-20 md:py-24 lg:border-t-0">
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="csd-layout">
          <div className="csd-prose">
            {study.sections.map((s, i) => (
              <SectionView key={i} section={s} />
            ))}
          </div>

          {study.facts && study.facts.length > 0 && (
            <aside className="csd-facts" aria-label="Company details">
              <p className="eyebrow">Company details</p>
              <dl className="mt-5">
                {study.facts.map((f) => (
                  <div key={f.label} className="csd-fact">
                    <dt className="csd-fact-label">{f.label}</dt>
                    <dd className="csd-fact-value">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="csd-fact-ctas">
                <ButtonLink href={DEMO_HREF} variant="brand" size="md">
                  Book a Demo
                </ButtonLink>
                <a
                  href={study.planLink?.href ?? TEAMS_HREF}
                  className="csd-fact-link"
                >
                  {study.planLink?.label ?? "View Teams Plan →"}
                </a>
              </div>
            </aside>
          )}
        </div>
      </div>

      <style>{`
        /* Prose column plus a sticky details rail. The measure is held to
           ~68ch regardless of viewport — a case study is read, not scanned. */
        .csd-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: clamp(32px, 6vw, 88px);
          align-items: start;
        }
        .csd-prose { max-width: 68ch; }
        .csd-section + .csd-section { margin-top: 52px; }
        .csd-section-heading {
          margin-top: 12px;
          font-size: clamp(21px, 2.1vw, 28px);
          line-height: 1.2;
          letter-spacing: -0.018em;
          font-weight: 500;
          color: var(--ink-heading);
          max-width: 30ch;
        }
        .csd-blocks > * { margin-top: 18px; }

        .csd-para {
          font-size: 16.5px;
          line-height: 1.7;
          color: var(--ink-2);
        }
        .csd-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .csd-list li {
          position: relative;
          padding-left: 20px;
          font-size: 16px;
          line-height: 1.65;
          color: var(--ink-2);
        }
        .csd-list li::before {
          content: "";
          position: absolute;
          left: 2px;
          top: 11px;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--heading-muted);
        }

        /* Labelled outcomes — two up, on the palette's panel fill so they read
           as a set rather than as four more paragraphs. */
        .csd-results {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .csd-result {
          background: var(--panel-2);
          border-radius: 16px;
          padding: 20px 22px 22px;
        }
        .csd-result-label {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .csd-result-text {
          margin-top: 7px;
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--ink-3);
        }
        @media (max-width: 640px) {
          .csd-results { grid-template-columns: 1fr; }
        }

        /* Metric / result rows. A hairline table rather than boxes: it is a
           reference list, and five boxed cards would outweigh the prose it
           sits inside. */
        .csd-metrics {
          border-top: 1px solid var(--line);
        }
        .csd-metric {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 20px;
          padding: 13px 0;
          border-bottom: 1px solid var(--line);
        }
        .csd-metric-label {
          font-size: 15px;
          color: var(--ink-2);
        }
        .csd-metric-value {
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--ink-heading);
          white-space: nowrap;
        }

        /* The one moment that breaks the measure. */
        .csd-quote {
          border-left: 2px solid var(--heading-muted);
          padding-left: 22px;
          margin-top: 30px;
        }
        .csd-quote p {
          font-size: clamp(19px, 1.9vw, 24px);
          line-height: 1.45;
          letter-spacing: -0.015em;
          color: var(--ink-heading);
        }
        .csd-quote footer {
          margin-top: 12px;
          font-size: 13.5px;
          color: var(--ink-3);
        }

        .csd-facts {
          position: sticky;
          top: 108px;
          background: var(--panel-2);
          border-radius: 20px;
          padding: 26px;
        }
        .csd-fact + .csd-fact {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--line);
        }
        .csd-fact-label { font-size: 12.5px; color: var(--ink-3); }
        .csd-fact-value {
          margin-top: 3px;
          font-size: 14.5px;
          line-height: 1.45;
          color: var(--ink);
        }
        .csd-fact-ctas {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .csd-fact-link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink);
          border-bottom: 1px solid var(--line-strong);
        }

        @media (max-width: 960px) {
          .csd-layout { grid-template-columns: 1fr; }
          .csd-facts { position: static; }
        }
      `}</style>
    </section>
  );
}

function SectionView({ section }: { section: Section }) {
  return (
    <section className="csd-section">
      {section.label && <p className="eyebrow">{section.label}</p>}
      {section.heading && <h2 className="csd-section-heading">{section.heading}</h2>}
      <div className="csd-blocks">
        {section.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
    </section>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "para":
      return <p className="csd-para">{block.text}</p>;
    case "list":
      return (
        <ul className="csd-list">
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "results":
      return (
        <div className="csd-results">
          {block.items.map((it) => (
            <div key={it.label} className="csd-result">
              <div className="csd-result-label">{it.label}</div>
              <p className="csd-result-text">{it.text}</p>
            </div>
          ))}
        </div>
      );
    case "metrics":
      return (
        <dl className="csd-metrics">
          {block.rows.map((r) => (
            <div key={r.label} className="csd-metric">
              <dt className="csd-metric-label">{r.label}</dt>
              <dd className="csd-metric-value">{r.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "quote":
      return (
        <blockquote className="csd-quote">
          <p>{block.text}</p>
          {block.attribution && <footer>— {block.attribution}</footer>}
        </blockquote>
      );
  }
}
