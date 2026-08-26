import type { Metadata } from "next";
import { getContent } from "./content";
import { LANGS, htmlLang, ogLocale, routes, type Lang, type RouteKey } from "./i18n";
import { SITE } from "./site";

/* Los metadatos de las dos versiones se arman aquí para que no se
   desincronicen. Lo importante es `alternates`:

   - `canonical` le dice a Google cuál es la dirección buena de ESTA página.
   - `languages` emite las etiquetas hreflang que enlazan las dos versiones
     entre sí. Sin ellas Google puede leer la versión en inglés como
     contenido duplicado y quedarse solo con una — que es justo lo que se
     quiso evitar al darle URL propia a cada idioma.
   - `x-default` es a dónde mandar a quien no encaja en ningún idioma
     declarado. Apunta al español porque es el mercado primario. */
export function alternatesFor(key: RouteKey, lang: Lang): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[htmlLang[l]] = routes[key][l];
  languages["x-default"] = routes[key].es;

  return { canonical: routes[key][lang], languages };
}

/* Metadatos de la portada. Las páginas legales y las de gracias declaran
   los suyos, más cortos, en su propio archivo. */
export function homeMetadata(lang: Lang): Metadata {
  const t = getContent(lang);

  return {
    metadataBase: new URL(SITE),
    title: {
      default: t.meta.title,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: alternatesFor("home", lang),
    openGraph: {
      type: "website",
      url: `${SITE}${routes.home[lang]}`,
      siteName: "AssetBase ERP",
      locale: ogLocale[lang],
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}
