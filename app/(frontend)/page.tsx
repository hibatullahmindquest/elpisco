import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { Philosophy } from "@/components/home/Philosophy";
import { Services } from "@/components/home/Services";
import { Craft } from "@/components/home/Craft";
import { Process } from "@/components/home/Process";
import { Marquee } from "@/components/home/Marquee";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Intro />
      {projects[0] && <FeaturedProject project={projects[0]} index={1} variant="a" />}
      {projects[1] && <FeaturedProject project={projects[1]} index={2} variant="b" />}
      <Philosophy />
      <Services />
      <Craft />
      <Process />
      <Marquee />
      <FinalCTA />
    </>
  );
}
