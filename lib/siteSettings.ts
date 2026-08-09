import { getPayloadClient } from "@/lib/payload";
import type { Media } from "@/payload-types";

export type SiteSettings = {
  siteName: string;
  logoUrl: string | null;
  tagline: string;
  fontPreset: "instrument-manrope" | "playfair-inter" | "playfair-montserrat";
  colorPreset: "elpis-editorial" | "client-palette";
  headerBehavior: "frosted" | "hide-on-scroll";
  email: string;
  whatsappUrl: string;
  instagramUrl: string;
  city: string;
  country: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "ELPIS.CO",
  logoUrl: null,
  tagline: "Interior design, renovation and design & build, based in Shah Alam, Malaysia.",
  fontPreset: "instrument-manrope",
  colorPreset: "elpis-editorial",
  headerBehavior: "frosted",
  email: "[EMAIL_ADDRESS]",
  whatsappUrl: "[WHATSAPP_URL]",
  instagramUrl: "[INSTAGRAM_URL]",
  city: "Shah Alam",
  country: "Malaysia",
};

function mediaUrl(value: number | Media | null | undefined): string | null {
  if (value && typeof value === "object") return value.url ?? null;
  return null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: "site-settings" });
    return {
      siteName: settings.siteName || DEFAULT_SETTINGS.siteName,
      logoUrl: mediaUrl(settings.logo),
      tagline: settings.tagline || DEFAULT_SETTINGS.tagline,
      fontPreset: settings.fontPreset || DEFAULT_SETTINGS.fontPreset,
      colorPreset: settings.colorPreset || DEFAULT_SETTINGS.colorPreset,
      headerBehavior: settings.headerBehavior || DEFAULT_SETTINGS.headerBehavior,
      email: settings.contact?.email || DEFAULT_SETTINGS.email,
      whatsappUrl: settings.contact?.whatsappUrl || DEFAULT_SETTINGS.whatsappUrl,
      instagramUrl: settings.contact?.instagramUrl || DEFAULT_SETTINGS.instagramUrl,
      city: settings.contact?.city || DEFAULT_SETTINGS.city,
      country: settings.contact?.country || DEFAULT_SETTINGS.country,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
