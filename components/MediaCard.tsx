import { withBasePath } from "@/lib/assets";

/**
 * The shared media card.
 *
 * One card served three sections that had each grown their own: the industry
 * rail, the apps grid and the template grid. They agreed on more than they
 * differed — full-bleed footage, a title over it, an arrow, a hover lift — so
 * this is the industry card generalised rather than a fourth variant.
 *
 * What the callers still choose is size and fill, because those genuinely
 * differ: Industries is 3:4 to match its footage, Templates is square, and
 * Apps sets an explicit height because its grid runs two rows at different
 * widths, where a shared ratio would make the wide pair enormous.
 *
 * Everything else is fixed here on purpose. That includes the behaviour the
 * industry card was carrying alone: no scrim at rest so the footage is the
 * card, a scrim fading in on hover to carry the body copy, a text-shadow
 * doing the title's legibility locally rather than a permanent wash, both
 * shown outright on touch where there is no hover to trigger them, and every
 * transition cancelled under reduced motion.
 *
 * Render MediaCardStyles once per section, not per card.
 */

export type MediaCardProps = {
  /** Omit for a card that is not a link: it renders a div and drops the arrow
   *  rather than showing an affordance that goes nowhere. */
  href?: string;
  /** Footage. Takes precedence over `image` when both are given. */
  video?: string;
  image?: string;
  /** Small uppercase line above the title. */
  label?: string;
  title: string;
  /** Revealed with the scrim on hover. Omit and the card is title-only. */
  body?: string;
  /** CSS aspect-ratio, e.g. "3 / 4". Ignored when `height` is set. */
  aspect?: string;
  /** Explicit height, for grids where a shared ratio does not work. */
  height?: string;
  /** Fill under the media, so nothing flashes before the first frame. */
  fill?: string;
  /** Extra classes, e.g. the grain palette the industry cards carry. */
  className?: string;
  /** Only the first few cards in a grid are worth eager-loading. */
  eager?: boolean;
};

export function MediaCard({
  href,
  video,
  image,
  label,
  title,
  body,
  aspect = "3 / 4",
  height,
  fill,
  className = "",
  eager = false,
}: MediaCardProps) {
  const Tag = href ? "a" : "div";
  const hasMedia = Boolean(video || image);

  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={href ? title : undefined}
      className={`mc ${hasMedia ? "mc-has-media" : ""} ${className}`.trim()}
      style={{
        ...(height ? { height } : { aspectRatio: aspect }),
        ...(fill ? { backgroundColor: fill } : {}),
      }}
    >
      {video ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          className="mc-media"
          src={withBasePath(video)}
          autoPlay
          muted
          loop
          playsInline
          preload={eager ? "auto" : "metadata"}
          aria-hidden
        />
      ) : image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="mc-media" src={withBasePath(image)} alt="" aria-hidden />
      ) : null}

      {hasMedia && <span className="mc-scrim" aria-hidden />}

      {href && (
        <span className="mc-arrow glass" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}

      <div className="mc-copy">
        {label && <span className="mc-label">{label}</span>}
        <h3 className="mc-title">{title}</h3>
        {body && <p className="mc-body">{body}</p>}
      </div>
    </Tag>
  );
}

/** The card's stylesheet. Render once per section. */
export function MediaCardStyles() {
  return (
    <style>{`
      .mc {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        border-radius: 20px;
        padding: clamp(18px, 1.8vw, 26px);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-decoration: none;
        transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      a.mc:hover,
      a.mc:focus-visible { transform: scale(1.015); }

      /* A card with footage carries its own copy colours: the scrim under
         them is always dark, whatever the section's palette is. */
      .mc-has-media { color: #fff; }

      /* .grain's noise tile is an ::after at z-index 0, so on a card with
         footage it paints straight over the video, which sits at -2. The
         palette itself stays as the fill underneath. */
      .mc-has-media::after { content: none; }

      .mc-media {
        position: absolute;
        inset: 0;
        z-index: -2;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Off at rest: the footage is the card, and a permanent wash across a
         whole grid of them flattens the section. It fades in on hover to
         carry the body copy, which only exists then. */
      .mc-scrim {
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
      .mc:hover .mc-scrim,
      .mc:focus-visible .mc-scrim { opacity: 1; }

      .mc-arrow {
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

      .mc-copy { position: relative; z-index: 1; }
      .mc-label {
        display: block;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        opacity: 0.7;
        margin-bottom: 6px;
      }
      .mc-title {
        font-size: clamp(16px, 1.5vw, 19px);
        font-weight: 500;
        letter-spacing: -0.01em;
        line-height: 1.2;
        margin: 0;
      }
      /* With no scrim at rest the title carries its own legibility. A tight
         halo does that locally, without a visible layer over the footage. */
      .mc-has-media .mc-title {
        text-shadow: 0 1px 3px rgba(8, 11, 9, 0.65), 0 2px 18px rgba(8, 11, 9, 0.5);
      }

      .mc-body {
        margin: 10px 0 0;
        font-size: 13.5px;
        line-height: 1.55;
        opacity: 0.72;
      }
      /* Hover-only on a card with footage. max-height rather than display, so
         it animates and so it stays in the accessibility tree for anyone who
         never triggers a hover. */
      .mc-has-media .mc-body {
        max-height: 0;
        margin-top: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 320ms ease, opacity 260ms ease, margin-top 320ms ease;
      }
      .mc-has-media:hover .mc-body,
      .mc-has-media:focus-visible .mc-body {
        max-height: 170px;
        margin-top: 10px;
        opacity: 0.82;
      }

      /* Nothing to hover on a touch screen, and a tap navigates away, so show
         both rather than making the copy unreachable there. */
      @media (hover: none) {
        .mc-scrim { opacity: 1; }
        .mc-has-media .mc-body {
          max-height: 170px;
          margin-top: 10px;
          opacity: 0.82;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .mc, .mc-scrim, .mc-has-media .mc-body { transition: none; }
        a.mc:hover, a.mc:focus-visible { transform: none; }
      }
    `}</style>
  );
}
