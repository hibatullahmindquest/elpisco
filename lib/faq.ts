import { getPayloadClient } from "@/lib/payload";

export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

export async function getFaqs(): Promise<FaqItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "faq",
    sort: "order",
    limit: 200,
  });
  return result.docs.map((doc) => ({
    question: doc.question,
    answer: doc.answer,
    category: doc.category ?? "General",
  }));
}
