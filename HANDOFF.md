# ImagineArt Enterprise — B2B Pages Handoff

Four marketing pages for **ImagineArt**, built from stakeholder content specs
(`B2B LPs` PDFs) on one design system and one component kit. `/platform` was
folded into `/` and now redirects.

- **Repo:** https://github.com/hamzajamal-imagineart/B2B_pages
- **Branch:** `redesign/enterprise-visual-language` — PRs #1–#12 merged to `main`
- **Stack:** Next.js 16.2.4 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
- **Run:** `npm run dev` → http://localhost:3000 · **Build:** `npm run build` (passes clean)
- **`gh` CLI is installed and authenticated.** An earlier handoff said otherwise.
  It authenticates per account: `gh auth switch --user hamzajamal-imagineart`, and
  git reads that token only after `gh auth setup-git`. The macOS keychain may hold
  a colleague's credential that otherwise wins and 403s the push.

> **Git state at handoff:** everything below is on the branch and in **open PR #13**,
> which is where all work lands — do not open a second one. `main` is at PR #12.

---

## 1. Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Enterprise | **Business merged into this page.** 11 sections. |
| `/solutions` | Industry/Solutions | now carries Workflows, Apps and its own form |
| `/case-studies` | Case-study index | filter chips + search |
| `/case-studies/[slug]` | Detail — **12 live** | |
| `/workflows` | Workflows | was a clone from another repo; now largely conformed |
| ~~`/platform`~~ | **gone** | 308 → `/`; its Suite/Models/Apps already lived there |
| ~~`/business`~~ | **gone** | 308 → `/` via `next.config.ts` |

Nav is **Enterprise · Solutions · Case Studies · Workflows**.

⚠ **Both redirects are a server feature.** If this ever deploys as
`output: "export"`, `redirects()` stops applying and the rules must move to the
host proxy. Noted in `next.config.ts` itself.

⚠ **`PLATFORM_TOOLS` did not go with the page.** It is the source array
`BUSINESS_TOOLS` spreads. `platform/BuiltForEnterprise` and `platform/Hero` are
unreferenced but left on disk.

---

## 2. The rule that explains most of the code

**Anything on more than one page is a shared component in `components/`, never a
fork.** Page-specific sections live in `app/components/<page>/`. When two pages
wanted the same thing it was parameterised, not copied — hence all the props
with defaults.

| Shared component | Used by |
|---|---|
| **`MediaCard` + `MediaCardStyles`** | Industries, Apps, Templates — **the card**, see §6 |
| `BannerHero` | `/`, `/solutions` — both now carry the same hero film |
| `ContactForm` | `/`, `/solutions` — **HubSpot embed**, see §5 |
| `IndustriesSection` | `/`, `/solutions` — 10 cards, grid, all with video |
| `WorkflowsSection` | `/solutions` — node canvas + the 4-panel Z-fold (`AdminBento`) |
| `AdminBento` | inside `WorkflowsSection` — plain icon grid, see §6 |
| `CollaborationDemo` | `/workflows` bento, `tone="light" \| "dark"` |
| `CaseStudyCards` | `/`, `/case-studies` — `StoryCard` takes `wide` for the lead |
| `IntegrationsGrid` | `/workflows`, props `vignette` and `tone` |
| `PageTint` | every page — see §3 |
| `platform/Suite` + `SuiteRail` | `/` — see §4 |
| `platform/Models` | `/`, `/workflows` |
| `platform/Apps` | `/solutions` |
| `enterprise/Security` | `/` — 7 tiles |
| `enterprise/ClosingCta` | every page — also exports the contact hrefs, see §5 |
| `SiteNav` / `SiteFooter` | every page |

**`Suite` is a server component; `SuiteRail` is the client half.** Marking
`Suite` itself `"use client"` turns its exported tool arrays into client-module
bindings and breaks `SOLUTIONS_CAPABILITIES` for the server component that
slices it. Don't merge them back.

---

## 3. Design system

### Per-page colour — `components/PageTint.tsx`

