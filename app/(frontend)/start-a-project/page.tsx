import type { Metadata } from "next";
import { ProjectAssessment } from "@/components/project-assessment/ProjectAssessment";
import { getPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/start-a-project", {
    title: "Start a Project",
    description:
      "Tell Elpis about your property, renovation scope, investment range and intended timeline to begin a project consultation.",
  });
}

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Start a Project", path: "/start-a-project" },
]);

export default function StartAProjectPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ProjectAssessment />
    </>
  );
}
