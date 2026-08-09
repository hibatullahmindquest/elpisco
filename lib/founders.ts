import { getPayloadClient } from "@/lib/payload";
import type { Media } from "@/payload-types";

export type FounderItem = {
  name: string;
  title: string;
  bio: string;
  photoUrl: string | null;
};

function mediaUrl(value: number | Media | null | undefined): string | null {
  if (value && typeof value === "object") return value.url ?? null;
  return null;
}

export async function getFounders(): Promise<FounderItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "founders",
    sort: "order",
    limit: 20,
  });
  return result.docs.map((doc) => ({
    name: doc.name,
    title: doc.title ?? "",
    bio: doc.bio ?? "",
    photoUrl: mediaUrl(doc.photo),
  }));
}
