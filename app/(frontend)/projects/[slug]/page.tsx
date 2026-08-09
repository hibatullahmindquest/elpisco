import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getProject, getProjects } from "@/lib/projects";
import { getProjectMetadata, getProjectJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return getProjectMetadata(slug, {
    title: project.title,
    description: project.description,
    imageUrl: project.hero,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const jsonLd = await getProjectJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section
        data-nav-theme="light"
        style={{
          background: "var(--warm-white)",
          paddingTop: "calc(var(--header-h) + clamp(40px, 8vw, 80px))",
          paddingBottom: "clamp(40px, 6vw, 64px)",
        }}
      >
        <div className="container">
          <SectionLabel>{`0${index + 1} / ${project.type}`}</SectionLabel>
          <RevealText
            as="h1"
            className="h-project"
            lines={project.title.split(" ")}
            style={{ color: "var(--ink)", marginTop: 14 }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            <span className="label" style={{ color: "var(--champagne-ink)" }}>{project.location}</span>
            <span className="label" style={{ color: "var(--muted)" }}>{project.year}</span>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--warm-white)" }}>
        <ParallaxImage src={project.hero} alt={`${project.title} interior, full view`} aspect="16 / 9" priority sizes="100vw" />
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(56px, 9vw, 100px)" }}>
        <div className="container grid-12" style={{ rowGap: 40 }}>
          <div className="col-line-1-6">
            <p className="h-medium" style={{ color: "var(--ink)", fontSize: "clamp(26px, 3vw, 40px)" }}>
              {project.description}
            </p>
          </div>
          <div className="col-line-8-end">
            <ProjectMeta
              items={[
                { label: "Type", value: project.type },
                { label: "Location", value: project.location },
                { label: "Scope", value: project.scope },
                { label: "Year", value: project.year },
                { label: "Services", value: project.services },
              ]}
            />
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBottom: "clamp(56px, 9vw, 100px)" }}>
        <div className="container">
          <ParallaxImage
            src="/images/details/material-detail.jpg"
            alt="Material and finishing detail from the project"
            aspect="21 / 9"
            parallax
            sizes="96vw"
          />
          <p className="label" style={{ color: "var(--champagne-ink)", marginTop: 16 }}>
            Material &amp; finishing detail
          </p>
        </div>
      </section>

      <section
        data-nav-theme="dark"
        style={{
          background: "var(--navy)",
          paddingBlock: "clamp(64px, 10vw, 120px)",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p className="label" style={{ color: "var(--champagne)" }}>Next project</p>
            <Link href={`/projects/${next.slug}`} className="h-section" style={{ color: "var(--soft-white)", marginTop: 12, display: "block" }}>
              {next.title}
            </Link>
          </div>
          <AnimatedLink href="/contact" variant="solid-invert">START A PROJECT</AnimatedLink>
        </div>
      </section>
    </>
  );
}
