import { contact, faqs, plans } from "@/lib/content";
import { SITE } from "@/lib/site";

/* Datos estructurados. Sin esto Google no tiene de dónde sacar el panel de
   la organización ni los desplegables de preguntas frecuentes en resultados
   de búsqueda — y esta página vive de búsqueda. */
export function StructuredData() {
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
          addressLocality: contact.city,
          addressRegion: "CDMX",
          addressCountry: "MX",
        },
        areaServed: { "@type": "Country", name: "México" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#sitio`,
        url: SITE,
        name: "AssetBase ERP",
        inLanguage: "es-MX",
        publisher: { "@id": `${SITE}/#organizacion` },
      },
      {
        "@type": "SoftwareApplication",
        name: "AssetBase ERP",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "es-MX",
        publisher: { "@id": `${SITE}/#organizacion` },
        description:
          "Sistema ERP para PyME en México: finanzas, inventario, nómina y activos fijos en un solo sistema, con timbrado CFDI 4.0 nativo.",
        /* Solo se publican los planes con precio real. Mientras `price`
           siga siendo "$X,XXX" no se emite una oferta con precio falso. */
        offers: plans
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
        "@id": `${SITE}/#preguntas`,
        mainEntity: faqs.map((item) => ({
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
