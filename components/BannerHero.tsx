"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { withBasePath } from "@/lib/assets";

/**
 * The shared hero: centred eyebrow and two-tone display heading, a full-width
 * 16:9 media banner carrying a product-tour lightbox, then a CTA-left /
 * copy-right foot.
 *
 * Enterprise, Solutions and Business all run this. It was three near-identical
 * copies before — the lightbox alone (focus move, Esc, scroll lock, backdrop
 * dismissal) is enough machinery that a fork would have drifted.
 *
 * Motion: the banner's scroll-driven zoom is a CSS scroll timeline, so it runs
 * on the compositor and browsers without scroll timelines simply render the
 * first keyframe. It respects prefers-reduced-motion.
 */
type Cta = { label: string; href: string };

/** mm:ss from the file itself, so the label can't drift from the asset. */
function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const m = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  if (m === 0) return `${sec} seconds`;
  return `${m}:${String(sec).padStart(2, "0")} minutes`;
}

export function BannerHero({
  eyebrow,
  title,
  muted,
  titleMaxCh = 18,
  video,
  /** Grain palette class — the banner's fallback fill before the video paints. */
  grain = "grain-mineral",
  primary,
  footText,
  footLink,
}: {
  eyebrow?: string;
  title: string;
  /** Second clause, in the palette's light tint. */
  muted: string;
  titleMaxCh?: number;
  /** Omit to render a plain placeholder panel instead of a media banner. */
  video?: string;
  grain?: string;
  primary: Cta;
  footText: string;
  /** Optional: omit for a hero whose foot is copy and CTA only. */
  footLink?: Cta;
}) {
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Esc to dismiss, and lock the page behind the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section id="top" className="hero-section">
      <div className="container-page hero-inner relative z-10">
        {eyebrow && <p className="eyebrow hero-eyebrow">{eyebrow}</p>}

        <h1
          className={`display hero-h1 mx-auto text-center ${eyebrow ? "mt-3" : ""}`}
          style={{ maxWidth: `${titleMaxCh}ch` }}
        >
          {title} <span className="h-muted">{muted}</span>
        </h1>

        {video ? (
          <div className={`hero-banner grain grain-diagonal ${grain} mt-14 md:mt-16`}>
            <video
              className="hero-video"
              src={withBasePath(video)}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              onLoadedMetadata={(e) =>
                setDuration(formatDuration(e.currentTarget.duration))
              }
            />

            {/* The looping preview keeps playing underneath; this only opens
                the full clip with sound and controls. */}
            <button
              type="button"
              className="tour-pill"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
            >
              <span className="tour-pill-text">
                <span className="tour-pill-title">Watch product tour</span>
                {duration && <span className="tour-pill-sub">{duration}</span>}
              </span>
              <span aria-hidden className="tour-pill-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </button>
          </div>
        ) : (
          /* No media yet: a quiet tinted panel holding the banner's exact
             footprint, so dropping a clip in later changes nothing else. */
          <div className="hero-banner hero-banner-empty mt-14 md:mt-16" aria-hidden />
        )}

        {video && open && (
          <div
            ref={dialogRef}
            className="tour-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Product tour"
            onClick={(e) => {
              if (e.target === dialogRef.current) setOpen(false);
            }}
          >
            <div className="tour-frame">
              <button
                ref={closeRef}
                type="button"
                className="tour-close"
                onClick={() => setOpen(false)}
                aria-label="Close product tour"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="tour-video"
                src={withBasePath(video)}
                autoPlay
                controls
                playsInline
              />
            </div>
          </div>
        )}

        <div className="hero-foot mt-6">
          <div className="hero-foot-copy">
            <p className="hero-foot-text">{footText}</p>
            {footLink && (
              <a href={footLink.href} className="hero-link">
                {footLink.label}
              </a>
            )}
          </div>

          <div className="hero-foot-cta">
            <ButtonLink href={primary.href} variant="brand" size="lg">
              {primary.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <style>{`
        /* Intrinsic height: the banner carries the video's native ratio and
           the section is simply as tall as its content needs. */
        .hero-section {
          position: relative;
          padding-top: clamp(140px, 17vh, 210px);
          padding-bottom: clamp(40px, 6vh, 72px);
        }

        .hero-h1 { font-size: clamp(30px, 4.2vw, 52px); }
        /* Eyebrow centres with the title above it. */
        .hero-eyebrow { display: flex; justify-content: center; }

        .hero-banner {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 22px;
          padding: 0;
          overflow: hidden;
        }
        /* White, not the recessed panel tone: against a tinted page wash a
           white banner reads as a held surface rather than a dent. */
        .hero-banner-empty {
          background: var(--panel);
          border: 1px solid var(--line);
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform-origin: center;
          animation: hero-zoom linear both;
          animation-timeline: scroll(root block);
          animation-range: 0 620px;
        }
        @keyframes hero-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          /* White, not the recessed panel tone: against a tinted page wash a
           white banner reads as a held surface rather than a dent. */
        .hero-banner-empty {
          background: var(--panel);
          border: 1px solid var(--line);
        }
        .hero-video { animation: none; }
        }

        /* Glass pill over the looping preview. Sits above the video but
           inside the banner's rounded clip. */
        .tour-pill {
          position: absolute;
          right: clamp(14px, 1.6vw, 22px);
          top: clamp(14px, 1.6vw, 22px);
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 9px 9px 9px 18px;
          border: 0;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.3);
          -webkit-backdrop-filter: blur(7px) saturate(210%) brightness(1.06);
          backdrop-filter: blur(7px) saturate(210%) brightness(1.06);
          box-shadow:
            inset 1.5px 1.5px 0 -0.5px rgba(255, 255, 255, 1),
            inset -1.5px -1.5px 0 -0.5px rgba(255, 255, 255, 0.55),
            inset 0 0 0 1px rgba(255, 255, 255, 0.5),
            inset 0 0 14px rgba(255, 255, 255, 0.16),
            0 6px 20px rgba(16, 20, 20, 0.14);
          color: #14201f;
          cursor: pointer;
          text-align: left;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .tour-pill:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: translateY(-1px);
          box-shadow:
            inset 1.5px 1.5px 0 -0.5px rgba(255, 255, 255, 1),
            inset -1.5px -1.5px 0 -0.5px rgba(255, 255, 255, 0.6),
            inset 0 0 0 1px rgba(255, 255, 255, 0.6),
            inset 0 0 14px rgba(255, 255, 255, 0.2),
            0 10px 26px rgba(16, 20, 20, 0.18);
        }
        .tour-pill-text { display: flex; flex-direction: column; line-height: 1.25; }
        .tour-pill-title { font-size: 14px; font-weight: 500; }
        .tour-pill-sub { font-size: 12px; color: rgba(20, 32, 31, 0.55); }
        .tour-pill-icon {
          width: 34px; height: 34px;
          border-radius: 999px;
          background: #14201f;
          color: #fff;
          display: grid; place-items: center;
          flex: 0 0 auto;
          box-shadow: 0 1px 2px rgba(16, 20, 20, 0.25);
        }

        /* Lightbox */
        .tour-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          place-items: center;
          padding: clamp(16px, 4vw, 48px);
          background: rgba(10, 12, 12, 0.82);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
        }
        .tour-frame {
          position: relative;
          width: min(1100px, 100%);
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          line-height: 0;
        }
        .tour-video { width: 100%; height: auto; display: block; }
        .tour-close {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1;
          width: 36px; height: 36px;
          border: 0;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          display: grid; place-items: center;
          cursor: pointer;
        }
        .tour-close:hover { background: rgba(0, 0, 0, 0.75); }

        /* Copy left, CTA right. The copy column is deliberately narrow so it
           reads as a caption, not a second headline; the CTA column is auto,
           so the button hugs the container's right edge. */
        .hero-foot {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(24px, 5vw, 72px);
          align-items: start;
        }
        .hero-foot-copy { max-width: 52ch; }
        .hero-foot-cta { justify-self: end; }
        .hero-foot-text {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--ink-2);
        }
        .hero-link {
          display: inline-block;
          margin-top: 12px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink);
          border-bottom: 1px solid var(--line-strong);
        }
        /* Stacked, the CTA belongs under the copy it follows rather than
           stranded at the right edge. */
        @media (max-width: 860px) {
          .hero-foot { grid-template-columns: 1fr; gap: 24px; }
          .hero-foot-cta { justify-self: start; }
        }
      `}</style>
    </section>
  );
}
