import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { resolveBackground, isDarkBackground, toParagraphs } from "./shared";

export function LinkListBlockView({
  background,
  label,
  headline,
  body,
  items,
  ctaLabel,
  ctaHref,
}: {
  background?: string | null;
  label?: string | null;
  headline?: string | null;
  body?: string | null;
  items?: { number: string; label: string; href: string }[] | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}) {
  if (!items || items.length === 0) return null;
  const dark = isDarkBackground(background);
  const paragraphs = toParagraphs(body);

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(80px, 12vw, 140px)" }}>
      <div className="container">
        {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
        {headline && (
          <h2 className="h-medium" style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: label ? 14 : 0 }}>
            {headline}
          </h2>
        )}
        {paragraphs.map((p, i) => (
          <p key={i} className="body-copy" style={{ marginTop: i === 0 ? 20 : 12, maxWidth: 460, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
            {p}
          </p>
        ))}

        <div style={{ marginTop: "clamp(40px, 6vw, 64px)" }}>
          {items.map((item) => (
            <Link key={item.number} href={item.href} className="row-link">
              <span style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
                <span className="row-number">{item.number}</span>
                <span
                  className="row-title h-medium"
                  style={{ fontSize: "clamp(24px, 3.4vw, 44px)", color: dark ? "var(--soft-white)" : "var(--ink)" }}
                >
                  {item.label}
                </span>
              </span>
              <span className="row-arrow" aria-hidden="true" style={{ fontSize: 22, color: "var(--muted)" }}>
                &#8599;
              </span>
            </Link>
          ))}
        </div>

        {ctaLabel && ctaHref && (
          <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
            <AnimatedLink href={ctaHref} style={dark ? { color: "var(--soft-white)" } : undefined}>
              {ctaLabel}
            </AnimatedLink>
          </div>
        )}
      </div>
    </section>
  );
}
