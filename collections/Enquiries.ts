import type { CollectionConfig } from "payload";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  access: {
    // Public contact form submissions create documents; only logged-in
    // admins can read/manage them.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "projectType", "status", "createdAt"],
    description: "Submissions from the site's contact form.",
  },
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Closed", value: "closed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "projectType",
      type: "select",
      options: [
        { label: "Interior Design", value: "Interior Design" },
        { label: "Renovation", value: "Renovation" },
        { label: "Design & Build", value: "Design & Build" },
        { label: "Not Sure Yet", value: "Not Sure Yet" },
      ],
    },
    {
      name: "propertyType",
      type: "text",
    },
    {
      name: "budget",
      type: "text",
    },
    {
      name: "timing",
      type: "text",
    },
    {
      name: "details",
      type: "textarea",
    },
    {
      // Honeypot: real visitors never fill this (it's hidden in the UI).
      // Bots that blindly fill every field trip it.
      name: "company",
      type: "text",
      admin: {
        description: "Honeypot field — should always be blank. Not shown to real visitors.",
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) {
              throw new Error("Invalid submission");
            }
            return value;
          },
        ],
      },
    },
  ],
};
