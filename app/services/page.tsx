import type { Metadata } from "next";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior design, renovation & build, space planning and project management, from Elpis.co.",
};

const SERVICES = [
  {
    n: "01",
    title: "INTERIOR DESIGN",
    covers:
      "Spatial planning, material direction, lighting and a considered palette resolved down to the smallest detail.",
    who: "For homeowners who want a coherent design vision before a single wall moves.",
    image: "/images/hero/main.jpg",
  },
  {
    n: "02",
    title: "RENOVATION & BUILD",
    covers:
      "Full or partial renovation, structural coordination and on-site execution, managed from first day to handover.",
    who: "For homeowners renovating an existing property who want one studio accountable for design and build.",
    image: "/images/projects/serene-residence/hero.jpg",
  },
  {
    n: "03",
    title: "SPACE PLANNING",
    covers:
      "Layout studies, flow and proportion, storage strategy and furniture planning tailored to how a home is actually used.",
    who: "For homeowners reworking layout before committing to a full design and build scope.",
    image: "/images/projects/modern-sanctuary/hero.jpg",
  },
  {
    n: "04",
    title: "PROJECT MANAGEMENT",
    covers:
      "Coordination between design, contractors and vendors, with progress updates and quality control throughout.",
    who: "For homeowners who want a single point of contact from concept through to completion.",
    image: "/images/details/material-detail.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section
        data-nav-theme="light"
        style={{
          background: "var(--warm-white)",
          paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
          paddingBottom: "clamp(48px, 8vw, 88px)",
        }}
      >
        <div className="container">
          <SectionLabel>What we do</SectionLabel>
          <RevealText as="h1" className="h-hero" lines={["OUR", "EXPERTISE"]} style={{ color: "var(--ink)", marginTop: 14 }} />
        </div>
      </section>

      {SERVICES.map((service, i) => (
        <section
          key={service.n}
          data-nav-theme="light"
          style={{ background: i % 2 === 0 ? "var(--warm-white)" : "var(--soft-white)", paddingBlock: "clamp(56px, 9vw, 100px)" }}
        >
          <div className="container grid-12" style={{ alignItems: "center", rowGap: 40 }}>
            <div className={i % 2 === 0 ? "col-line-1-6" : "col-line-7-end"} style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <ParallaxImage src={service.image} alt={`${service.title} by Elpis.co`} aspect="4 / 3" sizes="(max-width: 900px) 100vw, 48vw" />
            </div>
            <div className={i % 2 === 0 ? "col-line-8-end" : "col-line-1-5"} style={{ order: i % 2 === 0 ? 2 : 1 }}>
              <SectionLabel>{`${service.n} / Service`}</SectionLabel>
              <h2 className="h-medium" style={{ color: "var(--ink)", marginTop: 12 }}>
                {service.title}
              </h2>
              <p className="body-copy" style={{ marginTop: 20, maxWidth: 380 }}>
                {service.covers}
              </p>
              <p className="body-copy" style={{ marginTop: 14, maxWidth: 380, color: "var(--champagne-ink)" }}>
                {service.who}
              </p>
              <div style={{ marginTop: 28 }}>
                <AnimatedLink href="/contact">START A PROJECT</AnimatedLink>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
