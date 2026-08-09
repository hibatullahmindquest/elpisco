import type { Block } from "payload";
import { backgroundField } from "./shared";

export const ImageTextBlock: Block = {
  slug: "imageText",
  labels: { singular: "Image + Text", plural: "Image + Text Sections" },
  fields: [
    backgroundField,
    {
      name: "imagePosition",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Image left", value: "left" },
        { label: "Image right", value: "right" },
      ],
    },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "fallbackImageUrl",
      type: "text",
      admin: {
        description: "Local/static image path used until a real photo is uploaded via the Image field above, e.g. /images/details/material-detail.jpg",
      },
    },
    { name: "label", type: "text" },
    { name: "headline", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "highlight",
      type: "text",
      admin: { description: "Optional short emphasised line, e.g. a key-benefit statement." },
    },
    {
      name: "scopeItems",
      type: "array",
      admin: { description: "Optional — rendered as a compact list, e.g. \"scope may include\"." },
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "suitedText",
      type: "text",
      admin: { description: "Optional \"best suited for\" line." },
    },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
  ],
};
