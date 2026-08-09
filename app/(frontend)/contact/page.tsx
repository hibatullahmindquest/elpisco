import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getSiteSettings } from "@/lib/siteSettings";
import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/contact", {
    title: "Contact",
    description: "Start a project with Elpis.co. Interior design, renovation and design & build in Shah Alam, Malaysia.",
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

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
          <SectionLabel>Contact</SectionLabel>
          <RevealText
            as="h1"
            className="h-hero"
            lines={["LET'S TALK", "ABOUT YOUR", "PROPERTY."]}
            style={{ color: "var(--ink)", marginTop: 14 }}
          />
          <p className="body-copy" style={{ marginTop: 24, maxWidth: 420 }}>
            For a considered response, tell us about your property, scope and timing through our
            project assessment. Prefer a quick conversation first? Reach us directly below.
          </p>

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            <AnimatedLink href="/start-a-project" variant="solid">
              START A PROJECT
            </AnimatedLink>
            <a href={settings.whatsappUrl} className="cta" target="_blank" rel="noopener noreferrer">
              <span className="cta-label">CONTINUE ON WHATSAPP</span>
              <span className="cta-arrow" aria-hidden="true">
                &#8599;
              </span>
            </a>
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
