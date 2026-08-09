import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/process", {
    title: "Process",
    description: "How Elpis.co works, from first consultation through to handover.",
  });
}

const STEPS = [
  {
    n: "01",
    title: "DISCOVER",
    points: ["Consultation", "Needs", "Property context", "Budget", "Expectations"],
  },
  {
    n: "02",
    title: "DESIGN",
    points: ["Space planning", "Mood direction", "Material direction", "Design refinement", "Quotation alignment"],
  },
  {
    n: "03",
    title: "BUILD",
    points: ["Site execution", "Coordination", "Workmanship", "Progress updates", "Quality control"],
  },
  {
    n: "04",
    title: "DELIVER",
    points: ["Inspection", "Rectification", "Styling", "Handover"],
  },
];

export default function ProcessPage() {
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
          <SectionLabel>Process</SectionLabel>
          <RevealText as="h1" className="h-hero" lines={["HOW WE", "WORK"]} style={{ color: "var(--ink)", marginTop: 14 }} />
        </div>
      </section>

      {STEPS.map((step, i) => (
        <section
          key={step.n}
          data-nav-theme="light"
          style={{ background: i % 2 === 0 ? "var(--soft-white)" : "var(--warm-white)", paddingBlock: "clamp(56px, 9vw, 100px)" }}
        >
          <div className="container grid-12" style={{ alignItems: "start", rowGap: 32 }}>
            <div className="col-line-1-5">
              <p className="h-project" style={{ color: "var(--champagne-soft)", fontSize: "clamp(64px, 8vw, 120px)" }}>
                {step.n}
              </p>
              <h2 className="h-medium" style={{ color: "var(--ink)", marginTop: -8 }}>
                {step.title}
              </h2>
            </div>
            <div className="col-line-7-end">
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {step.points.map((point) => (
                  <li
                    key={point}
                    className="body-copy"
                    style={{
                      color: "var(--ink)",
                      fontSize: 17,
                      padding: "18px 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section
        data-nav-theme="dark"
        style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
      >
        <div className="container">
          <RevealText as="h2" className="h-section" lines={["READY TO", "BEGIN?"]} style={{ color: "var(--soft-white)", textAlign: "center" }} />
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href="/contact" variant="solid-invert">
              START A PROJECT
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