One hue per route, used five ways (wash, heading ink, muted clause, tile fill,
recessed panel) so a heading can never drift from its background.

| Page | Palette |
|---|---|
| `/` | sage |
| `/solutions` | mineral |
| `/case-studies` | stone |
| `/workflows` | **neutral** (white; added so the page stopped being an exception) |

### Other systems

`.h-muted` two-tone headings · `.grain-*` palettes · `.glass` liquid glass ·
`SectionGuides` (container-edge rules + one dot per intersection) · page grain on
`body::before`.

### Type and layout (Guidelines §2–3)

Weight ≤ 600, headings ≤ 500 · monochrome, **colour from imagery only** · one
typeface · **no em-dashes in copy** · no decorative JS (hover in CSS, never JS
handlers) · `.container-page` 1240px/32px gutters · `py-28` rhythm.

`/workflows` mirrors the clamp scale as TS constants in
`app/components/workflows/scale.ts`, because it is built from inline style
objects and cannot reach the CSS classes. It is a **copy** — change both.

---

## 4. Section inventory

**`/` (11 sections):** Hero · Partners · Suite · Pitch · Industries · Security ·
Case studies · Testimonials · Models · Contact form · Closing CTA

**`/solutions` (8):** Hero · Industries · Partners · BuiltForSuccess · Workflows+Z-fold ·
Apps · Contact form · Closing CTA

Workflows and Apps moved off `/`, which was carrying thirteen sections; Case
studies came off `/solutions`. Industries and Partners are still on both.

**`/workflows`:** CanvasHero · Creative modes (tabbed rail) · Use cases ·
Capabilities bento · Templates · Models · FAQ · Closing CTA

### The Suite rail

Nine tools (`BUSINESS_TOOLS`) on `/`. `PLATFORM_TOOLS` is still the source array
it spreads, even though `/platform` is gone.
Was a 4-column grid; now a card rail with chevrons, matching the industry rail.
Every card has media and its own `imagine.art` destination, opening in a new tab.

⚠ **`BUSINESS_TOOLS` redefines Workflows and Image/Video Canvas rather than
inheriting them.** Editing "the Workflows entry" hits the `PLATFORM_TOOLS` copy
first. Both need the same change.

### Models (`/workflows`)

Rebuilt as **one card per provider**: 34 models, 14 providers, image and video
only (no audio). Google and ByteDance take a half each on row one; the rest are
three across on a six-column grid. Wordmarks are set in type, not logos.

**Unverified naming** — provider prefixes were dropped where the card already
says it (`Hailuo H3` under MiniMax, `Grok Image` under xAI); **Alibaba** and
**Lightricks** are inferred from descriptors; **Kling** is the brand, not
Kuaishou; **Flux 3 is filed as video** on its descriptor alone.

**Backdrops have landed.** All 14 cards carry a sample of that provider's own
output from `public/media/models/`, one file per provider, shared with nothing
else. `.mp4` renders as a muted loop, anything else as a still — the extension
picks the element, so a replacement only has to keep its name. Omitting `media`
still falls back to the flat `#16171a` tone, which is what a provider added
before its footage arrives should do. Scrim alphas there are **measured, not
chosen**: see the comment on `.mdl-scrim` before lightening them.

---

## 5. The contact form is HubSpot's

`components/ContactForm.tsx` renders the live embed. **Do not recreate the
fields in code.**

```
portalId 244312374 · formId 5beeefe7-2f54-4b92-b0ef-23ddca21eebe
region na2 · target #hubspot-join-us-form-wrapper
```

Taken via the plain embed and `next/script`, not `next-hubspot` — that plus
`js-cookie` would add two runtime deps to a project whose whole list is next,
react, react-dom, and only wraps the same global.

**Three things deliberately not copied from the original implementation:** no UTM
hidden inputs (the original duplicated HubSpot's own fields and left the real
ones empty; HubSpot submits from its state, not the DOM), and no analytics
payload, so the two mapping bugs in the original have nothing to reproduce.

