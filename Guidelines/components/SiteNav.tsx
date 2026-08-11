"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FONT = "var(--font-sans), sans-serif";
const NAV_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const NAV_DURATION = "480ms";

type NavLink = {
  label: string;
  href: string;
  activeRoute?: string;
  exact?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: "Solutions", href: "#" },
  { label: "Case Studies", href: "#" },
  { label: "Platform", href: "#" },
  { label: "Workflows", href: "/workflows", activeRoute: "/workflows" },
  { label: "Enterprise", href: "/", activeRoute: "/", exact: true },
  { label: "Business", href: "#" },
];

export function SiteNav({
  variant = "onDark",
}: {
  /** Theme of the hero the navbar sits over while at the top of the page.
   *  "onDark" → white links/logo/CTAs (default). "onLight" → dark ones.
   *  Either way, the scrolled pill is always the dark glass treatment. */
  variant?: "onDark" | "onLight";
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Get Started is the primary CTA; Book a demo is the ghost/secondary.
  const getStartedClass = "nav-cta";
  const bookDemoClass = "nav-cta-ghost";
  // Both CTAs share the same size; only the primary/ghost class differs.
  const ctaStyle = { height: 40, padding: "8px 16px", fontSize: 16 } as const;
  const getStartedStyle = ctaStyle;
  const bookDemoStyle = ctaStyle;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const compact = scrolled;

  // The bar is "dark-themed" (light text) whenever it's the scrolled pill,
  // or when it sits over a dark hero at the top. Only onLight + at-top is light.
  const darkTheme = compact || variant === "onDark";
  const themeVars = (
    darkTheme
      ? {
          "--nav-fg": "rgba(255,255,255,0.65)",
          "--nav-fg-hover": "#ffffff",
          "--nav-fg-ghost": "rgba(255,255,255,0.3)",
          "--nav-cta-bg": "#ffffff",
          "--nav-cta-fg": "#0A0A0B",
          "--nav-cta-glow": "rgba(255,255,255,0.08)",
          "--nav-ghost-fg": "rgba(255,255,255,0.85)",
          "--nav-ghost-border": "rgba(255,255,255,0.16)",
          "--nav-ghost-border-hover": "rgba(255,255,255,0.32)",
          "--nav-ghost-bg-hover": "rgba(255,255,255,0.06)",
          "--nav-burger": "rgba(255,255,255,0.9)",
        }
      : {
          "--nav-fg": "rgba(11,11,12,0.6)",
          "--nav-fg-hover": "#0b0b0c",
          "--nav-fg-ghost": "rgba(11,11,12,0.28)",
          "--nav-cta-bg": "#0b0b0c",
          "--nav-cta-fg": "#ffffff",
          "--nav-cta-glow": "rgba(11,11,12,0.08)",
          "--nav-ghost-fg": "rgba(11,11,12,0.7)",
          "--nav-ghost-border": "rgba(11,11,12,0.16)",
          "--nav-ghost-border-hover": "rgba(11,11,12,0.32)",
          "--nav-ghost-bg-hover": "rgba(11,11,12,0.05)",
          "--nav-burger": "rgba(11,11,12,0.8)",
        }
  ) as React.CSSProperties;

  function isActive(link: NavLink) {
    if (!link.activeRoute) return false;
    return link.exact ? pathname === link.activeRoute : pathname.startsWith(link.activeRoute);
  }

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          height: 20px;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
        }
        .nav-link-inner {
          display: flex;
          flex-direction: column;
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover .nav-link-inner { transform: translateY(-20px); }
        .nav-link-text {
          display: block;
          height: 20px;
          line-height: 20px;
          white-space: nowrap;
          font-family: ${FONT};
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--nav-fg);
          transition: color 0.3s;
        }
        .nav-link:hover .nav-link-text { color: var(--nav-fg-hover); }
        .nav-link[data-active="true"] .nav-link-text { color: var(--nav-fg-hover); }
        .nav-link-ghost { color: var(--nav-fg-ghost); }

        .nav-cta-ghost {
          font-family: ${FONT};
          font-size: 15px;
          font-weight: 500;
          color: var(--nav-ghost-fg);
          background: transparent;
          border: 1px solid var(--nav-ghost-border);
          border-radius: 22px;
          cursor: pointer;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: border-color 0.3s, background 0.3s, color 0.3s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .nav-cta-ghost:hover {
          border-color: var(--nav-ghost-border-hover);
          background: var(--nav-ghost-bg-hover);
          color: var(--nav-fg-hover);
        }

        .nav-cta {
          font-family: ${FONT};
          font-weight: 500;
          color: var(--nav-cta-fg);
          background: var(--nav-cta-bg);
          border: none;
          border-radius: 22px;
          cursor: pointer;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: box-shadow 0.2s, transform 0.2s, background 0.3s, color 0.3s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .nav-cta:hover {
          box-shadow: 0 0 0 6px var(--nav-cta-glow);
          transform: scale(1.02);
        }

        /* desktop / mobile toggle (matches current 1080px breakpoint) */
        .nav-desktop { display: flex; }
        .nav-burger { display: none; }
        @media (max-width: 1080px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }

        @keyframes navMenuIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>

      <nav
        style={{
          ...themeVars,
          position: "fixed",
          top: compact ? 16 : 12,
          left: 0,
          right: 0,
          marginInline: "auto",
          maxWidth: compact ? "min(86vw, 1360px)" : "100%",
          zIndex: 60,
          height: compact ? 72 : 64,
          paddingLeft: compact ? 28 : "calc((100vw - min(86vw, 1360px)) / 2)",
          paddingRight: compact ? 16 : "calc((100vw - min(86vw, 1360px)) / 2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: compact ? "rgba(10,10,11,0.42)" : "transparent",
          backdropFilter: compact ? "blur(32px) saturate(180%)" : "blur(20px)",
          WebkitBackdropFilter: compact ? "blur(32px) saturate(180%)" : "blur(20px)",
          borderRadius: compact ? 999 : 0,
          boxShadow: scrolled
            ? "0 20px 48px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.1)"
            : "none",
          boxSizing: "border-box",
          transition: [
            `top ${NAV_DURATION} ${NAV_EASE}`,
            `max-width ${NAV_DURATION} ${NAV_EASE}`,
            `padding ${NAV_DURATION} ${NAV_EASE}`,
            `height ${NAV_DURATION} ${NAV_EASE}`,
            `border-radius ${NAV_DURATION} ${NAV_EASE}`,
            `background 320ms ease`,
            `box-shadow ${NAV_DURATION} ease`,
          ].join(", "),
        }}
      >
        {/* Logo — wordmark; inverted to white on the dark bar, dark on a light hero */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src="/imagine-art-wordmark.svg"
            alt="ImagineArt"
            style={{
              display: "block",
              height: 24,
              width: "auto",
              filter: darkTheme ? "brightness(0) invert(1)" : "none",
              transition: "filter 0.3s ease",
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="nav-desktop" style={{ alignItems: "center", gap: "clamp(14px, 1.4vw, 22px)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link"
              data-active={isActive(link) ? "true" : "false"}
            >
              <span className="nav-link-inner">
                <span className="nav-link-text">{link.label}</span>
                <span className="nav-link-text nav-link-ghost">{link.label}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="nav-desktop" style={{ alignItems: "center", gap: 10, flexShrink: 0 }}>
          <a
            href="https://imagine.art/enterprise"
            target="_blank"
            rel="noopener noreferrer"
            className={getStartedClass}
            style={getStartedStyle}
          >
            Get Started
          </a>
          <a href="#contact" className={bookDemoClass} style={bookDemoStyle}>
            Book a demo
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-burger"
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: "var(--nav-burger)",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
          aria-label="Open menu"
        >
          <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ display: "block", width: 18, height: 1.5, borderRadius: 2, background: "currentColor", transition: "transform 250ms ease", transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 18, height: 1.5, borderRadius: 2, background: "currentColor", transition: "transform 250ms ease", transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none" }} />
          </span>
        </button>
      </nav>

      {/* Mobile fullscreen menu (light) */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 101,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            animation: "navMenuIn 0.22s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", flexShrink: 0 }}>
            <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "inline-flex", alignItems: "center" }}>
              <img src="/imagine-art-wordmark.svg" alt="ImagineArt" style={{ display: "block", height: 24, width: "auto" }} />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 4, border: "none", background: "transparent", color: "rgba(11,11,12,0.6)", cursor: "pointer" }}
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "10px 32px",
                    borderRadius: 10,
                    fontFamily: FONT,
                    fontSize: 22,
                    fontWeight: 400,
                    letterSpacing: "-0.2px",
                    color: isActive(link) ? "var(--ink)" : "rgba(11,11,12,0.7)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ width: "calc(100% - 48px)", height: 1, background: "rgba(11,11,12,0.08)", margin: "16px 0" }} />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", padding: "0 24px" }}>
              <a
                href="https://imagine.art/enterprise"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 46, padding: "0 26px", borderRadius: 22, fontFamily: FONT, fontSize: 15, fontWeight: 600, color: "#fff", background: "var(--ink)", textDecoration: "none" }}
              >
                Get Started
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 46, padding: "0 26px", borderRadius: 22, fontFamily: FONT, fontSize: 15, fontWeight: 500, color: "var(--ink)", background: "transparent", border: "1px solid var(--line-strong)", textDecoration: "none" }}
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
