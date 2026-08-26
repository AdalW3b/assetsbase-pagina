"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/* El bloque @media (prefers-reduced-motion) de globals.css apaga las
   animaciones y transiciones de CSS — pero framer-motion no anima con CSS,
   anima por JS, así que la cortinilla de entrada y el imagotipo seguían
   moviéndose para quien pidió lo contrario.

   `reducedMotion="user"` cubre a TODO `motion.*` del árbol de una vez,
   incluido lo que se agregue después: descarta transformadas y layout, y
   deja pasar opacidad y color. Los componentes que además quieran
   apagarse por completo siguen usando useReducedMotion(). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
