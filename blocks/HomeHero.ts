import type { Block } from "payload";
import { headlineLinesField } from "./shared";

export const HomeHeroBlock: Block = {
  slug: "homeHero",
  labels: { singular: "Home Hero", plural: "Home Heroes" },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Falls back to the site's default hero image if left blank." },
    },
    { name: "imageAlt", type: "text" },
    { name: "eyebrow", type: "text" },
    headlineLinesField,
    { name: "primaryCtaLabel", type: "text" },
    { name: "primaryCtaHref", type: "text" },
    { name: "secondaryCtaLabel", type: "text" },
    { name: "secondaryCtaHref", type: "text" },
    { name: "locationLine", type: "text" },
  ],
};
