import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { StatBand } from "@/components/StatBand";
import { PainPoints, Implementation, Modules } from "@/components/Sections";
import { Comparison } from "@/components/Comparison";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { DemoForm } from "@/components/DemoForm";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

/* Section order follows how the buyer decides, not what we want to say:
   promise → proof → cost of staying → how it lands → what it does →
   how it compares → what it costs → objections → the one CTA. */
export default function Page() {
  return (
    <>
      <StructuredData />
      <Intro />
      <Header />

      <main>
        {/* the hero's animated field bleeds off this gutter */}
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <Hero />
          <LogoStrip />
        </div>

        {/* full-bleed: the one saturated band on the page */}
        <StatBand />

        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
          <PainPoints />
          <Implementation />
          <Modules />
          <Comparison />
          <Pricing />
          <Faq />
          <DemoForm />
          <Footer />
        </div>
      </main>
    </>
  );
}
