import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact } from "@/lib/content";

/* Sin este archivo el 404 sale con la pantalla genérica de Next: sin
   marca, sin header y sin ninguna salida hacia la demo. */

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NoEncontrada() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <section className="max-w-[52ch] pt-20 pb-16 sm:pt-28 sm:pb-24">
            <p className="font-heading text-[13px] tracking-[0.08em] text-accent uppercase">
              Error 404
            </p>
            <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.14]">
              Esta página no existe.
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.7] text-ink/80">
              Puede que el enlace esté viejo o que la dirección tenga un error
              de dedo. Lo que buscas probablemente esté en la página principal
              — y si venías a ver el sistema, ese camino sigue abierto.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link
                href="/#demo"
                className="rounded-lg border border-accent px-5 py-3 text-[15px] text-accent transition-colors hover:bg-accent/12 active:bg-accent/22"
              >
                Agenda una demo de 20 minutos
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-white/16 px-5 py-3 text-[15px] transition-colors hover:bg-white/7 active:bg-white/14"
              >
                Ir al inicio
              </Link>
            </div>

            <p className="mt-7 text-[14.5px] leading-[1.7] text-ink-muted">
              ¿Buscabas algo en concreto? Escríbenos a{" "}
              <a
                href={`mailto:${contact.email}`}
                className="border-b border-accent/40 text-accent"
              >
                {contact.email}
              </a>
              .
            </p>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
