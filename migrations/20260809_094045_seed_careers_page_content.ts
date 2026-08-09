import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — populates the /careers Page with the content previously
// hardcoded in app/(frontend)/careers/page.tsx, as blocks. Open roles
// themselves remain sourced live from the Careers collection via
// CareersListBlockView.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/careers" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "Careers",
      path: "/careers",
      status: "published",
      seo: {
        metaTitle: "Careers",
        metaDescription: "Elpis is growing a team around design quality, technical discipline and responsible project delivery.",
      },
      layout: [
        {
          blockType: "hero",
          label: "Careers",
          headlineLines: [{ line: "BUILD GOOD" }, { line: "WORK WITH US." }],
          body: "Elpis is growing a team around design quality, technical discipline and responsible project delivery.",
        },
        {
          blockType: "textSection",
          background: "soft-white",
          emphasis: "standard",
          headline: "Small team. High standard.",
          body: "We value people who care about the work beyond what is visible in a presentation — people who notice details, communicate clearly, solve problems calmly and take ownership through execution.",
        },
        {
          blockType: "careersList",
          background: "warm-white",
          label: "Open Roles",
          emptyStateBody:
            "No open roles right now. We are always interested in thoughtful designers, builders and project people. Send a concise portfolio and introduction for future consideration.",
          emptyStateCtaLabel: "INTRODUCE YOURSELF",
        },
        {
          blockType: "ctaBanner",
          headlineLines: [{ line: "HAVE A PROPERTY" }, { line: "IN MIND?" }],
          buttonLabel: "START A PROJECT",
          buttonHref: "/start-a-project",
        },
      ],
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/careers" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
