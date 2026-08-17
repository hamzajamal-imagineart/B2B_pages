/**
 * Nav surface theme — drives which colours SiteNav uses while it sits at
 * the top of a page (before the scrolled dark-glass pill takes over).
 *
 * Every page uses the same SiteNav component and picks its variant from the
 * tone of its own hero, so the two can't drift: a page with a light hero reads
 * `navVariantFor("light")`, a page with a dark full-bleed hero reads
 * `navVariantFor("dark")`. Either way the scrolled pill is the dark glass.
 */
export type HeroTheme = "light" | "dark";

const NAV_VARIANT_BY_THEME: Record<HeroTheme, "onDark" | "onLight"> = {
  light: "onLight",
  dark: "onDark",
};

export const navVariantFor = (theme: HeroTheme): "onDark" | "onLight" =>
  NAV_VARIANT_BY_THEME[theme];

/** Tone of the Enterprise page's hero, which is a plain light section. */
export const HERO_THEME: HeroTheme = "light";

/** Convenience for the light-hero pages: /, /platform, /solutions, /case-studies. */
export const NAV_VARIANT: "onDark" | "onLight" = navVariantFor(HERO_THEME);
