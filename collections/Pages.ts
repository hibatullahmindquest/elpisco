import type { CollectionConfig } from "payload";

// Metadata scaffold: lets an admin manage page names, publish status, and
// per-page SEO — it does NOT control section-by-section body content or
// layout, which stays hand-built (see the module plan's Section Registry
// discussion for why: preserves the GSAP-driven design).
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
    {
      type: "group",
      name: "seo",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          admin: {
            description: "Falls back to the page title above if left blank.",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};
