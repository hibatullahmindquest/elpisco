import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_header_behavior" AS ENUM('frosted', 'hide-on-scroll');
  ALTER TABLE "site_settings" ADD COLUMN "header_behavior" "enum_site_settings_header_behavior" DEFAULT 'frosted';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "header_behavior";
  DROP TYPE "public"."enum_site_settings_header_behavior";`)
}
