import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_image_break" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_image_break" ADD COLUMN "fallback_image_url" varchar;
  ALTER TABLE "pages_blocks_text_section" ADD COLUMN "headline_accent" varchar;
  ALTER TABLE "pages_blocks_image_text" ADD COLUMN "fallback_image_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_image_break" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_image_break" DROP COLUMN "fallback_image_url";
  ALTER TABLE "pages_blocks_text_section" DROP COLUMN "headline_accent";
  ALTER TABLE "pages_blocks_image_text" DROP COLUMN "fallback_image_url";`)
}
