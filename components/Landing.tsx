import { Intro } from "./Intro";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { LogoStrip } from "./LogoStrip";
import { StatBand } from "./StatBand";
import { PainPoints, Implementation, Modules } from "./Sections";
import { Comparison } from "./Comparison";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { DemoForm } from "./DemoForm";
import { Footer } from "./Footer";
import { StructuredData } from "./StructuredData";
import type { Lang } from "@/lib/i18n";

/* La landing completa, una sola vez para los dos idiomas.

   Section order follows how the buyer decides, not what we want to say:
   promise → proof → cost of staying → how it lands → what it does →
   how it compares → what it costs → objections → the one CTA. */
export function Landing({ lang }: { lang: Lang }) {
  return (
    <>
      <StructuredData lang={lang} />
      <Intro />
      <Header lang={lang} routeKey="home" />

      <main>
        {/* the hero's animated field bleeds off this gutter */}
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <Hero lang={lang} />
          <LogoStrip lang={lang} />
        </div>

        {/* full-bleed: the one saturated band on the page */}
        <StatBand lang={lang} />

        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <PainPoints lang={lang} />
          <Implementation lang={lang} />
          <Modules lang={lang} />
          <Comparison lang={lang} />
          <Pricing lang={lang} />
          <Faq lang={lang} />
          <DemoForm lang={lang} />
          <Footer lang={lang} />
        </div>
      </main>
    </>
  );
}
