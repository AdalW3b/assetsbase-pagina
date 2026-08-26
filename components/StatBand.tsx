import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/* The one saturated field on the page — presence at section scale.
   It sits on the lifted band (boston-700), so its inks are near-white. */
export function StatBand({ lang }: { lang: Lang }) {
  const t = getContent(lang);

  return (
    <section
      aria-label={t.stats.aria}
      className="bg-band py-14 sm:py-19"
      style={{
        backgroundImage:
          "radial-gradient(900px 420px at 85% -40%, color-mix(in srgb, var(--color-boston-600) 70%, transparent), transparent 64%)",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
        <dl className="grid grid-cols-2 gap-x-7 gap-y-10 lg:grid-cols-4">
          {t.stats.items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <dt className="font-heading -ml-[0.055em] text-[clamp(2rem,3.2vw,3rem)] leading-[1.1]">
                {stat.figure}
              </dt>
              <dd className="mt-3.5 ml-0 text-[13px] leading-5 tracking-[0.06em] text-ink/80 uppercase">
                {stat.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
