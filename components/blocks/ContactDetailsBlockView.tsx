import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getSiteSettings } from "@/lib/siteSettings";

export async function ContactDetailsBlockView({
  label,
  headlineLines,
  body,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
}: {
  label?: string | null;
  headlineLines?: { line: string }[] | null;
  body?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
}) {
  const settings = await getSiteSettings();
  const lines = (headlineLines ?? []).map((l) => l.line);

  const details = [
    { label: "Studio", value: `${settings.city}, ${settings.country}` },
    { label: "WhatsApp", value: settings.whatsappUrl, href: settings.whatsappUrl, external: true },
    { label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { label: "Instagram", value: settings.instagramUrl, href: settings.instagramUrl, external: true },
  ];

  return (
    <section
      data-nav-theme="light"
      style={{
        background: "var(--warm-white)",
        paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
        paddingBottom: "clamp(64px, 10vw, 120px)",
      }}
    >
      <div className="container grid-12" style={{ rowGap: 56 }}>
        <div className="col-line-1-6">
          {label && <SectionLabel>{label}</SectionLabel>}
          {lines.length > 0 && <RevealText as="h1" className="h-hero" lines={lines} style={{ color: "var(--ink)", marginTop: 14 }} />}
          {body && (
            <p className="body-copy" style={{ marginTop: 24, maxWidth: 420 }}>
              {body}
            </p>
          )}

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            {primaryCtaLabel && primaryCtaHref && (
              <AnimatedLink href={primaryCtaHref} variant="solid">
                {primaryCtaLabel}
              </AnimatedLink>
            )}
            {secondaryCtaLabel && (
              <a href={settings.whatsappUrl} className="cta" target="_blank" rel="noopener noreferrer">
                <span className="cta-label">{secondaryCtaLabel}</span>
                <span className="cta-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="col-line-8-end">
          <dl style={{ margin: 0, display: "grid", gap: 28 }}>
            {details.map((item) => (
              <div key={item.label} style={{ borderTop: "1px solid var(--line)", paddingTop: 18 }}>
                <dt className="label" style={{ color: "var(--champagne-ink)" }}>
                  {item.label}
                </dt>
                <dd style={{ margin: 0, marginTop: 8 }}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="body-copy"
                      style={{ color: "var(--ink)", fontSize: 18 }}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="body-copy" style={{ color: "var(--ink)", fontSize: 18 }}>
                      {item.value}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
