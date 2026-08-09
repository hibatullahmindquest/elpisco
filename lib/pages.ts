import { getPayloadClient } from "@/lib/payload";
import type { Page } from "@/payload-types";

export async function getPageByPath(path: string): Promise<Page | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    where: { path: { equals: path }, status: { equals: "published" } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}
