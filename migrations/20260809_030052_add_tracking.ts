import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "tracking" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gtm_id" varchar,
  	"ga4_id" varchar,
  	"meta_pixel_id" varchar,
  	"custom_head_code" varchar,
  	"custom_body_end_code" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tracking" CASCADE;`)
}
