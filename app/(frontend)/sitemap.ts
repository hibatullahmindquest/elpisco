import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

const BASE_URL = "https://elpisco.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/services",
    "/process",
    "/why-elpis",
    "/faq",
    "/contact",
    "/careers",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
