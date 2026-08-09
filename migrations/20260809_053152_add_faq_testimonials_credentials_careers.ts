import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_careers_status" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_careers_employment_type" AS ENUM('Full-time', 'Part-time', 'Internship', 'Contract');
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"quote" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_detail" varchar,
  	"related_project_id" integer,
  	"rating" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "credentials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"label" varchar NOT NULL,
  	"value" varchar,
  	"issuer" varchar,
  	"icon_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"job_title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_careers_status" DEFAULT 'open',
  	"order" numeric DEFAULT 0,
  	"department" varchar,
  	"location" varchar,
  	"employment_type" "enum_careers_employment_type",
  	"summary" varchar,
  	"description" varchar,
  	"apply_email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "credentials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "careers_id" integer;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "credentials" ADD CONSTRAINT "credentials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "testimonials_related_project_idx" ON "testimonials" USING btree ("related_project_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "credentials_icon_idx" ON "credentials" USING btree ("icon_id");
  CREATE INDEX "credentials_updated_at_idx" ON "credentials" USING btree ("updated_at");
  CREATE INDEX "credentials_created_at_idx" ON "credentials" USING btree ("created_at");
  CREATE UNIQUE INDEX "careers_slug_idx" ON "careers" USING btree ("slug");
  CREATE INDEX "careers_updated_at_idx" ON "careers" USING btree ("updated_at");
  CREATE INDEX "careers_created_at_idx" ON "careers" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_credentials_fk" FOREIGN KEY ("credentials_id") REFERENCES "public"."credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_credentials_id_idx" ON "payload_locked_documents_rels" USING btree ("credentials_id");
  CREATE INDEX "payload_locked_documents_rels_careers_id_idx" ON "payload_locked_documents_rels" USING btree ("careers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "credentials" CASCADE;
  DROP TABLE "careers" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_credentials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_careers_fk";
  
  DROP INDEX "payload_locked_documents_rels_faq_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_credentials_id_idx";
  DROP INDEX "payload_locked_documents_rels_careers_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "credentials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "careers_id";
  DROP TYPE "public"."enum_careers_status";
  DROP TYPE "public"."enum_careers_employment_type";`)
}
