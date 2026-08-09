import type { Block } from "payload";
import { backgroundField, headlineLinesField } from "./shared";

export const FounderGridBlock: Block = {
  slug: "founderGrid",
  labels: { singular: "Founder Grid", plural: "Founder Grids" },
  fields: [
    backgroundField,
    {
      name: "label",
      type: "text",
    },
    headlineLinesField,
    {
      name: "note",
      type: "text",
      admin: { description: "Shown instead of the grid when the Founders collection is empty." },
      defaultValue: "Founder profiles will appear here once Elpis provides names, photos and biographies.",
    },
  ],
};
