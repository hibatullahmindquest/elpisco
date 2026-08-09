import type { Block } from "payload";
import { backgroundField } from "./shared";

export const FaqAccordionBlock: Block = {
  slug: "faqAccordion",
  labels: { singular: "FAQ Accordion", plural: "FAQ Accordions" },
  fields: [
    backgroundField,
    {
      name: "emptyStateBody",
      type: "text",
      defaultValue: "Frequently asked questions will appear here shortly.",
    },
  ],
};
