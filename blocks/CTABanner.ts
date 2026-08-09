import type { Block } from "payload";
import { headlineLinesField } from "./shared";

export const CTABannerBlock: Block = {
  slug: "ctaBanner",
  labels: { singular: "CTA Banner", plural: "CTA Banners" },
  fields: [
    { name: "label", type: "text" },
    headlineLinesField,
    {
      name: "body",
      type: "textarea",
    },
    {
      name: "buttonLabel",
      type: "text",
      required: true,
      defaultValue: "START A PROJECT",
    },
    {
      name: "buttonHref",
      type: "text",
      required: true,
      defaultValue: "/start-a-project",
    },
    {
      name: "showWhatsappButton",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Adds a second button linking to the Site Settings WhatsApp number." },
    },
    {
      name: "whatsappButtonLabel",
      type: "text",
      defaultValue: "CONTINUE ON WHATSAPP",
      admin: { condition: (_, siblingData) => Boolean(siblingData?.showWhatsappButton) },
    },
  ],
};
