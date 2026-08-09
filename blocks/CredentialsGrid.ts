import type { Block } from "payload";
import { backgroundField, headlineLinesField } from "./shared";

export const CredentialsGridBlock: Block = {
  slug: "credentialsGrid",
  labels: { singular: "Credentials Grid", plural: "Credentials Grids" },
  fields: [
    backgroundField,
    {
      name: "label",
      type: "text",
    },
    headlineLinesField,
    {
      name: "note",
      type: "text",
      admin: { description: "Shown instead of the grid when no credentials are published." },
      defaultValue:
        "Verified registrations and certifications will appear here once confirmed. We do not publish credentials that have not been verified.",
    },
  ],
};
