import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { getContent } from "@/lib/content";
import type { Lang, RouteKey } from "@/lib/i18n";

/* Envoltura de las páginas legales: mismo header y footer que la landing,
   con una columna de lectura estrecha y estilos de prosa locales — el
   proyecto no usa el plugin de tipografía.

   `routeKey` es lo que le permite al botón de idioma saltar a la MISMA
   página legal en el otro idioma, en vez de mandar al inicio. */
export function LegalShell({
  lang,
  routeKey,
  title,
  updated,
  children,
}: {
  lang: Lang;
  routeKey: RouteKey;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const t = getContent(lang);

  return (
    <>
      <Header lang={lang} routeKey={routeKey} />
      <main>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <article className="max-w-[68ch] pt-14 pb-16 sm:pt-20">
            <h1 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.14]">
              {title}
            </h1>
            <p className="mt-4 text-[13px] tracking-[0.05em] text-ink-muted uppercase">
              {t.legal.updated} {updated}
            </p>

            <div
              className="mt-10 text-[15.5px] leading-[1.75] text-ink/85 [&_a]:border-b [&_a]:border-accent/40 [&_a]:text-accent [&_h2]:mt-11 [&_h2]:mb-3.5 [&_h2]:text-[21px] [&_h2]:leading-[1.35] [&_li]:mb-2 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-5.5"
            >
              {children}
            </div>
          </article>

          <Footer lang={lang} />
        </div>
      </main>
    </>
  );
}
