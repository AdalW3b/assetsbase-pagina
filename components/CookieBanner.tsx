"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  GA_ID,
  guardarConsentimiento,
  leerConsentimiento,
} from "@/lib/analytics";

/* La banda de consentimiento.

   Aparece solo si hay analítica configurada y el visitante no ha decidido
   todavía. Deliberadamente discreta y abajo: es una landing de conversión
   y un modal a pantalla completa frente al CTA principal es exactamente la
   fricción que el resto de la página existe para quitar.

   "Rechazar" tiene el mismo peso visual que "Aceptar". Un rechazo
   escondido no es consentimiento, y la LFPDPPP pide una vía real de
   oposición — no una decorativa. */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    /* Se decide después de montar: en el HTML del servidor no existe el
       localStorage y la banda saldría siempre, incluso para quien ya
       aceptó, hasta que hidratara. */
    if (leerConsentimiento() === null) setVisible(true);
  }, []);

  function decidir(valor: "otorgado" | "rechazado") {
    guardarConsentimiento(valor);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de analítica"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/12 bg-ground/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:px-16">
        <p className="flex-1 text-[13.5px] leading-[1.62] text-ink/85">
          Usamos cookies de analítica para saber qué partes de esta página
          sirven y cuáles no. Nada de publicidad ni de seguimiento entre
          sitios. Puedes rechazarlas y la página funciona igual —{" "}
          <Link
            href="/aviso-de-privacidad"
            className="border-b border-accent/40 text-accent"
          >
            aviso de privacidad
          </Link>
          .
        </p>

        <div className="flex flex-none gap-2.5">
          <button
            type="button"
            onClick={() => decidir("rechazado")}
            className="min-h-9.5 flex-1 rounded-lg border border-white/16 px-4 text-[13.5px] transition-colors hover:bg-white/7 active:bg-white/14 lg:flex-none"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => decidir("otorgado")}
            className="min-h-9.5 flex-1 rounded-lg border border-accent px-4 text-[13.5px] text-accent transition-colors hover:bg-accent/12 active:bg-accent/22 lg:flex-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
