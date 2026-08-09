import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — populates the /faq Page with the content previously
// hardcoded in app/(frontend)/faq/page.tsx, as blocks. FAQ items themselves
// remain sourced live from the FAQ collection via FaqAccordionBlockView.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/faq" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "FAQ",
      path: "/faq",
      status: "published",
      seo: {
        metaTitle: "FAQ | Renovation & Interior Design",
        metaDescription: "A few of the questions homeowners usually ask before starting a renovation with Elpis.",
      },
      layout: [
        {
          blockType: "hero",
          label: "FAQ",
          headlineLines: [{ line: "BEFORE" }, { line: "WE BEGIN." }],
          body: "A few of the questions homeowners usually ask before starting a renovation with Elpis.",
        },
        {
          blockType: "faqAccordion",
          background: "soft-white",
          emptyStateBody: "Frequently asked questions will appear here shortly.",
        },
      ],
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/faq" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
