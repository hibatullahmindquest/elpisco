import type { CollectionConfig } from "payload";
import { HeroBlock } from "../blocks/Hero";
import { ImageBreakBlock } from "../blocks/ImageBreak";
import { TextSectionBlock } from "../blocks/TextSection";
import { FounderGridBlock } from "../blocks/FounderGrid";
import { CredentialsGridBlock } from "../blocks/CredentialsGrid";
import { SplitTextBlock } from "../blocks/SplitText";
import { NumberedListBlock } from "../blocks/NumberedList";
import { CTABannerBlock } from "../blocks/CTABanner";

// Manages page names, publish status, per-page SEO, AND (via `layout`) the
// page's body content as an ordered list of blocks — each block maps to a
// specific, already-animated frontend component (see
// components/blocks/RenderBlocks.tsx), so editors get structured, page-
// builder-style editing without losing the GSAP-driven design to a generic
// rich-text blob.
export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "status"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "path",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Route path, e.g. / or /services",
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "group",
      name: "seo",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          admin: {
            description: "Falls back to the page title above if left blank.",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      admin: {
        description: "The page body, section by section. Add, remove and reorder blocks to change the page.",
      },
      blocks: [
        HeroBlock,
        ImageBreakBlock,
        TextSectionBlock,
        FounderGridBlock,
        CredentialsGridBlock,
        SplitTextBlock,
        NumberedListBlock,
        CTABannerBlock,
      ],
    },
  ],
};
