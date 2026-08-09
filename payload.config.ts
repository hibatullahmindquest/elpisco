import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Pages } from "./collections/Pages";
import { Redirects } from "./collections/Redirects";
import { Enquiries } from "./collections/Enquiries";
import { Navigation } from "./globals/Navigation";
import { SiteSettings } from "./globals/SiteSettings";
import { SEO } from "./globals/SEO";
import { Tracking } from "./globals/Tracking";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "app/(payload)"),
    },
  },
  collections: [Users, Media, Projects, Pages, Redirects, Enquiries],
  globals: [Navigation, SiteSettings, SEO, Tracking],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    // Supabase Storage (S3-compatible) for uploads — Vercel's serverless
    // functions have no persistent local disk. Only activates once the
    // S3_* env vars are set; falls back to local disk otherwise (local dev).
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      bucket: process.env.S3_BUCKET || "",
      collections: {
        media: {
          // Supabase's S3-compatible endpoint requires AWS SigV4-signed
          // requests, even for GETs — a plain <img> tag can't load from it.
          // Point reads at Supabase's public object REST endpoint instead.
          generateFileURL: ({ filename }) =>
            `${process.env.S3_PUBLIC_URL_BASE}/${filename}`,
        },
      },
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || "auto",
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
});
