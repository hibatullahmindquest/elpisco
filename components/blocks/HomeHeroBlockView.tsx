import { Hero } from "@/components/home/Hero";
import type { Media } from "@/payload-types";

const DEFAULT_IMAGE = "/images/hero/main.jpg";
const DEFAULT_ALT = "Architectural interior with natural light and considered material palette";

function mediaUrl(value: number | Media | null | undefined): string {
  if (value && typeof value === "object") return value.url ?? "";
  return "";
}

export function HomeHeroBlockView({
  image,
  imageAlt,
  eyebrow,
  headlineLines,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  locationLine,
}: {
  image?: number | Media | null;
  imageAlt?: string | null;
  eyebrow?: string | null;
  headlineLines?: { line: string }[] | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
  locationLine?: string | null;
}) {
  const lines = (headlineLines ?? []).map((l) => l.line);
  if (lines.length === 0) return null;

  return (
    <Hero
      imageUrl={mediaUrl(image) || DEFAULT_IMAGE}
      imageAlt={imageAlt || DEFAULT_ALT}
      eyebrow={eyebrow ?? undefined}
      headlineLines={lines}
      primaryCtaLabel={primaryCtaLabel ?? undefined}
      primaryCtaHref={primaryCtaHref ?? undefined}
      secondaryCtaLabel={secondaryCtaLabel ?? undefined}
      secondaryCtaHref={secondaryCtaHref ?? undefined}
      locationLine={locationLine ?? undefined}
    />
  );
}
