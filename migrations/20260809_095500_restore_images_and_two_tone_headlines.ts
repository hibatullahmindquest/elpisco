import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — patches the /, /services and /about Pages (already
// seeded by earlier migrations) now that the block schemas support what
// their original hardcoded components had:
//  - textSection gained `headlineAccent`, so Home's Intro and Philosophy
//    sections can restore their original two-colour headline treatment
//    instead of a single-colour merged line.
//  - imageText/imageBreak gained `fallbackImageUrl`, a plain static path
//    used until a real photo is uploaded via the Image field — restoring
//    the original photography for Home's Craft section, all 5 Services
//    sections, and About's studio photo (previously omitted entirely).
// Runs as an update against the existing documents rather than a fresh
// seed, since the pages this touches were already created by earlier
// migrations in this same rollout.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // --- Home ---
  const homeResult = await payload.find({ collection: "pages", where: { path: { equals: "/" } }, limit: 1 });
  const home = homeResult.docs[0];
  if (home && Array.isArray(home.layout)) {
    const layout = home.layout as Record<string, unknown>[];
    const intro = layout[1];
    if (intro?.blockType === "textSection" && !intro.headlineAccent) {
      intro.headline = "WE DON'T SIMPLY|RENOVATE HOMES.";
      intro.headlineAccent = "WE SHAPE HOW|THEY ARE LIVED IN.";
    }
    const philosophy = layout[3];
    if (philosophy?.blockType === "textSection" && !philosophy.headlineAccent) {
      philosophy.headline = "DESIGN WITH|INTENTION.";
      philosophy.headlineAccent = "BUILT WITH|PURPOSE.";
    }
    const craft = layout[5];
    if (craft?.blockType === "imageText" && !craft.fallbackImageUrl) {
      craft.fallbackImageUrl = "/images/details/material-detail.jpg";
    }
    await payload.update({ collection: "pages", id: home.id, data: { layout: layout as never } });
  }

  // --- Services ---
  const servicesResult = await payload.find({ collection: "pages", where: { path: { equals: "/services" } }, limit: 1 });
  const services = servicesResult.docs[0];
  if (services && Array.isArray(services.layout)) {
    const layout = services.layout as Record<string, unknown>[];
    const imagePaths = [
      "/images/hero/main.jpg",
      "/images/projects/serene-residence/hero.jpg",
      "/images/projects/modern-sanctuary/hero.jpg",
      "/images/details/material-detail.jpg",
      "/images/projects/coastal-retreat/hero.jpg",
    ];
    for (let i = 0; i < imagePaths.length; i++) {
      const block = layout[i + 1];
      if (block?.blockType === "imageText" && !block.fallbackImageUrl) {
        block.fallbackImageUrl = imagePaths[i];
      }
    }
    await payload.update({ collection: "pages", id: services.id, data: { layout: layout as never } });
  }

  // --- About ---
  const aboutResult = await payload.find({ collection: "pages", where: { path: { equals: "/about" } }, limit: 1 });
  const about = aboutResult.docs[0];
  if (about && Array.isArray(about.layout)) {
    const layout = about.layout as Record<string, unknown>[];
    const alreadyHasStudioImage = layout.some((block) => block.blockType === "imageBreak");
    if (!alreadyHasStudioImage) {
      layout.splice(1, 0, {
        blockType: "imageBreak",
        fallbackImageUrl: "/images/studio/studio-atmosphere.jpg",
        alt: "Studio atmosphere: a timber-panelled corridor with warm cove lighting",
        aspectRatio: "21 / 9",
      });
      await payload.update({ collection: "pages", id: about.id, data: { layout: layout as never } });
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const homeResult = await payload.find({ collection: "pages", where: { path: { equals: "/" } }, limit: 1 });
  const home = homeResult.docs[0];
  if (home && Array.isArray(home.layout)) {
    const layout = home.layout as Record<string, unknown>[];
    const intro = layout[1];
    if (intro?.blockType === "textSection") {
      intro.headline = "WE DON'T SIMPLY|RENOVATE HOMES.|WE SHAPE HOW|THEY ARE LIVED IN.";
      intro.headlineAccent = null;
    }
    const philosophy = layout[3];
    if (philosophy?.blockType === "textSection") {
      philosophy.headline = "DESIGN WITH|INTENTION.|BUILT WITH|PURPOSE.";
      philosophy.headlineAccent = null;
    }
    const craft = layout[5];
    if (craft?.blockType === "imageText") {
      craft.fallbackImageUrl = null;
    }
    await payload.update({ collection: "pages", id: home.id, data: { layout: layout as never } });
  }

  const servicesResult = await payload.find({ collection: "pages", where: { path: { equals: "/services" } }, limit: 1 });
  const services = servicesResult.docs[0];
  if (services && Array.isArray(services.layout)) {
    const layout = services.layout as Record<string, unknown>[];
    for (let i = 1; i <= 5; i++) {
      const block = layout[i];
      if (block?.blockType === "imageText") block.fallbackImageUrl = null;
    }
    await payload.update({ collection: "pages", id: services.id, data: { layout: layout as never } });
  }

  const aboutResult = await payload.find({ collection: "pages", where: { path: { equals: "/about" } }, limit: 1 });
  const about = aboutResult.docs[0];
  if (about && Array.isArray(about.layout)) {
    const layout = (about.layout as Record<string, unknown>[]).filter((block) => block.blockType !== "imageBreak");
    await payload.update({ collection: "pages", id: about.id, data: { layout: layout as never } });
  }
}
