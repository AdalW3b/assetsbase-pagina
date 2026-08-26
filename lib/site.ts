/* Un solo dominio canónico, en un solo lugar.
   La auditoría encontró og:url apuntando a erp.assetbase.com.mx mientras
   el sitio se servía desde erp.assetbase.org — elige uno, redirige el
   resto con 301, y deja que layout, robots y sitemap lean de aquí.

   En Vercel basta con definir NEXT_PUBLIC_SITE_URL en el proyecto.

   El `||` no es `??` a propósito. Una variable declarada pero vacía —el caso
   normal cuando se crea en el panel de Vercel y se deja sin valor— no es
   `undefined`, así que `??` la deja pasar y `SITE` termina siendo "".
   `new URL("")` en el metadataBase de layout.tsx tira ERR_INVALID_URL y el
   build se cae entero. El `trim()` cubre la variante con espacios. */
const configurado = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export const SITE = configurado || "https://erp.assetbase.com.mx";
