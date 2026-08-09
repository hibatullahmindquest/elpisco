import { SectionLabel } from "@/components/ui/SectionLabel";
import { getOpenCareers } from "@/lib/careers";
import { getSiteSettings } from "@/lib/siteSettings";
import { resolveBackground, isDarkBackground } from "./shared";

export async function CareersListBlockView({
  background,
  label,
  emptyStateBody,
  emptyStateCtaLabel,
}: {
  background?: string | null;
  label?: string | null;
  emptyStateBody?: string | null;
  emptyStateCtaLabel?: string | null;
}) {
  const [roles, settings] = await Promise.all([getOpenCareers(), getSiteSettings()]);
  const dark = isDarkBackground(background);

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(64px, 10vw, 120px)" }}>
      <div className="container">
        {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}

        {roles.length > 0 ? (
          <div style={{ marginTop: 32 }}>
            {roles.map((role) => {
              const meta = [role.department, role.location, role.employmentType].filter(Boolean).join(" · ");
              const applyHref = `mailto:${role.applyEmail || settings.email}?subject=${encodeURIComponent(`Application: ${role.jobTitle}`)}`;
              return (
                <div
                  key={role.slug}
                  className="grid-12"
                  style={{ borderTop: "1px solid var(--line)", paddingBlock: 32, alignItems: "start", rowGap: 16 }}
                >
                  <div className="col-line-1-6">
                    <h3 className="h-medium" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", color: dark ? "var(--soft-white)" : "var(--ink)" }}>
                      {role.jobTitle}
                    </h3>
                    {meta && (
                      <p className="label" style={{ color: dark ? "var(--champagne)" : "var(--champagne-ink)", marginTop: 10 }}>
                        {meta}
                      </p>
                    )}
                  </div>
                  <div className="col-line-7-end" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {role.summary && (
                      <p className="body-copy" style={{ maxWidth: 460, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
                        {role.summary}
                      </p>
                    )}
                    <div>
                      <a href={applyHref} className="cta" style={dark ? { color: "var(--soft-white)" } : undefined}>
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
            {emptyStateBody && (
              <p className="body-copy" style={{ color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
                {emptyStateBody}
              </p>
            )}
            {emptyStateCtaLabel && (
              <div style={{ marginTop: 24 }}>
                <a
                  href={`mailto:${settings.email}?subject=${encodeURIComponent("Introduction")}`}
                  className="cta"
                  style={dark ? { color: "var(--soft-white)" } : undefined}
                >
                  <span className="cta-label">{emptyStateCtaLabel}</span>
                  <span className="cta-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
