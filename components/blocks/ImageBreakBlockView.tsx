import { ParallaxImage } from "@/components/ui/ParallaxImage";
import type { Media } from "@/payload-types";

function mediaUrl(value: number | Media | null | undefined): string {
  if (value && typeof value === "object") return value.url ?? "";
  return "";
}

export function ImageBreakBlockView({
  image,
  alt,
  aspectRatio,
}: {
  image?: number | Media | null;
  alt?: string | null;
  aspectRatio?: string | null;
}) {
  const src = mediaUrl(image);
  if (!src) return null;

  return (
    <section data-nav-theme="light" style={{ background: "var(--soft-white)" }}>
      <ParallaxImage src={src} alt={alt ?? ""} aspect={aspectRatio ?? "21 / 9"} sizes="100vw" />
    </section>
  );
}
