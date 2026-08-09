import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — populates the /why-elpis Page with the content previously
// hardcoded in app/(frontend)/why-elpis/page.tsx, as blocks.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/why-elpis" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "Why Elpis",
      path: "/why-elpis",
      status: "published",
      seo: {
        metaTitle: "Why Elpis | Design-Led Renovation Malaysia",
        metaDescription:
          "A premium renovation is not only a question of materials. It is the quality of the thinking, coordination and decisions behind them.",
      },
      layout: [
        {
          blockType: "hero",
          label: "Why Elpis",
          headlineLines: [{ line: "THE VALUE IS" }, { line: "IN THE PROCESS." }],
          body: "A premium renovation is not only a question of materials. It is the quality of the thinking, coordination and decisions behind them.",
        },
        {
          blockType: "stageList",
          items: [
            {
              number: "01",
              title: "DESIGN EXPERTISE",
              headline: "A clear idea before the build.",
              body: "We begin by understanding the property and the way you want to live in it. Layout, proportion, material and detail are developed as one direction, giving the project a clear point of view before construction accelerates.",
              background: "soft-white",
            },
            {
              number: "02",
              title: "TRANSPARENT PROCESS",
              headline: "Fewer surprises. Clearer decisions.",
              body: "Renovations change as information becomes available, but the process should never feel opaque. We structure approvals, scope, key decisions and communication so clients can understand the project as it progresses.",
              background: "warm-white",
            },
            {
              number: "03",
              title: "QUALITY CONTROL",
              headline: "Quality is checked in stages.",
              body: "Good workmanship cannot be inspected into a project at the very end. We review critical stages as work progresses and address detailing, finish and coordination while they can still be corrected properly.",
              background: "soft-white",
            },
            {
              number: "04",
              title: "DEDICATED PROJECT MANAGEMENT",
              headline: "One point of accountability.",
              body: "A dedicated project structure reduces fragmented communication between homeowner, designer, contractor and vendors. Decisions are coordinated through the team responsible for the overall outcome.",
              background: "warm-white",
            },
            {
              number: "05",
              title: "SELECTIVE PROJECT INTAKE",
              headline: "Attention requires capacity.",
              body: "We intentionally manage the number of projects taken on at any one time. This allows the team to maintain meaningful involvement through design development and construction rather than disappearing after the proposal stage.",
              background: "soft-white",
            },
          ],
        },
        {
          blockType: "testimonialsGrid",
          background: "soft-white",
          label: "Client Perspective",
          headlineLines: [{ line: "TRUST IS BUILT" }, { line: "THROUGH THE PROCESS." }],
        },
        {
          blockType: "ctaBanner",
          headlineLines: [{ line: "PLANNING A" }, { line: "SIGNIFICANT RENOVATION?" }],
          buttonLabel: "BOOK A CONSULTATION",
          buttonHref: "/start-a-project",
        },
      ],
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/why-elpis" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
