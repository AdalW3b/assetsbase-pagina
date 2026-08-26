import Link from "next/link";
import { Languages } from "lucide-react";
import { getContent } from "@/lib/content";
import { otherLang, switchPath, type Lang, type RouteKey } from "@/lib/i18n";

/* El botón de idioma.

   Es un <Link> real a la ruta equivalente, no un interruptor de estado:
   así el visitante puede copiar la dirección y compartirla en el idioma
   que está viendo, y Google indexa las dos versiones por separado. Un
   toggle en cliente no permite ninguna de las dos cosas.

   `hrefLang` le dice al navegador y al buscador a qué idioma lleva el
   enlace — es la contraparte de las etiquetas alternate del layout.

   Nombra siempre el idioma AL QUE se va. Un botón que dice «Español»
   mientras estás leyendo en español no le dice nada a nadie. */
export function LanguageToggle({
  lang,
  routeKey,
  className = "",
}: {
  lang: Lang;
  routeKey: RouteKey;
  className?: string;
}) {
  const t = getContent(lang);
  const destino = switchPath(routeKey, lang);

  return (
    <Link
      href={destino}
      hrefLang={otherLang(lang)}
      aria-label={t.language.aria}
      className={`flex flex-none items-center gap-1.5 rounded-lg border border-white/16 px-2.5 py-2 text-[13px] tracking-[0.04em] text-ink-muted transition-colors hover:border-white/40 hover:text-ink ${className}`}
    >
      <Languages size={15} aria-hidden="true" />
      {t.language.switchTo}
    </Link>
  );
}
