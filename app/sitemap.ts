import type { MetadataRoute } from "next";
import { LANGS, htmlLang, routes, type RouteKey } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/* Las páginas indexables, en los dos idiomas.

   Cada entrada declara además sus `alternates`: es la forma de decirle a
   Google que /  y  /en son la misma página en dos idiomas y no contenido
   duplicado. Sin esto, publicar una traducción puede costar posiciones en
   vez de ganarlas.

   /gracias y /en/thank-you quedan fuera a propósito: son noindex. */
const INDEXABLES: { key: RouteKey; prioridad: number; frecuencia: "monthly" | "yearly" }[] = [
  { key: "home", prioridad: 1, frecuencia: "monthly" },
  { key: "privacy", prioridad: 0.3, frecuencia: "yearly" },
  { key: "terms", prioridad: 0.3, frecuencia: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return INDEXABLES.flatMap(({ key, prioridad, frecuencia }) => {
    const languages: Record<string, string> = {};
    for (const l of LANGS) languages[htmlLang[l]] = `${SITE}${routes[key][l]}`;

    return LANGS.map((lang) => ({
      url: `${SITE}${routes[key][lang]}`,
      lastModified: ahora,
      changeFrequency: frecuencia,
      priority: prioridad,
      alternates: { languages },
    }));
  });
}
