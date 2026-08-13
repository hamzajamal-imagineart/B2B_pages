# Landing Page Kit — build instructions

You are building a marketing/landing page for an ImagineArt product. This file
is the single source of truth: rules, tokens, components, layout patterns, and
the platform constraints that will otherwise break your deploy.

Read §1–§3 before writing anything. Read §7 before you touch an asset path.

---

## 1. Build order

1. **Copy `template/` into the project's `src/`.** The tree mirrors a Next.js
   App Router `src/`, so every `@/…` import resolves with no edits:

   ```
   template/app/globals.css            → src/app/globals.css
   template/app/page-template.tsx      → src/app/page.tsx
   template/app/layout-font-setup.tsx  → merge into src/app/layout.tsx
   template/lib/*.ts                   → src/lib/
   template/components/**              → src/components/
   fonts/google-sans-flex.woff2        → src/app/fonts/
   assets/*                            → public/media/        ← nested, see §7
   ```

   `assets/` holds only the site-wide marks the kit's own components need:

   | File | Used by |
   |---|---|
   | `imagine-art-wordmark.svg` | `SiteNav` |
   | `footer/logo-icon.svg` | `SiteFooter` |
   | `footer/watermark.svg` | `SiteFooter` |

   Keep the `footer/` subfolder when you copy, so the paths resolve as
   `/media/footer/…`. Every other image is page-specific — supply your own under
   `public/<folder>/`, never `public/` root.

2. **Wire the font** per `layout-font-setup.tsx`. Google Sans Flex is the only
   typeface.
3. **Set the theme switch** in `src/lib/theme.ts` — `HERO_THEME` light|dark and
   `HERO_MEDIA` photo|video. One line each; everything follows.
4. **Build the hero**, then content sections, then the closing CTA.
5. **Audit `globals.css`.** It ships complete and proven, but carries rules the
   previous page needed. Delete what yours doesn't use.
6. **Run §9's checklist before saying you're done.** `tsc --noEmit` is not
   enough — see §7.

---

## 2. Hard rules

Never violate these. They are what makes the pages look like one family.

| Rule | Detail |
|---|---|
| **Font weight ≤ 600** | Allowed: 300 / 400 / 500 / 600. Headings top out at **500**. Never `font-bold`, never 700+. |
| **Monochrome only** | Near-black `#171717` on light, white on dark. Colour comes from **imagery only** — no decorative coloured accents. |
| **One typeface** | Google Sans Flex everywhere, including italics (synthesised). |
| **Case** | Headings Title Case. Body sentence case. UPPERCASE only for mono eyebrows. |
| **No em-dashes in copy** | Use commas, colons, or full stops. Applies to all user-facing text. |
| **No decorative JS** | No scroll-reveal, no auto-rotate, no ambient motion. Hover via CSS `:hover`, never JS handlers. Real interaction (menus, accordions, carousel buttons) is fine. |

The monochrome rule has one sanctioned exception: **real third-party brand
marks** (provider logos, app-store badges) keep their own colours. If a design
calls for a coloured accent anyway, say so out loud and get explicit sign-off
before shipping it.

---

## 3. Design system

### Colour

| Token | Value | Use |
|---|---|---|
| `--color-content-primary` | `#171717` | headings, primary text |
| body copy | `rgb(100,100,100)` | card and tile body text |
| body copy, larger | `rgb(87,87,87)` | section intro paragraphs |
| `--color-heading-muted` | `#6E6E73` | the muted half of a two-tone heading |
| tile surface | `#f1f2f3` | bento tiles, feature cards |
| section surface | `#ffffff` | default section background |
| hairline border | `rgba(0,0,0,0.08)` – `0.09` | section rules, card borders |
| dark surface | `#06070B` / `#111110` | footer, scrolled nav pill only |

**Two-tone headings**: put the second clause in `var(--color-heading-muted)`.
Used by the hero, the FAQ heading, and section intros. Keep it consistent — this
is the page's one typographic flourish.

### Type scale

Headings are `font-medium` (500), tracking `-0.5px`, line-height `1.1`.

| Element | Size |
|---|---|
| Hero `h1` | `clamp(34px, 4.4vw, 54px)`, tracking `-0.03em`, leading `1.08` |
| Section `h2` (standard) | `clamp(28px, 3.6vw, 44px)` |
| Section `h2` (FAQ) | `clamp(36px, 4vw, 52px)` |
| Section `h2` (closing CTA) | `clamp(32px, 4.4vw, 56px)`, tracking `-1px` |
| Card / tile `h3` | `clamp(19px, 1.5vw, 22px)` — or `clamp(20px, 1.7vw, 25px)` on wide tiles |
| Section intro `p` | `17px` / `1.7` |
| Card body `p` | `14.5px` / `1.65` |
| Mono eyebrow | `10.5–11px`, weight 600, tracking `0.18em–1.8px`, uppercase |

Body copy measure: `52ch` max on wide tiles, `34ch` on narrow, `58ch` on
section intros. Long lines are the fastest way to make a page look amateur.

### Layout

