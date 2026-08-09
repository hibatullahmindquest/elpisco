import type { Block } from "payload";
import { backgroundField } from "./shared";

export const CareersListBlock: Block = {
  slug: "careersList",
  labels: { singular: "Careers List", plural: "Careers Lists" },
  fields: [
    backgroundField,
    { name: "label", type: "text" },
    {
      name: "emptyStateBody",
      type: "textarea",
      defaultValue:
        "No open roles right now. We are always interested in thoughtful designers, builders and project people. Send a concise portfolio and introduction for future consideration.",
    },
    { name: "emptyStateCtaLabel", type: "text", defaultValue: "INTRODUCE YOURSELF" },
  ],
};
