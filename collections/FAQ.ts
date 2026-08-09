import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  slug: "faq",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "category", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
    },
    {
      name: "category",
      type: "text",
      admin: {
        description: "Groups FAQs on the page, e.g. \"Pricing\", \"Process\", \"Timeline\". Leave blank for uncategorised.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Controls display order within its category — lower numbers show first.",
      },
    },
  ],
};
