import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { resolveBackground, isDarkBackground, toParagraphs } from "./shared";

export function TextSectionBlockView({
  background,
  label,
  emphasis,
  align,
  headline,
  headlineAccent,
  body,
  stats,
  statsDisclaimer,
  ctaLabel,
  ctaHref,
}: {
  background?: string | null;
  label?: string | null;
  emphasis?: string | null;
  align?: string | null;
  headline?: string | null;
  headlineAccent?: string | null;
  body?: string | null;
  stats?: { label: string; value: string }[] | null;
  statsDisclaimer?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}) {
  const dark = isDarkBackground(background);
  const headingColor = dark ? "var(--soft-white)" : "var(--ink)";
  const accentColor = dark ? "var(--champagne)" : "var(--champagne-ink)";
  const bodyColor = dark ? "rgba(244,241,234,0.65)" : undefined;
  const paragraphs = toParagraphs(body);
  const centered = align === "center";

  const headlineEl = headline && (
    emphasis === "feature" ? (
      <RevealText
        as="h2"
        className="h-section"
        lines={headline.split("|").map((l) => l.trim())}
        style={{ color: headingColor, marginTop: label ? 14 : 0, textAlign: centered ? "center" : undefined }}
      />
    ) : (
      <h2
        className="h-medium"
        style={{ color: headingColor, marginTop: label ? 14 : 0, textAlign: centered ? "center" : undefined }}
      >
        {headline}
      </h2>
    )
  );

  const accentEl = headlineAccent && (
    emphasis === "feature" ? (
      <RevealText
        as="h2"
        className="h-section"
        lines={headlineAccent.split("|").map((l) => l.trim())}
        style={{ color: accentColor, marginTop: "0.15em", textAlign: centered ? "center" : undefined }}
        delay={0.15}
      />
    ) : (
      <h2
        className="h-medium"
        style={{ color: accentColor, marginTop: 4, textAlign: centered ? "center" : undefined }}
      >
        {headlineAccent}
      </h2>
    )
  );

  if (centered) {
    return (
      <section
        data-nav-theme={dark ? "dark" : "light"}
        style={{ background: resolveBackground(background), paddingBlock: "clamp(96px, 16vw, 220px)" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          {label && (
            <div style={{ display: "inline-block" }}>
              <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>
            </div>
          )}
          {headlineEl}
          {accentEl}
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="body-copy"
              style={{
                marginInline: "auto",
                marginTop: i === 0 ? "clamp(40px, 6vw, 64px)" : 12,
                maxWidth: 480,
                color: bodyColor,
              }}
            >
              {p}
            </p>
          ))}
          {ctaLabel && ctaHref && (
            <div style={{ marginTop: 32 }}>
              <AnimatedLink href={ctaHref} style={dark ? { color: "var(--soft-white)" } : undefined}>
                {ctaLabel}
              </AnimatedLink>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      data-nav-theme={dark ? "dark" : "light"}
      style={{ background: resolveBackground(background), paddingBlock: "clamp(64px, 10vw, 120px)" }}
    >
      <div className="container grid-12" style={{ rowGap: 56 }}>
        <div className="col-line-1-5">
          {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
          {headlineEl}
          {accentEl}
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
          {ctaLabel && ctaHref && (
            <div style={{ marginTop: 32, textAlign: "right" }}>
              <AnimatedLink href={ctaHref} style={dark ? { color: "var(--soft-white)" } : undefined}>
                {ctaLabel}
              </AnimatedLink>
            </div>
          )}
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
