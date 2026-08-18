# ImagineArt Enterprise — B2B Pages Handoff

Six marketing pages for **ImagineArt**, built from stakeholder-supplied content specs
(`B2B LPs` PDFs). All share one design system and one component kit.

- **Repo:** https://github.com/hamzajamal-imagineart/B2B_pages
- **Branch:** `redesign/enterprise-visual-language` — merged into `main` via PRs #1–#4
- **Stack:** Next.js 16.2.4 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
- **Run:** `npm run dev` → http://localhost:3000 · **Build:** `npm run build` (passes clean)

> ⚠️ **First thing to check:** is the branch merged? See §7.

---

## 1. Routes

| Route | Page | Spec source |
|---|---|---|
| `/` | Enterprise | original redesign brief |
| `/platform` | Platform | `B2B LPs (2)` |
| `/business` | Business | `B2B LPs (3)` |
| `/solutions` | Industry/Solutions (SEO page) | `B2B LPs (5)` |
| `/case-studies` | Case-study index | `B2B LPs (4)`, `(6)` |
| `/case-studies/[slug]` | Case-study detail (4 live) | per-study content |
| `/workflows` | Workflows | pre-existing clone, largely untouched |

Nav order is **Business · Enterprise · Industry/Solutions · Platform · Case Studies ·
Workflows**. Every entry is an internal route — Solutions, Case Studies and Business used
to point at `imagine.art`. Confirm that cutover is intended, since production still serves
those paths.

---

## 2. The one rule that explains most of the code

**Anything appearing on more than one page is a shared component in `components/`, never a
fork.** Page-specific sections live in `app/components/<page>/`. When two pages wanted the
same thing, the component was parameterised rather than copied — that is why so many take
props with defaults.

| Shared component | Used by | Notes |
|---|---|---|
| `BannerHero` | `/`, `/business`, `/solutions` | Centred two-tone heading, 16:9 media banner, product-tour lightbox, copy-left/CTA-right foot. `video` is **optional** — omit it for a white placeholder panel. |
| `IndustriesSection` | `/business`, `/solutions` | Ten industry cards as a horizontal rail with chevron pagers. 9 of 10 carry video. |
| `AdminBento` | `/`, `/business` | Four admin tiles. Three are white placeholders; the fourth runs `CollaborationDemo`. |
| `CollaborationDemo` | `/workflows`, `AdminBento` | Drawn canvas (dot grid + comment card) with cursors flying in on hover. `tone="light" \| "dark"`. |
| `CaseStudyCards` | `/case-studies`, `/business` | `StoryCard`, `StatMosaic`, `FilterChips`, and one copy of the shared CSS. |
| `PageTint` | every page except `/workflows` | Per-route colour — see §3. |
| `platform/Suite` | `/platform`, `/business` | Takes a `tools` list; exports `PLATFORM_TOOLS` (8), `BUSINESS_TOOLS` (9), `SOLUTIONS_CAPABILITIES` (5). |
| `enterprise/Partners` | 4 pages | Optional `caption`. |
| `enterprise/ClosingCta` | every page | Copy, both CTAs and `backdrop` are props. `lede={null}` for heading-only. |
| `SiteNav` | every page | `variant` derived from each page's own hero tone via `navVariantFor()` in `lib/theme.ts`. |

`/workflows` is a clone from another repo. It now uses the shared `SiteNav` and
`CollaborationDemo`, but everything else there is original and has pre-existing hydration
warnings.

---

## 3. Design system

### Per-page colour — `components/PageTint.tsx`

Each route picks **one hue** and uses it five ways: page wash, heading ink, the muted
heading clause, bento tile fill, and recessed panel fill. All five come from one palette
entry, so a heading can never drift from its background. Changing a page's colour is one
line.

| Page | Palette | bg | ink | muted | tile | panel |
|---|---|---|---|---|---|---|
| `/` | sage | `#f3f6f1` | `#2c332b` | `#9dab9c` | `#e5ece5` | `#eaeee8` |
| `/platform` | slate | `#eef1f5` | `#2f4358` | `#97aabd` | `#dfe6ee` | `#e6ebf1` |
| `/business` | sand | `#f4f2ed` | `#3a352b` | `#aca596` | `#ebe7dd` | `#eeebe4` |
| `/solutions` | mineral | `#eef4f4` | `#283a3a` | `#93abab` | `#dee9e9` | `#e6eeee` |
| `/case-studies` | stone | `#f3f2f6` | `#332f3a` | `#a39dae` | `#e6e4ee` | `#ebe9f0` |

`/workflows` opts out — it paints its own near-black over everything.

### Other systems

