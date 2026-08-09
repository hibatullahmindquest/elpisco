import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_color_preset" AS ENUM('elpis-editorial', 'client-palette');
  ALTER TABLE "site_settings" ADD COLUMN "color_preset" "enum_site_settings_color_preset" DEFAULT 'elpis-editorial';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "color_preset";
  DROP TYPE "public"."enum_site_settings_color_preset";`)
}
