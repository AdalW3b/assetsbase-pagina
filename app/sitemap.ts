import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: `${SITE}/`, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/aviso-de-privacidad`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terminos`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
  ];
}
