import type { Block } from "payload";

export const MarqueeBlock: Block = {
  slug: "marquee",
  labels: { singular: "Marquee", plural: "Marquees" },
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
      defaultValue: "SELECTED WORK",
    },
  ],
};
