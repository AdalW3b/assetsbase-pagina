"use client";

import { motion, useReducedMotion } from "framer-motion";

/* The animated field behind the hero.
   Bleeds off the page GUTTER, never `100vw` — 100vw includes the vertical
   scrollbar, which overshoots the document and produces a horizontal
   scrollbar. `overflow-hidden` clips the drifting blooms. */
export function HeroBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 -bottom-18 -left-5 -right-5 z-0 overflow-hidden sm:-left-8 sm:-right-8 lg:-left-16 lg:-right-16"
      style={{
        maskImage:
          "radial-gradient(120% 100% at 60% 40%, #000 38%, transparent 82%)",
        WebkitMaskImage:
          "radial-gradient(120% 100% at 60% 40%, #000 38%, transparent 82%)",
      }}
    >
      {/* dot lattice, slowly panning */}
      <span
        className={`absolute inset-0 opacity-50 ${reduced ? "" : "animate-grid"}`}
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--color-boston-200) 26%, transparent) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* three drifting blooms in Boston Blue steps */}
      <span
        className={`absolute -top-[18%] -right-[6%] h-[120%] w-[76%] max-h-[760px] max-w-[760px] rounded-full blur-[52px] ${
          reduced ? "" : "animate-drift-a"
        }`}
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-boston-400) 30%, transparent), transparent 66%)",
        }}
      />
      <span
        className={`absolute -bottom-[26%] -left-[10%] h-[110%] w-[66%] max-h-[660px] max-w-[660px] rounded-full blur-[58px] ${
          reduced ? "" : "animate-drift-b"
        }`}
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-boston-600) 42%, transparent), transparent 68%)",
        }}
      />
      <span
        className={`absolute top-[24%] left-[34%] h-[70%] w-[44%] max-h-[420px] max-w-[420px] rounded-full blur-[64px] ${
          reduced ? "" : "animate-drift-c"
        }`}
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-boston-200) 20%, transparent), transparent 70%)",
        }}
      />

      {/* a slow sheen crossing the field */}
      {!reduced && (
        <motion.span
          className="animate-scan absolute inset-x-0 h-[34%]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-boston-400) 10%, transparent), transparent)",
          }}
        />
      )}
    </div>
  );
}
