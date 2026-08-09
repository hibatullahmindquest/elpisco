import { RevealText } from "@/components/ui/RevealText";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export function CTABannerBlockView({
  headlineLines,
  buttonLabel,
  buttonHref,
}: {
  headlineLines?: { line: string }[] | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
}) {
  const lines = (headlineLines ?? []).map((l) => l.line);
  if (lines.length === 0) return null;

  return (
    <section
      data-nav-theme="dark"
      style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
    >
      <div className="container">
        <RevealText as="h2" className="h-section" lines={lines} style={{ color: "var(--soft-white)", textAlign: "center" }} />
        {buttonLabel && buttonHref && (
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href={buttonHref} variant="solid-invert">
              {buttonLabel}
            </AnimatedLink>
          </div>
        )}
      </div>
    </section>
  );
}
