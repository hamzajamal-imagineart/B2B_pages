# ImagineArt Enterprise — Handoff

Redesign of the **Enterprise** landing page (`/`). The Workflows page (`/workflows`)
is a pre-existing clone and was only touched where it shares code.

- **Repo:** https://github.com/hamzajamal-imagineart/B2B_pages
- **Branch:** `redesign/enterprise-visual-language` (7 commits ahead of `main`, **not merged**)
- **Stack:** Next.js 16.2.4 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
- **Run:** `npm run dev` → http://localhost:3000 · **Build:** `npm run build` (passes clean)

---

## 1. What this redesign was

The page previously used a purple accent, a dark cinematic photo hero, scroll-reveal
animations and illustrated fake dashboards. It was rebuilt around a **fog / long grass /
wind** theme, informed by three references the stakeholder supplied: `town.com`
(confident display type, warm off-white), `elevenlabs.io/enterprise` (hairline dividers
instead of boxed cards, real product captures), `langdock.com` (bold headline on light
ground, dark tone-per-card stack).

**Kept from before:** font family (Google Sans Flex), the `Button` component, `SiteNav`,
`SiteFooter`. Everything else is new.

---

## 2. Page structure (`app/page.tsx`)

```
SiteNav
├── Hero              video banner, centred title, product-tour lightbox
├── Partners          6 real partner logos + names
├── Control (#platform)  card stack (5) + bento (4 tiles)
├── Security          5-tile bento
├── Testimonials      sticky summary + auto-scrolling review column
└── ClosingCta        fog/grass photo backdrop
SiteFooter
```

Section components live in `app/components/enterprise/`. Shared/kit components live in
`components/`. `app/components/workflows/` is the untouched Workflows-page clone.

## 2b. Platform page (`app/platform/page.tsx`)

Built from the `B2B LPs` PDF content spec, reusing the Enterprise visual language.

```
SiteNav
├── Hero               type-only: display heading + lede + CTAs + 4-cell spec strip
├── Partners           reused from enterprise/
├── Suite              8 tools in a 4-col hairline .attr-grid
├── Models             .split — copy left, grain-teal panel of model rows right
├── BuiltForEnterprise 4-tab vertical rail + hairline row list
├── Apps               5 grain-palette cards
└── ClosingCta         reused from enterprise/
SiteFooter
```

Section components live in `app/components/platform/`. The nav's **Platform** entry now
points at `/platform` (it was the `#platform` anchor on `/`); that section keeps its id.

Three decisions worth knowing:

- **The hero is deliberately type-only.** No banner, so the two pages don't open on the
  same shape, and no placeholder was shipped waiting on an asset. The spec strip gives the
  fold a base.
- **"Your data stays yours", "Secure by design" and "Centralized admin control" were
  condensed into the one `BuiltForEnterprise` tab set** (as three of its four tabs). Run as
  separate sections they restate what `/`'s Security bento already covers, and the two
  pages read as near-duplicates. Every line of spec copy survives; only the section count
  changed.
- **Two blocks in the spec are competitor screenshots with no ImagineArt copy under them**
  — FLORA's white-glove support grid and its case-studies row (plus a trailing "Added
  resources / Blog slider" note). Treated as layout references only; no customer stories
  were invented. See §6.

---

## 2c. Business page (`app/business/page.tsx`)

Built from the `B2B LPs (3)` PDF spec (12 sections), with the case-study card design
taken from `B2B LPs (4)`.

```
SiteNav (onDark — this hero is dark, unlike / and /platform)
├── Hero               full-bleed darkened fog/grass, left-aligned headline
├── Partners           reused, with the spec's thin caption
├── Pitch              3 stat cards (90% faster / 75% lower cost / One platform)
├── Industries         10 cards
├── Suite              reused with BUSINESS_TOOLS (9 — adds Image / Video Canvas)
├── Workflows          node-canvas video + AdminBento (the spec's Z-fold)
├── BuiltForEnterprise reused from platform/
├── Models             reused from platform/
├── Apps               reused from platform/
├── CaseStudies        featured card + 3-up, industry filter chips
└── ClosingCta         reused, with the spec's own copy and flipped CTA order
SiteFooter
```

