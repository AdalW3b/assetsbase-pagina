import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { contact, getContent } from "@/lib/content";
import { routes, type Lang } from "@/lib/i18n";

/* Destino del formulario cuando el visitante NO tiene JavaScript.

   Con JS, DemoForm intercepta el envío y pinta la confirmación sin salir
   de la página; nadie llega aquí. Sin JS el navegador hace un POST nativo
   a /api/demo, y hasta ahora esa ruta contestaba JSON: el visitante veía
   {"ok":true} sobre fondo blanco. Ahora la ruta redirige (303) hacia acá,
   a la versión del idioma en el que se llenó el formulario.

   El estado viaja en la query porque un 303 no lleva cuerpo. */
export function ThanksPage({
  lang,
  estado,
}: {
  lang: Lang;
  estado?: string;
}) {
  const t = getContent(lang);
  const falló = estado === "error";

  return (
    <>
      <Header lang={lang} routeKey="thanks" />
      <main>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <section className="max-w-[54ch] pt-20 pb-16 sm:pt-28 sm:pb-24">
            {falló ? (
              <>
                <p className="font-heading text-[13px] tracking-[0.08em] text-accent uppercase">
                  {t.thanks.errorEyebrow}
                </p>
                <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.14]">
                  {t.thanks.errorHeading}
                </h1>
                <p className="mt-5 text-[16.5px] leading-[1.7] text-ink/80">
                  {t.thanks.errorBodyStart}{" "}
                  <strong>{t.thanks.errorBodyStrong}</strong>{" "}
                  {t.thanks.errorBodyEnd}
                </p>
              </>
            ) : (
              <>
                <p className="font-heading text-[13px] tracking-[0.08em] text-accent uppercase">
                  {t.thanks.okEyebrow}
                </p>
                <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.14]">
                  {t.thanks.okHeading}
                </h1>
                <p className="mt-5 text-[16.5px] leading-[1.7] text-ink/80">
                  {t.thanks.okBody}
                </p>
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-accent px-5 py-3 text-[15px] text-accent transition-colors hover:bg-accent/12 active:bg-accent/22"
              >
                {t.thanks.ctaWhatsapp}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="rounded-lg border border-white/16 px-5 py-3 text-[15px] transition-colors hover:bg-white/7 active:bg-white/14"
              >
                {contact.email}
              </a>
            </div>

            <p className="mt-7 text-[14.5px] leading-[1.7] text-ink-muted">
              <Link
                href={routes.home[lang]}
                className="border-b border-white/25 transition-colors hover:text-accent"
              >
                {t.thanks.back}
              </Link>
            </p>
          </section>

          <Footer lang={lang} />
        </div>
      </main>
    </>
  );
}
