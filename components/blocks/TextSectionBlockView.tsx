import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { resolveBackground, isDarkBackground, toParagraphs } from "./shared";

export function TextSectionBlockView({
  background,
  label,
  emphasis,
  headline,
  body,
  stats,
  statsDisclaimer,
}: {
  background?: string | null;
  label?: string | null;
  emphasis?: string | null;
  headline?: string | null;
  body?: string | null;
  stats?: { label: string; value: string }[] | null;
  statsDisclaimer?: string | null;
}) {
  const dark = isDarkBackground(background);
  const headingColor = dark ? "var(--soft-white)" : "var(--ink)";
  const bodyColor = dark ? "rgba(244,241,234,0.65)" : undefined;
  const paragraphs = toParagraphs(body);

  return (
    <section
      data-nav-theme={dark ? "dark" : "light"}
      style={{ background: resolveBackground(background), paddingBlock: "clamp(64px, 10vw, 120px)" }}
    >
      <div className="container grid-12" style={{ rowGap: 56 }}>
        <div className="col-line-1-5">
          {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
          {headline &&
            (emphasis === "feature" ? (
              <RevealText
                as="h2"
                className="h-section"
                lines={headline.split("|").map((l) => l.trim())}
                style={{ color: headingColor, marginTop: label ? 14 : 0 }}
              />
            ) : (
              <h2 className="h-medium" style={{ color: headingColor, marginTop: label ? 14 : 0 }}>
                {headline}
              </h2>
            ))}
        </div>
        <div className="col-line-7-end">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="body-copy"
              style={{ marginTop: i === 0 ? 0 : 20, maxWidth: 460, color: bodyColor }}
            >
              {p}
            </p>
          ))}
        </div>
        {stats && stats.length > 0 && (
          <div className="col-line-1-6" style={{ marginTop: 8 }}>
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "28px 24px",
                margin: 0,
              }}
            >
              {stats.map((item) => (
                <div key={item.label} style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                  <dt className="label" style={{ color: "var(--champagne-ink)" }}>
                    {item.label}
                  </dt>
                  <dd className="body-copy" style={{ margin: 0, marginTop: 8, color: "var(--ink)", fontSize: 16 }}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            {statsDisclaimer && (
              <p className="body-copy" style={{ marginTop: 20, fontSize: 13, fontStyle: "italic" }}>
                {statsDisclaimer}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
