import type { Metadata } from "next";
import { ThanksPage } from "@/components/ThanksPage";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: getContent("es").thanks.title,
  robots: { index: false, follow: false },
};

export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  return <ThanksPage lang="es" estado={estado} />;
}
