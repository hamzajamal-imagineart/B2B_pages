"use client";
import { useEffect, useRef, useState } from "react";

const FONT = "var(--font-sans), sans-serif";

// Cycling placeholders — 4 inspirational example prompts
const PROMPTS = [
  "A cinematic product shot of a vintage Leica on cream silk…",
  "A 30-second brand spot for a sneaker launch, neon alley at dusk…",
  "Three poster variants for a coffee shop opening, mid-century modern…",
  "A photorealistic interior with morning light through linen curtains…",
];

// Starter chip pool — 4 random ones surface at a time, refreshable
const CHIP_POOL: { label: string; prompt: string }[] = [
  { label: "On-brand visuals", prompt: "Generate four on-brand social posts using our color palette and typography, editorial composition, soft natural light" },
  { label: "Product mockup",   prompt: "A photorealistic mockup of a flagship product on a marble surface, soft morning light, 1:1 and 9:16 variants" },
  { label: "Movie teaser",     prompt: "A 15-second cinematic teaser for a sci-fi short, neon-lit alley at night, anamorphic lens, slow camera push" },
  { label: "Music video",      prompt: "A dreamy slow-motion music video sequence, sunlit field at golden hour, drift focus, 30 seconds" },
  { label: "Brand campaign",   prompt: "A 6-asset brand launch: hero image, square post, story, plus three carousel cards, all on-brand" },
  { label: "Editorial shoot",  prompt: "Studio editorial portrait, three lighting variations (high-key, low-key, gel), magazine-quality finish" },
  { label: "Poster set",       prompt: "Three minimalist event posters, mid-century modern typography, complementary color story" },
  { label: "Lookbook",         prompt: "An 8-page fashion lookbook, autumn collection, urban location at golden hour, natural light" },
  { label: "Ad creative",      prompt: "Five platform-ready ad creatives at 1:1, 9:16 and 16:9, same product, varied compositions and copy" },
  { label: "Storyboard",       prompt: "Twelve-frame storyboard for a 30-second commercial, kid waking up in a space station" },
  { label: "Logo concept",     prompt: "Three logo direction concepts for a craft coffee brand, monogram-led, restrained palette" },
  { label: "Website hero",     prompt: "A web hero illustration set, abstract geometry, soft gradients, three color variants" },
];

