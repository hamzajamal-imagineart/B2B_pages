"use client";
import { usePathname } from "next/navigation";

const FONT = "var(--font-sans), sans-serif";
const CONTAINER_PAD = "calc((100vw - min(86vw, 1360px)) / 2)";

// Sparkle path from the logo lab — the ImagineArt 4-point star.
const STAR_PATH =
  "M29.4757 47.3165C26.7299 39.0636 20.1971 32.3212 11.6373 29.475C20.1971 26.6288 26.7299 19.9048 29.4757 11.6518C32.2307 19.9048 38.7542 26.638 47.3232 29.4842C38.7542 32.3396 32.2307 39.0636 29.4757 47.3165Z";

function Sparkle({
  cx,
  cy,
  scale,
  rotate = 0,
  fill,
  opacity = 1,
  style,
}: {
  cx: number;
  cy: number;
  scale: number;
  rotate?: number;
  fill: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale}) translate(-29.5 -29.5)`}
      style={{ transformBox: "fill-box", transformOrigin: "center", ...style }}
      opacity={opacity}
    >
      <path d={STAR_PATH} fill={fill} />
    </g>
  );
}

type CtaConfig = {
  label: string;
  href: string;
  external?: boolean;
  // Smooth-scroll to a section id when on the home page; ignored otherwise.
  scrollOnHome?: string;
};

const GET_STARTED: CtaConfig = {
  label: "Get Started",
  href: "https://imagine.art/enterprise",
  external: true,
};

const BOOK_DEMO: CtaConfig = {
  label: "Book a demo",
  href: "/#demo",
  scrollOnHome: "#demo",
};

function PrimaryButton({ cta, isHome }: { cta: CtaConfig; isHome: boolean }) {
  return (
    <a
      href={cta.href}
      {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        if (cta.scrollOnHome && isHome) {
          e.preventDefault();
          document.querySelector(cta.scrollOnHome)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      style={{
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: 500,
        color: "#ffffff",
        background: "#0a0a0b",
        border: "1px solid #0a0a0b",
        borderRadius: 22,
        padding: "16px 28px",
        cursor: "pointer",
        letterSpacing: "-0.01em",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        transition: "transform 200ms ease, box-shadow 200ms ease, background 200ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "scale(1.03)";
        el.style.boxShadow = "0 14px 36px rgba(10,10,11,0.22)";
        el.style.background = "#1a1a1f";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "none";
        el.style.background = "#0a0a0b";
      }}
    >
      {cta.label}
    </a>
  );
}

function SecondaryButton({ cta, isHome }: { cta: CtaConfig; isHome: boolean }) {
  return (
    <a
      href={cta.href}
      {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        if (cta.scrollOnHome && isHome) {
          e.preventDefault();
          document.querySelector(cta.scrollOnHome)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      style={{
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: 500,
        color: "#0a0a0b",
        background: "#ffffff",
        border: "1px solid rgba(10,10,11,0.18)",
        borderRadius: 22,
        padding: "16px 28px",
        cursor: "pointer",
        letterSpacing: "-0.01em",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        transition: "border-color 200ms ease, background 200ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(10,10,11,0.45)";
        el.style.background = "#fafafa";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(10,10,11,0.18)";
        el.style.background = "#ffffff";
      }}
    >
      {cta.label}
    </a>
  );
}

export default function FinalCTA() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isWorkflow = pathname.startsWith("/workflow");
  // /workflow → Get Started primary; everywhere else → Book a demo primary.
  const primary = isWorkflow ? GET_STARTED : BOOK_DEMO;
  const secondary = isWorkflow ? BOOK_DEMO : GET_STARTED;
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#ffffff",
        padding: `160px ${CONTAINER_PAD} 200px`,
        overflow: "hidden",
      }}
    >
      {/* Aurora Constellation — animated brand backdrop. Two soft gradient
          ribbons flow in opposite directions, three orbital sparkles trace
          slow concentric paths around a central mark that breathes. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(1100px, 92vw)",
          height: "min(720px, 60vw)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 1100 720"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            {/* Flowing ribbon A: lavender → magenta. Gradient stops scrub
                left-to-right to give the ribbon its current motion. */}
            <linearGradient
              id="finalcta-rib-a"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="360"
              x2="500"
              y2="360"
            >
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#f472b6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
              <animate attributeName="x1" values="-400;1500" dur="9s" repeatCount="indefinite" />
              <animate attributeName="x2" values="100;2000" dur="9s" repeatCount="indefinite" />
            </linearGradient>

            {/* Flowing ribbon B: cyan → violet, reverse direction, slower. */}
            <linearGradient
              id="finalcta-rib-b"
              gradientUnits="userSpaceOnUse"
              x1="1400"
              y1="360"
              x2="900"
              y2="360"
            >
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
              <stop offset="40%" stopColor="#67e8f9" stopOpacity="0.42" />
              <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              <animate attributeName="x1" values="1500;-400" dur="12s" repeatCount="indefinite" />
              <animate attributeName="x2" values="2000;100" dur="12s" repeatCount="indefinite" />
            </linearGradient>

            {/* Soft halo behind the central mark — a radial bloom. */}
            <radialGradient id="finalcta-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.30" />
              <stop offset="45%" stopColor="#f472b6" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Outer-glow blur for ribbons + sparkles. */}
            <filter id="finalcta-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="finalcta-blur-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>

          {/* Bloom halo behind the central sparkle. */}
          <ellipse
            cx="550"
            cy="360"
            rx="260"
            ry="190"
            fill="url(#finalcta-halo)"
            style={{ animation: "fc-halo-pulse 5.6s ease-in-out infinite" }}
          />

          {/* Two flowing ribbons — wide gentle waves across the full canvas. */}
          <g filter="url(#finalcta-blur)">
            <path
              d="M -40 360
                 C 200 220, 360 500, 550 360
                 C 740 220, 900 500, 1140 360"
              fill="none"
              stroke="url(#finalcta-rib-a)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M -40 380
                 C 220 480, 360 240, 550 380
                 C 740 520, 900 240, 1140 380"
              fill="none"
              stroke="url(#finalcta-rib-b)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity={0.85}
            />
          </g>

          {/* Three orbital sparkles travelling concentric paths at varied
              radii / speeds / phases. Each one rotates around the center of
              the SVG; CSS keyframes drive the orbit, SMIL drives nothing.   */}
          <g style={{ transformOrigin: "550px 360px", animation: "fc-orbit-a 18s linear infinite" }}>
            <Sparkle
              cx={550 + 360}
              cy={360}
              scale={0.55}
              fill="#a78bfa"
              opacity={0.85}
              style={{ filter: "drop-shadow(0 0 10px rgba(167,139,250,0.5))" }}
            />
          </g>
          <g style={{ transformOrigin: "550px 360px", animation: "fc-orbit-b 26s linear infinite" }}>
            <Sparkle
              cx={550 - 250}
              cy={360 + 110}
              scale={0.42}
              fill="#f472b6"
              opacity={0.75}
              style={{ filter: "drop-shadow(0 0 8px rgba(244,114,182,0.45))" }}
            />
          </g>
          <g style={{ transformOrigin: "550px 360px", animation: "fc-orbit-c 22s linear infinite reverse" }}>
            <Sparkle
              cx={550 + 200}
              cy={360 - 180}
              scale={0.36}
              fill="#67e8f9"
              opacity={0.7}
              style={{ filter: "drop-shadow(0 0 8px rgba(103,232,249,0.45))" }}
            />
          </g>

          {/* Central mark — slow breath + faint micro-rotation. */}
          <g
            style={{
              transformOrigin: "550px 360px",
              animation: "fc-center-rotate 28s linear infinite",
            }}
          >
            <Sparkle
              cx={550}
              cy={360}
              scale={2.4}
              fill="#0a0a0b"
              opacity={0.92}
              style={{
                animation: "fc-center-breath 4.4s ease-in-out infinite",
                filter: "drop-shadow(0 6px 24px rgba(167,139,250,0.35))",
              }}
            />
          </g>
        </svg>

        <style>{`
          @keyframes fc-halo-pulse {
            0%, 100% { opacity: 0.85; transform: scale(1); transform-origin: 550px 360px; }
            50%      { opacity: 1;    transform: scale(1.08); transform-origin: 550px 360px; }
          }
          @keyframes fc-orbit-a {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes fc-orbit-b {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes fc-orbit-c {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes fc-center-rotate {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes fc-center-breath {
            0%, 100% { transform: scale(1);    filter: drop-shadow(0 6px 18px rgba(167,139,250,0.25)); }
            50%      { transform: scale(1.06); filter: drop-shadow(0 10px 36px rgba(244,114,182,0.45)); }
          }
        `}</style>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: FONT,
            fontSize: "clamp(40px, 6vw, 84px)",
            fontWeight: 600,
            color: "#0a0a0b",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          What will you build today?
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 48,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <PrimaryButton cta={primary} isHome={isHome} />
          <SecondaryButton cta={secondary} isHome={isHome} />
        </div>
      </div>
    </section>
  );
}
