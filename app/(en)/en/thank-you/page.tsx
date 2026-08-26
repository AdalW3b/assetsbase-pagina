import type { Metadata } from "next";
import { ThanksPage } from "@/components/ThanksPage";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: getContent("en").thanks.title,
  robots: { index: false, follow: false },
};

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  return <ThanksPage lang="en" estado={estado} />;
}
