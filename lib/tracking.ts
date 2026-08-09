import { getPayloadClient } from "@/lib/payload";

export type TrackingSettings = {
  gtmId: string | null;
  ga4Id: string | null;
  metaPixelId: string | null;
  customHeadCode: string | null;
  customBodyEndCode: string | null;
};

const EMPTY_SETTINGS: TrackingSettings = {
  gtmId: null,
  ga4Id: null,
  metaPixelId: null,
  customHeadCode: null,
  customBodyEndCode: null,
};

export async function getTrackingSettings(): Promise<TrackingSettings> {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: "tracking" });
    return {
      gtmId: settings.gtmId || null,
      ga4Id: settings.ga4Id || null,
      metaPixelId: settings.metaPixelId || null,
      customHeadCode: settings.customHeadCode || null,
      customBodyEndCode: settings.customBodyEndCode || null,
    };
  } catch {
    return EMPTY_SETTINGS;
  }
}
