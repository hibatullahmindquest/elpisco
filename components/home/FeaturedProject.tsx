import Link from "next/link";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Project } from "@/data/projects";

export function FeaturedProject({
  project,
  index,
  variant,
}: {
  project: Project;
  index: number;
  variant: "a" | "b";
}) {
  const num = String(index).padStart(2, "0");

  if (variant === "a") {
    return (
      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <div>
              <SectionLabel>{`Selected work / ${num}`}</SectionLabel>
              <h3 className="h-project" style={{ color: "var(--ink)", marginTop: 14 }}>
                {project.title.split(" ").map((w, i) => (
                  <span key={i} style={{ display: "block" }}>
                    {w}
                  </span>
                ))}
              </h3>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p className="label" style={{ color: "var(--champagne-ink)" }}>{project.location}</p>
              <p className="label" style={{ color: "var(--muted)", marginTop: 8 }}>{project.type}</p>
              <p className="label" style={{ color: "var(--muted)", marginTop: 8 }}>{project.year}</p>
            </div>
          </div>

          <Link href={`/projects/${project.slug}`} className="project-link" data-cursor="view" style={{ display: "block", marginInline: "auto", width: "clamp(85%, 90vw, 92%)" }}>
            <ParallaxImage src={project.hero} alt={`${project.title} interior`} aspect="16 / 10" parallax sizes="92vw" />
          </Link>
          {project.description && (
            <p className="body-copy" style={{ marginTop: 24, maxWidth: 480 }}>
              {project.description}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
      <div className="container grid-12" style={{ alignItems: "center", rowGap: 40 }}>
        <div className="col-line-1-5" style={{ position: "relative" }}>
          <span
            aria-hidden="true"
            className="h-project"
            style={{
              position: "absolute",
              top: "-0.3em",
              left: "-0.05em",
              color: "transparent",
              WebkitTextStroke: "1px var(--champagne-soft)",
              fontSize: "clamp(64px, 9vw, 140px)",
              zIndex: 0,
            }}
          >
            {num}
          </span>
          <Link href={`/projects/${project.slug}`} className="project-link" data-cursor="view" style={{ display: "block", position: "relative", zIndex: 1 }}>
            <ParallaxImage src={project.hero} alt={`${project.title} interior`} aspect="4 / 5" parallax sizes="(max-width: 900px) 100vw, 40vw" />
          </Link>
        </div>

        <div className="col-line-7-end">
          <SectionLabel>{`Selected work / ${num}`}</SectionLabel>
          <h3 className="h-project" style={{ color: "var(--ink)", marginTop: 14 }}>
            {project.title.split(" ").map((w, i) => (
              <span key={i} style={{ display: "block" }}>
                {w}
              </span>
            ))}
          </h3>
          <div style={{ marginTop: 32, display: "flex", gap: 32 }}>
            <p className="label" style={{ color: "var(--muted)" }}>{project.location}</p>
            <p className="label" style={{ color: "var(--muted)" }}>{project.year}</p>
          </div>
          {project.description && (
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 380 }}>
              {project.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
