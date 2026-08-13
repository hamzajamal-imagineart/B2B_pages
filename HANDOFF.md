# ImagineArt Enterprise — B2B Landing Pages (Handoff)

## Project
- **What:** Two B2B marketing pages for **ImagineArt Enterprise**, built from a PDF/MD content spec (`B2B LPs.md`). Clean/light aesthetic inspired by plaud.ai & langdock.
- **Location:** `/Users/vyro/vibe-code/imagineart-enterprise`
- **Repo:** https://github.com/hamzajamal-imagineart/B2B_pages (branch `main`; pushed over HTTPS as `hamzaimagine1` — the SSH identity `hmzajmal` lacked write access)
- **Stack:** Next.js 16.2.4 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4
- **Run:** `npm install && npm run dev` → http://localhost:3000
- **Build:** `npm run build` (passes clean)

## Pages
1. **Enterprise** (`app/page.tsx`, route `/`) — Hero → Partners → Security → Workflows → Control → Footer
2. **Workflows** (`app/workflows/page.tsx`, route `/workflows`) — a **clone** of `github.com/SaifurRehman0120/landingpage-business` (its Workflow page), copied into `app/components/workflow/*`. Dark-themed, its own hero/sections. Uses the shared Navbar + SiteFooter.

## Content (verbatim from the spec — do NOT invent copy)
- **Hero H1:** "Create at the speed of your ambition" + the enterprise-platform subtext. Full-bleed cinematic image (`/public/hero.png`, generated via ImagineArt) with copy overlaid, aligned to the page container. Sits below the navbar on a dark section backdrop.
- **Security:** H2 "Safe, secure, and built for the enterprise" + body; a bento recreating the spec's "Your data is fully protected" (SSO, No data training w/ flow diagram, Provisioning, SOC 2, Indemnification).
- **Partners:** logo marquee (ByteDance, Kling AI, MINIMAX, Wan, fal, Grok) + "Trusted by the brands you benchmark against."
- **Workflows:** H2 "Workflows that work for you" + body + node-canvas visual.
- **Control:** **Z-fold, 4 alternating folds** (Complete admin control, Efficient asset management, Unlimited members no added cost, Collaborate end to end) — each with a dashboard visual. **No section heading, no 01/02 numbering** (both removed to match the spec).

## Design system / conventions
- **Font:** Google Sans Flex via `next/font/google` (CSS var `--font-sans`). **Font-weight capped at 500 everywhere** (enforced in `@layer base`).
- **Accent:** purple **`#8A3FFC`** (was originally lime green — globally swapped). Tokens: `--lime` `#8a3ffc`, `--lime-deep` `#7a2af0`, `--lime-ink` `#fff`.
- **Container:** shared `.wrap` = `min(86vw, 1360px)` centered (matches the cloned Workflows page). Used site-wide including the scrolled navbar pill.
- **Light mode:** Security bento + Control dashboards were converted from dark to **light** (white panels, light-gray cards, dark text; accent purple retained). Hero stays dark.
- **No em-dashes** in Enterprise copy (replaced with commas).
- `globals.css` base/reset lives in `@layer base` so Tailwind utilities can override it (this fixed the guideline footer being unstyled).

## Navbar (single shared component: `app/components/Navbar.tsx`, used by both pages)
Heavily iterated — current final state:
- Dark, transparent over the hero → collapses to a **dark glass pill** on scroll (`rgba(10,10,11,0.42)`, `blur(32px)`), **full stadium radius (999)**, width tied to the container `min(86vw,1360px)`.
- **Links:** Solutions · Case Studies · Platform · Workflows(`/workflows`) · Enterprise(`/`, active) · Business — two-line slide hover + active-route state. Gap `clamp(14px,1.4vw,22px)`.
- **CTAs:** **Get Started = primary** (filled), **Book a demo = ghost**. Both **height 40px, padding 8px 16px, font 16px weight 500**, capsule; nest concentrically in the pill.
- **Logo:** wordmark `/imagine-art-wordmark.svg` with `filter: brightness(0) invert(1)` (white on dark bar; dark in mobile overlay).
- **Mobile (≤1080px):** hamburger → fullscreen white overlay menu (body-scroll lock).
- **`variant` prop:** `onDark` (default, white text/logo) | `onLight` (dark text, un-inverted logo, dark primary CTA) — for future light-hero pages. Both current pages use `onDark`.

## Footer
- `app/components/SiteFooter.tsx` (from the Guidelines kit) — dark footer, 6 link columns, App Store/Play buttons, watermark, socials. Used by **both** pages. Assets in `/public/footer/`.
- Note: still says "© Vyro Turkey" and links to imagine.art production URLs (edit per project).

## Guidelines folder (`Guidelines/`)
- A reusable design-kit dropped in from `github.com/aizazahmad-imagineart/ai-website-builder`. Contains `SiteNav.tsx` (synced to match the finalized Navbar, named export `SiteNav`), `SiteFooter.tsx`, `GUIDELINES.md` (updated to document the navbar + `variant` prop), fonts, tokens, assets.
- **Excluded from `tsconfig` type-checking** (`"exclude": ["node_modules","Guidelines"]`) because its reference snippets import modules not in this project — this was the **Vercel build fix**.

## Known issues / notes
- **`/workflows` has hydration warnings** (the cloned `WorkflowPage` renders client-only values) — cosmetic, pre-existing in the source repo, not from our changes.
- `/public` includes large workflow demo `.mp4`s (~55MB total) + `hero.png` (1.3MB).
- The in-app preview pane occasionally glitches to a blank/`vw:0` state during automated screenshots — a tooling quirk, not the app.

## Likely next steps
- Fix `/workflows` hydration; replace footer's "Vyro Turkey"/prod links; add a README; optionally optimize hero image + videos.

## Component map (quick reference)
```
app/
  page.tsx                 Enterprise page (route /)
  workflows/page.tsx       Workflows clone (route /workflows)
  layout.tsx               Google Sans Flex + metadata
  globals.css              tokens, @layer base reset, .wrap, viz-*/bento helpers
  components/
    Navbar.tsx             shared adaptive navbar (variant onDark/onLight)
    Hero.tsx  Partners.tsx  Security.tsx  Workflows.tsx  Control.tsx  Reveal.tsx
    SiteFooter.tsx         shared footer (from Guidelines)
    workflow/*             cloned Workflows-page components
Guidelines/                reusable design kit (excluded from tsc)
public/                    hero.png, logos, footer assets, workflow demo videos
```