**HubSpot renders into an iframe and its own resize never fires here** — a 776px
form in a 150px frame. The iframe has no `src`, so it is same-origin and its
content is measurable: a `ResizeObserver` keeps the two in step. It is **polled**
into place, because the iframe is in the DOM before its document has content, so
a `MutationObserver` fires once, too early, and never again.

⚠ **Submissions land in the SAME HubSpot form as the production enterprise page.**
Only the `pagename` hidden field separates them. Clone the form and swap
`FORM_ID` if they must be distinct.

### Where the contact CTAs go

Every reach-out CTA now lands on a form section on this site, not an off-site
page. Two shapes, both exported from `enterprise/ClosingCta`:

- `CONTACT_ANCHOR` (`#contact`) — same-page scroll, for the two pages that
  render a form: `/` and `/solutions`.
- `CONTACT_HREF` (`/#contact`) + `CONTACT_TARGET` — the Enterprise form, for
  every other page, in a new tab so a reader mid-case-study keeps their place.

`SiteNav` is pathname-aware. `SiteFooter` is not — it is a server component
with no pathname, so it always points at the Enterprise form.

**"Get Started" and the teams/subscription link are deliberately untouched.**
They are product entry points, not ways to reach a person.

---

## 6. Decisions worth knowing (changing these reintroduces a bug)

- **There is one card: `components/MediaCard.tsx`.** Industries, Apps and
  Templates all render it. Callers choose only size and fill — Industries 3:4,
  Templates 1:1, Apps an explicit height because its grid runs two rows at
  different widths. Everything else is fixed there on purpose: no scrim at rest,
  a scrim fading in on hover to carry the body copy, a text-shadow doing the
  title's legibility locally, both shown outright on touch, all of it cancelled
  under reduced motion. **Render `MediaCardStyles` once per section, not per
  card.** Do not fork it back out.
- **Apps passes its height as a custom property**, not a number. The card sets
  height inline, and an inline style outranks a media query, so a responsive
  height has to arrive through `--app-card-h`.
- **Two rules at equal specificity are decided by source order.** Adding
  `color: inherit` to `.app-card` silently beat `.app-has-video { color: #fff }`
  further up the sheet and turned every card's copy and arrow dark, because
  both `.app-name` and the arrow use `currentColor`.
- **Do not gate content on an active index.** The use-cases preview rendered
  `current.desc`, so nine of ten descriptions never reached the HTML and a
  crawler without JS saw one. All ten render now, stacked in a single grid cell
  with only the active one opaque, inactive ones `aria-hidden` and out of the
  tab order.
- **`overflow-x: auto` coerces `overflow-y` to `auto`.** Every card rail with a
  hover scale needs `padding-block` headroom or the growing card is clipped.
  This bit the platform, industry and suite rails in turn.
- **`--panel-2` is nearly invisible on a tinted wash.** Cards and banners use
  white + a hairline.
- **`.grain`'s noise tile is `z-index: 0`**, so it paints *above* absolutely
  positioned media. Cards running video drop the tile.
- **No `scroll-snap` on the rails.** A `start` snap cancels the container gutter.
- **Section guides mark one edge only**, or every seam stacks two dots.
- **Backticks inside an inline `<style>{\`…\`}` comment terminate the template
  literal** and break the build.
- **`background-color`, not the `background` shorthand**, on tiles with image
  backdrops.
- **Sticky travel = container height − element height.** The use-cases preview
  needs a tail at least as tall as the card, or it unsticks early and slides
  under the nav.
- **Asset paths go through `withBasePath()`.** A bare `url()` in a stylesheet is
  never basePath-prefixed.
- **Admin panels are parked, not deleted.** `AdminBento` was four photo-backed
  tiles each carrying a built UI (usage dashboard, folders panel, member list,
  collaboration canvas). It is now a plain icon grid. The components are
  recoverable by reverting the commit that rewrote it, and
  `public/media/admin/tile-*.jpg` + `asset-folders.jpg` are **deliberately
  unreferenced — do not prune them as dead weight.**

