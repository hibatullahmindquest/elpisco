import Link from "next/link";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

const SERVICES = [
  { n: "01", label: "INTERIOR DESIGN" },
  { n: "02", label: "RENOVATION" },
  { n: "03", label: "DESIGN & BUILD" },
  { n: "04", label: "CUSTOM CABINETRY" },
  { n: "05", label: "PROJECT MANAGEMENT" },
];

export function Services() {
  return (
    <section
      data-nav-theme="light"
      style={{ background: "var(--warm-white)", paddingBlock: "clamp(80px, 12vw, 140px)" }}
    >
      <div className="container">
        <SectionLabel>Our Expertise</SectionLabel>
        <RevealText as="h2" className="h-medium" lines={["OUR EXPERTISE"]} style={{ color: "var(--ink)", marginTop: 14 }} />
        <p className="body-copy" style={{ marginTop: 20, maxWidth: 460 }}>
          From early planning to final handover, Elpis can lead the entire renovation journey or
          support the stage your project needs most.
        </p>

        <div style={{ marginTop: "clamp(40px, 6vw, 64px)" }}>
          {SERVICES.map((s) => (
            <Link key={s.n} href="/services" className="row-link">
              <span style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
                <span className="row-number">{s.n}</span>
                <span className="row-title h-medium" style={{ fontSize: "clamp(24px, 3.4vw, 44px)", color: "var(--ink)" }}>
                  {s.label}
                </span>
              </span>
              <span className="row-arrow" aria-hidden="true" style={{ fontSize: 22, color: "var(--muted)" }}>
                &#8599;
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
          <AnimatedLink href="/services">EXPLORE OUR SERVICES</AnimatedLink>
        </div>
      </div>
    </section>
  );
}
