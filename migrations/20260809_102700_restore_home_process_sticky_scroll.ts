import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — patches the already-seeded Home page (see
// 20260809_094130_seed_home_page_content.ts) to restore the Process
// teaser's original sticky-scroll/active-step interaction, previously
// approximated as a plain textSection heading + static stageList.
// Replaces those two blocks (indices 7 and 8 in the seeded layout) with a
// single stickyStepList block carrying the same copy.
const STICKY_STEP_LIST_BLOCK = {
  blockType: "stickyStepList",
  label: "How We Work",
  headlineLines: [{ line: "ONE PROCESS. FROM FIRST" }, { line: "IDEA TO FINAL HANDOVER." }],
  items: [
    { number: "01", title: "DISCOVER", body: "Initial consultation, project objectives, property assessment, budget alignment and scope definition." },
    { number: "02", title: "DEFINE", body: "Space planning, concept direction, mood and material direction, and preliminary design development." },
    { number: "03", title: "DETAIL", body: "Detailed design, cabinetry design, material selection, lighting direction and quotation alignment." },
    { number: "04", title: "BUILD", body: "Site mobilisation, construction, project coordination, progress updates and quality reviews." },
    { number: "05", title: "DELIVER", body: "Final inspection, defect and rectification checks, final detailing, handover and warranty documentation." },
  ],
};

const OLD_TEXT_SECTION = {
  blockType: "textSection",
  background: "warm-white",
  label: "How We Work",
  emphasis: "standard",
  align: "left",
  headline: "ONE PROCESS. FROM FIRST IDEA TO FINAL HANDOVER.",
};

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const result = await payload.find({ collection: "pages", where: { path: { equals: "/" } }, limit: 1 });
  const home = result.docs[0];
  if (!home || !Array.isArray(home.layout)) return;

  const layout = home.layout as Record<string, unknown>[];
  const alreadyMigrated = layout.some((block) => block.blockType === "stickyStepList");
  if (alreadyMigrated) return;

  const howWeWorkIdx = layout.findIndex((block) => block.blockType === "textSection" && block.label === "How We Work");
  const stageListIdx = layout.findIndex((block) => block.blockType === "stageList");
  if (howWeWorkIdx === -1 || stageListIdx === -1) return;

  const removeIndices = [howWeWorkIdx, stageListIdx].sort((a, b) => b - a);
  for (const idx of removeIndices) layout.splice(idx, 1);
  layout.splice(Math.min(howWeWorkIdx, stageListIdx), 0, STICKY_STEP_LIST_BLOCK);

  await payload.update({ collection: "pages", id: home.id, data: { layout: layout as never } });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const result = await payload.find({ collection: "pages", where: { path: { equals: "/" } }, limit: 1 });
  const home = result.docs[0];
  if (!home || !Array.isArray(home.layout)) return;

  const layout = home.layout as Record<string, unknown>[];
  const idx = layout.findIndex((block) => block.blockType === "stickyStepList");
  if (idx === -1) return;

  layout.splice(
    idx,
    1,
    OLD_TEXT_SECTION,
    {
      blockType: "stageList",
      items: [
        { number: "01", title: "DISCOVER", body: "Initial consultation, project objectives, property assessment, budget alignment and scope definition.", background: "warm-white" },
        { number: "02", title: "DEFINE", body: "Space planning, concept direction, mood and material direction, and preliminary design development.", background: "warm-white" },
        { number: "03", title: "DETAIL", body: "Detailed design, cabinetry design, material selection, lighting direction and quotation alignment.", background: "warm-white" },
        { number: "04", title: "BUILD", body: "Site mobilisation, construction, project coordination, progress updates and quality reviews.", background: "warm-white" },
        { number: "05", title: "DELIVER", body: "Final inspection, defect and rectification checks, final detailing, handover and warranty documentation.", background: "warm-white" },
      ],
    }
  );

  await payload.update({ collection: "pages", id: home.id, data: { layout: layout as never } });
}
