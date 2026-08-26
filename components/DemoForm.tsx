"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contact, demoSteps } from "@/lib/content";
import { registrarLead } from "@/lib/analytics";

/* La única conversión de la página. Cinco campos, confirmación en el acto.
   Los campos bajan a boston-950 mientras el panel se queda en boston-800 —
   en tema oscuro un campo y su contenedor NO pueden compartir el mismo
   token, o se funden en un solo rectángulo plano.

   El envío va a /api/demo. Si la entrega falla el visitante ve el error y
   una salida por WhatsApp, nunca una confirmación falsa. El `action` y el
   `method` del <form> no son decorativos: sin JS el navegador hace el POST
   nativo y la ruta lo redirige a /gracias. */

type Estado = "listo" | "enviando" | "enviado" | "error";

/* Los nombres que devuelve la ruta en `campos` traducidos a lo que el
   visitante ve. Sin esto el 422 solo podía decir "revisa los campos" y
   dejar al visitante buscando cuál. */
const ETIQUETAS: Record<string, string> = {
  nombre: "el nombre",
  empresa: "la empresa",
  correo: "el correo",
  telefono: "el teléfono",
  usuarios: "el número de usuarios",
};

const ERROR_GENERICO = "No pudimos registrar tu solicitud.";

export function DemoForm() {
  const [estado, setEstado] = useState<Estado>("listo");
  const [mensaje, setMensaje] = useState(ERROR_GENERICO);
  const [campos, setCampos] = useState<string[]>([]);
  const confirmacionRef = useRef<HTMLHeadingElement>(null);

  /* Al confirmar, el panel entero se reemplaza y el foco quedaba huérfano
     en un botón que ya no existe: quien navega con teclado o lector de
     pantalla se quedaba sin saber que había pasado algo. */
  useEffect(() => {
    if (estado === "enviado") confirmacionRef.current?.focus();
  }, [estado]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    const datos = new FormData(e.currentTarget);
    setEstado("enviando");
    setCampos([]);

    try {
      const respuesta = await fetch("/api/demo", {
        method: "POST",
        body: datos,
        /* Es lo que distingue este envío del POST nativo sin JS: la ruta
           usa el Accept para decidir entre JSON y redirección. */
        headers: { accept: "application/json" },
      });

      if (respuesta.ok) {
        /* La conversión se marca aquí y no en /gracias: con JS el visitante
           nunca navega a esa página, así que medirla allá dejaría fuera a
           casi todos. El rango de usuarios viaja como parámetro porque es
           lo que separa un lead de cinco personas de uno de cincuenta. */
        registrarLead(String(datos.get("usuarios") ?? ""));
        setEstado("enviado");
        return;
      }

      const cuerpo = await respuesta.json().catch(() => null);
      setMensaje(cuerpo?.error ?? ERROR_GENERICO);
      setCampos(Array.isArray(cuerpo?.campos) ? cuerpo.campos : []);
      setEstado("error");
    } catch {
      setMensaje(ERROR_GENERICO);
      setEstado("error");
    }
  }

  const enviando = estado === "enviando";

  /* Un campo señalado por el servidor se marca en rojo y con aria-invalid;
     el resto conserva la línea neutra. */
  function claseCampo(nombre: string) {
    const base =
      "w-full min-h-10 rounded-lg border bg-recess px-2.5 py-1.5 text-sm text-ink placeholder:text-ink-muted/70 caret-accent transition-colors focus:border-accent focus-visible:outline-0 disabled:opacity-60";
    return campos.includes(nombre)
      ? `${base} border-red-400/70 hover:border-red-400`
      : `${base} border-white/16 hover:border-white/40`;
  }

  function invalido(nombre: string) {
    return campos.includes(nombre) ? true : undefined;
  }

  return (
    <section id="demo" className="pt-18 pb-12 sm:pt-28 sm:pb-20">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="max-w-[22ch] text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.12]">
            Veinte minutos y sales sabiendo si te sirve.
          </h2>
          <p className="mt-5.5 max-w-[46ch] text-[16.5px] leading-[1.7] text-ink/80">
            Te atiende un especialista en operación, no un vendedor con un
            guion, y te mostramos el sistema con datos parecidos a los tuyos.
          </p>

          <ol className="mt-9 flex flex-col gap-5">
            {demoSteps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3.5">
                <span className="font-heading grid size-6.5 flex-none place-items-center rounded-full text-[12.5px] text-accent ring-1 ring-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base leading-6">{step.title}</h3>
                  <p className="text-[14.5px] leading-[1.6] text-ink-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <form
          onSubmit={onSubmit}
          method="post"
          action="/api/demo"
          noValidate={false}
          className="relative rounded-xl bg-surface p-5.5 ring-1 ring-hairline shadow-[0_18px_44px_rgba(0,0,0,0.44)] sm:p-8 [--color-accent:var(--color-accent-on-surface)]"
        >
          <div aria-live="polite">
            {estado === "enviado" && (
              <div className="py-10 text-center">
                <h3
                  ref={confirmacionRef}
                  tabIndex={-1}
                  className="text-xl focus-visible:outline-0"
                >
                  Listo, te confirmamos hoy mismo.
                </h3>
                <p className="mt-3 text-[15px] leading-[1.66] text-ink/80">
                  Revisa tu correo. Si prefieres adelantar, escríbenos por
                  WhatsApp y lo agendamos ahora.
                </p>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-lg border border-accent px-4 py-2.5 text-sm text-accent transition-colors hover:bg-accent/12"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            )}
          </div>

          {estado !== "enviado" && (
            <>
              <h3 className="text-xl leading-[1.25]">Agenda tu demo</h3>
              <p className="mt-1.5 mb-5.5 text-sm leading-[1.6] text-ink-muted">
                Cinco campos. Te confirmamos el mismo día.
              </p>

              <fieldset disabled={enviando} className="contents">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="mb-1.5 block text-xs text-ink/70">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      minLength={2}
                      autoComplete="name"
                      placeholder="Tu nombre"
                      aria-invalid={invalido("nombre")}
                      className={claseCampo("nombre")}
                    />
                  </div>
                  <div>
                    <label htmlFor="empresa" className="mb-1.5 block text-xs text-ink/70">
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      required
                      minLength={2}
                      autoComplete="organization"
                      placeholder="Razón social o marca"
                      aria-invalid={invalido("empresa")}
                      className={claseCampo("empresa")}
                    />
                  </div>
                  <div>
                    <label htmlFor="correo" className="mb-1.5 block text-xs text-ink/70">
                      Correo
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      placeholder="tu@empresa.com"
                      aria-invalid={invalido("correo")}
                      className={claseCampo("correo")}
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="mb-1.5 block text-xs text-ink/70">
                      Teléfono o WhatsApp{" "}
                      <span className="text-ink-muted">(opcional)</span>
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="55 0000 0000"
                      aria-invalid={invalido("telefono")}
                      aria-describedby="telefono-ayuda"
                      className={claseCampo("telefono")}
                    />
                    <p id="telefono-ayuda" className="mt-1.5 text-[11.5px] text-ink-muted">
                      A diez dígitos, con lada.
                    </p>
                  </div>
                </div>

                <div className="mt-3.5">
                  <label htmlFor="usuarios" className="mb-1.5 block text-xs text-ink/70">
                    ¿Cuántas personas usarían el sistema?
                  </label>
                  <select
                    id="usuarios"
                    name="usuarios"
                    defaultValue="6 a 20"
                    aria-invalid={invalido("usuarios")}
                    className={claseCampo("usuarios")}
                  >
                    <option>1 a 5</option>
                    <option>6 a 20</option>
                    <option>21 a 50</option>
                    <option>Más de 50</option>
                  </select>
                </div>

                {/* Trampa para bots: fuera de pantalla y fuera del orden de tabulación. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="empresa_extra">No llenar</label>
                  <input id="empresa_extra" name="empresa_extra" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  className="mt-5.5 min-h-10.5 w-full rounded-lg border border-accent text-sm text-accent transition-colors hover:bg-accent/12 active:bg-accent/22 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {enviando ? "Enviando…" : "Agendar mi demo de 20 minutos"}
                </button>
              </fieldset>

              {estado === "error" && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-white/16 bg-recess px-3.5 py-3 text-[13.5px] leading-[1.6] text-ink/85"
                >
                  {mensaje}
                  {campos.length > 0 && (
                    <>
                      {" "}
                      Revisa{" "}
                      {campos
                        .map((campo) => ETIQUETAS[campo] ?? campo)
                        .join(", ")
                        .replace(/, ([^,]*)$/, " y $1")}
                      .
                    </>
                  )}
                  {campos.length === 0 && (
                    <>
                      {" "}
                      Escríbenos por{" "}
                      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="border-b border-accent/40 text-accent">
                        WhatsApp
                      </a>{" "}
                      o a{" "}
                      <a href={`mailto:${contact.email}`} className="border-b border-accent/40 text-accent">
                        {contact.email}
                      </a>{" "}
                      y lo agendamos ahora.
                    </>
                  )}
                </p>
              )}

              <p className="mt-4 text-center text-[13.5px] leading-[1.62] text-ink-muted">
                ¿Prefieres escribir primero?{" "}
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-accent/40 text-accent"
                >
                  Mándanos un WhatsApp
                </a>
              </p>
              <p className="mt-3.5 text-center text-[12.5px] leading-[1.6] text-ink-muted">
                Sin tarjeta y sin compromiso. Usamos tus datos solo para
                contactarte —{" "}
                <Link href="/aviso-de-privacidad" className="border-b border-white/25 transition-colors hover:text-accent">
                  aviso de privacidad
                </Link>
                .
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
