import { FeaturedProject } from "@/components/home/FeaturedProject";
import { getProjects } from "@/lib/projects";

export async function FeaturedProjectsBlockView({ count }: { count?: number | null }) {
  const projects = await getProjects();
  const featured = projects.slice(0, count ?? 2);

  return (
    <>
      {featured.map((project, i) => (
        <FeaturedProject key={project.slug} project={project} index={i + 1} variant={i % 2 === 0 ? "a" : "b"} />
      ))}
    </>
  );
}
