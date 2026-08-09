import type { Block } from "payload";
import { headlineLinesField } from "./shared";

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    {
      name: "label",
      type: "text",
      admin: { description: "Small uppercase label above the headline, e.g. \"About Elpis\"." },
    },
    headlineLinesField,
    {
      name: "body",
      type: "textarea",
    },
  ],
};