function pickRandomChips(exclude: string[] = []) {
  const available = CHIP_POOL.filter((c) => !exclude.includes(c.label));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

const TYPE_MS = 36;        // ms per character while typing
const DELETE_MS = 18;      // ms per character while deleting (faster than typing)
const HOLD_MS = 2200;      // pause once a prompt is fully typed
const NEXT_DELAY_MS = 240; // brief pause between deleting and starting the next prompt

export default function HeroPromptBox() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [chips, setChips] = useState(() => pickRandomChips());
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Typewriter: types each char, holds, deletes, advances to next prompt. Pauses
  // automatically while the user is focused or has typed something.
  useEffect(() => {
    if (focused || value) return;
    const target = PROMPTS[idx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else {
      // deleting
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_MS);
      } else {
        timer = setTimeout(() => {
          setIdx((i) => (i + 1) % PROMPTS.length);
          setPhase("typing");
        }, NEXT_DELAY_MS);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, idx, focused, value]);

  function submit() {
    // TODO: route to /editor?prompt=… once the editor route exists.
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function applyChip(prompt: string) {
    setValue(prompt);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function refreshChips() {
    setChips((prev) => pickRandomChips(prev.map((c) => c.label)));
  }

  const showPlaceholder = !value && !focused;

  return (
    <form
      onSubmit={onSubmit}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 760,
        marginInline: "auto",
      }}
    >
      <style>{`
        .hpb-input::placeholder { color: transparent; }
        .hpb-caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: rgba(10,10,11,0.55);
          margin-left: 2px;
          vertical-align: -2px;
          animation: hpb-blink 0.9s steps(1, end) infinite;
        }
        @keyframes hpb-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .hpb-input::-webkit-scrollbar { width: 6px; }
        .hpb-input::-webkit-scrollbar-track { background: transparent; }
        .hpb-input::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.18); border-radius: 3px; }
        .hpb-input:focus { outline: none; }

        @keyframes hpb-halo {
          0%, 100% {
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.9),
              inset 0 0 0 1px rgba(255,255,255,0.55),
              0 0 0 1px rgba(255,255,255,0.06),
              0 0 80px rgba(160,180,255,0.08),
              0 0 180px rgba(120,140,255,0.05),
              0 36px 110px rgba(0,0,0,0.55),
              0 10px 28px rgba(0,0,0,0.28);
          }
          50% {
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.9),
              inset 0 0 0 1px rgba(255,255,255,0.55),
              0 0 0 1px rgba(255,255,255,0.08),
              0 0 100px rgba(170,190,255,0.12),
              0 0 220px rgba(130,150,255,0.07),
              0 40px 120px rgba(0,0,0,0.58),
              0 12px 32px rgba(0,0,0,0.30);
          }
        }

        .hpb-wrap {
          position: relative;
          border-radius: 22px;
          background: rgba(255,255,255,0.97);
          border: 1px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(18px) saturate(1.2);
          -webkit-backdrop-filter: blur(18px) saturate(1.2);
          text-align: left;
          animation: hpb-halo 6s ease-in-out infinite;
          transition: border-color 220ms ease, background 220ms ease, transform 260ms cubic-bezier(0.22,1,0.36,1);
        }
        .hpb-wrap:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.985);
          transform: translateY(-1px);
        }
        .hpb-wrap[data-focused="true"] {
          border-color: rgba(255,255,255,0.5);
          background: #fff;
          transform: translateY(-2px);
          animation: none;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.95),
            inset 0 0 0 1px rgba(255,255,255,0.7),
            0 0 0 4px rgba(180,200,255,0.12),
            0 0 80px rgba(170,190,255,0.22),
            0 0 220px rgba(130,150,255,0.14),
            0 44px 130px rgba(0,0,0,0.6),
            0 14px 36px rgba(0,0,0,0.32);
        }

        .hpb-submit {
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, opacity 180ms ease;
        }
        .hpb-submit:hover {
          transform: scale(1.06);
          box-shadow: 0 8px 24px rgba(0,0,0,0.28);
        }
        .hpb-submit:active { transform: scale(0.97); }

        .hpb-chip {
          font-family: ${FONT};
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 8px 16px;
          cursor: pointer;
          letter-spacing: -0.01em;
          white-space: nowrap;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 200ms ease, border-color 200ms ease, color 200ms ease, transform 180ms ease;
        }
        .hpb-chip:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.24);
          color: #fff;
        }
        .hpb-chip:active { transform: scale(0.97); }

        .hpb-chip-icon {
          width: 36px;
          height: 36px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .hpb-chip-icon svg {
          transition: transform 480ms cubic-bezier(0.34,1.56,0.64,1);
        }
        .hpb-chip-icon:hover svg {
          transform: rotate(-220deg);
        }
      `}</style>

      {/* Box */}
      <div className="hpb-wrap" data-focused={focused}>
        <textarea
          ref={inputRef}
          className="hpb-input"
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          aria-label="Describe what you want to create"
          autoComplete="off"
          spellCheck={false}
          style={{
            width: "100%",
            padding: "12px 22px 56px",
            background: "transparent",
            border: "none",
            color: "#0a0a0b",
            fontFamily: FONT,
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            caretColor: "rgba(10,10,11,0.85)",
            resize: "none",
            display: "block",
            boxSizing: "border-box",
            maxHeight: 220,
            overflow: "auto",
          }}
        />

        {/* Top-left typewriter placeholder */}
        {showPlaceholder && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 12,
              left: 22,
              right: 22,
              pointerEvents: "none",
              fontFamily: FONT,
              fontSize: 16,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              color: "rgba(10,10,11,0.42)",
            }}
          >
            {displayed}
            <span className="hpb-caret" />
          </div>
        )}

        {/* Bottom-right circular submit button (up-arrow per screenshot) */}
        <button
          type="submit"
          aria-label="Generate"
          className="hpb-submit"
          style={{
            position: "absolute",
            right: 14,
            bottom: 14,
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            background: value ? "#0a0a0b" : "rgba(10,10,11,0.78)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: value ? 1 : 0.92,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Starter chips row */}
      <div
        style={{
          marginTop: 18,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        {chips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => applyChip(chip.prompt)}
            className="hpb-chip"
          >
            {chip.label}
          </button>
        ))}
        <button
          type="button"
          onClick={refreshChips}
          aria-label="Shuffle suggestions"
          className="hpb-chip hpb-chip-icon"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 11-2.64-6.36L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
      </div>

      {/* Microcopy */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          fontFamily: FONT,
          fontSize: 12,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "-0.005em",
          textShadow: "0 1px 12px rgba(0,0,0,0.4)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <kbd
            style={{
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: 5,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            ⏎
          </kbd>
          to generate
        </span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
        {/* Was href="#templates" with a scrollIntoView to match. No element on
            this page ever carried id="templates", so both halves were no-ops:
            the anchor went nowhere and the query returned null. */}
        <a
          href="https://www.imagine.art/enterprise"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            transition: "color 180ms ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
        >
          or browse templates →
        </a>
      </div>
    </form>
  );
}
