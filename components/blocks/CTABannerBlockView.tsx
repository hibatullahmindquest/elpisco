import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getSiteSettings } from "@/lib/siteSettings";

export async function CTABannerBlockView({
  label,
  headlineLines,
  body,
  buttonLabel,
  buttonHref,
  showWhatsappButton,
  whatsappButtonLabel,
}: {
  label?: string | null;
  headlineLines?: { line: string }[] | null;
  body?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
  showWhatsappButton?: boolean | null;
  whatsappButtonLabel?: string | null;
}) {
  const lines = (headlineLines ?? []).map((l) => l.line);
  if (lines.length === 0) return null;

  const settings = showWhatsappButton ? await getSiteSettings() : null;

  return (
    <section
      data-nav-theme="dark"
      style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
    >
      <div className="container">
        {label && (
          <div style={{ marginBottom: 20 }}>
            <SectionLabel theme="dark">{label}</SectionLabel>
          </div>
        )}
        <RevealText as="h2" className="h-section" lines={lines} style={{ color: "var(--soft-white)", textAlign: "center" }} />
        {body && (
          <p
            className="body-copy"
            style={{ marginInline: "auto", marginTop: "clamp(28px, 4vw, 40px)", maxWidth: 480, color: "rgba(244,241,234,0.65)" }}
          >
            {body}
          </p>
        )}
        {(buttonLabel || (showWhatsappButton && settings)) && (
          <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {buttonLabel && buttonHref && (
              <AnimatedLink href={buttonHref} variant="solid-invert">
                {buttonLabel}
              </AnimatedLink>
            )}
            {showWhatsappButton && settings && whatsappButtonLabel && (
              <AnimatedLink href={settings.whatsappUrl} external style={{ color: "var(--soft-white)" }}>
                {whatsappButtonLabel}
              </AnimatedLink>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
