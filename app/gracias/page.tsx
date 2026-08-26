import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact } from "@/lib/content";

/* Destino del formulario cuando el visitante NO tiene JavaScript.

   Con JS, DemoForm intercepta el envío y pinta la confirmación sin salir
   de la página; nadie llega aquí. Sin JS el navegador hace un POST nativo
   a /api/demo, y hasta ahora esa ruta contestaba JSON: el visitante veía
   {"ok":true} sobre fondo blanco. Ahora la ruta redirige (303) hacia acá.

   El estado viaja en la query porque un 303 no lleva cuerpo. */

export const metadata: Metadata = {
  title: "Gracias",
  robots: { index: false, follow: false },
};

export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const falló = estado === "error";

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <section className="max-w-[54ch] pt-20 pb-16 sm:pt-28 sm:pb-24">
            {falló ? (
              <>
                <p className="font-heading text-[13px] tracking-[0.08em] text-accent uppercase">
                  No se registró
                </p>
                <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.14]">
                  No pudimos registrar tu solicitud.
                </h1>
                <p className="mt-5 text-[16.5px] leading-[1.7] text-ink/80">
                  Algo falló de nuestro lado, así que tu demo <strong>no</strong>{" "}
                  quedó agendada. No queremos que te vayas creyendo que sí:
                  escríbenos y lo resolvemos en el momento.
                </p>
              </>
            ) : (
              <>
                <p className="font-heading text-[13px] tracking-[0.08em] text-accent uppercase">
                  Solicitud recibida
                </p>
                <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.14]">
                  Listo, te confirmamos hoy mismo.
                </h1>
                <p className="mt-5 text-[16.5px] leading-[1.7] text-ink/80">
                  Revisa tu correo en las próximas horas: ahí llega el horario
                  y la liga de la sesión. Si prefieres adelantarlo, escríbenos
                  por WhatsApp y lo agendamos ahora mismo.
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
                Escribir por WhatsApp
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="rounded-lg border border-white/16 px-5 py-3 text-[15px] transition-colors hover:bg-white/7 active:bg-white/14"
              >
                {contact.email}
              </a>
            </div>

            <p className="mt-7 text-[14.5px] leading-[1.7] text-ink-muted">
              <Link href="/" className="border-b border-white/25 transition-colors hover:text-accent">
                Volver al inicio
              </Link>
            </p>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
