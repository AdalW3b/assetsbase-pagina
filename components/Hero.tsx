import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { HeroBackdrop } from "./HeroBackdrop";
import { Reveal } from "./Reveal";
import { Mark } from "./Mark";
import { ACTIVE_WEDGE, contact, heroChips, wedges } from "@/lib/content";

export function Hero() {
  const { headline, sub } = wedges[ACTIVE_WEDGE];

  return (
    <section
      id="inicio"
      className="relative grid items-center gap-9 py-14 sm:py-20 lg:grid-cols-2 lg:gap-18 lg:py-24"
    >
      <HeroBackdrop />

      <div className="relative z-1">
        <Reveal>
          <h1 className="-ml-[0.05em] text-[clamp(2.375rem,4.6vw,3.875rem)] leading-[1.08]">
            {headline}
          </h1>
          <p className="mt-6 max-w-[50ch] text-lg leading-[1.62] text-ink/85">
            {sub}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <a
              href="#demo"
              className="rounded-lg border border-accent px-5.5 py-3 text-[15px] text-accent transition-colors hover:bg-accent/12 active:bg-accent/22"
            >
              Agenda una demo de 20 minutos
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-[15px] text-accent transition-colors hover:bg-accent/10 active:bg-accent/18"
            >
              <MessageCircle size={17} aria-hidden="true" />
              O escríbenos por WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-6.5 flex flex-wrap gap-2.5">
            {heroChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-surface px-3 py-1.5 text-[13px] ring-1 ring-hairline"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="relative z-1">
        <figure className="m-0">
          <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-hairline shadow-[0_24px_60px_rgba(0,0,0,0.5)] [--color-accent:var(--color-accent-on-surface)]">
            <div className="flex items-center gap-2.5 border-b border-hairline px-3.5 py-2.5">
              <Mark className="h-4 w-auto" />
              <span className="text-[12.5px] text-ink-muted">
                Panel de dirección · Agosto
              </span>
              <span className="ml-auto text-[11px] tracking-[0.06em] text-accent uppercase">
                En vivo
              </span>
            </div>
            {/* Swap for a real product capture: public/producto-panel.png */}
            <div className="relative aspect-16/11 w-full bg-recess">
              <Image
                src="/producto-panel.png"
                alt="Panel principal de AssetBase con los indicadores del mes"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <figcaption className="mt-3 text-[12.5px] text-ink-muted">
            Cifras reales, actualizadas en el momento en que se registra el
            movimiento.
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
