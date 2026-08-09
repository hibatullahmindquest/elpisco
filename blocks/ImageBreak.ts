import type { Block } from "payload";

export const ImageBreakBlock: Block = {
  slug: "imageBreak",
  labels: { singular: "Full-width Image", plural: "Full-width Images" },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "fallbackImageUrl",
      type: "text",
      admin: {
        description: "Local/static image path used until a real photo is uploaded via the Image field above, e.g. /images/studio/studio-atmosphere.jpg",
      },
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "aspectRatio",
      type: "select",
      defaultValue: "21 / 9",
      options: [
        { label: "Ultra-wide (21:9)", value: "21 / 9" },
        { label: "Wide (16:9)", value: "16 / 9" },
        { label: "Standard (4:3)", value: "4 / 3" },
      ],
    },
  ],
};
