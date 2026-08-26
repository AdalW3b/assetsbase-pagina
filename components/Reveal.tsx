"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* Scroll-in reveal. One shared primitive so every section animates the
   same way, and a no-op when the visitor asked for reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      /* el fallback <noscript> de layout.tsx engancha aqui: sin JS estos
         nodos se quedarian en opacity:0 y la pagina saldria en blanco */
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* The section eyebrow: a solid 44px accent mark plus uppercase label. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-5">
      <span className="h-px w-11 flex-none bg-accent" />
      <span className="text-[13px] tracking-[0.06em] text-accent uppercase">
        {children}
      </span>
    </div>
  );
}
