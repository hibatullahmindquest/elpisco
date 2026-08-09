import type { CollectionConfig } from "payload";

// Scaffold only for now: lets an admin manage page names and publish status.
// Section-by-section content editing and SEO fields land in later phases —
// see the module plan (Phase 3: Site Settings, Phase 4: SEO/AEO/GEO).
export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "status"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "path",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Route path, e.g. / or /services",
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
