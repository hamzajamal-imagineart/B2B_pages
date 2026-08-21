"use client";

import { CONTAINER_PAD, SECTION_Y, SURFACE } from "./scale";
import { SectionGuides } from "@/components/primitives/SectionGuides";
import { withBasePath } from "@/lib/assets";

/**
 * Models, grouped by provider.
 *
 * One card per company rather than one per model. The catalogue has four
 * providers with several models each — Google, ByteDance, Kling and Black
 * Forest Labs — and a card apiece would have said "Nano Banana" four times
 * before saying anything else. The card is the company; the models are its
 * contents.
 *
 * Image and video only. The audio row that used to sit here is gone: this
 * section now answers "whose models can I use", and the audio catalogue is a
 * different question.
 *
 * NAMES AND DESCRIPTORS come from the product's own model pickers, so they
 * should match what a user sees in the app. If a model is renamed there,
 * rename it here. `media` is deliberately empty for now — the backdrops are
 * still to come, and until then each card runs on its tone.
 */

type Kind = "image" | "video";
type Model = { name: string; kind: Kind; desc: string };
type Provider = {
  /** Wordmark text. Set as the company writes it, not title-cased. */
  name: string;
  /** Optional photographic backdrop. Pending. */
  media?: string;
  models: Model[];
};

const PROVIDERS: Provider[] = [
  {
    name: "Google",
    models: [
      { name: "Nano Banana 2", kind: "image", desc: "Most advanced Google model for high-quality images" },
      { name: "Nano Banana Pro", kind: "image", desc: "High-quality images with effortless style adaptation" },
      { name: "Nano Banana 2 Lite", kind: "image", desc: "Fast, efficient version of Nano Banana 2" },
      { name: "Nano Banana", kind: "image", desc: "Efficient generation with a focus on speed" },
      { name: "Google Omni Flash", kind: "video", desc: "Generation and image animation" },
      { name: "Veo 3.1 Lite", kind: "video", desc: "Fast, cost-effective video generation" },
    ],
  },
  {
    name: "ByteDance",
    models: [
      { name: "Seedance 2.5", kind: "video", desc: "Realistic video with multimodal input" },
      { name: "Seedance 2.0", kind: "video", desc: "Latest video model with multi-reference" },
      { name: "Seedance 2.0 Fast", kind: "video", desc: "Fast variant of Seedance 2.0" },
      { name: "Seedance 2.0 Mini", kind: "video", desc: "Mini variant of Seedance 2.0" },
      { name: "Seedream v5 lite", kind: "image", desc: "Fast, smarter and stunning visuals" },
      { name: "Seedream v4.5", kind: "image", desc: "Enhanced Seedream with optimized quality" },
      { name: "Seedream v4", kind: "image", desc: "High-performance detailed image generation" },
    ],
  },
  {
    name: "Kling",
    models: [
      { name: "Kling 3.0 4K", kind: "video", desc: "4K cinematic visuals, fluid motion, native audio" },
      { name: "Kling 3.0", kind: "video", desc: "Top-tier cinematic visuals and fluid motion" },
      { name: "Kling O3", kind: "video", desc: "Versatile video with multi-frame reference" },
      { name: "Kling O3 Edit V2V", kind: "video", desc: "Edit and transform video from text prompts" },
      { name: "Kling O3 Reference V2V", kind: "video", desc: "Transform reference video with element control" },
    ],
  },
  {
    name: "Black Forest Labs",
    models: [
      { name: "Flux 3", kind: "video", desc: "Video model with native audio" },
      { name: "Flux 2 Max", kind: "image", desc: "Versatile generation, excelling at detail" },
      { name: "Flux 2", kind: "image", desc: "Versatile image generation" },
      { name: "Flux 2 Klein", kind: "image", desc: "Generate and edit images from text prompts" },
    ],
  },
  {
    name: "OpenAI",
    models: [
      { name: "GPT Image 2", kind: "image", desc: "World's best rendering model" },
      { name: "GPT Image 1.5", kind: "image", desc: "Latest image model with more precision" },
    ],
  },
  {
    name: "xAI",
    models: [
      { name: "Grok 1.5", kind: "video", desc: "Latest model for high-quality video" },
      { name: "Grok Image", kind: "image", desc: "Image generation for high-quality output" },
    ],
  },
  {
    name: "MiniMax",
    models: [
      { name: "Hailuo H3", kind: "video", desc: "Keyframe control and multi-shot direction" },
    ],
  },
  {
    name: "Midjourney",
    models: [
      { name: "Midjourney v7", kind: "image", desc: "Stylized text-to-image generation" },
    ],
  },
  {
    name: "Ideogram",
    models: [
      { name: "Ideogram v4", kind: "image", desc: "Superior prompt understanding" },
    ],
  },
  {
    name: "Recraft",
    models: [
      { name: "Recraft v4 pro", kind: "image", desc: "Pro model with the highest realism" },
    ],
  },
  {
    name: "ImagineArt",
    models: [
      { name: "ImagineArt 2.0", kind: "image", desc: "Enhanced text rendering" },
    ],
  },
  {
    name: "Alibaba",
    models: [
      { name: "Happy Horse 1.0", kind: "video", desc: "#1-ranked, cinematic 1080p" },
    ],
  },
  {
    name: "Lightricks",
    models: [
      { name: "LTX 2.3", kind: "video", desc: "Fast, open-weights video model" },
    ],
  },
  {
    name: "PixVerse",
    models: [
      { name: "Pixverse v6", kind: "video", desc: "Next-gen cinematic video, multi-clip and audio" },
    ],
  },
];

