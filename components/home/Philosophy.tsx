import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Philosophy() {
  return (
    <section
      data-nav-theme="dark"
      style={{ background: "var(--navy)", paddingBlock: "clamp(96px, 16vw, 220px)" }}
    >
      <div className="container grid-12">
        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          <SectionLabel theme="dark">OUR PHILOSOPHY</SectionLabel>

          <div style={{ marginTop: 24, display: "inline-block" }}>
            <RevealText
              as="h2"
              className="h-section"
              lines={["DESIGN WITH", "INTENTION."]}
              style={{ color: "var(--soft-white)", textAlign: "center" }}
            />
            <RevealText
              as="h2"
              className="h-section"
              lines={["BUILT WITH", "PURPOSE."]}
              style={{ color: "var(--champagne)", textAlign: "center", marginTop: "0.1em" }}
              delay={0.15}
            />
          </div>

          <p
            className="body-copy"
            style={{
              marginInline: "auto",
              marginTop: "clamp(40px, 6vw, 64px)",
              maxWidth: 480,
              color: "rgba(244,241,234,0.65)",
            }}
          >
            We believe a well-designed home should feel effortless. From spatial planning to
            material selection and site execution, every decision is made to create clarity,
            comfort and lasting value.
          </p>
        </div>
      </div>
    </section>
  );
}
