"use client";

const FONT = "var(--font-sans), sans-serif";
const CONTAINER_PAD = "calc((100vw - min(86vw, 1360px)) / 2)";

type ModelType = "image" | "video" | "audio";

// Hero — full-width feature card
const HERO = {
  name: "Seedance 2.0",
  desc: "Cinematic video, multi-shot scenes, and native sound — in seconds.",
  // TODO Fal: replace with hero output from Seedance 2.0 (cinematic landscape, golden hour)
  seed: "seedance-tuscany-villa",
};

// Split row — three side-by-side feature cards
const FEATURED: { name: string; desc: string; seed: string }[] = [
  { name: "Kling",       desc: "Cinematic video with high motion fidelity.", seed: "kling-cinematic-cliff" },
  { name: "OpenAI",      desc: "Sharp, prompt-faithful imagery and reasoning.", seed: "openai-orbital-render" },
  { name: "Nano Banana", desc: "Fast, low-cost image edits and variants at scale.", seed: "nano-banana-watchtower" },
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
  height,
  big = false,
}: {
  name: string;
  desc?: string;
  seed: string;
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
        background: "#15151a",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* TODO Fal: replace with model-generated image */}
      <img
        src={`https://picsum.photos/seed/${seed}/1600/900`}
        alt={name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 45%, transparent 100%)",
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
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textShadow: "0 1px 16px rgba(0,0,0,0.5)",
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
                color: "rgba(255,255,255,0.78)",
                letterSpacing: "-0.005em",
                lineHeight: 1.45,
                marginTop: 8,
                maxWidth: 540,
                textShadow: "0 1px 12px rgba(0,0,0,0.45)",
              }}
            >
              {desc}
            </div>
          )}
        </div>
        <a
          href="#"
          style={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 500,
            color: "#0a0a0b",
            background: "#fff",
            borderRadius: 22,
            padding: "9px 20px",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            flexShrink: 0,
            transition: "transform 180ms ease, box-shadow 180ms ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = "scale(1.04)";
            el.style.boxShadow = "0 8px 22px rgba(255,255,255,0.16)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = "scale(1)";
            el.style.boxShadow = "none";
          }}
        >
          Learn more
        </a>
      </div>
    </div>
  );
}

// ── Visual pill — small thumbnail card with overlaid name + type icon ──
function ModelPill({ name, type }: { name: string; type: ModelType }) {
  // Stable seed per model so picsum returns the same image each render.
  const seed = `model-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <a
      href="#"
      style={{
        position: "relative",
        display: "block",
        aspectRatio: "16 / 9",
        borderRadius: 22,
        overflow: "hidden",
        background: "#15151a",
        border: "1px solid rgba(255,255,255,0.06)",
        textDecoration: "none",
        transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), border-color 220ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-2px)";
        el.style.borderColor = "rgba(255,255,255,0.16)";
        const img = el.querySelector<HTMLImageElement>("img");
        if (img) img.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "rgba(255,255,255,0.06)";
        const img = el.querySelector<HTMLImageElement>("img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* TODO Fal: replace with model-specific output thumbnail */}
      <img
        src={`https://picsum.photos/seed/${seed}/480/270`}
        alt={name}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)",
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
        <span style={{ color: "rgba(255,255,255,0.78)", display: "inline-flex", flexShrink: 0 }}>
          {TYPE_ICON[type]}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 500,
            color: "#fff",
            letterSpacing: "-0.01em",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
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
        backgroundColor: "#0A0A0B",
        padding: `120px ${CONTAINER_PAD}`,
      }}
    >
      {/* Heading — left-aligned */}
      <div style={{ marginBottom: 56, maxWidth: 760 }}>
        <h2
          style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.2vw, 60px)",
            fontWeight: 400,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Physically intelligent best models.
        </h2>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 15,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
            margin: "20px 0 0",
            maxWidth: 480,
          }}
        >
          Orchestrating category-defining models across every stage of creative work.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Hero — full width, big title + description */}
        <FeatureCard
          name={HERO.name}
          desc={HERO.desc}
          seed={HERO.seed}
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
              height={300}
            />
          ))}
        </div>

        {/* Hug-width pill rows — image / video / audio */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 10, marginTop: 6 }}>
          {PILLS_IMAGE.map((name) => (
            <ModelPill key={name} name={name} type="image" />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 10 }}>
          {PILLS_VIDEO.map((name) => (
            <ModelPill key={name} name={name} type="video" />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 10 }}>
          {PILLS_AUDIO.map((name) => (
            <ModelPill key={name} name={name} type="audio" />
          ))}
        </div>
      </div>
    </section>
  );
}
