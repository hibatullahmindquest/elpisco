import type { Block } from "payload";
import { headlineLinesField } from "./shared";

// Reproduces the Home "Process teaser" interaction: a sticky left-hand step
// counter that updates via scroll (IntersectionObserver) as the right-hand
// list of steps scrolls past, with the active step highlighted. Kept as its
// own block (rather than reusing stageList) because the layout/animation is
// bespoke to this sticky pattern, not the stacked full-width sections
// stageList renders.
export const StickyStepListBlock: Block = {
  slug: "stickyStepList",
  labels: { singular: "Sticky Step List", plural: "Sticky Step Lists" },
  fields: [
    { name: "label", type: "text" },
    headlineLinesField,
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "number", type: "text", required: true, admin: { description: "e.g. 01" } },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
      ],
    },
  ],
};
