import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getSiteSettings } from "@/lib/siteSettings";

export async function FinalCTA() {
  const settings = await getSiteSettings();

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
        <SectionLabel theme="dark">Start a Project</SectionLabel>
        <div style={{ marginTop: 20 }}>
          <RevealText
            as="h2"
            className="h-section"
            lines={["PLANNING A", "SIGNIFICANT", "RENOVATION?"]}
            style={{ color: "var(--soft-white)", textAlign: "center" }}
          />
        </div>

        <p
          className="body-copy"
          style={{
            marginInline: "auto",
            marginTop: "clamp(28px, 4vw, 40px)",
            maxWidth: 480,
            color: "rgba(244,241,234,0.65)",
          }}
        >
          We work best with clients who value design, thoughtful planning and a properly managed
          build. Tell us about your property, intended scope and investment range, and our team
          will review whether Elpis is the right fit for your project.
        </p>

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
            BOOK A CONSULTATION
          </AnimatedLink>
          <AnimatedLink href={settings.whatsappUrl} external style={{ color: "var(--soft-white)" }}>
            CONTINUE ON WHATSAPP
          </AnimatedLink>
        </div>
      </div>
    </section>
  );
}
