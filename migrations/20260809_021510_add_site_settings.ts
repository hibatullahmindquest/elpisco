import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_font_preset" AS ENUM('instrument-manrope', 'playfair-inter');
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'ELPIS.CO',
  	"logo_id" integer,
  	"tagline" varchar DEFAULT 'Interior design, renovation and design & build, based in Shah Alam, Malaysia.',
  	"font_preset" "enum_site_settings_font_preset" DEFAULT 'instrument-manrope',
  	"contact_email" varchar,
  	"contact_whatsapp_url" varchar,
  	"contact_instagram_url" varchar,
  	"contact_city" varchar DEFAULT 'Shah Alam',
  	"contact_country" varchar DEFAULT 'Malaysia',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_site_settings_font_preset";`)
}
