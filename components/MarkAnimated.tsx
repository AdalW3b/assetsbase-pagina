"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mark } from "./Mark";
import { MARK_LAYERS, MARK_VIEWBOX } from "@/lib/mark";

/* El imagotipo armándose capa por capa. Solo lo usa la cortinilla de
   entrada; el resto de la página usa <Mark>, que no carga framer-motion.

   Con prefers-reduced-motion cae al imagotipo estático: la construcción
   por capas es un desplazamiento vertical, justo lo que el visitante pidió
   no ver. MotionConfig ya quitaría la transformada, pero devolver <Mark>
   evita además montar cuatro nodos de motion para nada. */
export function MarkAnimated({ className = "h-6 w-auto" }: { className?: string }) {
  const reducido = useReducedMotion();

  if (reducido) return <Mark className={className} />;

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="none"
      role="img"
      aria-label="AssetBase"
      className={className}
    >
      {MARK_LAYERS.map((layer, i) => (
        <motion.path
          key={i}
          d={layer.d}
          fill={layer.fill}
          stroke={layer.stroke ? "var(--color-accent)" : undefined}
          strokeWidth={layer.stroke ? 2.5 : undefined}
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.05 + i * 0.12,
            ease: [0.34, 1.3, 0.5, 1],
          }}
        />
      ))}
    </svg>
  );
}
