"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { Kicker } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="pt-16 pb-5 sm:pt-24">
      <div className="grid items-start gap-7 lg:grid-cols-[4fr_8fr] lg:gap-18">
        <div>
          <Kicker>Preguntas</Kicker>
          <h2 className="max-w-[16ch] text-[clamp(1.55rem,2.8vw,2.125rem)] leading-[1.2]">
            Lo que se pregunta antes de firmar
          </h2>
        </div>

        <div className="max-w-[64ch]">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`border-t border-hairline ${
                  i === faqs.length - 1 ? "border-b" : ""
                }`}
              >
                <button
                  type="button"
                  id={`faq-boton-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4.5 py-5.5 text-left transition-colors hover:text-accent"
                >
                  <span className="font-heading text-[18px] leading-[1.44]">
                    {item.q}
                  </span>
                  <span className="grid size-6.5 flex-none place-items-center rounded-full text-accent ring-1 ring-accent/45">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {/* El id vive en un contenedor que SIEMPRE esta en el DOM:
                    el panel animado se desmonta al cerrarse y el
                    aria-controls del boton apuntaba a un id inexistente. */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-boton-${i}`}
                >
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mb-6 max-w-[60ch] text-[15px] leading-[1.66] text-ink/80">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
