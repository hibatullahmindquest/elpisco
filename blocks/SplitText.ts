import type { Block } from "payload";
import { backgroundField } from "./shared";

export const SplitTextBlock: Block = {
  slug: "splitText",
  labels: { singular: "Split Text (2 columns)", plural: "Split Text Sections" },
  fields: [
    backgroundField,
    {
      name: "columns",
      type: "array",
      minRows: 2,
      maxRows: 2,
      fields: [
        { name: "label", type: "text" },
        { name: "headline", type: "text", required: true },
        { name: "body", type: "textarea" },
      ],
    },
  ],
};
