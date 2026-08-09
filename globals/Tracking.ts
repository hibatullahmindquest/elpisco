import type { GlobalConfig } from "payload";

export const Tracking: GlobalConfig = {
  slug: "tracking",
  access: {
    read: () => true,
  },
  admin: {
    description:
      "Analytics and marketing tags. Leave a field blank to skip it entirely — nothing renders until an ID is set.",
  },
  fields: [
    {
      name: "gtmId",
      type: "text",
      label: "Google Tag Manager Container ID",
      admin: {
        description: "e.g. GTM-XXXXXXX",
      },
    },
    {
      name: "ga4Id",
      type: "text",
      label: "Google Analytics 4 Measurement ID",
      admin: {
        description: "e.g. G-XXXXXXXXXX. Only needed if GA4 isn't already wired through GTM above.",
      },
    },
    {
      name: "metaPixelId",
      type: "text",
      label: "Meta (Facebook) Pixel ID",
    },
    {
      name: "customHeadCode",
      type: "textarea",
      label: "Custom Code — before </head>",
      admin: {
        description:
          "Raw HTML/JS, e.g. a verification tag or a script snippet not covered above. Runs on every page. Use with caution.",
      },
    },
    {
      name: "customBodyEndCode",
      type: "textarea",
      label: "Custom Code — before </body>",
      admin: {
        description: "Raw HTML/JS, e.g. a chat widget embed. Runs on every page. Use with caution.",
      },
    },
  ],
};
