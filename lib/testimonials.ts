import { getPayloadClient } from "@/lib/payload";

export type TestimonialItem = {
  quote: string;
  authorName: string;
  authorDetail: string;
  rating: number | null;
};

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "testimonials",
    where: { published: { equals: true } },
    sort: "order",
    limit: 50,
  });
  return result.docs.map((doc) => ({
    quote: doc.quote,
    authorName: doc.authorName,
    authorDetail: doc.authorDetail ?? "",
    rating: doc.rating ?? null,
  }));
}
