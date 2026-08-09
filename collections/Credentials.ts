import type { CollectionConfig } from "payload";

export const Credentials: CollectionConfig = {
  slug: "credentials",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "published", "order"],
    description:
      "Licences, registrations, and certifications. Keep unpublished until the real credential is on file — never fabricate one.",
  },
  defaultSort: "order",
  fields: [
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Only published credentials appear on the site.",
      },
    },
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
      name: "label",
      type: "text",
      required: true,
      admin: {
        description: "e.g. \"SSM Registration\", \"CIDB Licence\"",
      },
    },
    {
      name: "value",
      type: "text",
      admin: {
        description: "e.g. a registration or licence number.",
      },
    },
    {
      name: "issuer",
      type: "text",
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
    },
  ],
};
