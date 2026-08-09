import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_site_settings_font_preset" ADD VALUE 'playfair-montserrat';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "font_preset" SET DATA TYPE text;
  ALTER TABLE "site_settings" ALTER COLUMN "font_preset" SET DEFAULT 'instrument-manrope'::text;
  DROP TYPE "public"."enum_site_settings_font_preset";
  CREATE TYPE "public"."enum_site_settings_font_preset" AS ENUM('instrument-manrope', 'playfair-inter');
  ALTER TABLE "site_settings" ALTER COLUMN "font_preset" SET DEFAULT 'instrument-manrope'::"public"."enum_site_settings_font_preset";
  ALTER TABLE "site_settings" ALTER COLUMN "font_preset" SET DATA TYPE "public"."enum_site_settings_font_preset" USING "font_preset"::"public"."enum_site_settings_font_preset";`)
}
