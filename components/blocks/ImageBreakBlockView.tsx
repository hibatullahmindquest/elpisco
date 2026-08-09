import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ImagePlaceholder } from "./ImagePlaceholder";
import type { Media } from "@/payload-types";

function mediaUrl(value: number | Media | null | undefined): string {
  if (value && typeof value === "object") return value.url ?? "";
  return "";
}

export function ImageBreakBlockView({
  image,
  fallbackImageUrl,
  alt,
  aspectRatio,
}: {
  image?: number | Media | null;
  fallbackImageUrl?: string | null;
  alt?: string | null;
  aspectRatio?: string | null;
}) {
  const src = mediaUrl(image) || fallbackImageUrl || "";

  return (
    <section data-nav-theme="light" style={{ background: "var(--soft-white)" }}>
      {src ? (
        <ParallaxImage src={src} alt={alt ?? ""} aspect={aspectRatio ?? "21 / 9"} sizes="100vw" />
      ) : (
        <ImagePlaceholder aspect={aspectRatio ?? "21 / 9"} />
      )}
    </section>
  );
}
