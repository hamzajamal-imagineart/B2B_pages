"use client";

import { CONTAINER_PAD, SECTION_Y, TYPE, SURFACE } from "./scale";

import { withBasePath } from "@/lib/assets";
import { ButtonLink } from "@/components/Button";
import { SectionGuides } from "@/components/primitives/SectionGuides";

const FONT = "var(--font-sans), sans-serif";

type ModelType = "image" | "video" | "audio";

// Hero — full-width feature card
const HERO = {
  name: "Seedance 2.0",
  desc: "Cinematic video, multi-shot scenes, and native sound, in seconds.",
  seed: "seedance-tuscany-villa",
  image: "/media/models/hero-seedance.jpg",
};

// Split row — three side-by-side feature cards
const FEATURED: { name: string; desc: string; seed: string; image: string }[] = [
  { name: "Kling",       desc: "Cinematic video with high motion fidelity.", seed: "kling-cinematic-cliff", image: "/media/models/kling.jpg" },
  { name: "OpenAI",      desc: "Sharp, prompt-faithful imagery and reasoning.", seed: "openai-orbital-render", image: "/media/models/openai.jpg" },
  { name: "Nano Banana", desc: "Fast, low-cost image edits and variants at scale.", seed: "nano-banana-watchtower", image: "/media/models/nano-banana.jpg" },
];

// Compact pills, grouped by modality (5+ per row, no overlap with hero/featured)
const PILLS_IMAGE = [
  "FLUX 1.1 Pro",
  "Imagen 4",
  "Ideogram V3",
  "Recraft V3",
  "Reve",
  "BRIA 2.3",
];
const PILLS_VIDEO = [
  "Veo 3",
  "Sora 2",
  "Hailuo 02",
  "Runway Gen-4",
  "Luma Ray 2",
  "LTX Video",
];
const PILLS_AUDIO = [
  "ElevenLabs Music",
  "ElevenLabs SFX",
  "Suno V4",
  "Cartesia",
  "Mubert",
  "Udio",
];

// ── Icons ──
const ImageIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <circle cx="9" cy="9.5" r="1.6" />
    <path d="M21 15.5l-5-5L5 21.5" />
  </svg>
);

const VideoIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none" />
  </svg>
);

const AudioIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="11" x2="3" y2="13" />
    <line x1="6" y1="9" x2="6" y2="15" />
    <line x1="9" y1="6" x2="9" y2="18" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="15" y1="6" x2="15" y2="18" />
    <line x1="18" y1="9" x2="18" y2="15" />
    <line x1="21" y1="11" x2="21" y2="13" />
  </svg>
);

const TYPE_ICON: Record<ModelType, React.ReactElement> = {
  image: ImageIcon,
  video: VideoIcon,
  audio: AudioIcon,
};

// ── Feature card (hero + split) ──
function FeatureCard({
  name,
  desc,
  seed,
  image,
  height,
  big = false,
}: {
  name: string;
  desc?: string;
  seed: string;
  image: string;
  height: number;
  big?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        height,
        background: SURFACE.tile,
        border: `1px solid ${SURFACE.line}`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBasePath(image)}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.5) 45%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          bottom: 24,
          display: "flex",
          alignItems: desc ? "flex-end" : "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: big ? "clamp(30px, 3.8vw, 46px)" : "clamp(22px, 1.8vw, 28px)",
              fontWeight: 500,
              color: SURFACE.ink,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              }}
          >
            {name}
          </div>
          {desc && (
            <div
              style={{
                fontFamily: FONT,
                fontSize: 14.5,
                fontWeight: 400,
                color: SURFACE.ink2,
                letterSpacing: "-0.005em",
                lineHeight: 1.45,
                marginTop: 8,
                maxWidth: 540,
              }}
            >
              {desc}
            </div>
          )}
        </div>
        <ButtonLink href="#" variant="brand" size="md">
          Learn more
        </ButtonLink>
      </div>
    </div>
  );
}

// ── Visual pill — small thumbnail card with overlaid name + type icon ──
/* Six stills cycled across the catalogue. These illustrate the kind of work the
   models produce; they are not per-model outputs, which is why no card claims
   a specific one. */
const PILL_IMAGES = [1, 2, 3, 4, 5, 6].map((n) => `/media/models/pill-${n}.jpg`);

function ModelPill({ name, type, index = 0 }: { name: string; type: ModelType; index?: number }) {
  return (
    <a
      href="#"
      style={{
        position: "relative",
        display: "block",
        aspectRatio: "16 / 9",
        borderRadius: 22,
        overflow: "hidden",
        background: SURFACE.tile,
        border: `1px solid ${SURFACE.line}`,
        textDecoration: "none",
        transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), border-color 220ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-2px)";
        el.style.borderColor = SURFACE.lineStrong;
        const img = el.querySelector<HTMLImageElement>("img");
        if (img) img.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.borderColor = SURFACE.line;
        const img = el.querySelector<HTMLImageElement>("img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBasePath(PILL_IMAGES[index % PILL_IMAGES.length])}
        alt=""
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.55) 55%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
          minWidth: 0,
        }}
      >
        <span style={{ color: SURFACE.ink2, display: "inline-flex", flexShrink: 0 }}>
          {TYPE_ICON[type]}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 500,
            color: SURFACE.ink,
            letterSpacing: "-0.01em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
      </div>
    </a>
  );
}

export default function ModelsSection() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: SURFACE.page,
        padding: `${SECTION_Y} ${CONTAINER_PAD}`,
      }}
    >
      <SectionGuides edge="top" />
      {/* Heading, on the shared type classes: mono eyebrow, two-tone h2, lede */}
      <div style={{ marginBottom: 56 }}>
        <p className="eyebrow">Models</p>
        <h2 className="h2" style={{ marginTop: 12 }}>
          Physically intelligent <span className="h-muted">best models</span>
        </h2>
        <p className="lede" style={{ marginTop: 16 }}>
          Orchestrating category-defining models across every stage of creative work.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Hero — full width, big title + description */}
        <FeatureCard
          name={HERO.name}
          desc={HERO.desc}
          seed={HERO.seed}
          image={HERO.image}
          height={400}
          big
        />

        {/* Split row — 3 feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {FEATURED.map((m) => (
            <FeatureCard
              key={m.name}
              name={m.name}
              desc={m.desc}
              seed={m.seed}
              image={m.image}
              height={300}
            />
          ))}
        </div>

        {/* Hug-width pill rows — image / video / audio */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 10, marginTop: 6 }}>
          {PILLS_IMAGE.map((name, i) => (
            <ModelPill key={name} name={name} type="image" index={i + 0} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 10 }}>
          {PILLS_VIDEO.map((name, i) => (
            <ModelPill key={name} name={name} type="video" index={i + 6} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 10 }}>
          {PILLS_AUDIO.map((name, i) => (
            <ModelPill key={name} name={name} type="audio" index={i + 12} />
          ))}
        </div>
      </div>
    </section>
  );
}
