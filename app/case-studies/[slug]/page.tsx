import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/SiteNav";
import { PageTint } from "@/components/PageTint";
import { SiteFooter } from "@/components/SiteFooter";
import { NAV_VARIANT } from "@/lib/theme";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { CaseStudyStyles, StoryCard } from "@/components/CaseStudyCards";
import ClosingCta, { CONTACT_HREF, START_HREF } from "../../components/enterprise/ClosingCta";
import {
  type Block,
  type CaseStudy,
  getCaseStudy,
  hasPage,
  publishedCaseStudies,
  CASE_STUDIES,
} from "@/content/caseStudies";

/**
 * Case-study detail template.
 *
 * One component renders every study; the content lives in
 * content/caseStudies. Only studies with written body content get a route —
 * see hasPage() — so an unfinished entry can sit in the registry and power its
 * card without producing an empty page.
 *
 * Visual language is the same kit as every other page: stone PageTint (so it
 * matches the /case-studies index it comes from), SectionGuides, the .display
 * and .h2 type scale, the spec-strip stat cells from the Platform hero, and
 * the shared closing CTA.
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
    title: `${study.company} — ${study.title} | ImagineArt`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const study = getCaseStudy((await params).slug);
  if (!study || !hasPage(study)) notFound();

  // Two others to read next, preferring ones that actually have a page.
  const related = CASE_STUDIES.filter(
    (s) => s.slug !== study.slug && hasPage(s),
  ).slice(0, 3);
  const alsoListed = CASE_STUDIES.filter(
    (s) => s.slug !== study.slug && !hasPage(s),
  ).slice(0, 3 - related.length);
  const readNext = [...related, ...alsoListed];

  return (
    <>
      <PageTint palette="stone" />
      <SiteNav variant={NAV_VARIANT} />

      <main>
        <article>
          <Hero study={study} />
          <Body study={study} />
        </article>

        {readNext.length > 0 && (
          <section className="relative border-t border-black/[0.08] py-20 md:py-28 lg:border-t-0">
            <SectionGuides edge="top" />
            <div className="container-page">
              <h2 className="h2 cs-next-heading">
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
          title="Put your team"
          muted="on the next one."
          lede="Talk to us about what production at this scale looks like for an organization your size."
          primary={{ label: "Contact Sales", href: CONTACT_HREF }}
          secondary={{ label: "Get Started", href: START_HREF }}
        />
      </main>

      <CaseStudyStyles />
      <style>{`.cs-next-heading { font-size: clamp(24px, 2.6vw, 34px); }`}</style>
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

        <h1 className="display csd-title mt-4">
          {study.title}
          {study.titleMuted && (
            <>
              {" "}
              <span className="h-muted">{study.titleMuted}</span>
            </>
          )}
        </h1>

        <p className="lede mt-6 max-w-[62ch]">{study.summary}</p>

        <dl className="spec-strip mt-14">
          {study.stats.map((s) => (
            <div key={s.label} className="spec-cell">
              <dt className="spec-value">{s.value}</dt>
              <dd className="spec-label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        .csd-hero {
          position: relative;
          padding-top: clamp(130px, 16vh, 190px);
          padding-bottom: clamp(32px, 5vh, 56px);
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
        .csd-title { font-size: clamp(30px, 4.2vw, 54px); max-width: 20ch; }

        /* Same hairline stat cells as the Platform hero, so a study's numbers
           read the same way the platform's do. */
        .spec-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          .spec-strip { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function Body({ study }: { study: CaseStudy }) {
  return (
    <section className="relative border-t border-black/[0.08] py-20 md:py-24 lg:border-t-0">
      <SectionGuides edge="top" />
      <div className="container-page">
        <div className="csd-layout">
          <div className="csd-prose">
            {study.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>

          {study.facts && study.facts.length > 0 && (
            <aside className="csd-facts" aria-label="At a glance">
              <p className="eyebrow">At a glance</p>
              <dl className="mt-5">
                {study.facts.map((f) => (
                  <div key={f.label} className="csd-fact">
                    <dt className="csd-fact-label">{f.label}</dt>
                    <dd className="csd-fact-value">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </div>

      <style>{`
        /* Prose column plus a sticky facts rail. The measure is held to ~68ch
           regardless of viewport — a case study is read, not scanned. */
        .csd-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: clamp(32px, 6vw, 88px);
          align-items: start;
        }
        .csd-prose { max-width: 68ch; }
        .csd-prose > * + * { margin-top: 20px; }
        .csd-prose > h2 { margin-top: 44px; }

        .csd-h2 {
          font-size: clamp(20px, 2vw, 26px);
          line-height: 1.2;
          letter-spacing: -0.015em;
          font-weight: 500;
          color: var(--ink-heading);
        }
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
        /* A quote is the one moment that breaks the measure. */
        .csd-quote {
          border-left: 2px solid var(--heading-muted);
          padding-left: 22px;
          margin-top: 36px;
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
        .csd-fact-label {
          font-size: 12.5px;
          color: var(--ink-3);
        }
        .csd-fact-value {
          margin-top: 3px;
          font-size: 14.5px;
          line-height: 1.45;
          color: var(--ink);
        }

        @media (max-width: 960px) {
          .csd-layout { grid-template-columns: 1fr; }
          .csd-facts { position: static; }
        }
      `}</style>
    </section>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "heading":
      return <h2 className="csd-h2">{block.text}</h2>;
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
    case "quote":
      return (
        <blockquote className="csd-quote">
          <p>{block.text}</p>
          {block.attribution && <footer>{block.attribution}</footer>}
        </blockquote>
      );
  }
}
