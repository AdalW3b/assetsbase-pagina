import { Reem_Kufi, Raleway } from "next/font/google";

/* Las fuentes viven aquí y no en el layout porque ahora hay dos layouts
   raíz —uno por idioma— y next/font tiene que instanciarse una sola vez:
   dos llamadas producirían dos precargas de la misma familia. */

export const reemKufi = Reem_Kufi({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-reem-kufi",
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const fontVars = `${reemKufi.variable} ${raleway.variable}`;
