import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/Shell";
import { homeMetadata } from "@/lib/metadata";
import "../globals.css";

/* Layout raíz del español, que vive en la raíz del sitio.

   Hay dos layouts raíz —este y el de (en)— porque el atributo lang de
   <html> solo se puede fijar en un layout raíz, y tiene que ser distinto
   por idioma. Los grupos de rutas, (es) y (en), no aparecen en la URL.

   Efecto secundario que conviene conocer: navegar entre un idioma y el
   otro recarga la página completa en vez de hacer una transición de
   cliente. Para un cambio de idioma es lo correcto — el documento entero,
   incluido su lang, es otro. */

export const metadata: Metadata = homeMetadata("es");

export const viewport: Viewport = {
  themeColor: "#102a3c",
  colorScheme: "dark",
};

export default function LayoutEs({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Shell lang="es">{children}</Shell>;
}
