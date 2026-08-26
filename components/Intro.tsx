"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MarkAnimated } from "./MarkAnimated";

/* Cortinilla de marca. Corta (1.8s) y nunca bloqueante a propósito:
   pointer-events apagados todo el tiempo y CUALQUIER interacción la
   descarta — un interstitial que no se puede saltar frente al CTA
   principal es justo la fricción que esta página existe para quitar. */
const DURATION_MS = 1800;

export function Intro() {
  const [visible, setVisible] = useState(true);
  const reducido = useReducedMotion();

  useEffect(() => {
    const dismiss = () => setVisible(false);
    const timer = window.setTimeout(dismiss, DURATION_MS);
    const events = ["pointerdown", "wheel", "keydown", "touchstart"] as const;
    events.forEach((e) =>
      window.addEventListener(e, dismiss, { passive: true, once: true })
    );
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, dismiss));
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          data-intro=""
          className="pointer-events-none fixed inset-0 z-80 flex flex-col items-center justify-center gap-7 bg-ground"
          style={{
            backgroundImage:
              "radial-gradient(760px 520px at 50% 42%, color-mix(in srgb, var(--color-boston-800) 88%, transparent), transparent 62%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.94 }}
            animate={{ scale: 1.04 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="animate-halo absolute top-1/2 left-1/2 -mt-24 -ml-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-boston-300)_30%,transparent),transparent_68%)] blur-2xl" />
            <MarkAnimated className="relative h-36 w-auto drop-shadow-2xl" />
          </motion.div>

          <div className="flex flex-col items-center gap-3.5">
            {/* letterSpacing no es una transformada, así que MotionConfig
                no la descarta sola: aquí se apaga a mano. */}
            <motion.span
              className="font-heading text-2xl tracking-[0.02em]"
              initial={
                reducido
                  ? { opacity: 0 }
                  : { opacity: 0, y: 8, letterSpacing: "0.18em" }
              }
              animate={
                reducido
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, letterSpacing: "0.02em" }
              }
              transition={{ duration: 0.55, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              AssetBase
            </motion.span>
            <span className="relative block h-px w-32 overflow-hidden bg-white/12">
              <span className="animate-scan absolute inset-0 bg-linear-to-r from-transparent via-boston-300 to-transparent" />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
