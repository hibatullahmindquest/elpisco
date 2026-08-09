import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

const REASONS = [
  {
    n: "01",
    title: "DESIGN-LED THINKING",
    body: "Every project starts with a clear design rationale rather than a collection of disconnected visual references.",
  },
  {
    n: "02",
    title: "ONE COORDINATED PROCESS",
    body: "Design, renovation, vendors and site execution are coordinated as one project, with clear responsibility from beginning to handover.",
  },
  {
    n: "03",
    title: "TRANSPARENT PROJECT STRUCTURE",
    body: "Scope, key decisions, approvals and project stages are communicated clearly so clients understand what is happening and what comes next.",
  },
  {
    n: "04",
    title: "QUALITY CONTROL",
    body: "We review work throughout construction, not only at handover, with attention to detailing, alignment, finish and overall design intent.",
  },
  {
    n: "05",
    title: "DEDICATED MANAGEMENT",
    body: "A defined point of contact keeps decisions, progress and coordination moving without requiring the homeowner to manage multiple trades independently.",
  },
];

export function WhyElpis() {
  return (
    <section
      data-nav-theme="light"
      style={{ background: "var(--soft-white)", paddingBlock: "clamp(80px, 12vw, 140px)" }}
    >
      <div className="container">
        <SectionLabel>Why Elpis</SectionLabel>
        <RevealText
          as="h2"
          className="h-medium"
          lines={["DESIGN CLARITY.", "BUILD ACCOUNTABILITY."]}
          style={{ color: "var(--ink)", marginTop: 14 }}
        />

        <div
          style={{
            marginTop: "clamp(40px, 6vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "32px 40px",
          }}
        >
          {REASONS.map((reason) => (
            <div key={reason.n} style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                <span className="label" style={{ color: "var(--champagne-ink)", minWidth: 26 }}>
                  {reason.n}
                </span>
                <div>
                  <p className="h-medium" style={{ fontSize: "clamp(18px, 1.8vw, 22px)", color: "var(--ink)" }}>
                    {reason.title}
                  </p>
                  <p className="body-copy" style={{ marginTop: 10, maxWidth: 320 }}>
                    {reason.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
          <AnimatedLink href="/why-elpis">WHY CLIENTS WORK WITH ELPIS</AnimatedLink>
        </div>
      </div>
    </section>
  );
}