---

## 7. Assets

`public/media/` is **~70MB** (21MB two handoffs ago). Everything is re-encoded
through ffmpeg; card media is sized to its render width, not the source. **That
growth is the open weight problem — see §8.**

```
media/
├── industries/*.mp4     10 of 10 — Telecom's gap is closed
├── apps/*.mp4           app + suite card clips
├── models/*             14 provider backdrops, 8 clips + 6 stills (8.5MB)
├── use-cases/*.mp4      10 category clips, one per use case (13MB)
├── modes/*.mp4          3 creative-mode clips, WITH audio (~21MB)
├── templates/*.mp4      6 workflow-template clips
├── bento/*.mp4          capabilities-bento tiles (agents, MCP)
├── hero-backdrop/*      6 node-scene assets, re-hosted off the CDN (500KB)
├── case-studies/*.jpg   12 covers, 1600px
├── cards/, brandkit/, admin/, noise/, partners/
├── hero-enterprise.mp4  the hero, on `/` AND `/solutions` (5.6MB)
└── variable-demo.mp4    node canvas, suite cards
```

**Shared-file trap:** several clips serve more than one section at once.
Overwriting one silently changes a card nobody asked about — give a replacement
its own path. Deliberate shares, noted at their call sites:

- `hero-enterprise.mp4` — `/` and `/solutions` heroes
- `modes/quick-iterations.mp4` — the modes rail and the home Workflows banner
- `brandkit/brand-kits.mp4` — Suite card, capabilities bento, Templates card

**Unreferenced but kept on purpose** (do not prune): `hero-v2.mp4`,
`apps/video-reframe.mp4`, `templates/brand-kit.mp4`, `brandkit/brand-kits.webp`,
`card-generate.*`, `admin/tile-*.jpg`.

---

## 8. Open items

**Closed since the last handoff:** the Langdock hero (1), the testimonial
placeholders (2), the un-prefixed root videos (4), and the hand-built contact
form (3 — the form is a live HubSpot embed, see §5).

### Correctness

1. **Two footer labels contradict their destinations.** "Flux 2" points at
   `/models/flux-schnell`, a different model; "Veo 3.1" at the Lite variant.
   Both URLs resolve — it is the labels that are wrong. The Models section on
   `/workflows` still lists Flux 2 / 2 Max / 2 Klein, so the footer is the only
   place Flux appears as Schnell.
2. **Six `<img>` carry no `alt` attribute at all** — `SiteNav`, `Partners`,
   `IntegrationsGrid`, `MediaPlaceholder`, the case-study detail page and the
   hero backdrop. Decorative images need `alt=""`, not nothing, or a screen
   reader may read the filename.
3. **The Outfit Tryon card points at `studio-tryon-male`**, which is narrower
   than the card's name.

### Weight

4. **`public/media/` is ~70MB, up from 21MB.** `/workflows` alone carries around
   21MB of mode footage, all three clips eager-loading before a tab is touched,
   and the hero is 5.6MB on two pages. **The single biggest win is unapplied:**
   `preload="metadata"` plus pausing inactive cards — the pattern `UseCasesFlora`
   already uses in the same file. The mode clips run 46–52s; a 12–15s cut would
   take each to roughly a fifth with no quality loss.
5. **`cdn.simpleicons.org`** — `IntegrationsGrid` pulls its icons from an
   external CDN at runtime. The hero backdrop's assets were re-hosted off their
   CDN; this is the last runtime third-party dependency.

### Content

6. **The testimonials are consumer reviews of the consumer product.** None
   mentions a team, brand consistency or scale, and they sit under a heading
   reading "Trusted by teams". The Trustpilot profile scores 3.9 overall, so
   showing only five-star reviews is a selected view — do not pair it with an
   aggregate rating claim. Verify the right to use the reviewers' names.
7. **`CPG` and `FMCG` are separate case-study chips for the same thing.**
   More visible now there are twelve studies.
8. **The case-study set skews to agencies** (4 of the 8 added), and FJWU is a
   university on a B2B page. Strong numbers, odd fit.
