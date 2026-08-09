import type { CollectionConfig } from "payload";

// TODO: swap local disk storage for the Supabase Storage (S3-compatible)
// adapter (@payloadcms/storage-s3) before deploying to Vercel — serverless
// functions have no persistent local disk. Tracked as part of the Media
// Manager module.
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
