import type { Metadata } from "next";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { getPageByPath } from "@/lib/pages";
import { JsonLd } from "@/components/seo/JsonLd";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/services", {
    title: "Services | Interior Design, Renovation & Design Build",
    description:
      "Interior design, renovation, design & build, custom cabinetry and project management, from Elpis.co.",
  });
}

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

const SERVICES = [
  {
    n: "01",
    title: "INTERIOR DESIGN",
    intro:
      "A complete design direction developed around the property, the people living in it and the way each space needs to perform.",
    scope: [
      "Design consultation",
      "Site study",
      "Space planning",
      "Concept development",
      "Mood and visual direction",
      "Material and finish selection",
      "Lighting direction",
      "Furniture planning",
      "Custom joinery design",
      "Design detailing",
      "3D visualisation where included in scope",
      "Documentation",
    ],
    suited: "Owners who want the design properly resolved before construction begins.",
    highlight: null,
    image: "/images/hero/main.jpg",
  },
  {
    n: "02",
    title: "RENOVATION",
    intro:
      "From major interior transformation to comprehensive property renovation, we coordinate execution with close attention to buildability, workmanship and design intent.",
    scope: [
      "Demolition",
      "Masonry and wet works",
      "Ceiling and partition works",
      "Electrical",
      "Plumbing",
      "Tiling / stone works",
      "Flooring",
      "Painting",
      "Carpentry installation",
      "Doors and glazing",
      "Selected M&E coordination",
      "Finishing",
      "Rectification and handover",
    ],
    suited: "Existing homes requiring significant transformation, upgrading or reconfiguration.",
    highlight: null,
    image: "/images/projects/serene-residence/hero.jpg",
  },
  {
    n: "03",
    title: "DESIGN & BUILD",
    intro:
      "One integrated appointment covering design development and site delivery. By keeping key decisions within one coordinated team, the design can be developed with construction realities in mind and site execution can be measured against a clear creative direction.",
    scope: [],
    suited: "Clients who prefer one accountable partner from concept to handover.",
    highlight: "ONE VISION. ONE COORDINATED TEAM. ONE COMPLETE DELIVERY.",
    image: "/images/projects/modern-sanctuary/hero.jpg",
  },
  {
    n: "04",
    title: "CUSTOM CABINETRY",
    intro:
      "Joinery designed as part of the room rather than added to it. We develop cabinetry around function, proportion, storage behaviour, material, hardware and architectural alignment.",
    scope: [
      "Kitchens",
      "Wardrobes",
      "TV / living storage",
      "Study and home office",
      "Vanity units",
      "Display cabinetry",
      "Concealed storage",
      "Feature joinery",
    ],
    suited: null,
    highlight: null,
    image: "/images/details/material-detail.jpg",
  },
  {
    n: "05",
    title: "PROJECT MANAGEMENT",
    intro:
      "Renovation involves hundreds of connected decisions. Our role is to keep those decisions moving in the right sequence while maintaining visibility across programme, site coordination and quality.",
    scope: [
      "Project planning",
      "Site coordination",
      "Vendor coordination",
      "Work sequencing",
      "Progress tracking",
      "Client updates",
      "Design clarification",
      "Quality inspections",
      "Rectification tracking",
      "Handover coordination",
    ],
    suited: null,
    highlight: null,
    image: "/images/projects/coastal-retreat/hero.jpg",
  },
];

export default async function ServicesPage() {
  const cmsPage = await getPageByPath("/services");

  if (cmsPage?.layout && cmsPage.layout.length > 0) {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd} />
        <RenderBlocks blocks={cmsPage.layout} />
      </>
    );
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
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
          <RevealText
            as="h1"
            className="h-hero"
            lines={["FROM SPACE", "TO STRUCTURE", "TO FINISH."]}
            style={{ color: "var(--ink)", marginTop: 14 }}
          />
          <p className="body-copy" style={{ marginTop: 24, maxWidth: 460 }}>
            Elpis provides an integrated range of design and renovation services for homeowners
            who want fewer handovers, clearer accountability and one coherent result.
          </p>
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
              <p className="body-copy" style={{ marginTop: 20, maxWidth: 420 }}>
                {service.intro}
              </p>

              {service.highlight && (
                <p className="label" style={{ marginTop: 20, color: "var(--champagne-ink)" }}>
                  {service.highlight}
                </p>
              )}

              {service.scope.length > 0 && (
                <p className="body-copy" style={{ marginTop: 20, maxWidth: 420, fontSize: 13 }}>
                  {service.scope.join(" · ")}
                </p>
              )}

              {service.suited && (
                <p className="body-copy" style={{ marginTop: 14, maxWidth: 420, color: "var(--champagne-ink)" }}>
                  {service.suited}
                </p>
              )}

              <div style={{ marginTop: 28 }}>
                <AnimatedLink href="/start-a-project">START A PROJECT</AnimatedLink>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section
        data-nav-theme="dark"
        style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
      >
        <div className="container">
          <RevealText
            as="h2"
            className="h-section"
            lines={["NOT SURE WHICH", "SCOPE YOU NEED?"]}
            style={{ color: "var(--soft-white)", textAlign: "center" }}
          />
          <p
            className="body-copy"
            style={{ marginInline: "auto", marginTop: 28, maxWidth: 420, color: "rgba(244,241,234,0.65)" }}
          >
            Start with the property and the outcome you want. We will help determine the most
            appropriate scope during the initial consultation.
          </p>
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href="/start-a-project" variant="solid-invert">
              DISCUSS YOUR PROJECT
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
