import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

// Data migration — populates the / (Home) Page with the content previously
// hardcoded in app/(frontend)/page.tsx and its home/* components, as blocks.
//
// A few sections lose minor visual fidelity because the block schemas don't
// (yet) model every bespoke effect the original components had — these are
// intentional, accepted trade-offs so the whole homepage can move to the CMS
// without a much larger block-schema effort:
//  - Intro and Philosophy each had two RevealText headlines in two different
//    colours; textSection's single "feature" headline (split on "|") renders
//    all lines in one colour instead.
//  - Craft's 3-line RevealText headline becomes a single plain heading
//    (imageText has no multi-line headline field), and its image is left
//    blank pending a real upload.
//  - The Process teaser's sticky-scroll/IntersectionObserver active-step
//    highlighting is not reproduced; stageList renders all steps statically,
//    preceded by a plain textSection standing in for its section heading
//    (stageList has no block-level heading of its own).
//  - The WhyElpis teaser's two-line "DESIGN CLARITY. / BUILD ACCOUNTABILITY."
//    headline becomes one line (numberedList's headline field is single-line).
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/" } },
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  await payload.create({
    collection: "pages",
    data: {
      title: "Home",
      path: "/",
      status: "published",
      seo: {
        metaTitle: "Elpis.co | Interior Design & Renovation",
        metaDescription:
          "Elpis.co is an interior design, renovation and design & build studio based in Shah Alam, Malaysia. Spaces shaped around the way you live.",
      },
      layout: [
        {
          blockType: "homeHero",
          eyebrow: "INTERIOR DESIGN · RENOVATION · DESIGN & BUILD",
          headlineLines: [{ line: "SPACES" }, { line: "SHAPED" }, { line: "AROUND YOU." }],
          primaryCtaLabel: "BOOK A CONSULTATION",
          primaryCtaHref: "/start-a-project",
          secondaryCtaLabel: "VIEW SELECTED WORK",
          secondaryCtaHref: "/projects",
          locationLine: "SHAH ALAM · MALAYSIA",
        },
        {
          blockType: "textSection",
          background: "warm-white",
          label: "01 / Elpis",
          emphasis: "feature",
          align: "left",
          headline: "WE DON'T SIMPLY|RENOVATE HOMES.|WE SHAPE HOW|THEY ARE LIVED IN.",
          body: "Elpis is a design-led interior and renovation studio creating considered homes across Malaysia. We bring design, planning, construction and project coordination into one clear process — so every decision, material and detail works as part of a complete whole.\n\nFor us, a successful renovation is not defined by how much is added. It is defined by what is resolved.",
          ctaLabel: "DISCOVER ELPIS",
          ctaHref: "/about",
        },
        {
          blockType: "featuredProjects",
          count: 2,
        },
        {
          blockType: "textSection",
          background: "navy",
          label: "OUR PHILOSOPHY",
          emphasis: "feature",
          align: "center",
          headline: "DESIGN WITH|INTENTION.|BUILT WITH|PURPOSE.",
          body: "A home should feel effortless because the difficult decisions have already been considered. We study proportion, movement, light, storage, material and construction as one connected system — creating spaces that look resolved because they are resolved.",
        },
        {
          blockType: "linkList",
          background: "warm-white",
          label: "Our Expertise",
          headline: "OUR EXPERTISE",
          body: "From early planning to final handover, Elpis can lead the entire renovation journey or support the stage your project needs most.",
          items: [
            { number: "01", label: "INTERIOR DESIGN", href: "/services" },
            { number: "02", label: "RENOVATION", href: "/services" },
            { number: "03", label: "DESIGN & BUILD", href: "/services" },
            { number: "04", label: "CUSTOM CABINETRY", href: "/services" },
            { number: "05", label: "PROJECT MANAGEMENT", href: "/services" },
          ],
          ctaLabel: "EXPLORE OUR SERVICES",
          ctaHref: "/services",
        },
        {
          blockType: "imageText",
          background: "soft-white",
          imagePosition: "left",
          label: "Craft",
          headline: "THE DIFFERENCE IS IN WHAT GETS RESOLVED.",
          body: "The quality of a home often lives in the details that are easiest to overlook — the alignment of a shadow gap, the proportion of a cabinet, the transition between two materials, the warmth of a light source, the way a door closes.\n\nWe treat these decisions as part of the architecture, not decoration added at the end.",
        },
        {
          blockType: "numberedList",
          background: "soft-white",
          label: "Why Elpis",
          headline: "DESIGN CLARITY. BUILD ACCOUNTABILITY.",
          columns: "2",
          items: [
            { number: "01", title: "DESIGN-LED THINKING", body: "Every project starts with a clear design rationale rather than a collection of disconnected visual references." },
            { number: "02", title: "ONE COORDINATED PROCESS", body: "Design, renovation, vendors and site execution are coordinated as one project, with clear responsibility from beginning to handover." },
            { number: "03", title: "TRANSPARENT PROJECT STRUCTURE", body: "Scope, key decisions, approvals and project stages are communicated clearly so clients understand what is happening and what comes next." },
            { number: "04", title: "QUALITY CONTROL", body: "We review work throughout construction, not only at handover, with attention to detailing, alignment, finish and overall design intent." },
            { number: "05", title: "DEDICATED MANAGEMENT", body: "A defined point of contact keeps decisions, progress and coordination moving without requiring the homeowner to manage multiple trades independently." },
          ],
          ctaLabel: "WHY CLIENTS WORK WITH ELPIS",
          ctaHref: "/why-elpis",
        },
        {
          blockType: "textSection",
          background: "warm-white",
          label: "How We Work",
          emphasis: "standard",
          align: "left",
          headline: "ONE PROCESS. FROM FIRST IDEA TO FINAL HANDOVER.",
        },
        {
          blockType: "stageList",
          items: [
            { number: "01", title: "DISCOVER", body: "Initial consultation, project objectives, property assessment, budget alignment and scope definition.", background: "warm-white" },
            { number: "02", title: "DEFINE", body: "Space planning, concept direction, mood and material direction, and preliminary design development.", background: "warm-white" },
            { number: "03", title: "DETAIL", body: "Detailed design, cabinetry design, material selection, lighting direction and quotation alignment.", background: "warm-white" },
            { number: "04", title: "BUILD", body: "Site mobilisation, construction, project coordination, progress updates and quality reviews.", background: "warm-white" },
            { number: "05", title: "DELIVER", body: "Final inspection, defect and rectification checks, final detailing, handover and warranty documentation.", background: "warm-white" },
          ],
        },
        {
          blockType: "marquee",
          text: "SELECTED WORK",
        },
        {
          blockType: "testimonialsGrid",
          background: "warm-white",
          label: "Client Perspective",
          headlineLines: [{ line: "TRUST IS BUILT" }, { line: "THROUGH THE PROCESS." }],
          ctaLabel: "READ WHY CLIENTS CHOOSE ELPIS",
          ctaHref: "/why-elpis",
          maxItems: 2,
        },
        {
          blockType: "ctaBanner",
          label: "Start a Project",
          headlineLines: [{ line: "PLANNING A" }, { line: "SIGNIFICANT" }, { line: "RENOVATION?" }],
          body: "We work best with clients who value design, thoughtful planning and a properly managed build. Tell us about your property, intended scope and investment range, and our team will review whether Elpis is the right fit for your project.",
          buttonLabel: "BOOK A CONSULTATION",
          buttonHref: "/start-a-project",
          showWhatsappButton: true,
          whatsappButtonLabel: "CONTINUE ON WHATSAPP",
        },
      ],
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const existing = await payload.find({
    collection: "pages",
    where: { path: { equals: "/" } },
    limit: 1,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "pages", id: doc.id });
  }
}
