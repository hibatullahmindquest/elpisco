import { getPayloadClient } from "@/lib/payload";

export type CareerItem = {
  slug: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  description: string;
  applyEmail: string | null;
};

export async function getOpenCareers(): Promise<CareerItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "careers",
    where: { status: { equals: "open" } },
    sort: "order",
    limit: 50,
  });
  return result.docs.map((doc) => ({
    slug: doc.slug,
    jobTitle: doc.jobTitle,
    department: doc.department ?? "",
    location: doc.location ?? "",
    employmentType: doc.employmentType ?? "",
    summary: doc.summary ?? "",
    description: doc.description ?? "",
    applyEmail: doc.applyEmail ?? null,
  }));
}
