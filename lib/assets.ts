// Asset URL helper for the static-export CDN deploy.
//
// Next.js auto-prefixes `basePath` onto URLs IT generates — `_next/`, `<Link>`,
// and `next/font`. It does NOT touch hand-written local asset strings
// (`/media/hero.png`, …), and with `images.unoptimized` the `<Image src>` is
// emitted verbatim too. Those would resolve against the host root and 404.
// Route every hand-written /public asset path through `withBasePath` so it
// points at the mounted prefix. See GUIDELINES.md §7.

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative /public asset path with the mount basePath. */
export const withBasePath = (p: string): string =>
  p.startsWith("/") ? `${BASE_PATH}${p}` : p;
