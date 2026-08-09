import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export function Intro() {
  return (
    <section
      data-nav-theme="light"
      style={{ background: "var(--warm-white)", paddingBlock: "clamp(96px, 16vw, 200px)" }}
    >
      <div className="container grid-12">
        <div className="col-line-label">
          <SectionLabel>01 / Elpis</SectionLabel>
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
            lines={["WE SHAPE HOW", "THEY ARE LIVED IN."]}
            style={{ color: "var(--champagne-ink)", marginTop: "0.15em" }}
            delay={0.15}
          />

          <p
            className="body-copy"
            style={{ marginTop: "clamp(40px, 6vw, 72px)", maxWidth: 420, marginLeft: "auto" }}
          >
            Elpis is a design-led interior and renovation studio creating considered homes across
            Malaysia. We bring design, planning, construction and project coordination into one
            clear process — so every decision, material and detail works as part of a complete
            whole.
          </p>
          <p className="body-copy" style={{ marginTop: 20, maxWidth: 420, marginLeft: "auto" }}>
            For us, a successful renovation is not defined by how much is added. It is defined by
            what is resolved.
          </p>
          <div style={{ marginTop: 32, textAlign: "right" }}>
            <AnimatedLink href="/about">DISCOVER ELPIS</AnimatedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