const IMAGE_COUNT = PROVIDERS.reduce(
  (n, p) => n + p.models.filter((m) => m.kind === "image").length,
  0,
);
const VIDEO_COUNT = PROVIDERS.reduce(
  (n, p) => n + p.models.filter((m) => m.kind === "video").length,
  0,
);

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

      <div style={{ marginBottom: 48, maxWidth: 720 }}>
        <p className="eyebrow">Models</p>
        <h2 className="h2" style={{ marginTop: 12 }}>
          Every frontier model, <span className="h-muted">one platform</span>
        </h2>
        <p className="lede" style={{ marginTop: 16 }}>
          {IMAGE_COUNT} image models and {VIDEO_COUNT} video models from{" "}
          {PROVIDERS.length} providers, switchable inside a single workflow. No
          extra tools, no separate contracts.
        </p>
      </div>

      {/* Provider bento. The two deepest catalogues take a half each on the
          first row; everything after runs three across. Both shapes are spans
          of a six-column grid, so the rows tile exactly. */}
      <div className="mdl-grid">
        {PROVIDERS.map((p, i) => (
          <article key={p.name} className={`mdl-card ${i < 2 ? "mdl-wide" : ""}`}>
            {p.media && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="mdl-bg" src={withBasePath(p.media)} alt="" />
                <span className="mdl-scrim" aria-hidden />
              </>
            )}

            <h3 className="mdl-name">{p.name}</h3>

            <ul className="mdl-list">
              {p.models.map((m) => (
                <li key={m.name}>
                  <span className="mdl-model">{m.name}</span>
                  <span className="mdl-desc">{m.desc}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <style>{`
        .mdl-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }
        .mdl-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          grid-column: span 2;
          min-height: 260px;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          /* Flat tone until the backdrops land. */
          background-color: #16171a;
          color: #fff;
        }
        .mdl-wide { grid-column: span 3; }

        .mdl-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .mdl-scrim {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(to top, rgba(8,9,11,0.9) 0%, rgba(8,9,11,0.55) 55%, rgba(8,9,11,0.3) 100%);
        }

        /* The wordmark, set in the page's own type rather than as a logo: the
           marks are not all available and a half-typographic wall would read
           worse than a consistent one. */
        .mdl-name {
          font-size: clamp(18px, 1.7vw, 24px);
          font-weight: 500;
          letter-spacing: -0.015em;
          line-height: 1.15;
        }

        /* Models sit at the foot of the card, so the wordmark reads first. */
        .mdl-list {
          list-style: none;
          margin: auto 0 0;
          padding: 28px 0 0;
          display: grid;
          gap: 12px;
        }
        .mdl-wide .mdl-list {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 24px;
        }
        .mdl-list li { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .mdl-model { font-size: 13.5px; font-weight: 500; letter-spacing: -0.01em; }
        .mdl-desc {
          font-size: 12px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.55);
        }

        @media (max-width: 1000px) {
          .mdl-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .mdl-card, .mdl-wide { grid-column: span 1; }
          .mdl-wide .mdl-list { grid-template-columns: 1fr; }
        }
        @media (max-width: 620px) {
          .mdl-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
