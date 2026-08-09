import type { CollectionConfig } from "payload";

// Local disk storage is only used in dev — payload.config.ts's s3Storage
// plugin takes over for uploads whenever S3_BUCKET is set (production).
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
