import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_text_section_align" AS ENUM('left', 'center');
  DROP TABLE "homepage" CASCADE;
  ALTER TABLE "pages_blocks_text_section" ADD COLUMN "align" "enum_pages_blocks_text_section_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_text_section" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "pages_blocks_text_section" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "body" varchar;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "show_whatsapp_button" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cta_banner" ADD COLUMN "whatsapp_button_label" varchar DEFAULT 'CONTINUE ON WHATSAPP';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_alt" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  ALTER TABLE "pages_blocks_text_section" DROP COLUMN "align";
  ALTER TABLE "pages_blocks_text_section" DROP COLUMN "cta_label";
  ALTER TABLE "pages_blocks_text_section" DROP COLUMN "cta_href";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "body";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "show_whatsapp_button";
  ALTER TABLE "pages_blocks_cta_banner" DROP COLUMN "whatsapp_button_label";
  DROP TYPE "public"."enum_pages_blocks_text_section_align";`)
}