9. **"Scaled production" is no longer claimed anywhere** — that bento card became
   Connect with MCP, which sits beside the Integrations card, so the bento has
   two integration tiles.
10. **Unbuilt spec section:** "Added resources / blog slider" (§12 of the
    Business spec). Blocked on real articles.
11. **Three suite links are inferred** rather than confirmed: Image/Video Canvas
    → `/image`, Video Extend → `/video`, AI Influencer / UGC →
    `/apps/heygen-avatar`.

### Engineering

12. **No CI.** No `.github/workflows`; `npm run build` is the only guard. **And
    `npm run lint` is broken repo-wide** — ESLint 9 needs `eslint.config.js` and
    the project only has the old format.
13. **`/workflows` has pre-existing hydration warnings** and is still mostly
    `"use client"`, including the ~1,530-line `WorkflowPage.tsx`. That is the
    real performance item and it is untouched.
14. **`/solutions` still overlaps `/`** on Industries and Partners. Case studies
    came off it and Workflows/Apps moved onto it, so the two pages are further
    apart than they were, but a `rel=canonical` decision is still open.
15. **CEO feedback, not actioned:** *"We would have a switcher at the top for
    Creative, Computer."* These pages only sell the Creative line; **Imagine
    Computer** is a whole product line they never mention.

### ⚠ Never visually verified

16. Four compositions were built and measured but **never seen**, because the
    in-app preview pane caps at 782px wide:
    - the **workflows hero backdrop** — its scene needs >1024px and its glow is
      deliberately disabled below 1280px, so a narrow window shows a static
      centred glow that looks broken and is not;
    - the **full-width Unilever card** on the case-study index, which only
      exists above 980px;
    - the **Templates cards**, which changed from stacked to overlay;
    - the **Industries grid** at its four-column breakpoint.

    Everything measurable checks out — tokens resolve, classes emit, assets
    load, contrast passes. The compositions are unverified. Open them in a real
    browser above 1280px before shipping.

---

## 9. Accessibility / motion

Motion is opt-out throughout: testimonial auto-scroll, hero scroll-zoom, the
collaboration cursors and every card hover respect `prefers-reduced-motion`.
Hover states are CSS-only per the guidelines. The product-tour lightbox is a real
`role="dialog"` with Esc, backdrop dismissal, focus move and scroll lock.
`BuiltForEnterprise` uses the WAI-ARIA tab pattern with roving tabindex; its rail
gained pill + leading-rule affordances because the labels read as plain text.
The case-study result count is `aria-live`.

Active states that animate use `transform`, never `font-size` or `font-weight` —
animating those reflows the list and shifts the page mid-scroll.

---

## 10. Verifying visually

The in-app preview pane reports `visibilityState: hidden`, which suspends
scroll-driven animation, smooth scrolling **and `loading="lazy"`** — a lazy
image will sit at `naturalWidth: 0` forever there and load fine in a browser.

**The pane also caps around 782px wide**, whatever viewport you ask for. That is
below four separate breakpoints in this project, so several compositions cannot
be seen in it at all — see §8 item 16.

**Check in a real browser:** the hero scroll-zoom, video autoplay, the
scroll-driven active state in the use-cases list, and anything above 980px.

Screenshots only work reliably at scroll 0, and an injected negative
`margin-top` resets on reload. **Prefer asserting computed values via
JavaScript over screenshots** — faster, and it does not race the pane.

⚠ **Synthetic mouse events do not reach React hover handlers.** React derives
`onMouseEnter` from bubbling `mouseover`/`mouseout` pairs, so a dispatched
`mouseenter` no-ops and a dispatched `mouseover` usually does too. Hover
behaviour written in CSS can be read off computed styles; hover behaviour
gated on React state effectively cannot be tested from the pane.

⚠ **`npm run build` kills the dev server.** Several checks in this session
returned `000` for every route and read as catastrophic when the server had
simply gone. Re-start the preview and re-check before believing a sweep.
