import type { Metadata } from "next";
import Link from "next/link";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getProjects } from "@/lib/projects";
import type { Project } from "@/data/projects";
import { getPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/projects", {
    title: "Projects | Selected Interior & Renovation Work",
    description: "A selection of interior design, renovation and design & build projects by Elpis.co.",
  });
}

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Selected Work", path: "/projects" },
]);

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))", paddingBottom: "clamp(48px, 8vw, 88px)" }}>
        <div className="container">
          <SectionLabel>Selected work</SectionLabel>
          <RevealText
            as="h1"
            className="h-hero"
            lines={["HOMES,", "CONSIDERED", "AS A WHOLE."]}
            style={{ color: "var(--ink)", marginTop: 14 }}
          />
          <p className="body-copy" style={{ marginTop: 24, maxWidth: 460 }}>
            A selection of residential projects shaped through design, renovation and detailed
            execution.
          </p>
        </div>
      </section>

      {projects.map((project, i) => (
        <ProjectRow key={project.slug} project={project} index={i + 1} layout={(i % 3) as 0 | 1 | 2} />
      ))}
    </>
  );
}

function ProjectRow({
  project,
  index,
  layout,
}: {
  project: Project;
  index: number;
  layout: 0 | 1 | 2;
}) {
  const meta = (
    <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
      <span className="label" style={{ color: "var(--champagne-ink)" }}>{project.location}</span>
      <span className="label" style={{ color: "var(--muted)" }}>{project.type}</span>
      <span className="label" style={{ color: "var(--muted)" }}>{project.year}</span>
    </div>
  );

  const title = (
    <h2 className="h-project" style={{ color: "var(--ink)" }}>
      {project.title.split(" ").map((w, i) => (
        <span key={i} style={{ display: "block" }}>
          {w}
        </span>
      ))}
    </h2>
  );

  if (layout === 0) {
    return (
      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(48px, 8vw, 96px)" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 24 }}>
            <div>
              <SectionLabel>{`0${index} / ${project.type}`}</SectionLabel>
              <div style={{ marginTop: 12 }}>{title}</div>
            </div>
            {meta}
          </div>
          <Link href={`/projects/${project.slug}`} className="project-link" data-cursor="view" style={{ display: "block" }}>
            <ParallaxImage src={project.hero} alt={`${project.title} interior`} aspect="16 / 9" sizes="90vw" />
          </Link>
        </div>
      </section>
    );
  }

  if (layout === 1) {
    return (
      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(48px, 8vw, 96px)" }}>
        <div className="container grid-12" style={{ rowGap: 32 }}>
          <div className="col-line-1-4">
            <Link href={`/projects/${project.slug}`} className="project-link" data-cursor="view" style={{ display: "block" }}>
              <ParallaxImage src={project.hero} alt={`${project.title} interior`} aspect="3 / 4" sizes="(max-width: 900px) 100vw, 33vw" />
            </Link>
          </div>
          <div className="col-line-6-end" style={{ alignSelf: "center" }}>
            <SectionLabel>{`0${index} / ${project.type}`}</SectionLabel>
            <div style={{ marginTop: 12 }}>{title}</div>
            <div style={{ marginTop: 28 }}>{meta}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(48px, 8vw, 96px)" }}>
      <div className="container">
        <SectionLabel>{`0${index} / ${project.type}`}</SectionLabel>
        <div style={{ marginTop: 12, marginBottom: 32 }}>{title}</div>
        <Link href={`/projects/${project.slug}`} className="project-link" data-cursor="view" style={{ display: "block", width: "96%" }}>
          <ParallaxImage src={project.hero} alt={`${project.title} interior`} aspect="21 / 9" sizes="96vw" />
        </Link>
        <div style={{ marginTop: 24 }}>{meta}</div>
      </div>
    </section>
  );
}
