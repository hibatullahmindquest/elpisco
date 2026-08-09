import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "seo_organization_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_meta_title" varchar DEFAULT 'Elpis.co | Interior Design & Renovation',
  	"default_meta_description" varchar DEFAULT 'Elpis.co is an interior design, renovation and design & build studio based in Shah Alam, Malaysia. Spaces shaped around the way you live.',
  	"default_og_image_id" integer,
  	"twitter_handle" varchar,
  	"google_site_verification" varchar,
  	"robots_index" boolean DEFAULT true,
  	"organization_legal_name" varchar,
  	"organization_description" varchar,
  	"organization_price_range" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "seo_organization_same_as" ADD CONSTRAINT "seo_organization_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "seo_organization_same_as_order_idx" ON "seo_organization_same_as" USING btree ("_order");
  CREATE INDEX "seo_organization_same_as_parent_id_idx" ON "seo_organization_same_as" USING btree ("_parent_id");
  CREATE INDEX "seo_default_og_image_idx" ON "seo" USING btree ("default_og_image_id");
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "projects" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "seo_organization_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "seo_organization_same_as" CASCADE;
  DROP TABLE "seo" CASCADE;
  ALTER TABLE "projects" DROP CONSTRAINT "projects_seo_og_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_seo_og_image_id_media_id_fk";
  
  DROP INDEX "projects_seo_seo_og_image_idx";
  DROP INDEX "pages_seo_seo_og_image_idx";
  ALTER TABLE "projects" DROP COLUMN "seo_meta_title";
  ALTER TABLE "projects" DROP COLUMN "seo_meta_description";
  ALTER TABLE "projects" DROP COLUMN "seo_og_image_id";
  ALTER TABLE "pages" DROP COLUMN "seo_meta_title";
  ALTER TABLE "pages" DROP COLUMN "seo_meta_description";
  ALTER TABLE "pages" DROP COLUMN "seo_og_image_id";`)
}
