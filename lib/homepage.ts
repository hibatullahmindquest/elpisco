import { getPayloadClient } from "@/lib/payload";
import type { Media } from "@/payload-types";

export type HomepageSettings = {
  heroImageUrl: string;
  heroImageAlt: string;
};

const DEFAULT_SETTINGS: HomepageSettings = {
  heroImageUrl: "/images/hero/main.jpg",
  heroImageAlt: "Architectural interior with natural light and considered material palette",
};

function mediaUrl(value: number | Media | null | undefined): string | null {
  if (value && typeof value === "object") return value.url ?? null;
  return null;
}

export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const payload = await getPayloadClient();
    const homepage = await payload.findGlobal({ slug: "homepage" });
    return {
      heroImageUrl: mediaUrl(homepage.hero?.image) || DEFAULT_SETTINGS.heroImageUrl,
      heroImageAlt: homepage.hero?.imageAlt || DEFAULT_SETTINGS.heroImageAlt,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
