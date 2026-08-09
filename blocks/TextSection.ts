import type { Block } from "payload";
import { backgroundField } from "./shared";

export const TextSectionBlock: Block = {
  slug: "textSection",
  labels: { singular: "Text Section", plural: "Text Sections" },
  fields: [
    backgroundField,
    {
      name: "label",
      type: "text",
      admin: { description: "Small uppercase label above the headline. Optional." },
    },
    {
      name: "emphasis",
      type: "select",
      defaultValue: "standard",
      options: [
        { label: "Standard (single-line heading)", value: "standard" },
        { label: "Feature (large, multi-line heading)", value: "feature" },
      ],
    },
    {
      name: "headline",
      type: "text",
      admin: { description: "For \"Feature\" emphasis, separate lines with a | character." },
    },
    {
      name: "body",
      type: "textarea",
      admin: { description: "Separate paragraphs with a blank line." },
    },
    {
      name: "stats",
      type: "array",
      admin: { description: "Optional — renders a small label/value grid below the body (e.g. Established, Team size)." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "statsDisclaimer",
      type: "text",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.stats?.length),
        description: "Small print shown under the stats grid, e.g. noting the figures are placeholders.",
      },
    },
  ],
};
