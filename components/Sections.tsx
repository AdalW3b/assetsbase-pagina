import Image from "next/image";
import { painPoints, implementation, modules } from "@/lib/content";
import { Kicker, Reveal } from "./Reveal";

export function PainPoints() {
  return (
    <section className="pt-16 pb-5 sm:pt-24">
      <Reveal>
        <Kicker>El costo de no cambiar</Kicker>
        <h2 className="max-w-[22ch] text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
          Nadie compra un ERP. Se compra dejar de perder dinero en lo mismo.
        </h2>
      </Reveal>

      <div className="mt-11 grid gap-4 sm:grid-cols-2">
        {painPoints.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="h-full rounded-lg bg-surface p-6 ring-1 ring-hairline transition-all duration-200 hover:-translate-y-0.5 hover:ring-boston-600 [--color-accent:var(--color-accent-on-surface)]">
                <Icon size={20} className="mb-3.5 text-accent" aria-hidden="true" />
                <h3 className="mb-2 text-[19px] leading-7">{item.title}</h3>
                <p className="text-[15px] leading-[1.66] text-ink/80">{item.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Implementation() {
  return (
    <section id="implementacion" className="pt-16 pb-5 sm:pt-24">
      <div className="grid items-start gap-7 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Kicker>Implementación</Kicker>
          <h2 className="max-w-[22ch] text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
            Tres semanas, tres pasos, un responsable con nombre.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-[50ch] pt-1.5 text-[16.5px] leading-[1.7] text-ink/80">
            El riesgo de un ERP no es el precio, es quedarse a medias. Por eso la
            implementación no se cotiza aparte: es el producto. Firmas un plan
            con fechas, no una promesa.
          </p>
        </Reveal>
      </div>

      <div className="mt-13">
        {implementation.map((step, i) => (
          <Reveal key={step.week} delay={i * 0.06}>
            <div
              className={`grid items-baseline gap-x-6 gap-y-3 rounded-lg border-t border-hairline px-2 py-7.5 transition-colors hover:bg-surface hover:[--color-accent:var(--color-accent-on-surface)] lg:grid-cols-[110px_minmax(0,260px)_minmax(0,1fr)] lg:gap-x-15 lg:px-4.5 ${
                i === implementation.length - 1 ? "border-b" : ""
              }`}
            >
              <p className="font-heading m-0 text-sm leading-6 tracking-[0.05em] text-accent uppercase transition-colors tabular-nums">
                {step.week}
              </p>
              <h3 className="m-0 text-[22px] leading-[1.36]">{step.title}</h3>
              <p className="m-0 max-w-[52ch] text-[15px] leading-[1.66] text-ink/80">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Modules() {
  return (
    <section id="modulos" className="pt-16 pb-5 sm:pt-24">
      <Reveal>
        <Kicker>Módulos</Kicker>
      </Reveal>

      <div className="grid items-center gap-7 lg:grid-cols-2 lg:gap-18">
        <Reveal>
          <h2 className="max-w-[20ch] text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
            Un solo lugar donde el número es el número.
          </h2>
          <p className="mt-5.5 max-w-[46ch] text-[16.5px] leading-[1.7] text-ink/80">
            Los módulos comparten la misma base de datos, así que una venta
            descuenta inventario, genera la factura timbrada y aparece en el
            estado de resultados sin que nadie capture nada dos veces.
          </p>
          <a
            href="#demo"
            className="mt-6 inline-block border-b border-accent/40 pb-0.5 text-[15.5px] text-accent transition-colors hover:border-accent"
          >
            Ver el sistema en una demo →
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="m-0 overflow-hidden rounded-xl bg-surface ring-1 ring-hairline shadow-[0_18px_44px_rgba(0,0,0,0.46)]">
            {/* Swap for a real report capture: public/producto-reporte.png */}
            <div className="relative aspect-16/10 w-full bg-recess">
              <Image
                src="/producto-reporte.png"
                alt="Reporte de inventario y ventas generado por AssetBase"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </figure>
        </Reveal>
      </div>

      <div className="mt-14">
        {modules.map((mod, i) => (
          <Reveal key={mod.n} delay={i * 0.05}>
            <div
              className={`grid items-baseline gap-x-6 gap-y-3 rounded-lg border-t border-hairline px-2 py-7 transition-colors hover:bg-surface hover:[--color-accent:var(--color-accent-on-surface)] lg:grid-cols-[78px_minmax(0,250px)_minmax(0,1fr)] lg:gap-x-15 lg:px-4.5 ${
                i === modules.length - 1 ? "border-b" : ""
              }`}
            >
              <p className="font-heading m-0 text-[15px] leading-6.5 text-accent transition-colors tabular-nums">
                {mod.n}
              </p>
              <h3 className="m-0 text-[22px] leading-[1.36]">{mod.title}</h3>
              <p className="m-0 max-w-[52ch] text-[15px] leading-[1.66] text-ink/80">
                {mod.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
