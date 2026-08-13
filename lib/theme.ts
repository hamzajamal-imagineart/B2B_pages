/**
 * Nav surface theme — drives which colours SiteNav uses while it sits at
 * the top of the page (before the scrolled dark-glass pill takes over).
 * The hero is a plain light section, so this stays "light"; flip it if a
 * future hero goes back to a dark photo/video background.
 */
export type HeroTheme = "light" | "dark";

export const HERO_THEME: HeroTheme = "light";

const NAV_VARIANT_BY_THEME: Record<HeroTheme, "onDark" | "onLight"> = {
  light: "onLight",
  dark: "onDark",
};

export const NAV_VARIANT: "onDark" | "onLight" = NAV_VARIANT_BY_THEME[HERO_THEME];
