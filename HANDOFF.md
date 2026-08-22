# ImagineArt Enterprise — B2B Pages Handoff

Five marketing pages for **ImagineArt**, built from stakeholder content specs
(`B2B LPs` PDFs) on one design system and one component kit.

- **Repo:** https://github.com/hamzajamal-imagineart/B2B_pages
- **Branch:** `redesign/enterprise-visual-language` — merged to `main` via PRs #1–#9
- **Stack:** Next.js 16.2.4 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
- **Run:** `npm run dev` → http://localhost:3000 · **Build:** `npm run build` (passes clean)
- **No `gh` CLI and no GitHub MCP on this machine.** PRs must be opened in the browser.

> **Git state at handoff:** `main` is at PR #9 and contains everything except the
> final commit (`07b3dfc`, the Models rebuild), which is pushed to the branch but
> not yet merged. One PR away from parity.

---

## 1. Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Enterprise | **Business merged into this page.** 13 sections. |
| `/platform` | Platform | |
| `/solutions` | Industry/Solutions | |
| `/case-studies` | Case-study index | filter chips + search |
| `/case-studies/[slug]` | Detail (4 live) | |
| `/workflows` | Workflows | was a clone from another repo; now largely conformed |
| ~~`/business`~~ | **gone** | 308 → `/` via `next.config.ts` |

Nav is **Enterprise · Solutions · Platform · Case Studies · Workflows**.

⚠ **The `/business` redirect is a server feature.** If this ever deploys as
`output: "export"`, `redirects()` stops applying and the rule must move to the
host proxy. Noted in `next.config.ts` itself.

---

## 2. The rule that explains most of the code

**Anything on more than one page is a shared component in `components/`, never a
fork.** Page-specific sections live in `app/components/<page>/`. When two pages
wanted the same thing it was parameterised, not copied — hence all the props
with defaults.

| Shared component | Used by |
|---|---|
| `BannerHero` | `/`, `/solutions` (`footLink` optional; omit `video` for a placeholder panel) |
| `ContactForm` | `/`, `/platform` — **HubSpot embed**, see §5 |
| `IndustriesSection` | `/`, `/solutions` — 10 cards, all now with video |
| `WorkflowsSection` | `/`, `/workflows`-adjacent — node canvas + the 4-panel Z-fold (`AdminBento`) |
| `AdminBento` | inside `WorkflowsSection` — plain icon grid, see §6 |
| `CollaborationDemo` | `/workflows`, `tone="light" \| "dark"` |
| `CaseStudyCards` | `/`, `/solutions`, `/case-studies` |
| `IntegrationsGrid` | `/workflows`, props `vignette` and `tone` |
| `PageTint` | every page — see §3 |
| `platform/Suite` + `SuiteRail` | `/`, `/platform` — see §4 |
| `platform/Models`, `platform/Apps`, `platform/BuiltForEnterprise` | `/`, `/platform` |
| `enterprise/Security` | `/`, `/platform`-adjacent — 7 tiles |
| `enterprise/ClosingCta` | every page |
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
| `/platform` | slate |
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

**`/` (13 sections):** Hero · Partners · Suite · Pitch · Industries · Workflows+Z-fold ·
Apps · Security · Case studies · Testimonials · Models · Contact form · Closing CTA

**`/platform`:** Hero · Partners · Suite · Models · BuiltForEnterprise · Apps ·
Contact form · Closing CTA

**`/solutions`:** Hero · Industries · Partners · BuiltForSuccess · Case studies · Closing CTA

**`/workflows`:** CanvasHero · Creative modes (tabbed rail) · Use cases ·
Capabilities bento · Templates · Models · FAQ · Closing CTA

### The Suite rail

Nine tools (`BUSINESS_TOOLS`) on `/`, eight (`PLATFORM_TOOLS`) on `/platform`.
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
Kuaishou; **Flux 3 is filed as video** on its descriptor alone. `media` is on the
type but empty — backdrops pending.

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

---

## 6. Decisions worth knowing (changing these reintroduces a bug)

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

`public/media/` is **21MB** (was 13MB at the last handoff). Everything is
re-encoded through ffmpeg; card media is sized to its render width, not the
source.

```
media/
├── industries/*.mp4     10 of 10 — Telecom's gap is closed
├── apps/*.mp4           app + suite card clips
├── templates/*.mp4      6 workflow-template clips
├── cards/, brandkit/, admin/, case-studies/, noise/, partners/
├── hero-v2.mp4          ⚠ Enterprise hero — see §8
└── variable-demo.mp4    node canvas, used on several pages
```

**Shared-file trap:** several clips serve two sections at once. Overwriting one
silently changes a card nobody asked about — give a replacement its own path.

---

## 8. Open items

1. **⚠ The Enterprise hero video is a screen recording of Langdock.**
   `public/media/hero-v2.mp4` shows `app.langdock.com`, their sidebar wordmark
   and a GPT-5.1 picker. It is the largest element on `/`. **Replace before
   launch.** Every other video is clean.
2. **Testimonials has 9 `TODO` placeholder quotes** and now sits on the root.
   Get real quotes or cut the section. (12 TODOs total; the others are minor.)
3. **The contact form is not wired.** No endpoint in the spec; submit is
   intercepted and the status line says so. `action` and `onSubmit` are passed
   through for whoever connects it. **Company-size options are invented** — they
   should match whatever CRM receives this.
4. **Five videos sit at the public root** (`workflow-hero.mp4`, `editor-demo.mp4`,
   `simple-demo.mp4`, `iterate-demo.mp4`, `models-bg.mp4`) and are referenced
   without `withBasePath()`. Breaks both halves of Guidelines §7 and will 404 on
   a mounted deploy.
5. **`cdn.simpleicons.org`** — `IntegrationsGrid` pulls ~38 icons from an
   external CDN at runtime.
6. **No CI.** No `.github/workflows`; `npm run build` is the only guard. **And
   `npm run lint` is broken repo-wide** — ESLint 9 needs `eslint.config.js` and
   the project only has the old format. A minimal `npm ci && npm run build` on
   PRs is overdue given the size of recent changes.
7. **`/solutions` substantially duplicates `/`** — same industries, partners, case
   studies. Worse since the merge, because `/` now also carries Suite/Models/Apps
   from `/platform`. Needs a differentiation pass or a `rel=canonical` decision.
8. **Unbuilt spec section:** "Added resources / blog slider" (§12 of the Business
   spec). Blocked on real articles.
9. **Three suite links are inferred** from the footer's map rather than confirmed:
   Image/Video Canvas → `/image`, Video Extend → `/video`,
   AI Influencer / UGC → `/apps/heygen-avatar`.
10. **`/workflows` has pre-existing hydration warnings** and is still 6-of-7 files
    `"use client"`, including the 1,700-line `WorkflowPage.tsx`. That is the real
    performance item and it is untouched.
11. **CEO feedback, not actioned:** *"We would have a switcher at the top for
    Creative, Computer."* These pages only sell the Creative line; **Imagine
    Computer** is a whole product line they never mention. Unresolved whether the
    switcher changes the page or just the product grid, and whether Computer-side
    copy exists.

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
scroll-driven animation and smooth scrolling. **Check in a real browser:** hero
scroll-zoom, video autoplay, the chevron pagers (they set `el.scrollLeft` with
`scroll-behavior: smooth`; the pane suspends it — set `scrollBehavior = 'auto'`
first to test), and the scroll-driven active state in the use-cases list.

The pane also only screenshots reliably at scroll 0, and it resets an injected
negative `margin-top` on reload. **Prefer asserting computed values via
JavaScript over screenshots** — it is faster and does not race the pane.
