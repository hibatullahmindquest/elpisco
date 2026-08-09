import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/contact/ContactForm";
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

  return (
    <section
      data-nav-theme="light"
      style={{
        background: "var(--warm-white)",
        paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
        paddingBottom: "clamp(64px, 10vw, 120px)",
      }}
    >
      <div className="container">
        <SectionLabel>Start a Project</SectionLabel>
        <RevealText
          as="h1"
          className="h-hero"
          lines={["TELL US", "ABOUT YOUR", "PROPERTY."]}
          style={{ color: "var(--ink)", marginTop: 14 }}
        />
        <p className="body-copy" style={{ marginTop: 24, maxWidth: 480 }}>
          Share a few details about your project. We will review the scope, location, investment
          range and intended timing before getting in touch about the next step.
        </p>

        <div style={{ marginTop: 16 }}>
          <a href={settings.whatsappUrl} className="cta" target="_blank" rel="noopener noreferrer">
            <span className="cta-label">PREFER WHATSAPP? CONTINUE HERE</span>
            <span className="cta-arrow" aria-hidden="true">
              &#8599;
            </span>
          </a>
        </div>

        <div style={{ marginTop: "clamp(48px, 8vw, 80px)", maxWidth: 880 }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
