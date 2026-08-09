import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { resolveBackground, isDarkBackground } from "./shared";
import type { Media } from "@/payload-types";

function mediaUrl(value: number | Media | null | undefined): string {
  if (value && typeof value === "object") return value.url ?? "";
  return "";
}

export function ImageTextBlockView({
  background,
  imagePosition,
  image,
  label,
  headline,
  body,
  highlight,
  scopeItems,
  suitedText,
  ctaLabel,
  ctaHref,
}: {
  background?: string | null;
  imagePosition?: string | null;
  image?: number | Media | null;
  label?: string | null;
  headline: string;
  body?: string | null;
  highlight?: string | null;
  scopeItems?: { value: string }[] | null;
  suitedText?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}) {
  const dark = isDarkBackground(background);
  const imageLeft = imagePosition !== "right";
  const src = mediaUrl(image);

  return (
    <section data-nav-theme={dark ? "dark" : "light"} style={{ background: resolveBackground(background), paddingBlock: "clamp(56px, 9vw, 100px)" }}>
      <div className="container grid-12" style={{ alignItems: "center", rowGap: 40 }}>
        {src && (
          <div className={imageLeft ? "col-line-1-6" : "col-line-7-end"} style={{ order: imageLeft ? 1 : 2 }}>
            <ParallaxImage src={src} alt={`${headline} — Elpis.co`} aspect="4 / 3" sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
        )}
        <div className={src ? (imageLeft ? "col-line-8-end" : "col-line-1-5") : undefined} style={{ order: imageLeft ? 2 : 1, gridColumn: src ? undefined : "1 / -1" }}>
          {label && <SectionLabel theme={dark ? "dark" : "light"}>{label}</SectionLabel>}
          <h2 className="h-medium" style={{ color: dark ? "var(--soft-white)" : "var(--ink)", marginTop: 12 }}>
            {headline}
          </h2>
          {body && (
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 420, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
              {body}
            </p>
          )}
          {highlight && (
            <p className="label" style={{ marginTop: 20, color: dark ? "var(--champagne)" : "var(--champagne-ink)" }}>
              {highlight}
            </p>
          )}
          {scopeItems && scopeItems.length > 0 && (
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 420, fontSize: 13, color: dark ? "rgba(244,241,234,0.65)" : undefined }}>
              {scopeItems.map((s) => s.value).join(" · ")}
            </p>
          )}
          {suitedText && (
            <p className="body-copy" style={{ marginTop: 14, maxWidth: 420, color: dark ? "var(--champagne)" : "var(--champagne-ink)" }}>
              {suitedText}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <div style={{ marginTop: 28 }}>
              <AnimatedLink href={ctaHref} style={dark ? { color: "var(--soft-white)" } : undefined}>
                {ctaLabel}
              </AnimatedLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
