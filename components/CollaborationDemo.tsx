"use client";

import { useRef, useState } from "react";
import { withBasePath } from "@/lib/assets";

/**
 * Real-time collaboration demo: named cursors flying in over a canvas, with a
 * "You" bubble tracking the pointer.
 *
 * Lifted out of the Workflows page's BentoSection so the Enterprise and
 * Business pages can use it in place of the illustrated collaboration panel
 * that stood there before. Both surfaces render this one component.
 *
 * The canvas stays dark wherever it sits. On the Workflows page that matches
 * the page; inside a light bento tile it reads as an inset screen, the same
 * way the Models panel does. Retinting it light would have meant re-picking
 * four cursor colours that are already legible against it.
 */
const CURSORS = [
  { name: "Nima", color: "#7B9EFF", x: "16%", y: "32%", enter: "translateY(-60px)" },
  { name: "Sophia", color: "#F47A7A", x: "78%", y: "26%", enter: "translateX(60px)" },
  { name: "Bogdan", color: "#5CB8FF", x: "70%", y: "70%", enter: "translateX(60px)" },
  { name: "Francisco", color: "#F5C06A", x: "20%", y: "70%", enter: "translateX(-60px)" },
];

export function CollaborationDemo() {
  const [hovered, setHovered] = useState(false);
  const youBubbleRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const b = youBubbleRef.current;
    if (!b) return;
    const rect = e.currentTarget.getBoundingClientRect();
    b.style.left = `${e.clientX - rect.left + 14}px`;
    b.style.top = `${e.clientY - rect.top + 6}px`;
  }

  return (
    <div
      className="collab-demo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
    >
      <span className="collab-dots" aria-hidden />

      {/* The canvas the team is working on. A real ImagineArt output rather
          than the random picsum.photos placeholder this carried before. */}
      <div className="collab-canvas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath("/media/card-generate.jpg")} alt="" aria-hidden />
      </div>

      {CURSORS.map((c, i) => (
        <div
          key={c.name}
          className="collab-cursor"
          style={{
            left: c.x,
            top: c.y,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0,0)" : c.enter,
            transitionDelay: `${i * 65}ms`,
          }}
        >
          <svg width="18" height="22" viewBox="0 0 14 18" fill="none">
            <path d="M0 0L0 14L4 10.5L6.5 16L8 15.5L5.5 10L10.5 10Z" fill={c.color} />
          </svg>
          <span className="collab-name" style={{ background: c.color }}>
            {c.name}
          </span>
        </div>
      ))}

      <div
        ref={youBubbleRef}
        className="collab-you"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-hidden
      >
        <span>You</span>
      </div>

      <style>{`
        .collab-demo {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 220px;
          background: #0f0f13;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
        }
        .collab-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .collab-canvas {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 62%;
          aspect-ratio: 16 / 10;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .collab-canvas img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.65);
        }

        .collab-cursor {
          position: absolute;
          pointer-events: none;
          transition:
            opacity 420ms cubic-bezier(0.34, 1.56, 0.64, 1),
            transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .collab-name {
          display: inline-block;
          margin-top: 4px;
          margin-left: 4px;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
        }

        .collab-you {
          position: absolute;
          pointer-events: none;
          z-index: 20;
          transition: opacity 200ms ease;
        }
        .collab-you span {
          display: inline-block;
          background: #fff;
          color: #0a0a0b;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        }

        /* The fly-in is decorative; hold the cursors in place instead. */
        @media (prefers-reduced-motion: reduce) {
          .collab-cursor { transition: opacity 200ms ease; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