| System | Where | Notes |
|---|---|---|
| **Two-tone headings** | `.h-muted`, `globals.css` | Flat colour from the palette. It used to clip a photo to the glyphs; that's gone. |
| **Grain palettes** | `.grain` + `.grain-*` | CSS gradient + inline SVG `feTurbulence`. Each palette carries `--grain-fg`, so dark tiles invert their own text. |
| **Liquid glass** | `.glass`, `.glass-on-light` | Low blur (5px) + opposing rim highlights = refraction, not frost. |
| **Section guides** | `components/primitives/SectionGuides.tsx` | Container-edge rules + corner dots forming one continuous page grid. |
| **Page grain** | `body::before` | Hue-matched noise tile, `position: fixed`, `z-index: -1`. Noise only — the wash is on `body` itself. |

---

## 4. Case studies — content architecture

`content/caseStudies.ts` is the **single source** for every surface that shows a case
study: the index, the Business proof section, the detail routes, the filter chips, and page
metadata. **Adding a study is one object. No component gets edited.**

```ts
{
  slug, company, industry,
  metric,                    // card chip (drives search; not displayed as a badge)
  title, titleMuted, summary,// card copy
  pageTitle, deck,           // page copy — deliberately separate from the card's
  cover, coverCaption,
  stats: [...],              // 3 hero numbers / the stat mosaic
  facts: [...],              // "Company details" rail
  planLink,                  // optional; defaults to the Teams plan
  sections: [ { label, heading, blocks: [...] } ],
  featured,
}
```

Block kinds: `para` · `list` · `quote` · `results` (labelled outcome grid) · `metrics`
(hairline metric/result table). Add a kind once rather than special-casing a page.

**`hasPage()` gates the rollout.** A study with empty `sections` gets **no route and no
card** — it appears only as the featured block. That's how Smarters works today, and it's
why an unfinished entry can never produce a card that goes nowhere.

| Study | Page? | Cover? | Role |
|---|---|---|---|
| `smarters-knorr` | ✗ | ✗ | **Featured block only** — needs content + cover |
| `unilever` | ✓ | ✓ | First card |
| `buzz-lab` | ✓ | ✓ | |
| `framon` | ✓ | ✓ | |
| `knd-naval-design` | ✓ | ✓ | |

Filter chips derive from studies **that have a page**, so a chip can never filter to zero.

---

## 5. Decisions worth knowing (changing these reintroduces a bug)

- **`--panel-2` is nearly invisible against a tinted page wash.** It sits ~2% off the
  background. Cards, banners and placeholders use **white (`--panel`) + a hairline**
  instead. This bit three separate times: story cards, mosaic cards, hero placeholders.
- **`.grain`'s noise tile is `z-index: 0`**, so it paints *above* absolutely-positioned
  media. Cards running video drop the tile (`content: none`) or the footage looks veiled.
- **No `scroll-snap` on the card rails.** A `start` alignment snaps to the scrollport edge,
  cancelling the container's gutter and hanging the first card off the page grid.
- **Section guides mark one edge only.** Sections sit flush, so A's bottom edge *is* B's
  top edge; drawing all four corners stacked two dots ~1px apart at every seam.
- **`.eyebrow` is `inline-flex`.** Anything inline next to it shares its line.
- **Asset paths go through `withBasePath()`** (`lib/assets.ts`). A bare `url()` in a
  stylesheet is never basePath-prefixed by Next and 404s on the mounted deploy. All assets
  live nested under `public/media/`, never at the export root.
- **The stat mosaic's stagger comes from card size, not column offsets.** All three columns
  are top-aligned; the middle column is wider (`1.52fr`) and every card is square. Grey
  squares are flush with the edge of the card they hang off.
- **`background-color`, not the `background` shorthand**, on tiles with image backdrops —
  the shorthand wipes the inline `background-image`.

---

## 6. Assets

`public/media/` is **13MB**, down from 44MB. Everything is re-encoded through ffmpeg:
videos capped at 1280w (1152w for the heaviest) at crf 30–33, images at 1600w. The worst
offender was `variable-demo.mp4` at 25MB → 567K; it plays on three pages.

```
public/media/
├── industries/*.mp4      9 of 10 industries (Telecom missing)
├── apps/*.mp4            4 of 5 apps (Variate missing)
├── case-studies/*.jpg    4 covers
├── noise/{moss,amber,ember}.jpg   stat-mosaic backgrounds
├── admin/asset-folders.jpg        kept but UNREFERENCED
├── hero-v2.mp4           Enterprise hero — see §7 item 1
├── variable-demo.mp4     node canvas · Workflows page + Business workflows section
├── card-generate.mp4/.jpg, cta-fog-grass.jpg, cta-reeded-glass.jpg
└── partners/*            6 logos
```

