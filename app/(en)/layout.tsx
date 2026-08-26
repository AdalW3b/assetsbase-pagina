import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/Shell";
import { homeMetadata } from "@/lib/metadata";
import "../globals.css";

/* Layout raíz del inglés. Ver la nota en app/(es)/layout.tsx: son dos
   layouts raíz para poder cambiar el atributo lang de <html>. */

export const metadata: Metadata = homeMetadata("en");

export const viewport: Viewport = {
  themeColor: "#102a3c",
  colorScheme: "dark",
};

export default function LayoutEn({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Shell lang="en">{children}</Shell>;
}
