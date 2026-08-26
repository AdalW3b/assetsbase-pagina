import { ogCard, ogSize } from "@/components/OgCard";
import { getContent } from "@/lib/content";

export const alt = getContent("en").meta.ogImageAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard("en");
}
