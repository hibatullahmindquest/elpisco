import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getPageMetadata } from "@/lib/seo";
import { getOpenCareers } from "@/lib/careers";
import { getSiteSettings } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/careers", {
    title: "Careers",
    description: "Elpis is growing a team around design quality, technical discipline and responsible project delivery.",
  });
}

export default async function CareersPage() {
  const [roles, settings] = await Promise.all([getOpenCareers(), getSiteSettings()]);

  return (
    <>
      <section
        data-nav-theme="light"
        style={{
          background: "var(--warm-white)",
          paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
          paddingBottom: "clamp(48px, 8vw, 88px)",
        }}
      >
        <div className="container grid-12">
          <div className="col-line-label">
            <SectionLabel>Careers</SectionLabel>
          </div>
          <div className="col-line-4-end">
            <RevealText as="h1" className="h-hero" lines={["BUILD GOOD", "WORK WITH US."]} style={{ color: "var(--ink)" }} />
            <p className="body-copy" style={{ marginTop: 28, maxWidth: 460 }}>
              Elpis is growing a team around design quality, technical discipline and responsible
              project delivery.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(56px, 9vw, 100px)" }}>
        <div className="container grid-12" style={{ rowGap: 32 }}>
          <div className="col-line-1-5">
            <h2 className="h-medium" style={{ color: "var(--ink)" }}>
              Small team. High standard.
            </h2>
          </div>
          <div className="col-line-7-end">
            <p className="body-copy" style={{ maxWidth: 460 }}>
              We value people who care about the work beyond what is visible in a presentation —
              people who notice details, communicate clearly, solve problems calmly and take
              ownership through execution.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container">
          <SectionLabel>Open Roles</SectionLabel>

          {roles.length > 0 ? (
            <div style={{ marginTop: 32 }}>
              {roles.map((role) => {
                const meta = [role.department, role.location, role.employmentType].filter(Boolean).join(" · ");
                const applyHref = `mailto:${role.applyEmail || settings.email}?subject=${encodeURIComponent(
                  `Application: ${role.jobTitle}`
                )}`;
                return (
                  <div
                    key={role.slug}
                    className="grid-12"
                    style={{ borderTop: "1px solid var(--line)", paddingBlock: 32, alignItems: "start", rowGap: 16 }}
                  >
                    <div className="col-line-1-6">
                      <h3 className="h-medium" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", color: "var(--ink)" }}>
                        {role.jobTitle}
                      </h3>
                      {meta && (
                        <p className="label" style={{ color: "var(--champagne-ink)", marginTop: 10 }}>
                          {meta}
                        </p>
                      )}
                    </div>
                    <div className="col-line-7-end" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {role.summary && <p className="body-copy" style={{ maxWidth: 460 }}>{role.summary}</p>}
                      <div>
                        <a href={applyHref} className="cta">
                          <span className="cta-label">APPLY FOR THIS ROLE</span>
                          <span className="cta-arrow" aria-hidden="true">
                            &#8599;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid var(--line)" }} />
            </div>
          ) : (
            <div style={{ marginTop: 32, maxWidth: 480 }}>
              <p className="body-copy">
                No open roles right now. We are always interested in thoughtful designers, builders
                and project people. Send a concise portfolio and introduction for future
                consideration.
              </p>
              <div style={{ marginTop: 24 }}>
                <a href={`mailto:${settings.email}?subject=${encodeURIComponent("Introduction")}`} className="cta">
                  <span className="cta-label">INTRODUCE YOURSELF</span>
                  <span className="cta-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        data-nav-theme="dark"
        style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
      >
        <div className="container">
          <RevealText
            as="h2"
            className="h-section"
            lines={["HAVE A PROPERTY", "IN MIND?"]}
            style={{ color: "var(--soft-white)", textAlign: "center" }}
          />
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href="/contact" variant="solid-invert">
              START A PROJECT
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
