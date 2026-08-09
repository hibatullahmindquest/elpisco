import type { GlobalConfig } from "payload";

export const SEO: GlobalConfig = {
  slug: "seo",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "defaultMetaTitle",
      type: "text",
      defaultValue: "Elpis.co | Interior Design & Renovation",
    },
    {
      name: "defaultMetaDescription",
      type: "textarea",
      defaultValue:
        "Elpis.co is an interior design, renovation and design & build studio based in Shah Alam, Malaysia. Spaces shaped around the way you live.",
    },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "twitterHandle",
      type: "text",
      admin: {
        description: "e.g. @elpisco (optional)",
      },
    },
    {
      name: "googleSiteVerification",
      type: "text",
      admin: {
        description: "Google Search Console verification code, if used.",
      },
    },
    {
      name: "robotsIndex",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Uncheck to tell all search engines/crawlers not to index the site (e.g. while staging).",
      },
    },
    {
      type: "group",
      name: "organization",
      label: "Structured Data (AEO/GEO)",
      admin: {
        description:
          "Powers the Organization/LocalBusiness structured data (JSON-LD) that answer engines and AI crawlers (ChatGPT, Gemini, Perplexity, etc.) read to describe the business.",
      },
      fields: [
        {
          name: "legalName",
          type: "text",
          admin: {
            description: "Falls back to Site Settings' site name if left blank.",
          },
        },
        {
          name: "description",
          type: "textarea",
          admin: {
            description: "Falls back to Site Settings' tagline if left blank.",
          },
        },
        {
          name: "priceRange",
          type: "text",
          admin: {
            description: "e.g. $$ or $$$ (optional)",
          },
        },
        {
          name: "sameAs",
          type: "array",
          label: "Social / Profile Links",
          fields: [
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
