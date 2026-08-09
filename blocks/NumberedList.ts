import type { Block } from "payload";
import { backgroundField } from "./shared";

export const NumberedListBlock: Block = {
  slug: "numberedList",
  labels: { singular: "Numbered List", plural: "Numbered Lists" },
  fields: [
    backgroundField,
    {
      name: "label",
      type: "text",
    },
    {
      name: "headline",
      type: "text",
    },
    {
      name: "ctaLabel",
      type: "text",
    },
    {
      name: "ctaHref",
      type: "text",
    },
    {
      name: "columns",
      type: "select",
      defaultValue: "2",
      options: [
        { label: "1 column", value: "1" },
        { label: "2 columns", value: "2" },
      ],
    },
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
