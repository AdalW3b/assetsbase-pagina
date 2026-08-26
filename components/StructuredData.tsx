import { contact, getContent } from "@/lib/content";
import { htmlLang, routes, type Lang } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/* Datos estructurados. Sin esto Google no tiene de dónde sacar el panel de
   la organización ni los desplegables de preguntas frecuentes en resultados
   de búsqueda — y esta página vive de búsqueda.

   La Organization es la misma entidad en los dos idiomas y comparte @id: no
   son dos empresas. Lo que cambia por idioma es el WebSite, la descripción
   y las preguntas, porque son lo que se indexa por separado. */
export function StructuredData({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  const url = `${SITE}${routes.home[lang]}`.replace(/\/$/, "") || SITE;

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organizacion`,
        name: "AssetBase ERP",
        url: SITE,
        logo: `${SITE}/assetbase-logo.svg`,
        email: contact.email,
        telephone: contact.phoneHref.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          addressLocality: t.contact.city,
          addressRegion: "CDMX",
          addressCountry: "MX",
        },
        areaServed: { "@type": "Country", name: t.meta.areaServed },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#sitio`,
        url,
        name: "AssetBase ERP",
        inLanguage: htmlLang[lang],
        publisher: { "@id": `${SITE}/#organizacion` },
      },
      {
        "@type": "SoftwareApplication",
        name: "AssetBase ERP",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: htmlLang[lang],
        publisher: { "@id": `${SITE}/#organizacion` },
        description: t.meta.organizationDescription,
        /* Solo se publican los planes con precio real. Mientras `price`
           siga siendo "$X,XXX" no se emite una oferta con precio falso. */
        offers: t.pricing.plans
          .filter((plan) => /\d/.test(plan.price))
          .map((plan) => ({
            "@type": "Offer",
            name: plan.name,
            price: plan.price.replace(/[^\d.]/g, ""),
            priceCurrency: "MXN",
            category: "SubscriptionService",
          })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#preguntas`,
        inLanguage: htmlLang[lang],
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo) }}
    />
  );
}
