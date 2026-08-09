import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function HeroBlockView({
  label,
  headlineLines,
  body,
}: {
  label?: string | null;
  headlineLines?: { line: string }[] | null;
  body?: string | null;
}) {
  const lines = (headlineLines ?? []).map((l) => l.line);
  if (lines.length === 0) return null;

  return (
    <section
      data-nav-theme="light"
      style={{
        background: "var(--warm-white)",
        paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
        paddingBottom: "clamp(48px, 8vw, 88px)",
      }}
    >
      <div className="container grid-12">
        {label && (
          <div className="col-line-label">
            <SectionLabel>{label}</SectionLabel>
          </div>
        )}
        <div className="col-line-4-end">
          <RevealText as="h1" className="h-hero" lines={lines} style={{ color: "var(--ink)" }} />
          {body && (
            <p className="body-copy" style={{ marginTop: 28, maxWidth: 460 }}>
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
