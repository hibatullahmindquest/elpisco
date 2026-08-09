import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — populates the /contact Page with the content previously
// hardcoded in app/(frontend)/contact/page.tsx, as a single self-contained
// contactDetails block. The Studio/WhatsApp/Email/Instagram list on the
// right is rendered live from Site Settings, not stored here.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/contact" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "Contact",
      path: "/contact",
      status: "published",
      seo: {
        metaTitle: "Contact",
        metaDescription: "Start a project with Elpis.co. Interior design, renovation and design & build in Shah Alam, Malaysia.",
      },
      layout: [
        {
          blockType: "contactDetails",
          label: "Contact",
          headlineLines: [{ line: "LET'S TALK" }, { line: "ABOUT YOUR" }, { line: "PROPERTY." }],
          body: "For a considered response, tell us about your property, scope and timing through our project assessment. Prefer a quick conversation first? Reach us directly below.",
          primaryCtaLabel: "START A PROJECT",
          primaryCtaHref: "/start-a-project",
          secondaryCtaLabel: "CONTINUE ON WHATSAPP",
        },
      ],
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/contact" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
