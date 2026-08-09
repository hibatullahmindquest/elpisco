import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — populates the /services Page with the content previously
// hardcoded in app/(frontend)/services/page.tsx, as blocks. Images are
// intentionally left blank (see about-page seed migration for the reasoning
// on why migrations never upload assets) — ImageTextBlockView falls back to
// a full-width text layout until real photography is uploaded via /admin.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/services" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "Services",
      path: "/services",
      status: "published",
      seo: {
        metaTitle: "Services | Interior Design, Renovation & Design Build",
        metaDescription: "Interior design, renovation, design & build, custom cabinetry and project management, from Elpis.co.",
      },
      layout: [
        {
          blockType: "hero",
          label: "What we do",
          headlineLines: [{ line: "FROM SPACE" }, { line: "TO STRUCTURE" }, { line: "TO FINISH." }],
          body: "Elpis provides an integrated range of design and renovation services for homeowners who want fewer handovers, clearer accountability and one coherent result.",
        },
        {
          blockType: "imageText",
          background: "warm-white",
          imagePosition: "left",
          label: "01 / Service",
          headline: "INTERIOR DESIGN",
          body: "A complete design direction developed around the property, the people living in it and the way each space needs to perform.",
          scopeItems: [
            { value: "Design consultation" },
            { value: "Site study" },
            { value: "Space planning" },
            { value: "Concept development" },
            { value: "Mood and visual direction" },
            { value: "Material and finish selection" },
            { value: "Lighting direction" },
            { value: "Furniture planning" },
            { value: "Custom joinery design" },
            { value: "Design detailing" },
            { value: "3D visualisation where included in scope" },
            { value: "Documentation" },
          ],
          suitedText: "Owners who want the design properly resolved before construction begins.",
          ctaLabel: "START A PROJECT",
          ctaHref: "/start-a-project",
        },
        {
          blockType: "imageText",
          background: "soft-white",
          imagePosition: "right",
          label: "02 / Service",
          headline: "RENOVATION",
          body: "From major interior transformation to comprehensive property renovation, we coordinate execution with close attention to buildability, workmanship and design intent.",
          scopeItems: [
            { value: "Demolition" },
            { value: "Masonry and wet works" },
            { value: "Ceiling and partition works" },
            { value: "Electrical" },
            { value: "Plumbing" },
            { value: "Tiling / stone works" },
            { value: "Flooring" },
            { value: "Painting" },
            { value: "Carpentry installation" },
            { value: "Doors and glazing" },
            { value: "Selected M&E coordination" },
            { value: "Finishing" },
            { value: "Rectification and handover" },
          ],
          suitedText: "Existing homes requiring significant transformation, upgrading or reconfiguration.",
          ctaLabel: "START A PROJECT",
          ctaHref: "/start-a-project",
        },
        {
          blockType: "imageText",
          background: "warm-white",
          imagePosition: "left",
          label: "03 / Service",
          headline: "DESIGN & BUILD",
          body: "One integrated appointment covering design development and site delivery. By keeping key decisions within one coordinated team, the design can be developed with construction realities in mind and site execution can be measured against a clear creative direction.",
          highlight: "ONE VISION. ONE COORDINATED TEAM. ONE COMPLETE DELIVERY.",
          suitedText: "Clients who prefer one accountable partner from concept to handover.",
          ctaLabel: "START A PROJECT",
          ctaHref: "/start-a-project",
        },
        {
          blockType: "imageText",
          background: "soft-white",
          imagePosition: "right",
          label: "04 / Service",
          headline: "CUSTOM CABINETRY",
          body: "Joinery designed as part of the room rather than added to it. We develop cabinetry around function, proportion, storage behaviour, material, hardware and architectural alignment.",
          scopeItems: [
            { value: "Kitchens" },
            { value: "Wardrobes" },
            { value: "TV / living storage" },
            { value: "Study and home office" },
            { value: "Vanity units" },
            { value: "Display cabinetry" },
            { value: "Concealed storage" },
            { value: "Feature joinery" },
          ],
          ctaLabel: "START A PROJECT",
          ctaHref: "/start-a-project",
        },
        {
          blockType: "imageText",
          background: "warm-white",
          imagePosition: "left",
          label: "05 / Service",
          headline: "PROJECT MANAGEMENT",
          body: "Renovation involves hundreds of connected decisions. Our role is to keep those decisions moving in the right sequence while maintaining visibility across programme, site coordination and quality.",
          scopeItems: [
            { value: "Project planning" },
            { value: "Site coordination" },
            { value: "Vendor coordination" },
            { value: "Work sequencing" },
            { value: "Progress tracking" },
            { value: "Client updates" },
            { value: "Design clarification" },
            { value: "Quality inspections" },
            { value: "Rectification tracking" },
            { value: "Handover coordination" },
          ],
          ctaLabel: "START A PROJECT",
          ctaHref: "/start-a-project",
        },
        {
          blockType: "ctaBanner",
          headlineLines: [{ line: "NOT SURE WHICH" }, { line: "SCOPE YOU NEED?" }],
          body: "Start with the property and the outcome you want. We will help determine the most appropriate scope during the initial consultation.",
          buttonLabel: "DISCUSS YOUR PROJECT",
          buttonHref: "/start-a-project",
        },
      ],
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/services" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
