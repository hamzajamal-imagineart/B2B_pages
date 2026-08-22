'use client';

import { useEffect, useRef } from 'react';

// The spotlight travels a smooth arc — rising from the lower-left, over the top
// center, and down to the lower-right (then back) — sweeping the area around
// the centered title and prompt box. Tune to taste.
const SPEED = 0.002; // radians advanced per frame — higher is faster
const X_LEFT = 0.06;
const X_RIGHT = 0.94;
const Y_BASE = 0.45; // arc endpoints (the lower-left / lower-right reach)
const Y_RISE = 0.44; // peak height — center y = Y_BASE - Y_RISE ≈ 0.18

/**
 * Drives a spotlight focal point — the `--glow-x` / `--glow-y` custom
 * properties (percentages) on the attached element — along a smooth arc across
 * the header's upper area. Desktop-only (matches the backdrop's
 * `desktop-sm:block`) and skipped under `prefers-reduced-motion`, leaving the
 * element's CSS-defined initial position in place.
 */
export const useWanderingGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(min-width: 80rem)').matches
    ) {
      return;
    }

    let elapsed = 0;
    let rafId = 0;

    const tick = () => {
      elapsed += SPEED;
      // Smooth 0→1→0 horizontal progress, with eased turnarounds at both ends.
      const progress = (1 - Math.cos(elapsed)) / 2;
      const x = X_LEFT + (X_RIGHT - X_LEFT) * progress;
      // A single hump → the arc peaks at the top center.
      const y = Y_BASE - Y_RISE * Math.sin(progress * Math.PI);
      element.style.setProperty('--glow-x', `${(x * 100).toFixed(2)}%`);
      element.style.setProperty('--glow-y', `${(y * 100).toFixed(2)}%`);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return ref;
};
