import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { Philosophy } from "@/components/home/Philosophy";
import { Services } from "@/components/home/Services";
import { Craft } from "@/components/home/Craft";
import { WhyElpis } from "@/components/home/WhyElpis";
import { Process } from "@/components/home/Process";
import { Marquee } from "@/components/home/Marquee";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getProjects } from "@/lib/projects";
import { getPageByPath } from "@/lib/pages";
import { getPageMetadata } from "@/lib/seo";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/", {
    title: "Elpis.co | Interior Design & Renovation",
    description:
      "Elpis.co is an interior design, renovation and design & build studio based in Shah Alam, Malaysia. Spaces shaped around the way you live.",
  });
}

export default async function Home() {
  const page = await getPageByPath("/");

  if (page?.layout && page.layout.length > 0) {
    return <RenderBlocks blocks={page.layout} />;
  }

  const projects = await getProjects();

  return (
    <>
      <Hero
        imageUrl="/images/hero/main.jpg"
        imageAlt="Architectural interior with natural light and considered material palette"
        eyebrow="INTERIOR DESIGN · RENOVATION · DESIGN & BUILD"
        headlineLines={["SPACES", "SHAPED", "AROUND YOU."]}
        primaryCtaLabel="BOOK A CONSULTATION"
        primaryCtaHref="/start-a-project"
        secondaryCtaLabel="VIEW SELECTED WORK"
        secondaryCtaHref="/projects"
        locationLine="SHAH ALAM · MALAYSIA"
      />
      <Intro />
      {projects[0] && <FeaturedProject project={projects[0]} index={1} variant="a" />}
      {projects[1] && <FeaturedProject project={projects[1]} index={2} variant="b" />}
      <Philosophy />
      <Services />
      <Craft />
      <WhyElpis />
      <Process />
      <Marquee />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