**Partner logos:** ByteDance, Kling, MiniMax and Grok are flat black SVGs recoloured via
CSS `mask` + `background` (this is what allows Kling's gradient). Wan and fal are colour
PNGs rendered as `<img>`. Colours are per-brand in the `BRANDS` array in `Partners.tsx` —
**ByteDance's `#325AB4` is inferred and should be verified against brand guidelines.**

---

## 7. Open items

1. **⚠️ The Enterprise hero video is a screen recording of Langdock, not ImagineArt.**
   `public/media/hero-v2.mp4` shows `app.langdock.com` in the URL bar, the Langdock sidebar
   wordmark and a GPT-5.1 model picker. Langdock was one of the *design references* for
   this redesign and its capture appears to have been used as the asset by mistake. It is
   the largest element on `/`. **Replace before launch.** The other videos are clean.
2. **Is the branch merged?** At handoff, `main` was at PR #4 and the branch was **4 ahead,
   0 behind** — a clean fast-forward carrying `CollaborationDemo` and the bento
   placeholders. `main` did **not** have `components/CollaborationDemo.tsx`. Verify with
   `git fetch && git log --oneline origin/main..origin/redesign/enterprise-visual-language`.
   `gh` is not installed on this machine, so PRs must be opened in the browser.
3. **Testimonials on `/` still has ~9 `TODO` placeholder quotes.** Deliberate — no
   fabricated customer quotes shipped — but it blocks a public launch. Get real quotes or
   cut the section.
4. **`SiteFooter` says "© Vyro Turkey"** and links to imagine.art production URLs. Came
   from the shared kit; confirm it's correct.
5. **CEO feedback, not yet actioned:** *"We would have a switcher at the top for Creative,
   Computer."* Read: these pages only sell the **Creative** line (Image/Video/Audio/Film
   studios), while **Imagine Computer** (AI Chat, Agents, Docs, Slides, Website Builder) is
   a whole product line they never mention — the footer already splits the two. The
   intended form is likely the `ElevenCreative | ElevenAgents` pill from the ElevenLabs
   reference. **Unresolved:** does the switcher change the whole page or just the product
   grid, and does Computer-side copy exist? That answer decides whether this is a day or a
   fortnight.
6. **Missing assets:** Telecom (industries) and Variate (apps) videos; Smarters content +
   cover.
7. **`/solutions` substantially duplicates `/business`** — same hero shape, same opening H1
   clause, byte-identical industry cards, same partners, same case studies. Inherent to the
   two specs, but `/solutions` exists to rank for "ai tools for business", and two
   near-identical pages compete for the same queries. Needs a differentiation pass or a
   `rel=canonical` decision.
8. **`picsum.photos` placeholders remain in three Workflows-clone files** —
   `ModelsSection.tsx`, `WorkflowPage.tsx`, `BentoSection.tsx`. Pre-existing; random
   external stock images shouldn't ship.
9. **No CI.** There is no `.github/workflows`, so nothing verifies the build before a
   merge. `npm run build` is the only guard. A minimal `npm ci && npm run build` on PRs
   would have caught two broken builds during this work. `main` is also unprotected —
   blocking force-push and deletion costs nothing.
10. **Unbuilt spec sections, all blocked on content:** the "Added resources / blog slider"
    (Platform, Business, Solutions), Platform's white-glove support grid, and Solutions'
    "SEO FAQs" (listed with no content).
11. **`/workflows` has pre-existing hydration warnings**, inherited from the source repo.

---

## 8. Accessibility / motion

Motion is opt-out throughout: the testimonial auto-scroll, hero scroll-zoom and the
collaboration demo's cursor fly-in all respect `prefers-reduced-motion`; the auto-scroll
pauses on hover, and its duplicated card set is `aria-hidden` so screen readers get four
reviews rather than eight. The product-tour lightbox is a proper `role="dialog"` with
`aria-modal`, Esc + backdrop dismissal, focus move and body-scroll lock. The case-study
result count is `aria-live` so filtering is announced. `BuiltForEnterprise` uses the
WAI-ARIA tab pattern with roving tabindex.

**Note:** the auto-scroll and hero zoom are *ambient motion*, which the design guidelines
otherwise rule out (§2). Both were explicitly requested; the reduced-motion fallbacks are
the mitigation.

---

## 9. Verifying visually

The in-app preview pane in this environment reports `visibilityState: hidden`, which
suspends scroll-driven animation and smooth scrolling. Three things therefore **could not
be confirmed visually and should be checked in a real browser**:

- the hero scroll-zoom (CSS scroll timeline, scale 1→1.05 over the first 620px)
- video autoplay
- the chevron pagers on the industry and platform rails (they use
  `el.scrollLeft = n` with `scroll-behavior: smooth`, which the hidden pane suspends —
  the handler itself is verified correct)

The pane also only screenshots reliably at scroll 0. The workaround used throughout was to
set a tall viewport via `resize_window` and, for lower sections, apply a temporary negative
`margin-top` to `<main>` before capturing.
