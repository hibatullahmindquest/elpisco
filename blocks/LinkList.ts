import type { Block } from "payload";
import { backgroundField } from "./shared";

export const LinkListBlock: Block = {
  slug: "linkList",
  labels: { singular: "Link List", plural: "Link Lists" },
  fields: [
    backgroundField,
    { name: "label", type: "text" },
    { name: "headline", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "number", type: "text", required: true },
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
  ],
};