- **`.container-page`** — 1240px max-width, 32px gutters (20px under 768px).
  Use it for every section. Don't add section-level `px-*`; the container has
  its own gutters.
- **Section rhythm** — `py-28` standard, `py-28 md:py-40` for taller sections.
- **Separation** — a single `border-t border-black/[0.08]` hairline. Not both a
  border and a background change.
- **Radii** — `22px` tiles, `24px`/`3xl` cards, `100px` pills, `10px` buttons.
- **Shadows** — prefer none. A hairline border does the work. Where elevation is
  genuinely needed: `0 18px 50px rgba(23,35,56,0.16)`. Cool-neutral, never black.

### Buttons — `components/Button.tsx`

`ButtonLink` (anchor) and `Button` (button) share `buttonClass`.

| Variant | Use |
|---|---|
| `brand` | primary action — near-black fill, white text |
| `ghost` | secondary — transparent, bordered |
| `white` | on dark or photographic surfaces |
| `muted` | tertiary — light grey fill |

Sizes: `md` (h-10) and `lg` (h-12). One primary action per section.

---

## 4. Page skeleton

Canonical order. Delete what the page doesn't need; don't reorder without reason.

```
SiteNav                    variant driven by lib/theme.ts
├── Hero                   90vh, min-h-[640px], photo or video
├── #models / logos strip   provider or integration marks
├── #how-it-works           numbered steps
├── #features               feature bento or z-fold
├── #use-cases              persona cards
├── #compare                comparison table
├── Testimonials            no anchor
├── #faq                    accordion + FAQPage JSON-LD
└── Closing CTA             un-boxed
SiteFooter
```

Anchors go **above** each section (`scrollMarginTop: 80`) so the fixed nav
doesn't cover the target. Keep ids in sync with `SiteNav`'s links.

---

## 5. Components

All self-contained: no phantom imports, no animation library. Each carries
placeholder content marked `TODO` — replace it, don't ship it.

| Component | Notes |
|---|---|
| `SiteNav` | Fixed. `variant="onLight" \| "onDark"` for the hero behind it. Compacts to a dark glass pill on scroll; mobile hamburger. Client component — real interaction. |
| `SiteFooter` | Dark surface. Logo icon, link columns, social row, and a full-width watermark along the bottom edge. Stays dark regardless of `HERO_THEME` — dark footer and dark scrolled nav pill are the two sanctioned dark surfaces (§2). |
| `FAQSection` | Two-column: heading left, accordion right. All rows open by default so content is in the initial SSR HTML. Emits `FAQPage` JSON-LD — don't duplicate that schema in `page.tsx`. |
| `TestimonialsSection` | Two staggered rows on one horizontal track, arrow-button nav, masked edges. Cards duplicated per row for range. |
| `Button` | See §3. |
| `primitives/SectionPattern` | `variant="dots" \| "diagonal"`. Needs `relative overflow-hidden` on the section and `relative z-10` on the content. Use on **at most one or two** sections — it's an accent, not a texture. |
| `primitives/SectionGuides` | Container-edge rules with corner dots. `edge="top" \| "bottom"`. Inset by the dot radius so `overflow-hidden` can't slice the dots in half. |

---

## 6. Section patterns — pick by content, not by taste

This is the section that saves the most rework. **The pattern must follow the
content.** Choosing a layout first and then forcing content into it is the most
common failure.

### Uniform card grid
3 columns, identical tiles, `gap-5`/`gap-6`.
**Use when** items are peers with similar copy length and one shared image
aspect — personas, features, use cases.

### Bento (mixed spans)
3- or 4-column grid, tiles spanning 1–2 columns, arranged so they tile exactly
with no dense-flow tricks.

**Use when** tiles genuinely differ in weight or content density — one flagship
plus supporting items, or mixed media sizes.

**Do NOT use when** items are peers. Six equal personas in a bento produces a
"featured" tile with nothing to feature, and it reads arbitrary. This mistake
has been made and reverted twice. If you can't say *why* a given tile is bigger,
use the uniform grid.

Working spans, both verified to tile exactly:

```
4 items / 3 cols:  [2,1]  [1,2]
6 items / 3 cols:  [2,1]  [1,2]  [1,2]
```

Tile anatomy: copy at the top in a padded block, media pinned to the bottom via
`mt-auto` with `flex-1` so it absorbs leftover height. Rows
`md:auto-rows-[minmax(360px,auto)]` — `auto` in the max so a tile grows rather
than clipping its own body. Give wide tiles a wider measure than narrow ones.

### Z-fold
Alternating image/copy rows, one CTA per row.
**Use when** you have 3–5 substantial features that each deserve a large visual.
**Only one z-fold per page** — a second reads as a repeat of the first.

### Comparison table
CSS grid, one elevated column for your product.
Beware: `overflow-x: auto` with `overflow-y: visible` — CSS coerces `visible` to
`auto`, producing a stray vertical scrollbar. Pad the container to contain any
bleed instead.

