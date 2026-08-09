import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration (not schema) — populates the /about Page document with the
// exact content that was previously hardcoded in app/(frontend)/about/page.tsx,
// as blocks, so the CMS becomes the live source without changing anything
// visible on deploy. The one thing NOT carried over is the full-width studio
// photo (public/images/studio/studio-atmosphere.jpg) — migrations run
// server-side during boot and reading/uploading an arbitrary filesystem
// asset there is unreliable on Vercel's serverless runtime, so that section
// is intentionally left out; add it back via a new "Full-width Image" block
// in /admin (a normal browser upload, no migration involved).
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/about" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "About",
      path: "/about",
      status: "published",
      seo: {
        metaTitle: "About Elpis | Interior Design & Renovation Studio Malaysia",
        metaDescription:
          "Elpis is an interior design, renovation and design-and-build studio based in Shah Alam, Malaysia, connecting design thinking with disciplined execution.",
      },
      layout: [
        {
          blockType: "hero",
          label: "About Elpis",
          headlineLines: [{ line: "A STUDIO FOR" }, { line: "CONSIDERED" }, { line: "LIVING." }],
          body: "Elpis is an interior design, renovation and design-and-build studio based in Shah Alam, Malaysia. We create homes through a process that connects design thinking with disciplined execution.",
        },
        {
          blockType: "textSection",
          background: "soft-white",
          emphasis: "standard",
          headline: "Design is only as strong as its execution.",
          body: "We started Elpis with a simple belief: homeowners should not have to choose between a beautiful concept and a build that works in reality. Our role is to connect both.\n\nFrom the earliest conversations about how a family lives, through spatial planning, materials, technical coordination, site execution and final detailing, we approach the project as one complete piece of work. This gives our clients a clearer journey and gives the finished home greater consistency from room to room, detail to detail.",
        },
        {
          blockType: "textSection",
          background: "warm-white",
          label: "The Studio",
          emphasis: "standard",
          headline: "Based in Malaysia. Built around the work.",
          body: "Elpis serves homeowners and property owners seeking a more considered approach to renovation. Our work spans interior design, renovation, design and build, custom cabinetry and project management, with selected projects undertaken based on scope, location and fit.\n\nRather than maximising project volume, our focus is on maintaining the attention required to make decisions well and execute them properly.",
          stats: [
            { label: "ESTABLISHED", value: "[YEAR]" },
            { label: "BASED", value: "SHAH ALAM, SELANGOR" },
            { label: "PROJECTS COMPLETED", value: "[NUMBER]+" },
            { label: "SERVICE AREA", value: "[KLANG VALLEY / MALAYSIA]" },
            { label: "CORE TEAM", value: "[NUMBER]" },
          ],
          statsDisclaimer: "Figures above are placeholders pending verified data from Elpis.",
        },
        {
          blockType: "founderGrid",
          background: "soft-white",
          label: "Founders",
          headlineLines: [{ line: "THE PEOPLE" }, { line: "BEHIND ELPIS." }],
          note: "Founder profiles will appear here once Elpis provides names, photos and biographies.",
        },
        {
          blockType: "splitText",
          background: "navy",
          columns: [
            {
              label: "Vision",
              headline: "To create homes that remain relevant.",
              body: "To be recognised as a trusted Malaysian design-and-build studio known for thoughtful residential spaces, disciplined project delivery and enduring quality.",
            },
            {
              label: "Mission",
              headline: "From intention to execution.",
              body: "To guide every project through a clear, integrated process that combines meaningful design, practical planning, responsible construction and detail-focused delivery.",
            },
          ],
        },
        {
          blockType: "numberedList",
          background: "warm-white",
          label: "Core Values",
          columns: "2",
          items: [
            { number: "01", title: "INTENTION", body: "Every design decision should have a reason." },
            { number: "02", title: "CLARITY", body: "Clients deserve clear scope, communication and expectations." },
            { number: "03", title: "CRAFT", body: "Details matter because they determine how the whole space feels." },
            {
              number: "04",
              title: "ACCOUNTABILITY",
              body: "We take ownership of the decisions and responsibilities entrusted to us.",
            },
            {
              number: "05",
              title: "RESPECT",
              body: "For the client, the property, the budget, the people building it and the time required to do the work properly.",
            },
          ],
        },
        {
          blockType: "textSection",
          background: "soft-white",
          emphasis: "standard",
          headline: "Quiet spaces. Strong decisions.",
          body: "Elpis is drawn to interiors that feel calm without becoming sterile, refined without becoming excessive and contemporary without depending on short-lived trends.\n\nOur aesthetic changes with each client and property. What remains consistent is the way we work: proportion before decoration, material with purpose, lighting with restraint and details that belong to the architecture.",
        },
        {
          blockType: "textSection",
          background: "warm-white",
          emphasis: "standard",
          headline: "What clients can expect.",
          body: "A renovation requires trust long before the finished space exists. Our commitment is to protect that trust with clear communication, documented decisions, realistic expectations, responsible coordination and attention to workmanship throughout the project.",
        },
        {
          blockType: "credentialsGrid",
          background: "soft-white",
          label: "Certificates & Credentials",
          headlineLines: [{ line: "BUILT ON PROFESSIONAL" }, { line: "FOUNDATIONS." }],
          note: "Verified registrations and certifications will appear here once confirmed. We do not publish credentials that have not been verified.",
        },
        {
          blockType: "ctaBanner",
          headlineLines: [{ line: "LET'S TALK" }, { line: "ABOUT YOUR SPACE." }],
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
    where: { path: { equals: "/about" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
