import type { Block } from "payload";
import { backgroundField, headlineLinesField } from "./shared";

export const TestimonialsGridBlock: Block = {
  slug: "testimonialsGrid",
  labels: { singular: "Testimonials Grid", plural: "Testimonials Grids" },
  fields: [
    backgroundField,
    { name: "label", type: "text" },
    headlineLinesField,
    {
      name: "note",
      type: "text",
      defaultValue: "Client testimonials will appear here once verified. We only publish real, permissioned reviews.",
    },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    {
      name: "maxItems",
      type: "number",
      admin: { description: "Optional — cap how many testimonials this block shows. Leave blank to show all published." },
    },
  ],
};
