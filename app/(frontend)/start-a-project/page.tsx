import type { Metadata } from "next";
import { ProjectAssessment } from "@/components/project-assessment/ProjectAssessment";
import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/start-a-project", {
    title: "Start a Project",
    description:
      "Tell Elpis about your property, renovation scope, investment range and intended timeline to begin a project consultation.",
  });
}

export default function StartAProjectPage() {
  return <ProjectAssessment />;
}
