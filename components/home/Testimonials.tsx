import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getTestimonials } from "@/lib/testimonials";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section
      data-nav-theme="light"
      style={{ background: "var(--warm-white)", paddingBlock: "clamp(80px, 12vw, 140px)" }}
    >
      <div className="container">
        <SectionLabel>Client Perspective</SectionLabel>
        <RevealText
          as="h2"
          className="h-medium"
          lines={["TRUST IS BUILT", "THROUGH THE PROCESS."]}
          style={{ color: "var(--ink)", marginTop: 14 }}
        />

        {testimonials.length > 0 ? (
          <div
            style={{
              marginTop: "clamp(40px, 6vw, 64px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
            }}
          >
            {testimonials.slice(0, 2).map((t) => (
              <blockquote key={t.authorName} style={{ margin: 0, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
                <p className="body-copy" style={{ color: "var(--ink)", fontSize: 18, lineHeight: 1.5 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="label" style={{ marginTop: 18, color: "var(--champagne-ink)" }}>
                  — {t.authorName.toUpperCase()}
                  {t.authorDetail ? `, ${t.authorDetail.toUpperCase()}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="body-copy" style={{ marginTop: "clamp(32px, 5vw, 48px)", maxWidth: 420 }}>
            Client testimonials will appear here once verified. We only publish real, permissioned
            reviews.
          </p>
        )}

        <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
          <AnimatedLink href="/why-elpis">READ WHY CLIENTS CHOOSE ELPIS</AnimatedLink>
        </div>
      </div>
    </section>
  );
}
