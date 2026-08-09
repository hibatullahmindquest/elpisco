import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_stage_list_items_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_link_list_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_image_text_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_grid_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_careers_list_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TABLE "pages_blocks_stage_list_items_sub_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stage_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"headline" varchar,
  	"body" varchar,
  	"sub_list_label" varchar,
  	"outcome_label" varchar,
  	"outcome" varchar,
  	"background" "enum_pages_blocks_stage_list_items_background" DEFAULT 'warm-white'
  );
  
  CREATE TABLE "pages_blocks_stage_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_link_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_link_list_background" DEFAULT 'warm-white',
  	"label" varchar,
  	"headline" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_scope_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_image_text_background" DEFAULT 'warm-white',
  	"image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'left',
  	"image_id" integer,
  	"label" varchar,
  	"headline" varchar NOT NULL,
  	"body" varchar,
  	"highlight" varchar,
  	"suited_text" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_grid_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_testimonials_grid_background" DEFAULT 'warm-white',
  	"label" varchar,
  	"note" varchar DEFAULT 'Client testimonials will appear here once verified. We only publish real, permissioned reviews.',
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"max_items" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_careers_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_careers_list_background" DEFAULT 'warm-white',
  	"label" varchar,
  	"empty_state_body" varchar DEFAULT 'No open roles right now. We are always interested in thoughtful designers, builders and project people. Send a concise portfolio and introduction for future consideration.',
  	"empty_state_cta_label" varchar DEFAULT 'INTRODUCE YOURSELF',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"count" numeric DEFAULT 2,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar DEFAULT 'SELECTED WORK' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"location_line" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_faq_accordion_background" DEFAULT 'warm-white',
  	"empty_state_body" varchar DEFAULT 'Frequently asked questions will appear here shortly.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar,
  	"primary_cta_label" varchar DEFAULT 'START A PROJECT',
  	"primary_cta_href" varchar DEFAULT '/start-a-project',
  	"secondary_cta_label" varchar DEFAULT 'CONTINUE ON WHATSAPP',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_stage_list_items_sub_list" ADD CONSTRAINT "pages_blocks_stage_list_items_sub_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stage_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stage_list_items" ADD CONSTRAINT "pages_blocks_stage_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stage_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stage_list" ADD CONSTRAINT "pages_blocks_stage_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list_items" ADD CONSTRAINT "pages_blocks_link_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_link_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list" ADD CONSTRAINT "pages_blocks_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_scope_items" ADD CONSTRAINT "pages_blocks_image_text_scope_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_grid_headline_lines" ADD CONSTRAINT "pages_blocks_testimonials_grid_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_grid" ADD CONSTRAINT "pages_blocks_testimonials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_careers_list" ADD CONSTRAINT "pages_blocks_careers_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_projects" ADD CONSTRAINT "pages_blocks_featured_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_headline_lines" ADD CONSTRAINT "pages_blocks_home_hero_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details_headline_lines" ADD CONSTRAINT "pages_blocks_contact_details_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details" ADD CONSTRAINT "pages_blocks_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_stage_list_items_sub_list_order_idx" ON "pages_blocks_stage_list_items_sub_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_stage_list_items_sub_list_parent_id_idx" ON "pages_blocks_stage_list_items_sub_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stage_list_items_order_idx" ON "pages_blocks_stage_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stage_list_items_parent_id_idx" ON "pages_blocks_stage_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stage_list_order_idx" ON "pages_blocks_stage_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_stage_list_parent_id_idx" ON "pages_blocks_stage_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stage_list_path_idx" ON "pages_blocks_stage_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_link_list_items_order_idx" ON "pages_blocks_link_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_list_items_parent_id_idx" ON "pages_blocks_link_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_list_order_idx" ON "pages_blocks_link_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_list_parent_id_idx" ON "pages_blocks_link_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_list_path_idx" ON "pages_blocks_link_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_scope_items_order_idx" ON "pages_blocks_image_text_scope_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_scope_items_parent_id_idx" ON "pages_blocks_image_text_scope_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_testimonials_grid_headline_lines_order_idx" ON "pages_blocks_testimonials_grid_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_grid_headline_lines_parent_id_idx" ON "pages_blocks_testimonials_grid_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_grid_order_idx" ON "pages_blocks_testimonials_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_grid_parent_id_idx" ON "pages_blocks_testimonials_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_grid_path_idx" ON "pages_blocks_testimonials_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_careers_list_order_idx" ON "pages_blocks_careers_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_careers_list_parent_id_idx" ON "pages_blocks_careers_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_careers_list_path_idx" ON "pages_blocks_careers_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_projects_order_idx" ON "pages_blocks_featured_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_projects_parent_id_idx" ON "pages_blocks_featured_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_projects_path_idx" ON "pages_blocks_featured_projects" USING btree ("_path");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_headline_lines_order_idx" ON "pages_blocks_home_hero_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_headline_lines_parent_id_idx" ON "pages_blocks_home_hero_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_image_idx" ON "pages_blocks_home_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_details_headline_lines_order_idx" ON "pages_blocks_contact_details_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_headline_lines_parent_id_idx" ON "pages_blocks_contact_details_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_order_idx" ON "pages_blocks_contact_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_parent_id_idx" ON "pages_blocks_contact_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_path_idx" ON "pages_blocks_contact_details" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_stage_list_items_sub_list" CASCADE;
  DROP TABLE "pages_blocks_stage_list_items" CASCADE;
  DROP TABLE "pages_blocks_stage_list" CASCADE;
  DROP TABLE "pages_blocks_link_list_items" CASCADE;
  DROP TABLE "pages_blocks_link_list" CASCADE;
  DROP TABLE "pages_blocks_image_text_scope_items" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_testimonials_grid_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_testimonials_grid" CASCADE;
  DROP TABLE "pages_blocks_careers_list" CASCADE;
  DROP TABLE "pages_blocks_featured_projects" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_home_hero_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_contact_details_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_contact_details" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_stage_list_items_background";
  DROP TYPE "public"."enum_pages_blocks_link_list_background";
  DROP TYPE "public"."enum_pages_blocks_image_text_background";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_testimonials_grid_background";
  DROP TYPE "public"."enum_pages_blocks_careers_list_background";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_background";`)
}
