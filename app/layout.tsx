import type { Metadata, Viewport } from "next";
import { Reem_Kufi, Raleway } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { MotionProvider } from "@/components/MotionProvider";
import { SITE } from "@/lib/site";
import "./globals.css";

const reemKufi = Reem_Kufi({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-reem-kufi",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "AssetBase ERP — Cierra el mes en un día, no en tres semanas",
    template: "%s · AssetBase ERP",
  },
  description:
    "Sistema ERP para PyME en México. Finanzas, inventario y nómina en un solo sistema, con timbrado CFDI 4.0 nativo. Lo dejamos operando en tres semanas, con tus datos ya dentro.",
  keywords: [
    "ERP para PyME",
    "sistema ERP México",
    "software administrativo PyME",
    "CFDI 4.0",
    "control de inventarios",
    "nómina IMSS",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "AssetBase ERP",
    locale: "es_MX",
    title: "AssetBase ERP — Cierra el mes en un día, no en tres semanas",
    description:
      "Finanzas, inventario y nómina de tu PyME en un solo sistema, con facturación al día con el SAT. En operación en tres semanas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AssetBase ERP — Cierra el mes en un día, no en tres semanas",
    description:
      "Finanzas, inventario y nómina de tu PyME en un solo sistema, con facturación al día con el SAT. En operación en tres semanas.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#102a3c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${reemKufi.variable} ${raleway.variable}`}>
      <body>
        <Analytics />
        {/* Sin JS, framer-motion deja 33 nodos en opacity:0 y la página sale
            en blanco detrás de la cortinilla de marca. Esto los devuelve. */}
        <noscript>
          <style>{`
            [data-reveal]{opacity:1!important;transform:none!important}
            [data-intro]{display:none!important}
          `}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