Section components live in `app/components/business/`. The nav's **Business** entry now
points at `/business` (it was an external link to `imagine.art/business`); the
**Solutions** entry still points off-site and was left alone.

### Shared-component changes this page required

Four existing components were parameterised rather than forked. All defaults preserve
the previous behaviour, so `/` and `/platform` render identically.

| Component | Change |
|---|---|
| `components/AdminBento.tsx` | **New.** The 4-tile admin bento, extracted out of `enterprise/Control.tsx`. Both specs list the same four panels; `Control` now imports it. |
| `enterprise/Partners.tsx` | Optional `caption` prop. |
| `enterprise/ClosingCta.tsx` | Copy and both CTAs are now props. Also exports `CONTACT_HREF` / `START_HREF`. |
| `platform/Suite.tsx` | Takes a `tools` prop; exports `PLATFORM_TOOLS` (8) and `BUSINESS_TOOLS` (9). |

### Decisions worth knowing

- **The hero is a still, not video.** The spec asks for full-bleed looping video; there is
  no clean product capture to use (see §6 item 7), so `cta-fog-grass.jpg` carries it.
  Dropping a `<video>` in later is contained — the overlay and copy layer don't care what
  media sits underneath.
- **Case-study filtering is chips, not a search bar.** The spec asks for search; with four
  case studies a text input out-scales its content. Swapping it back means replacing
  `active` with a query string — the filter call site doesn't change.
- **"Read story" links all point at the external case-study index.** None of the four
  stories has its own route in this repo.
- **Industry cards are not links.** The spec wants each to deep-link to an industry
  solution page; those routes don't exist, so they render as plain cards. Wrapping each in
  an `<a>` is the only change needed once they land.

## 2d. Case studies page (`app/case-studies/page.tsx`)

Built from `B2B LPs (4)`, which supplies the heading, the featured story and the card
design. The nav's **Case Studies** entry now points here (it was an external link to
`imagine.art/business/case-studies`).

```
SiteNav
├── Hero          type-only header
├── CaseStudyIndex search + industry chips + featured card + grid
└── ClosingCta    reused, page-specific copy
SiteFooter
```

`components/CaseStudyCards.tsx` holds the story data, the featured/story card markup, the
filter chips and one copy of the shared CSS. Both this page and the Business page's proof
section render from it, so adding a story is a one-place edit.

- **Search and chips compose.** A query narrows within the selected industry, and the
  featured card is filtered on the same terms as the grid rather than being pinned — it
  can't sit stale above a filtered set. The result count is `aria-live` so the change is
  announced as you type.
- **The Business page keeps chips only** and links here with "See all case studies"; the
  search bar the spec asks for lives on the index, where it has a full set to search.
- **Only four stories exist** (the featured one plus three). The grid is built for more —
  extend `STORIES` and the chip list derives its new industry automatically.
- **"Read story" still points at the external index.** None of the four has its own route.

## 2e. Solutions page (`app/solutions/page.tsx`)

Built from `B2B LPs (5)`. This is an **SEO page** targeting "ai tools for business" — the
meta title and description in `page.tsx` are verbatim from the spec and are part of the
deliverable, not boilerplate. The nav's **Solutions** entry now points here (it was an
external link to `imagine.art/business`).

```
SiteNav (onDark)
├── Hero               full-bleed darkened fog/grass, keyword-bearing subtext
├── IndustriesSection  shared with /business — identical copy in both specs
├── Partners           reused, spec's caption ("…your creativity output")
├── Suite              reused as "Built for success" (5 capabilities)
├── CaseStudies        reused from business/
└── ClosingCta         reused, heading only (no lede)
SiteFooter
```

