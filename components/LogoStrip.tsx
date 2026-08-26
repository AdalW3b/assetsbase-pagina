import Image from "next/image";
import { Reveal } from "./Reveal";
import { clients, getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

/* Social proof sits directly under the hero, not at the bottom of the page.
   Drop real client logos into public/clientes/ — or, until there is volume,
   replace this strip with ONE named case study and a real number.
   A single verifiable case beats six blurry logos, and it is honest for a
   company that is genuinely new. */
export function LogoStrip({ lang }: { lang: Lang }) {
  const t = getContent(lang);

  return (
    <Reveal>
      <div className="flex flex-wrap items-start gap-x-8 gap-y-3.5 pt-2 pb-12 sm:pb-20">
        <span className="flex-none pt-4.5 text-xs tracking-[0.07em] text-ink-muted uppercase">
          {t.logoStrip.label}
        </span>
        <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-4">
          {clients.map((client) => (
            <li key={client.name} className="relative h-12 w-33 opacity-70 transition-opacity hover:opacity-100">
              <Image
                src={client.src}
                alt={client.name}
                fill
                sizes="134px"
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
