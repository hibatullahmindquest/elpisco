import { SectionLabel } from "@/components/ui/SectionLabel";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqs } from "@/lib/faq";
import { resolveBackground, isDarkBackground } from "./shared";

function groupByCategory(faqs: { question: string; answer: string; category: string }[]) {
  const groups = new Map<string, { question: string; answer: string }[]>();
  for (const faq of faqs) {
    const list = groups.get(faq.category) ?? [];
    list.push({ question: faq.question, answer: faq.answer });
    groups.set(faq.category, list);
  }
  return Array.from(groups.entries());
}

export async function FaqAccordionBlockView({
  background,
  emptyStateBody,
}: {
  background?: string | null;
  emptyStateBody?: string | null;
}) {
  const faqs = await getFaqs();
  const groups = groupByCategory(faqs);
  const dark = isDarkBackground(background);

  const jsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(56px, 9vw, 100px)" }}>
      {jsonLd && <JsonLd data={jsonLd} />}
      <div className="container">
        {groups.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {groups.map(([category, items]) => (
              <div key={category} className="grid-12" style={{ rowGap: 24 }}>
                <div className="col-line-1-4">
                  <SectionLabel theme={dark ? "dark" : "light"}>{category}</SectionLabel>
                </div>
                <div className="col-line-5-end">
                  <Accordion items={items} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          emptyStateBody && (
            <p className="body-copy" style={{ maxWidth: 420, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
              {emptyStateBody}
            </p>
          )
        )}
      </div>
    </section>
  );
}
