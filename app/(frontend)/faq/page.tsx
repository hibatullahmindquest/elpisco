import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Accordion } from "@/components/ui/Accordion";
import { getPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { getFaqs } from "@/lib/faq";
import { getPageByPath } from "@/lib/pages";
import { JsonLd } from "@/components/seo/JsonLd";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/faq", {
    title: "FAQ | Renovation & Interior Design",
    description: "A few of the questions homeowners usually ask before starting a renovation with Elpis.",
  });
}

function groupByCategory(faqs: { question: string; answer: string; category: string }[]) {
  const groups = new Map<string, { question: string; answer: string }[]>();
  for (const faq of faqs) {
    const list = groups.get(faq.category) ?? [];
    list.push({ question: faq.question, answer: faq.answer });
    groups.set(faq.category, list);
  }
  return Array.from(groups.entries());
}

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export default async function FaqPage() {
  const cmsPage = await getPageByPath("/faq");

  if (cmsPage?.layout && cmsPage.layout.length > 0) {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd} />
        <RenderBlocks blocks={cmsPage.layout} />
      </>
    );
  }

  const faqs = await getFaqs();
  const groups = groupByCategory(faqs);

  const jsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />

      <section
        data-nav-theme="light"
        style={{
          background: "var(--warm-white)",
          paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
          paddingBottom: "clamp(48px, 8vw, 88px)",
        }}
      >
        <div className="container grid-12">
          <div className="col-line-label">
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <div className="col-line-4-end">
            <RevealText as="h1" className="h-hero" lines={["BEFORE", "WE BEGIN."]} style={{ color: "var(--ink)" }} />
            <p className="body-copy" style={{ marginTop: 28, maxWidth: 460 }}>
              A few of the questions homeowners usually ask before starting a renovation with Elpis.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(56px, 9vw, 100px)" }}>
        <div className="container">
          {groups.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
              {groups.map(([category, items]) => (
                <div key={category} className="grid-12" style={{ rowGap: 24 }}>
                  <div className="col-line-1-4">
                    <SectionLabel>{category}</SectionLabel>
                  </div>
                  <div className="col-line-5-end">
                    <Accordion items={items} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="body-copy" style={{ maxWidth: 420 }}>
              Frequently asked questions will appear here shortly.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
