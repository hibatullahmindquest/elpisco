import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_enquiries_source" AS ENUM('start-a-project', 'contact-form');
  CREATE TYPE "public"."enum_enquiries_lead_tier" AS ENUM('priority', 'qualified', 'review', 'low-fit');
  CREATE TABLE "enquiries_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "enquiries_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  ALTER TABLE "enquiries" ADD COLUMN "source" "enum_enquiries_source" DEFAULT 'start-a-project';
  ALTER TABLE "enquiries" ADD COLUMN "lead_tier" "enum_enquiries_lead_tier";
  ALTER TABLE "enquiries" ADD COLUMN "lead_score" numeric;
  ALTER TABLE "enquiries" ADD COLUMN "preferred_contact_method" varchar;
  ALTER TABLE "enquiries" ADD COLUMN "built_up_range" varchar;
  ALTER TABLE "enquiries" ADD COLUMN "transformation_level" varchar;
  ALTER TABLE "enquiries" ADD COLUMN "consent" boolean DEFAULT false;
  ALTER TABLE "enquiries_services" ADD CONSTRAINT "enquiries_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiries_areas" ADD CONSTRAINT "enquiries_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "enquiries_services_order_idx" ON "enquiries_services" USING btree ("_order");
  CREATE INDEX "enquiries_services_parent_id_idx" ON "enquiries_services" USING btree ("_parent_id");
  CREATE INDEX "enquiries_areas_order_idx" ON "enquiries_areas" USING btree ("_order");
  CREATE INDEX "enquiries_areas_parent_id_idx" ON "enquiries_areas" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "enquiries_services" CASCADE;
  DROP TABLE "enquiries_areas" CASCADE;
  ALTER TABLE "enquiries" DROP COLUMN "source";
  ALTER TABLE "enquiries" DROP COLUMN "lead_tier";
  ALTER TABLE "enquiries" DROP COLUMN "lead_score";
  ALTER TABLE "enquiries" DROP COLUMN "preferred_contact_method";
  ALTER TABLE "enquiries" DROP COLUMN "built_up_range";
  ALTER TABLE "enquiries" DROP COLUMN "transformation_level";
  ALTER TABLE "enquiries" DROP COLUMN "consent";
  DROP TYPE "public"."enum_enquiries_source";
  DROP TYPE "public"."enum_enquiries_lead_tier";`)
}
