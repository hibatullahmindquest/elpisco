import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — populates the /process Page with the content previously
// hardcoded in app/(frontend)/process/page.tsx, as blocks.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/process" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "Process",
      path: "/process",
      status: "published",
      seo: {
        metaTitle: "Our Process",
        metaDescription: "A renovation contains hundreds of decisions. Our process creates a clear order for making them.",
      },
      layout: [
        {
          blockType: "hero",
          label: "The Process",
          headlineLines: [{ line: "FROM FIRST" }, { line: "CONVERSATION" }, { line: "TO HANDOVER." }],
          body: "A renovation contains hundreds of decisions. Our process creates a clear order for making them.",
        },
        {
          blockType: "stageList",
          items: [
            {
              number: "01",
              title: "ENQUIRY & CONSULTATION",
              body: "We review your property, location, intended scope, budget range, timeline and overall fit.",
              subListLabel: "Client Provides",
              subList: [
                { value: "Property type / floor plan" },
                { value: "Location" },
                { value: "Desired scope" },
                { value: "Reference images if available" },
                { value: "Target investment" },
                { value: "Preferred timeline" },
              ],
              outcomeLabel: "Outcome",
              outcome: "A clearer definition of the project and recommended next step.",
              background: "soft-white",
            },
            {
              number: "02",
              title: "SITE STUDY & BRIEF",
              body: "We study the site and translate your requirements into a working brief.",
              outcomeLabel: "Outcome",
              outcome: "Defined priorities, scope parameters and project constraints.",
              background: "warm-white",
            },
            {
              number: "03",
              title: "CONCEPT & SPACE PLANNING",
              body: "We develop layout options and the overall creative direction.",
              outcomeLabel: "Outcome",
              outcome: "Approved spatial direction and design language.",
              background: "soft-white",
            },
            {
              number: "04",
              title: "DESIGN DEVELOPMENT",
              body: "Materials, cabinetry, lighting and critical details are developed into a coordinated scheme.",
              outcomeLabel: "Outcome",
              outcome: "A design with sufficient clarity for costing and execution.",
              background: "warm-white",
            },
            {
              number: "05",
              title: "COSTING & PRE-CONSTRUCTION",
              body: "Project scope, quotation, key selections, programme and execution requirements are aligned before mobilisation.",
              outcomeLabel: "Outcome",
              outcome: "Confirmed build scope and agreed commencement.",
              background: "soft-white",
            },
            {
              number: "06",
              title: "CONSTRUCTION",
              body: "Works proceed according to the agreed scope with ongoing coordination and progress reviews.",
              outcomeLabel: "Outcome",
              outcome: "The design is translated into the built space.",
              background: "warm-white",
            },
            {
              number: "07",
              title: "INSPECTION & HANDOVER",
              body: "We review the completed work, track rectification items and prepare the property for handover.",
              outcomeLabel: "Outcome",
              outcome: "A completed home and documented closing stage.",
              background: "soft-white",
            },
          ],
        },
        {
          blockType: "ctaBanner",
          headlineLines: [{ line: "READY TO" }, { line: "BEGIN?" }],
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
    where: { path: { equals: "/process" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
