import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_numbered_list" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_numbered_list" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "pages_blocks_numbered_list" ADD COLUMN "cta_href" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_numbered_list" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_numbered_list" DROP COLUMN "cta_label";
  ALTER TABLE "pages_blocks_numbered_list" DROP COLUMN "cta_href";`)
}
