import type { ReactNode } from "react";
import { Analytics } from "./Analytics";
import { CookieBanner } from "./CookieBanner";
import { MotionProvider } from "./MotionProvider";
import { fontVars } from "@/lib/fonts";
import { htmlLang, type Lang } from "@/lib/i18n";

/* El documento. Vive aquí y no en cada layout raíz porque hay dos —uno por
   idioma— y lo único que cambia entre ellos es el atributo lang. */
export function Shell({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <html lang={htmlLang[lang]} className={fontVars}>
      <body>
        <Analytics />
        {/* Sin JS, framer-motion deja 33 nodos en opacity:0 y la página sale
            en blanco detrás de la cortinilla de marca. Esto los devuelve. */}
        <noscript>
          <style>{`
            [data-reveal]{opacity:1!important;transform:none!important}
            [data-intro]{display:none!important}
          `}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        <CookieBanner lang={lang} />
      </body>
    </html>
  );
}
