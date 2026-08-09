import { Marquee } from "@/components/home/Marquee";

export function MarqueeBlockView({ text }: { text?: string | null }) {
  return <Marquee text={text ?? undefined} />;
}
