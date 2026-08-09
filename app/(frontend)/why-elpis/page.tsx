import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getPageMetadata } from "@/lib/seo";
import { getTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/why-elpis", {
    title: "Why Elpis",
    description:
      "A premium renovation is not only a question of materials. It is the quality of the thinking, coordination and decisions behind them.",
  });
}

const REASONS = [
  {
    n: "01",
    title: "DESIGN EXPERTISE",
    headline: "A clear idea before the build.",
    body: "We begin by understanding the property and the way you want to live in it. Layout, proportion, material and detail are developed as one direction, giving the project a clear point of view before construction accelerates.",
  },
  {
    n: "02",
    title: "TRANSPARENT PROCESS",
    headline: "Fewer surprises. Clearer decisions.",
    body: "Renovations change as information becomes available, but the process should never feel opaque. We structure approvals, scope, key decisions and communication so clients can understand the project as it progresses.",
  },
  {
    n: "03",
    title: "QUALITY CONTROL",
    headline: "Quality is checked in stages.",
    body: "Good workmanship cannot be inspected into a project at the very end. We review critical stages as work progresses and address detailing, finish and coordination while they can still be corrected properly.",
  },
  {
    n: "04",
    title: "DEDICATED PROJECT MANAGEMENT",
    headline: "One point of accountability.",
    body: "A dedicated project structure reduces fragmented communication between homeowner, designer, contractor and vendors. Decisions are coordinated through the team responsible for the overall outcome.",
  },
  {
    n: "05",
    title: "SELECTIVE PROJECT INTAKE",
    headline: "Attention requires capacity.",
    body: "We intentionally manage the number of projects taken on at any one time. This allows the team to maintain meaningful involvement through design development and construction rather than disappearing after the proposal stage.",
  },
];

export default async function WhyElpisPage() {
  const testimonials = await getTestimonials();

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
        <div className="container grid-12">
          <div className="col-line-label">
            <SectionLabel>Why Elpis</SectionLabel>
          </div>
          <div className="col-line-4-end">
            <RevealText as="h1" className="h-hero" lines={["THE VALUE IS", "IN THE PROCESS."]} style={{ color: "var(--ink)" }} />
            <p className="body-copy" style={{ marginTop: 28, maxWidth: 460 }}>
              A premium renovation is not only a question of materials. It is the quality of the
              thinking, coordination and decisions behind them.
            </p>
          </div>
        </div>
      </section>

      {REASONS.map((reason, i) => (
        <section
          key={reason.n}
          data-nav-theme="light"
          style={{ background: i % 2 === 0 ? "var(--soft-white)" : "var(--warm-white)", paddingBlock: "clamp(56px, 9vw, 100px)" }}
        >
          <div className="container grid-12" style={{ alignItems: "start", rowGap: 32 }}>
            <div className="col-line-1-5">
              <p className="h-project" style={{ color: "var(--champagne-soft)", fontSize: "clamp(64px, 8vw, 120px)" }}>
                {reason.n}
              </p>
              <SectionLabel>{reason.title}</SectionLabel>
            </div>
            <div className="col-line-7-end">
              <h2 className="h-medium" style={{ color: "var(--ink)" }}>
                {reason.headline}
              </h2>
              <p className="body-copy" style={{ marginTop: 20, maxWidth: 460 }}>
                {reason.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container">
          <SectionLabel>Client Perspective</SectionLabel>
          <RevealText
            as="h2"
            className="h-section"
            lines={["TRUST IS BUILT", "THROUGH THE PROCESS."]}
            style={{ color: "var(--ink)", marginTop: 14 }}
          />

          {testimonials.length > 0 ? (
            <div
              style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 40,
              }}
            >
              {testimonials.map((t) => (
                <blockquote key={t.authorName} style={{ margin: 0, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
                  <p className="body-copy" style={{ color: "var(--ink)", fontSize: 18, lineHeight: 1.5 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="label" style={{ marginTop: 18, color: "var(--champagne-ink)" }}>
                    — {t.authorName.toUpperCase()}
                    {t.authorDetail ? `, ${t.authorDetail.toUpperCase()}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <p className="body-copy" style={{ marginTop: 32, maxWidth: 420 }}>
              Client testimonials will appear here once verified. We only publish real, permissioned
              reviews.
            </p>
          )}
        </div>
      </section>

      <section
        data-nav-theme="dark"
        style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
      >
        <div className="container">
          <RevealText
            as="h2"
            className="h-section"
            lines={["PLANNING A", "SIGNIFICANT RENOVATION?"]}
            style={{ color: "var(--soft-white)", textAlign: "center" }}
          />
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href="/start-a-project" variant="solid-invert">
              BOOK A CONSULTATION
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
