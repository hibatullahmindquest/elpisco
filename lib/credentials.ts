import { getPayloadClient } from "@/lib/payload";
import type { Media } from "@/payload-types";

export type CredentialItem = {
  label: string;
  value: string;
  issuer: string;
  iconUrl: string | null;
};

function mediaUrl(value: number | Media | null | undefined): string | null {
  if (value && typeof value === "object") return value.url ?? null;
  return null;
}

export async function getCredentials(): Promise<CredentialItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "credentials",
    where: { published: { equals: true } },
    sort: "order",
    limit: 50,
  });
  return result.docs.map((doc) => ({
    label: doc.label,
    value: doc.value ?? "",
    issuer: doc.issuer ?? "",
    iconUrl: mediaUrl(doc.icon),
  }));
}
