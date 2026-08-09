import type { Block } from "payload";
import { headlineLinesField } from "./shared";

// Self-contained section: headline/body/CTAs on the left, the Studio/
// WhatsApp/Email/Instagram list (from Site Settings) rendered automatically
// on the right — matches the Contact page's existing two-column layout.
export const ContactDetailsBlock: Block = {
  slug: "contactDetails",
  labels: { singular: "Contact Details", plural: "Contact Details" },
  fields: [
    { name: "label", type: "text" },
    headlineLinesField,
    { name: "body", type: "textarea" },
    {
      name: "primaryCtaLabel",
      type: "text",
      defaultValue: "START A PROJECT",
    },
    {
      name: "primaryCtaHref",
      type: "text",
      defaultValue: "/start-a-project",
    },
    {
      name: "secondaryCtaLabel",
      type: "text",
      defaultValue: "CONTINUE ON WHATSAPP",
    },
  ],
};
