import type { CollectionConfig } from "payload";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const Careers: CollectionConfig = {
  slug: "careers",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "jobTitle",
    defaultColumns: ["jobTitle", "location", "status", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "jobTitle",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            if (data?.jobTitle) return slugify(data.jobTitle as string);
            return value;
          },
        ],
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
      admin: {
        position: "sidebar",
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
      name: "department",
      type: "text",
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "employmentType",
      type: "select",
      options: [
        { label: "Full-time", value: "Full-time" },
        { label: "Part-time", value: "Part-time" },
        { label: "Internship", value: "Internship" },
        { label: "Contract", value: "Contract" },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      admin: {
        description: "Short one- or two-line summary shown in the job listing.",
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Full responsibilities and requirements.",
      },
    },
    {
      name: "applyEmail",
      type: "text",
      admin: {
        description: "Overrides the site's default enquiry email for this listing, if set.",
      },
    },
  ],
};
