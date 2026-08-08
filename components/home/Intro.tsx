import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Intro() {
  return (
    <section
      data-nav-theme="light"
      style={{ background: "var(--warm-white)", paddingBlock: "clamp(96px, 16vw, 200px)" }}
    >
      <div className="container grid-12">
        <div className="col-line-label">
          <SectionLabel>01 / Studio</SectionLabel>
        </div>

        <div className="col-line-4-end">
          <RevealText
            as="h2"
            className="h-section"
            lines={["WE DON'T SIMPLY", "RENOVATE HOMES."]}
            style={{ color: "var(--ink)" }}
          />
          <RevealText
            as="h2"
            className="h-section"
            lines={["WE RESHAPE", "THE WAY YOU LIVE."]}
            style={{ color: "var(--champagne-ink)", marginTop: "0.15em" }}
            delay={0.15}
          />

          <p
            className="body-copy"
            style={{ marginTop: "clamp(40px, 6vw, 72px)", maxWidth: 420, marginLeft: "auto" }}
          >
            Elpis creates considered residential spaces through interior design, renovation and
            build. Every project is shaped around proportion, material, detail and the everyday
            rituals of the people who live there.
          </p>
        </div>
      </div>
    </section>
  );
}
