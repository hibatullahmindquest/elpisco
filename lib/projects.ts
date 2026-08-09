import { getPayloadClient } from "@/lib/payload";
import type { Project } from "@/data/projects";
import type { Media, Project as PayloadProject } from "@/payload-types";

function mediaUrl(value: number | Media | null | undefined): string {
  if (value && typeof value === "object") return value.url ?? "";
  return "";
}

function toProject(doc: PayloadProject): Project {
  return {
    slug: doc.slug,
    title: doc.title,
    location: doc.location ?? "",
    year: doc.year ?? "",
    type: doc.type ?? "",
    scope: doc.scope ?? "",
    services: (doc.services ?? []).map((s) => s.value),
    cover: mediaUrl(doc.cover) || mediaUrl(doc.hero),
    coverAspect: doc.coverAspect ?? "landscape",
    hero: mediaUrl(doc.hero),
    images: (doc.images ?? []).map((i) => mediaUrl(i.image)),
    description: doc.description ?? "",
  };
}

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "projects",
    sort: "order",
    limit: 100,
  });
  return result.docs.map(toProject);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const doc = result.docs[0];
  return doc ? toProject(doc) : undefined;
}
