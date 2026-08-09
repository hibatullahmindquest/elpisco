import { AnimatedLink } from "@/components/ui/AnimatedLink";
import type { SiteSettings } from "@/lib/siteSettings";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer data-nav-theme="dark" style={{ background: "var(--navy)", color: "var(--soft-white)" }}>
      <div className="container" style={{ paddingBlock: "clamp(64px, 10vw, 120px) 40px" }}>
        <div
          className="grid-12"
          style={{ rowGap: 48 }}
        >
          <div style={{ gridColumn: "span 4" }}>
            <p className="label" style={{ color: "var(--champagne)", marginBottom: 18 }}>
              {settings.siteName}
            </p>
            <p style={{ color: "rgba(244,241,234,0.7)", fontSize: 15, lineHeight: 1.6, maxWidth: 260 }}>
              {settings.tagline}
            </p>
          </div>

          <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="label" style={{ color: "var(--champagne)", marginBottom: 8 }}>
              STUDIO
            </p>
            <span style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>
              {settings.city}, {settings.country}
            </span>
          </div>

          <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="label" style={{ color: "var(--champagne)", marginBottom: 8 }}>
              CONNECT
            </p>
            <a href={settings.instagramUrl} style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>
              Instagram
            </a>
            <a href={settings.whatsappUrl} style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>
              WhatsApp
            </a>
            <a href={`mailto:${settings.email}`} style={{ color: "rgba(244,241,234,0.7)", fontSize: 15 }}>
              {settings.email}
            </a>
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <AnimatedLink href="/start-a-project">START A PROJECT</AnimatedLink>
        </div>

        <div
          style={{
            marginTop: "clamp(24px, 6vw, 56px)",
            borderTop: "1px solid var(--line-on-navy)",
            paddingTop: 24,
          }}
        >
          <p style={{ color: "rgba(244,241,234,0.5)", fontSize: 12, letterSpacing: "0.05em" }}>
            &copy; {year} {settings.siteName}
          </p>
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