`components/IndustriesSection.tsx` was moved out of `app/components/business/` — both
specs carry that section with identical heading, subtext and all ten cards. `Suite` gained
`id` / `eyebrow` / `heading` / `mutedHeading` / `lede` props (all defaulted) so it can
render as "Built for success"; `ClosingCta`'s `lede` now accepts `null` for specs whose
closing copy is the heading alone.

**⚠ This page substantially duplicates `/business`.** Same hero shape, same H1 opening
clause, byte-identical industry cards, same partners, same case studies, and its five
capabilities are a subset of the Business suite's nine. That's inherent to the two specs,
but two near-identical pages compete for the same queries — which works against the
keyword targeting this page exists for. Worth a differentiation pass, or a `rel=canonical`
decision, before both ship. See §6 item 11.

**Not built:** the spec lists "SEO FAQs" with no content, and an "Added resources" block
(the same blog slider that's unbuilt on Platform and Business).

## 3. Design system

Everything is tokenised — adding a variant is normally one line.

| System | Where | Notes |
|---|---|---|
| **Grain** | `.grain` + palettes, `globals.css` | CSS gradient + inline SVG `feTurbulence`. No image asset. |
| **Liquid glass** | `.glass`, `.glass-on-light`, `.glass-strong` | Low blur (5px) + opposing rim highlights = refraction, not frost. |
| **Two-tone headings** | `.h-muted` | Clips an image to the glyphs. `--fill` set once on `<main>`. |
| **Section guides** | `components/primitives/SectionGuides.tsx` | Container-edge rules + corner dots, forming one continuous page grid. |
| **Page grain** | `body::before` | Green-tinted noise, `position: fixed`, `z-index: -1`. |

**Key colours** — page `#ffffff`; heading ink `--ink-heading: #2a2a2c` (deliberately off
pure black); Platform bento tiles `#e5ece5`; neutral surface `--panel-2: #f1f2f3`.

**Security bento palette** (flat fills, each carries its own `--grain-fg` so dark tiles
invert their own text automatically): mineral `#bccbcd`, charcoal `#2e3230`, sand
`#dad6c7`, olive `#4d534d`, teal `#243030`.

---

## 4. Decisions worth knowing (and why)

These were non-obvious calls; changing them will likely reintroduce a bug.

- **Section guides mark one edge only.** Sections sit flush, so A's bottom edge *is* B's
  top edge. Drawing all four corners per section stacked two dots ~1px apart at every
  seam. Verticals are masked only at the dotted edge so the grid reads continuous.
- **Guides render at `z-0`**, behind content. Full-bleed content correctly covers them.
  Sections whose content is entirely full-bleed (Testimonials) don't use them at all.
- **Page fog was removed.** Per-section washes seamed at every boundary; a single
  page-wide layer fixed that, but it was later dropped — the hero video now carries the
  theme alone.
- **`--fill` / asset paths go through `withBasePath()`** (`lib/assets.ts`). A bare `url()`
  in a stylesheet is never basePath-prefixed by Next and 404s on the mounted deploy.
  All assets live nested under `public/media/`, never at the export root.
- **Card media share one 16:9 bottom-anchored frame.** Sources have different native
  ratios (4:3 vs 16:9); they fill the width and are cropped top/bottom only — never at
  the sides, where trimming would cut content.
- **Model rows are not glass.** The rim/shadow read as a button; they're a list.
- **`background-color`, not the `background` shorthand**, on tiles with image backdrops —
  the shorthand wipes the inline `background-image`.

---

## 5. Assets

| Path | Use |
|---|---|
| `public/media/hero-v2.mp4` | Hero banner (1280×720) |
| `public/media/card-generate.mp4` | Generate card |
| `public/media/variable-demo.mp4` | Workflows card + Workflows page |
| `public/media/card-generate.jpg` / `-wide.jpg` | Tile backdrops + heading text fill |
| `public/media/card-soc2.jpg` | SOC 2 tile |
| `public/media/cta-fog-grass.jpg` | Closing CTA |
| `public/media/partners/*` | 6 partner logos |

**Partner logos:** ByteDance, Kling, MiniMax and Grok were supplied as flat black SVGs
and are recoloured via CSS `mask` + `background` (this is what allows Kling's gradient).
Wan and fal arrived as colour PNGs and render as `<img>`. Colours are set per-brand in
the `BRANDS` array in `Partners.tsx` — **ByteDance's `#325AB4` is an inferred value and
should be verified against their brand guidelines.**

---

## 6. Open items

1. **Testimonials still contains ~16 `TODO` placeholder quotes and attributions.**
   Deliberate — no fabricated customer quotes were shipped — but this is the one thing
   genuinely blocking a public launch. Real quotes needed, or cut the section.
2. **`SiteFooter` still says "© Vyro Turkey"** and links to imagine.art production URLs.
   This came from the shared kit; confirm it's correct for this page.
3. **Branch is unmerged.** `main` is untouched at `52beb91`, so it's a clean
   fast-forward.
4. **Verify partner brand colours**, per above.
5. **Hero scroll-zoom is unverified visually.** It's a CSS scroll-driven timeline
   (`scroll(root block)`, scale 1→1.05 over the first 620px). The timeline is confirmed
   attached and running, but the dev preview pane reports `visibilityState: hidden`,
   which suspends animation progress — so the effect was never actually observed. Same
   limitation blocked visual confirmation of video autoplay and the testimonial
   auto-scroll. **All three should be checked in a real browser.**
6. `/workflows` has pre-existing hydration warnings (inherited from the source repo).
7. **The hero video is a screen recording of Langdock, not ImagineArt.**
   `public/media/hero-v2.mp4` shows `app.langdock.com` in the URL bar, the Langdock
   sidebar wordmark and a GPT-5.1 model picker. Langdock was one of the three *design*
   references for this redesign; its product capture appears to have been used as the
   asset. This is a competitor's UI on the largest element of the page and should be
   replaced before launch. The other two videos are fine (`variable-demo.mp4` is the real
   node canvas).
8. **Platform's spec has two blocks with no ImagineArt copy** — white-glove support and
   case studies. Both need real content before they can be built, same as Testimonials.
9. **Buzz Lab's headline metric is stated two ways across the source documents.**
   `B2B LPs (3)` says "60+ visuals in one session"; the card screenshot in `B2B LPs (4)`
   reads "40× output in the same window". The card currently uses the written spec's
   framing ("2 hours instead of days" / "60+ visuals in one session"). Confirm which is
   right. The other two cards' metrics agree across both documents.
10. **The Business page's Suite, Models, Apps and Built-for-Enterprise sections are the
    same components `/platform` renders.** That's deliberate (one source of truth), but it
    does mean the middle of the two pages is near-identical. Worth a content pass if both
    ship.
11. **`/solutions` and `/business` are near-duplicates** — see §2e. `/solutions` is the SEO
    page ("ai tools for business"); shipping both without differentiation or a canonical
    means they compete for the same queries. Needs a decision.
12. **"SEO FAQs" is listed in the Solutions spec with no content**, and the "Added
    resources" blog slider is unbuilt on Platform, Business and Solutions.
13. **Every nav link is now internal except none** — Solutions, Case Studies, Platform,
    Workflows, Enterprise and Business all point at routes in this repo. Previously
    Solutions, Case Studies and Business went to `imagine.art`. Confirm that's intended
    before launch, since the production site still serves those paths.

---

## 7. Accessibility / motion

Motion is opt-out throughout: the testimonial auto-scroll and hero zoom both respect
`prefers-reduced-motion`, the auto-scroll pauses on hover, and its duplicated card set is
`aria-hidden` so screen readers get four reviews rather than eight. The product-tour
lightbox is a proper `role="dialog"` with `aria-modal`, Esc + backdrop dismissal, focus
move and body-scroll lock.

Note the auto-scroll and the hero zoom are both *ambient motion*, which the design
guidelines otherwise rule out (§2). Both were explicitly requested; the reduced-motion
fallbacks are the mitigation.
