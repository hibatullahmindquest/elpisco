import Link from "next/link";
import { RevealText } from "@/components/ui/RevealText";

const SERVICES = [
  { n: "01", label: "INTERIOR DESIGN" },
  { n: "02", label: "RENOVATION & BUILD" },
  { n: "03", label: "SPACE PLANNING" },
  { n: "04", label: "PROJECT MANAGEMENT" },
];

export function Services() {
  return (
    <section
      data-nav-theme="light"
      style={{ background: "var(--warm-white)", paddingBlock: "clamp(80px, 12vw, 140px)" }}
    >
      <div className="container">
        <RevealText as="h2" className="h-medium" lines={["OUR EXPERTISE"]} style={{ color: "var(--ink)", marginBottom: "clamp(40px, 6vw, 64px)" }} />

        <div>
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
      </div>
    </section>
  );
}
