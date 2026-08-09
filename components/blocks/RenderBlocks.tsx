import type { Page } from "@/payload-types";
import { HeroBlockView } from "./HeroBlockView";
import { ImageBreakBlockView } from "./ImageBreakBlockView";
import { TextSectionBlockView } from "./TextSectionBlockView";
import { FounderGridBlockView } from "./FounderGridBlockView";
import { CredentialsGridBlockView } from "./CredentialsGridBlockView";
import { SplitTextBlockView } from "./SplitTextBlockView";
import { NumberedListBlockView } from "./NumberedListBlockView";
import { CTABannerBlockView } from "./CTABannerBlockView";
import { StageListBlockView } from "./StageListBlockView";
import { LinkListBlockView } from "./LinkListBlockView";
import { ImageTextBlockView } from "./ImageTextBlockView";
import { TestimonialsGridBlockView } from "./TestimonialsGridBlockView";
import { CareersListBlockView } from "./CareersListBlockView";
import { FeaturedProjectsBlockView } from "./FeaturedProjectsBlockView";
import { MarqueeBlockView } from "./MarqueeBlockView";
import { HomeHeroBlockView } from "./HomeHeroBlockView";
import { FaqAccordionBlockView } from "./FaqAccordionBlockView";
import { ContactDetailsBlockView } from "./ContactDetailsBlockView";
import { StickyStepListBlockView } from "./StickyStepListBlockView";

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
          case "stageList":
            return <StageListBlockView key={block.id} {...block} />;
          case "linkList":
            return <LinkListBlockView key={block.id} {...block} />;
          case "imageText":
            return <ImageTextBlockView key={block.id} {...block} />;
          case "testimonialsGrid":
            return <TestimonialsGridBlockView key={block.id} {...block} />;
          case "careersList":
            return <CareersListBlockView key={block.id} {...block} />;
          case "featuredProjects":
            return <FeaturedProjectsBlockView key={block.id} {...block} />;
          case "marquee":
            return <MarqueeBlockView key={block.id} {...block} />;
          case "homeHero":
            return <HomeHeroBlockView key={block.id} {...block} />;
          case "faqAccordion":
            return <FaqAccordionBlockView key={block.id} {...block} />;
          case "contactDetails":
            return <ContactDetailsBlockView key={block.id} {...block} />;
          case "stickyStepList":
            return <StickyStepListBlockView key={block.id} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
