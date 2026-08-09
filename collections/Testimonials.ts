import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "published", "order"],
    description:
      "Client testimonials. Keep unpublished until a real client quote is on file — never fabricate a testimonial.",
  },
  defaultSort: "order",
  fields: [
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Only published testimonials appear on the site.",
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
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "authorName",
      type: "text",
      required: true,
    },
    {
      name: "authorDetail",
      type: "text",
      admin: {
        description: "e.g. \"Homeowner, Petaling Jaya\"",
      },
    },
    {
      name: "relatedProject",
      type: "relationship",
      relationTo: "projects",
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      admin: {
        description: "Optional 1–5 star rating.",
      },
    },
  ],
};
