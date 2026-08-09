import type { Block } from "payload";
import { headlineLinesField } from "./shared";

export const CTABannerBlock: Block = {
  slug: "ctaBanner",
  labels: { singular: "CTA Banner", plural: "CTA Banners" },
  fields: [
    headlineLinesField,
    {
      name: "buttonLabel",
      type: "text",
      required: true,
      defaultValue: "START A PROJECT",
    },
    {
      name: "buttonHref",
      type: "text",
      required: true,
      defaultValue: "/start-a-project",
    },
  ],
};
