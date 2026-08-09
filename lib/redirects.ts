import { getPayloadClient } from "@/lib/payload";

export type RedirectMatch = { toPath: string; permanent: boolean };

export async function getRedirect(path: string): Promise<RedirectMatch | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "redirects",
      where: { fromPath: { equals: path } },
      limit: 1,
    });
    const doc = result.docs[0];
    if (!doc) return null;
    return { toPath: doc.toPath, permanent: doc.type !== "temporary" };
  } catch {
    return null;
  }
}
