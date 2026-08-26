import { Layers, ShieldCheck, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Lang } from "../i18n";
import { es, type Content } from "./es";
import { en } from "./en";

export type { Content };

/* El diccionario. `en` está tipado como `Content`, que es `typeof es`, así
   que una llave faltante o sobrante en la traducción rompe el build en vez
   de salir a producción como un hueco en la página. */
const diccionario: Record<Lang, Content> = { es, en };

export function getContent(lang: Lang): Content {
  return diccionario[lang];
}

/* ─────────────────────────────────────────────────────────────
   Lo que NO es texto vive aquí: es igual en los dos idiomas y
   duplicarlo por idioma solo abriría la puerta a que se
   desincronice.
   ───────────────────────────────────────────────────────────── */

/* La ciudad sí se traduce y vive en el contenido: contact.city. */
export const contact = {
  phone: "56 6601 0033",
  phoneHref: "tel:+525666010033",
  email: "hola@assetbase.com.mx",
  whatsapp: "https://wa.me/525666010033",
};

/* Los valores que el <select> de usuarios envía al servidor. NO se traducen:
   la ruta /api/demo los valida contra esta misma lista y son los que quedan
   escritos en el correo y en la hoja de Google. Traducirlos partiría el
   historial en dos formatos y rompería la validación del formulario inglés.
   Lo que sí cambia por idioma son las etiquetas: demo.form.userRanges. */
export const USER_RANGES = ["1 a 5", "6 a 20", "21 a 50", "Más de 50"];

/* Posición del rango preseleccionado dentro de USER_RANGES. */
export const USER_RANGE_DEFAULT = 1;

export type WedgeKey = keyof Content["wedges"];

/* Cuál de las tres cuñas de posicionamiento sale publicada. Es una decisión
   de negocio, no de diseño: cambia el titular del hero en los dos idiomas. */
export const ACTIVE_WEDGE: WedgeKey = "fiscal+plazo";

/* Los iconos de la sección de dolor, en el mismo orden que `pain.items`.
   Van por posición: si agregas un dolor, agrega su icono aquí. */
export const painIcons: LucideIcon[] = [Layers, TrendingUp, Users, ShieldCheck];

/* Logos de clientes. Sustituir por los reales — o, mientras no haya
   volumen, cambiar la franja por UN caso con nombre y una cifra
   verificable, que es más creíble y es honesto. */
export const clients = [
  { name: "Cliente 1", src: "/clientes/cliente-1.png" },
  { name: "Cliente 2", src: "/clientes/cliente-2.png" },
  { name: "Cliente 3", src: "/clientes/cliente-3.png" },
  { name: "Cliente 4", src: "/clientes/cliente-4.png" },
];
