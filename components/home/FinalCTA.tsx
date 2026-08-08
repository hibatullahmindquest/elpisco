import { RevealText } from "@/components/ui/RevealText";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export function FinalCTA() {
  return (
    <section
      data-nav-theme="dark"
      style={{
        background: "var(--navy)",
        minHeight: "80svh",
        display: "flex",
        alignItems: "center",
        paddingBlock: "clamp(80px, 12vw, 140px)",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <RevealText
          as="h2"
          className="h-section"
          lines={["READY TO", "REIMAGINE", "YOUR HOME?"]}
          style={{ color: "var(--soft-white)", textAlign: "center" }}
        />

        <div
          style={{
            marginTop: "clamp(40px, 6vw, 64px)",
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <AnimatedLink href="/contact" variant="solid-invert">
            START A PROJECT
          </AnimatedLink>
          <span style={{ display: "inline-flex" }}>
            <AnimatedLinkOnDark href="[WHATSAPP_URL]">CONTINUE ON WHATSAPP</AnimatedLinkOnDark>
          </span>
        </div>
      </div>
    </section>
  );
}

function AnimatedLinkOnDark({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="cta" style={{ color: "var(--soft-white)" }} target="_blank" rel="noopener noreferrer">
      <span className="cta-label">{children}</span>
      <span className="cta-arrow" aria-hidden="true">
        &#8599;
      </span>
    </a>
  );
}
