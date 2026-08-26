import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { Kicker, Reveal } from "./Reveal";

export function Pricing({ lang }: { lang: Lang }) {
  const t = getContent(lang);

  return (
    <section id="precio" className="pt-16 pb-5 sm:pt-24">
      <Reveal>
        <Kicker>{t.pricing.kicker}</Kicker>
        <h2 className="max-w-[24ch] text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
          {t.pricing.heading}
        </h2>
        <p className="mt-5.5 max-w-[50ch] text-[16.5px] leading-[1.7] text-ink/80">
          {t.pricing.lead}
        </p>
      </Reveal>

      <div className="mt-11 grid items-start gap-4 lg:grid-cols-3">
        {t.pricing.plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.07}>
            <article
              className={`flex h-full flex-col rounded-lg bg-surface p-6.5 transition-all duration-200 hover:-translate-y-0.5 [--color-accent:var(--color-accent-on-surface)] ${
                plan.featured
                  ? "ring-2 ring-boston-400 shadow-[0_10px_28px_rgba(0,0,0,0.4)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                  : "ring-1 ring-hairline hover:ring-boston-600"
              }`}
            >
              <span
                className={`text-[11px] tracking-[0.1em] uppercase ${
                  plan.featured ? "text-accent" : "text-ink-muted"
                }`}
              >
                {plan.kicker}
              </span>
              <h3 className="mt-2 text-xl leading-[1.2]">{plan.name}</h3>
              <p className="font-heading mt-4.5 mb-1 text-[2rem] leading-[1.1]">
                {plan.price}
                {plan.unit && (
                  <span className="ml-1 text-[15px] text-ink-muted">{plan.unit}</span>
                )}
              </p>
              <p className="mb-4.5 text-[13px] leading-[1.62] text-ink-muted">
                {plan.seats}
              </p>
              <p className="mb-5.5 flex-1 text-[14.5px] leading-[1.66] text-ink/80">
                {plan.body}
              </p>
              <a
                href="#demo"
                className={`block rounded-lg border px-4 py-2.5 text-center text-sm transition-colors ${
                  plan.featured
                    ? "border-accent text-accent hover:bg-accent/12 active:bg-accent/22"
                    : "border-white/16 text-ink hover:bg-white/7 active:bg-white/14"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-4.5 text-[13px] leading-[1.7] text-ink-muted">
        {t.pricing.note}
      </p>
    </section>
  );
}
