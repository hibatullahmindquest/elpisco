import type { CollectionConfig } from "payload";

export const Redirects: CollectionConfig = {
  slug: "redirects",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "fromPath",
    defaultColumns: ["fromPath", "toPath", "type"],
  },
  fields: [
    {
      name: "fromPath",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "The old path to redirect from, e.g. /old-page",
      },
      validate: (value: string | null | undefined) => {
        if (!value?.startsWith("/")) return 'Must start with "/"';
        return true;
      },
    },
    {
      name: "toPath",
      type: "text",
      required: true,
      admin: {
        description: "Where to send visitors, e.g. /services or a full https:// URL",
      },
    },
    {
      name: "type",
      type: "select",
      defaultValue: "permanent",
      options: [
        { label: "Permanent (301)", value: "permanent" },
        { label: "Temporary (302)", value: "temporary" },
      ],
    },
  ],
};
