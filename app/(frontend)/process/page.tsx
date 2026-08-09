import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/process", {
    title: "Process",
    description: "A renovation contains hundreds of decisions. Our process creates a clear order for making them.",
  });
}

const STAGES = [
  {
    n: "01",
    title: "ENQUIRY & CONSULTATION",
    body: "We review your property, location, intended scope, budget range, timeline and overall fit.",
    clientProvides: [
      "Property type / floor plan",
      "Location",
      "Desired scope",
      "Reference images if available",
      "Target investment",
      "Preferred timeline",
    ],
    outcome: "A clearer definition of the project and recommended next step.",
  },
  {
    n: "02",
    title: "SITE STUDY & BRIEF",
    body: "We study the site and translate your requirements into a working brief.",
    clientProvides: [],
    outcome: "Defined priorities, scope parameters and project constraints.",
  },
  {
    n: "03",
    title: "CONCEPT & SPACE PLANNING",
    body: "We develop layout options and the overall creative direction.",
    clientProvides: [],
    outcome: "Approved spatial direction and design language.",
  },
  {
    n: "04",
    title: "DESIGN DEVELOPMENT",
    body: "Materials, cabinetry, lighting and critical details are developed into a coordinated scheme.",
    clientProvides: [],
    outcome: "A design with sufficient clarity for costing and execution.",
  },
  {
    n: "05",
    title: "COSTING & PRE-CONSTRUCTION",
    body: "Project scope, quotation, key selections, programme and execution requirements are aligned before mobilisation.",
    clientProvides: [],
    outcome: "Confirmed build scope and agreed commencement.",
  },
  {
    n: "06",
    title: "CONSTRUCTION",
    body: "Works proceed according to the agreed scope with ongoing coordination and progress reviews.",
    clientProvides: [],
    outcome: "The design is translated into the built space.",
  },
  {
    n: "07",
    title: "INSPECTION & HANDOVER",
    body: "We review the completed work, track rectification items and prepare the property for handover.",
    clientProvides: [],
    outcome: "A completed home and documented closing stage.",
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
          <SectionLabel>The Process</SectionLabel>
          <RevealText
            as="h1"
            className="h-hero"
            lines={["FROM FIRST", "CONVERSATION", "TO HANDOVER."]}
            style={{ color: "var(--ink)", marginTop: 14 }}
          />
          <p className="body-copy" style={{ marginTop: 24, maxWidth: 460 }}>
            A renovation contains hundreds of decisions. Our process creates a clear order for
            making them.
          </p>
        </div>
      </section>

      {STAGES.map((stage, i) => (
        <section
          key={stage.n}
          data-nav-theme="light"
          style={{ background: i % 2 === 0 ? "var(--soft-white)" : "var(--warm-white)", paddingBlock: "clamp(56px, 9vw, 100px)" }}
        >
          <div className="container grid-12" style={{ alignItems: "start", rowGap: 32 }}>
            <div className="col-line-1-5">
              <p className="h-project" style={{ color: "var(--champagne-soft)", fontSize: "clamp(64px, 8vw, 120px)" }}>
                {stage.n}
              </p>
              <h2 className="h-medium" style={{ color: "var(--ink)", marginTop: -8, fontSize: "clamp(24px, 2.8vw, 38px)" }}>
                {stage.title}
              </h2>
            </div>
            <div className="col-line-7-end">
              <p className="body-copy" style={{ maxWidth: 460, fontSize: 17, color: "var(--ink)" }}>
                {stage.body}
              </p>

              {stage.clientProvides.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <p className="label" style={{ color: "var(--champagne-ink)", marginBottom: 12 }}>
                    Client Provides
                  </p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {stage.clientProvides.map((point) => (
                      <li
                        key={point}
                        className="body-copy"
                        style={{ padding: "14px 0", borderTop: "1px solid var(--line)" }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginTop: 28, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
                <p className="label" style={{ color: "var(--champagne-ink)", marginBottom: 8 }}>
                  Outcome
                </p>
                <p className="body-copy" style={{ maxWidth: 420 }}>
                  {stage.outcome}
                </p>
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
          <RevealText as="h2" className="h-section" lines={["READY TO", "BEGIN?"]} style={{ color: "var(--soft-white)", textAlign: "center" }} />
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href="/start-a-project" variant="solid-invert">
              START A PROJECT
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
