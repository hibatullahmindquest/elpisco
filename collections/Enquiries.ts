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
    defaultColumns: ["name", "email", "source", "leadTier", "status", "createdAt"],
    description: "Submissions from the Start a Project assessment and the legacy contact form.",
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
      name: "source",
      type: "select",
      defaultValue: "start-a-project",
      options: [
        { label: "Start a Project assessment", value: "start-a-project" },
        { label: "Contact form", value: "contact-form" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "leadTier",
      type: "select",
      options: [
        { label: "Priority", value: "priority" },
        { label: "Qualified", value: "qualified" },
        { label: "Review", value: "review" },
        { label: "Low fit", value: "low-fit" },
      ],
      admin: {
        position: "sidebar",
        description: "Internal-only scoring signal — never shown to the visitor.",
      },
    },
    {
      name: "leadScore",
      type: "number",
      admin: {
        position: "sidebar",
        description: "Internal-only scoring signal — never shown to the visitor.",
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
      name: "preferredContactMethod",
      type: "text",
    },
    {
      name: "location",
      type: "text",
    },
    {
      // Legacy single-select from the old contact form. The Start a Project
      // wizard uses the richer `services` array instead — kept here
      // unused-but-intact rather than dropped, to avoid an ambiguous
      // enum-rename prompt in `payload migrate:create`.
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
      name: "builtUpRange",
      type: "text",
    },
    {
      name: "services",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "areas",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "transformationLevel",
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
      name: "consent",
      type: "checkbox",
      defaultValue: false,
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
