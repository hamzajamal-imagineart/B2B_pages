"use client";

import { useRef } from "react";

// ─── Layout ported from ai-slides-generator's TestimonialsStaggerSection ──
// Two staggered rows of borderless cards on one horizontal track. Native
// scroll works without JS; the arrow buttons only enhance it. Replaces the
// previous single-card carousel with dot navigation.

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};
// TODO: replace with real quotes.
//
// Notes that matter:
//   · The two staggered rows are split from this list, so keep at least 4
//     entries or the second row looks lopsided.
//   · Specific beats glowing. "It caught an assumption I'd sat on for two
//     hours" reads true; "great product!" reads like filler.
//   · Keep them to roughly 40–60 words so card heights stay even.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "TODO: a quote about the specific problem this solved, in the customer's own voice. Name the situation, not the feature.",
    name: "TODO: Name",
    role: "TODO: Role",
  },
  {
    quote:
      "TODO: a second quote from a different kind of user, so the set doesn't read as one persona.",
    name: "TODO: Name",
    role: "TODO: Role",
  },
  {
    quote:
      "TODO: a third quote. Ideally one that names a constraint — time, budget, headcount — that the product removed.",
    name: "TODO: Name",
    role: "TODO: Role",
  },
  {
    quote:
      "TODO: a fourth quote. Keep the four roles distinct from each other.",
    name: "TODO: Name",
    role: "TODO: Role",
  },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="shrink-0 w-[86vw] sm:w-[440px] md:w-[500px] rounded-3xl bg-white border border-black/[0.09] p-7 md:p-9">
      <blockquote className="font-sans text-[rgb(23,23,23)] text-[16px] md:text-[17px] leading-[1.6] m-0">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-[14px] md:text-[15px] leading-tight">
        <span className="font-medium text-[rgb(23,23,23)]">{t.name}</span>
        <span className="text-black/35"> • </span>
        <span className="text-[rgb(100,100,100)]">{t.role}</span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("figure");
    const gap = 24;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Two rows, each doubled for horizontal range; the second row is offset so
  // the layout reads as a staggered brick pattern.
  const mid = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = [...TESTIMONIALS.slice(0, mid), ...TESTIMONIALS.slice(0, mid)];
  const rowB = [...TESTIMONIALS.slice(mid), ...TESTIMONIALS.slice(mid)];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-28 md:py-40 border-t border-black/[0.08]"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f4f5f6 100%)" }}
    >
      <div className="container-page relative z-10">
        <div className="text-center">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-black/50 m-0">
            Testimonials
          </p>
          <h2
            className="font-sans font-medium text-[rgb(23,23,23)] tracking-[-0.5px] leading-[1.1] text-center mx-auto max-w-[24ch] mt-4 mb-0"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            {/* TODO */}TODO: a heading that frames these as real, specific work
          </h2>
        </div>
      </div>

      {/* Button-navigated slider — two staggered rows scroll together. Borderless
          cards. Native horizontal scroll works without JS; the buttons enhance it. */}
      <div
        ref={trackRef}
        className="relative z-10 mt-12 md:mt-16 flex flex-col gap-5 md:gap-6 overflow-x-auto no-scrollbar px-5 md:px-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="flex gap-5 md:gap-6 w-max">
          {rowA.map((t, i) => (
            <Card key={`a-${i}`} t={t} />
          ))}
        </div>
        <div className="flex gap-5 md:gap-6 w-max pl-[180px] md:pl-[260px]">
          {rowB.map((t, i) => (
            <Card key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="container-page relative z-10">
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => scrollByCards(-1)}
            aria-label="Previous testimonials"
            className="w-11 h-11 rounded-full border border-black/[0.12] bg-white/70 flex items-center justify-center text-[rgb(23,23,23)] hover:bg-white transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={() => scrollByCards(1)}
            aria-label="Next testimonials"
            className="w-11 h-11 rounded-full border border-black/[0.12] bg-white/70 flex items-center justify-center text-[rgb(23,23,23)] hover:bg-white transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
