import Link from "next/link";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export function Footer() {
  return (
    <footer data-nav-theme="dark" style={{ background: "var(--navy)", color: "var(--soft-white)" }}>
      <div className="container" style={{ paddingBlock: "clamp(64px, 10vw, 120px) 40px" }}>
        <div
          className="grid-12"
          style={{ rowGap: 48 }}
        >
          <div style={{ gridColumn: "span 4" }}>
            <p className="label" style={{ color: "var(--champagne)", marginBottom: 18 }}>
              ELPIS.CO
            </p>
            <p style={{ color: "rgba(244,241,234,0.7)", fontSize: 15, lineHeight: 1.6, maxWidth: 260 }}>
              Interior design, renovation and design &amp; build, based in Shah Alam, Malaysia.
            </p>
          </div>

          <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="label" style={{ color: "var(--champagne)", marginBottom: 8 }}>
              STUDIO
            </p>
            <span style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>Shah Alam, Malaysia</span>
          </div>

          <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="label" style={{ color: "var(--champagne)", marginBottom: 8 }}>
              CONNECT
            </p>
            <a href="[INSTAGRAM_URL]" style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>
              Instagram
            </a>
            <a href="[WHATSAPP_URL]" style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>
              WhatsApp
            </a>
            <a href="mailto:[EMAIL_ADDRESS]" style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>
              [EMAIL_ADDRESS]
            </a>
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <AnimatedLink href="/contact">START A PROJECT</AnimatedLink>
        </div>

        <div
          style={{
            marginTop: "clamp(24px, 6vw, 56px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            borderTop: "1px solid var(--line-on-navy)",
            paddingTop: 24,
          }}
        >
          <p style={{ color: "rgba(244,241,234,0.5)", fontSize: 12, letterSpacing: "0.05em" }}>
            &copy; 2026 ELPIS.CO
          </p>
          <Link href="/" className="label" style={{ color: "rgba(244,241,234,0.5)" }}>
            BACK TO TOP
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          overflow: "hidden",
          lineHeight: 0.75,
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <span
          className="h-hero"
          style={{
            display: "inline-block",
            fontSize: "clamp(120px, 22vw, 340px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(244,241,234,0.16)",
            transform: "translateY(18%)",
          }}
        >
          ELPIS
        </span>
      </div>
    </footer>
  );
}
