import type { Block } from "payload";
import { backgroundField } from "./shared";

export const StageListBlock: Block = {
  slug: "stageList",
  labels: { singular: "Stage / Reason List", plural: "Stage / Reason Lists" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "number", type: "text", required: true, admin: { description: "e.g. 01" } },
        { name: "title", type: "text", required: true },
        {
          name: "headline",
          type: "text",
          admin: { description: "Optional larger sub-headline shown above the body (used by \"why us\" style reasons)." },
        },
        { name: "body", type: "textarea" },
        {
          name: "subListLabel",
          type: "text",
          admin: { description: "e.g. \"Client Provides\" — leave blank if this item has no sub-list." },
        },
        {
          name: "subList",
          type: "array",
          fields: [{ name: "value", type: "text", required: true }],
        },
        { name: "outcomeLabel", type: "text", admin: { description: "e.g. \"Outcome\"" } },
        { name: "outcome", type: "textarea" },
        backgroundField,
      ],
    },
  ],
};
