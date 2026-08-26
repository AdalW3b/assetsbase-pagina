import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact, getContent } from "@/lib/content";
import { routes } from "@/lib/i18n";

/* Sin este archivo el 404 sale con la pantalla genérica de Next: sin
   marca, sin header y sin ninguna salida hacia la demo.

   Vive en el grupo (es) y sale en español: una dirección que no existe no
   trae idioma consigo, y el español es el mercado primario. El botón de
   idioma sigue ahí para quien llegó buscando la versión en inglés. */

const t = getContent("es");

export const metadata: Metadata = {
  title: t.notFound.title,
  robots: { index: false, follow: false },
};

export default function NoEncontrada() {
  return (
    <>
      <Header lang="es" routeKey="home" />
      <main>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <section className="max-w-[52ch] pt-20 pb-16 sm:pt-28 sm:pb-24">
            <p className="font-heading text-[13px] tracking-[0.08em] text-accent uppercase">
              {t.notFound.eyebrow}
            </p>
            <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.14]">
              {t.notFound.heading}
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.7] text-ink/80">
              {t.notFound.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link
                href="/#demo"
                className="rounded-lg border border-accent px-5 py-3 text-[15px] text-accent transition-colors hover:bg-accent/12 active:bg-accent/22"
              >
                {t.notFound.ctaDemo}
              </Link>
              <Link
                href={routes.home.es}
                className="rounded-lg border border-white/16 px-5 py-3 text-[15px] transition-colors hover:bg-white/7 active:bg-white/14"
              >
                {t.notFound.ctaHome}
              </Link>
            </div>

            <p className="mt-7 text-[14.5px] leading-[1.7] text-ink-muted">
              {t.notFound.contactNote}{" "}
              <a
                href={`mailto:${contact.email}`}
                className="border-b border-accent/40 text-accent"
              >
                {contact.email}
              </a>
              .
            </p>
          </section>

          <Footer lang="es" />
        </div>
      </main>
    </>
  );
}
