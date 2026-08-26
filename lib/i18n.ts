/* Los dos idiomas del sitio y el mapa de rutas equivalentes entre ellos.

   El español vive en la raíz y el inglés bajo /en. Se eligió así para no
   mover ninguna URL existente: el trabajo del dominio canónico, el sitemap
   y cualquier enlace ya publicado siguen valiendo. */

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

/* Cada página traducida se declara aquí una sola vez. El botón de idioma,
   el sitemap y las etiquetas hreflang leen de este mapa, así que agregar
   una página nueva es agregar un renglón — no tocar tres archivos. */
export const routes = {
  home: { es: "/", en: "/en" },
  privacy: { es: "/aviso-de-privacidad", en: "/en/privacy" },
  terms: { es: "/terminos", en: "/en/terms" },
  thanks: { es: "/gracias", en: "/en/thank-you" },
} as const;

export type RouteKey = keyof typeof routes;

/* El valor del atributo lang de <html>. Cada idioma tiene su propio root
   layout (grupos de rutas), así que este valor se resuelve en el servidor
   y no depende de JavaScript. */
export const htmlLang: Record<Lang, string> = {
  es: "es-MX",
  en: "en",
};

/* og:locale usa guion bajo y región, no es lo mismo que el atributo lang. */
export const ogLocale: Record<Lang, string> = {
  es: "es_MX",
  en: "en_US",
};

export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es");

/* La ruta equivalente en el otro idioma, para el botón de cambio. */
export function switchPath(key: RouteKey, lang: Lang): string {
  return routes[key][otherLang(lang)];
}
