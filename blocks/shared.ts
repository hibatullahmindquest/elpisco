import type { Field } from "payload";

// Shared across most blocks: which of the site's three section backgrounds
// to use, so editors can control the page's light/dark rhythm without
// touching code.
export const backgroundField: Field = {
  name: "background",
  type: "select",
  defaultValue: "warm-white",
  options: [
    { label: "Warm White", value: "warm-white" },
    { label: "Soft White", value: "soft-white" },
    { label: "Navy", value: "navy" },
  ],
};

export const headlineLinesField: Field = {
  name: "headlineLines",
  type: "array",
  minRows: 1,
  admin: {
    description: "One field per line break — controls how the large headline wraps.",
  },
  fields: [
    {
      name: "line",
      type: "text",
      required: true,
    },
  ],
};