### Small-card grid with hover detail
Compact tiles, detail revealed on hover in an absolutely-positioned panel
(`min-h-full`, `z-20`) so the grid never reflows.
**Always** provide a no-hover fallback — render the detail inline below `lg` —
and make tiles focusable so the content is keyboard-reachable.

---

## 7. Platform and deploy — read before touching an asset path

These pages are **static exports served from a CDN behind a host proxy**. Four
constraints, every one of which has broken a deploy.

### `basePath`
Pages are mounted at a sub-path (e.g. `/imagine-computer/ai-chat`). Next
prefixes URLs *it* generates — `_next/`, `<Link>`, `next/font`. It does **not**
touch hand-written asset strings, and with `images.unoptimized` an `<Image src>`
is emitted verbatim.

**Every hand-written `/public` path goes through `withBasePath()`** from
`lib/assets.ts`. A bare `url(/foo.png)` in CSS is never prefixed — pass the URL
in as a custom property set inline instead.

### Assets must be nested at least one directory deep
The host proxy forwards `/<mount>/<dir>/<file>` but **404s `/<mount>/<file>`**.
Anything at the export root is unreachable in production.

Put every asset under `public/media/`, `public/logos/`, etc. **Never at
`public/` root.** This silently killed a nav logo, a hero video, its poster, the
photo fallback, and the favicon in one deploy — the hero rendered flat white.

The favicon is a special case: Next's `app/favicon.ico` convention always emits
at the export root, so keep a copy at `public/media/favicon.ico` and point
`metadata.icons` at it.

### `tsc --noEmit` is not the build
`next build`'s type-check walks every file matched by `tsconfig`'s `include`
globs — including reference folders you never import. `tsc` tolerates broken
imports there; `next build` fails on them.

**Verify with `npx next build`, not `tsc`.** Exclude any reference directory in
`tsconfig.json`:

```json
"exclude": ["node_modules", "Guidelines"]
```

### Video
1. **Encode above 1920px.** Retina is DPR 2, so a 1920 file is upscaled and
   looks soft regardless of bitrate. 2560×1440 at CRF ~23 is the balance
   (~16 MB for 20s). Diagnose softness by measuring the actual scale factor:
   `max(rect.w / videoWidth, rect.h / videoHeight) * devicePixelRatio`.
2. **Ping-pong the loop** so the seam lands on an identical frame. Browsers
   can't play a negative `playbackRate`, so bake it in:
   ```
   ffmpeg -i src.mp4 -filter_complex \
     "[0:v]scale=2560:1440:flags=lanczos,split[a][b];\
      [b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];\
      [a][r]concat=n=2:v=1[out]" \
     -map "[out]" -an -c:v libx264 -preset slower -crf 23 \
     -pix_fmt yuv420p -movflags +faststart out.mp4
   ```
   Doubles duration and file size. Trim the source to buy that back.
3. **Poster = the video's own first frame.** Anything else flashes the wrong
   image.
4. `autoPlay muted loop playsInline` — muted is required for autoplay,
   `playsInline` stops iOS going fullscreen.
5. **All hero UI must be opaque over video.** Alpha shimmers as frames change.

---

## 8. Anti-patterns — tried, reverted, don't repeat

- **Frame sequences instead of video.** Proposed to beat blur; it doesn't. The
  frames are the same resolution, so they upscale identically — at ~100 MB and
  gigabytes of decode memory, plus a `requestAnimationFrame` loop. The fix for
  blur is resolution (§7), not format.
- **Translucent UI over moving footage.** Glass panels and alpha text read muddy
  and shimmer. Solid fills.
- **`backdrop-filter` in `globals.css`.** Tailwind v4's Lightning CSS strips it
  project-wide. It silently does nothing — don't build a look that depends on it.
  Use Tailwind's own `backdrop-blur-*` utilities if you truly need it.
- **A bordered, gradient-filled CTA card.** Reads as a pasted-in banner. Un-box
  it: white section, hairline rule, whitespace, one action.
- **Patterns on every section.** Dots/diagonals everywhere become noise. One or
  two sections, maximum.
- **Bento for peer content.** See §6.
- **Decorative scroll/hover JS.** Removed site-wide. CSS or nothing.

---

## 9. Pre-ship checklist

- [ ] `npx next build` passes — not just `tsc --noEmit`
- [ ] No referenced asset resolves to the export root (`find out -maxdepth 1 -type f`)
- [ ] Every hand-written asset path goes through `withBasePath()`
- [ ] Favicon copy exists under `public/media/` and `metadata.icons` points at it
- [ ] No font-weight above 600 anywhere
- [ ] No coloured accents except real third-party brand marks
- [ ] No em-dashes in user-facing copy
- [ ] All headings Title Case; eyebrows the only uppercase
- [ ] Every section uses `.container-page`
- [ ] Hero has `min-h-[640px]` alongside its `vh` height
- [ ] Hover-only content has a no-hover fallback and is keyboard-reachable
- [ ] All `TODO` placeholders replaced — check `FAQSection`, `TestimonialsSection`, `SiteFooter`
- [ ] Page checked at 1440px, 768px, and 390px
