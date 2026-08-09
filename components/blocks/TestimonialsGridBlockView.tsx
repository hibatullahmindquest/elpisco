import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getTestimonials } from "@/lib/testimonials";
import { resolveBackground, isDarkBackground } from "./shared";

export async function TestimonialsGridBlockView({
  background,
  label,
  headlineLines,
  note,
  ctaLabel,
  ctaHref,
  maxItems,
}: {
  background?: string | null;
  label?: string | null;
  headlineLines?: { line: string }[] | null;
  note?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  maxItems?: number | null;
}) {
  const all = await getTestimonials();
  const testimonials = maxItems ? all.slice(0, maxItems) : all;
  const dark = isDarkBackground(background);
  const lines = (headlineLines ?? []).map((l) => l.line);

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(80px, 12vw, 140px)" }}>
      <div className="container">
        {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
        {lines.length > 0 && (
          <RevealText as="h2" className="h-medium" lines={lines} style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: 14 }} />
        )}

        {testimonials.length > 0 ? (
          <div style={{ marginTop: "clamp(40px, 6vw, 64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
            {testimonials.map((t) => (
              <blockquote key={t.authorName} style={{ margin: 0, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
                <p className="body-copy" style={{ color: dark ? "var(--soft-white)" : "var(--ink)", fontSize: 18, lineHeight: 1.5 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="label" style={{ marginTop: 18, color: dark ? "var(--champagne)" : "var(--champagne-ink)" }}>
                  — {t.authorName.toUpperCase()}
                  {t.authorDetail ? `, ${t.authorDetail.toUpperCase()}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          note && (
            <p className="body-copy" style={{ marginTop: "clamp(32px, 5vw, 48px)", maxWidth: 420, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
              {note}
            </p>
          )
        )}

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
