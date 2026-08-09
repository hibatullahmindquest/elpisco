import type { CollectionConfig } from "payload";

export const Founders: CollectionConfig = {
  slug: "founders",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "order"],
    description: "Founder / principal profiles shown on the About page.",
  },
  defaultSort: "order",
  fields: [
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Controls display order — lower numbers show first.",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "e.g. \"CO-FOUNDER / PRINCIPAL DESIGNER\"",
      },
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        description: "80–120 words: professional background, specialisation, design philosophy.",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
