/* Un solo dominio canónico, en un solo lugar.
   La auditoría encontró og:url apuntando a erp.assetbase.com.mx mientras
   el sitio se servía desde erp.assetbase.org — elige uno, redirige el
   resto con 301, y deja que layout, robots y sitemap lean de aquí.

   En Vercel basta con definir NEXT_PUBLIC_SITE_URL en el proyecto. */
export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://erp.assetbase.com.mx";
