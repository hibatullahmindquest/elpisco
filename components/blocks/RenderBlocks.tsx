import type { Page } from "@/payload-types";
import { HeroBlockView } from "./HeroBlockView";
import { ImageBreakBlockView } from "./ImageBreakBlockView";
import { TextSectionBlockView } from "./TextSectionBlockView";
import { FounderGridBlockView } from "./FounderGridBlockView";
import { CredentialsGridBlockView } from "./CredentialsGridBlockView";
import { SplitTextBlockView } from "./SplitTextBlockView";
import { NumberedListBlockView } from "./NumberedListBlockView";
import { CTABannerBlockView } from "./CTABannerBlockView";

type LayoutBlocks = NonNullable<Page["layout"]>;
type LayoutBlock = LayoutBlocks[number];

export function RenderBlocks({ blocks }: { blocks?: LayoutBlocks | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block: LayoutBlock) => {
        switch (block.blockType) {
          case "hero":
            return <HeroBlockView key={block.id} {...block} />;
          case "imageBreak":
            return <ImageBreakBlockView key={block.id} {...block} />;
          case "textSection":
            return <TextSectionBlockView key={block.id} {...block} />;
          case "founderGrid":
            return <FounderGridBlockView key={block.id} {...block} />;
          case "credentialsGrid":
            return <CredentialsGridBlockView key={block.id} {...block} />;
          case "splitText":
            return <SplitTextBlockView key={block.id} {...block} />;
          case "numberedList":
            return <NumberedListBlockView key={block.id} {...block} />;
          case "ctaBanner":
            return <CTABannerBlockView key={block.id} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
