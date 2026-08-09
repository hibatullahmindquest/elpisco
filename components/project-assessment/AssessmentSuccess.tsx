import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export function AssessmentSuccess() {
  return (
    <div style={{ textAlign: "center", maxWidth: 560, marginInline: "auto" }}>
      <SectionLabel theme="dark">Project Received</SectionLabel>
      <div style={{ marginTop: 20 }}>
        <RevealText
          as="h1"
          className="h-section"
          immediate
          lines={["THANK YOU.", "WE'LL REVIEW", "THE DETAILS."]}
          style={{ color: "var(--soft-white)", textAlign: "center", fontSize: "clamp(36px, 6vw, 88px)" }}
        />
      </div>
      <p
        className="body-copy"
        style={{ marginTop: 28, color: "rgba(244,241,234,0.65)", marginInline: "auto", maxWidth: 460 }}
      >
        Your project information has been received. Our team will review the property, scope,
        investment range and intended timing before contacting you regarding the appropriate next
        step.
      </p>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
        <AnimatedLink href="/" variant="solid-invert">
          RETURN HOME
        </AnimatedLink>
        <AnimatedLink href="/projects" style={{ color: "var(--soft-white)" }}>
          VIEW SELECTED WORK
        </AnimatedLink>
      </div>
    </div>
  );
}
