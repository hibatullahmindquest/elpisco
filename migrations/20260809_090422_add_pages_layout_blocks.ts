import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_break_aspect_ratio" AS ENUM('21 / 9', '16 / 9', '4 / 3');
  CREATE TYPE "public"."enum_pages_blocks_text_section_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_text_section_emphasis" AS ENUM('standard', 'feature');
  CREATE TYPE "public"."enum_pages_blocks_founder_grid_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_credentials_grid_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_split_text_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_numbered_list_background" AS ENUM('warm-white', 'soft-white', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_numbered_list_columns" AS ENUM('1', '2');
  CREATE TABLE "pages_blocks_hero_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_break" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"aspect_ratio" "enum_pages_blocks_image_break_aspect_ratio" DEFAULT '21 / 9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_text_section_background" DEFAULT 'warm-white',
  	"label" varchar,
  	"emphasis" "enum_pages_blocks_text_section_emphasis" DEFAULT 'standard',
  	"headline" varchar,
  	"body" varchar,
  	"stats_disclaimer" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founder_grid_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_founder_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_founder_grid_background" DEFAULT 'warm-white',
  	"label" varchar,
  	"note" varchar DEFAULT 'Founder profiles will appear here once Elpis provides names, photos and biographies.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_credentials_grid_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_credentials_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_credentials_grid_background" DEFAULT 'warm-white',
  	"label" varchar,
  	"note" varchar DEFAULT 'Verified registrations and certifications will appear here once confirmed. We do not publish credentials that have not been verified.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_text_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"headline" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_split_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_split_text_background" DEFAULT 'warm-white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_numbered_list_background" DEFAULT 'warm-white',
  	"label" varchar,
  	"columns" "enum_pages_blocks_numbered_list_columns" DEFAULT '2',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'START A PROJECT' NOT NULL,
  	"button_href" varchar DEFAULT '/start-a-project' NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_headline_lines" ADD CONSTRAINT "pages_blocks_hero_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_break" ADD CONSTRAINT "pages_blocks_image_break_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_break" ADD CONSTRAINT "pages_blocks_image_break_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_section_stats" ADD CONSTRAINT "pages_blocks_text_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_section" ADD CONSTRAINT "pages_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_grid_headline_lines" ADD CONSTRAINT "pages_blocks_founder_grid_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_grid" ADD CONSTRAINT "pages_blocks_founder_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_credentials_grid_headline_lines" ADD CONSTRAINT "pages_blocks_credentials_grid_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_credentials_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_credentials_grid" ADD CONSTRAINT "pages_blocks_credentials_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_text_columns" ADD CONSTRAINT "pages_blocks_split_text_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_text" ADD CONSTRAINT "pages_blocks_split_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_list_items" ADD CONSTRAINT "pages_blocks_numbered_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbered_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_list" ADD CONSTRAINT "pages_blocks_numbered_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner_headline_lines" ADD CONSTRAINT "pages_blocks_cta_banner_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_headline_lines_order_idx" ON "pages_blocks_hero_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_headline_lines_parent_id_idx" ON "pages_blocks_hero_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_break_order_idx" ON "pages_blocks_image_break" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_break_parent_id_idx" ON "pages_blocks_image_break" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_break_path_idx" ON "pages_blocks_image_break" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_break_image_idx" ON "pages_blocks_image_break" USING btree ("image_id");
  CREATE INDEX "pages_blocks_text_section_stats_order_idx" ON "pages_blocks_text_section_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_section_stats_parent_id_idx" ON "pages_blocks_text_section_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_section_order_idx" ON "pages_blocks_text_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_section_parent_id_idx" ON "pages_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_section_path_idx" ON "pages_blocks_text_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_grid_headline_lines_order_idx" ON "pages_blocks_founder_grid_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_grid_headline_lines_parent_id_idx" ON "pages_blocks_founder_grid_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_grid_order_idx" ON "pages_blocks_founder_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_grid_parent_id_idx" ON "pages_blocks_founder_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_grid_path_idx" ON "pages_blocks_founder_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_credentials_grid_headline_lines_order_idx" ON "pages_blocks_credentials_grid_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_credentials_grid_headline_lines_parent_id_idx" ON "pages_blocks_credentials_grid_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_credentials_grid_order_idx" ON "pages_blocks_credentials_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_credentials_grid_parent_id_idx" ON "pages_blocks_credentials_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_credentials_grid_path_idx" ON "pages_blocks_credentials_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_text_columns_order_idx" ON "pages_blocks_split_text_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_text_columns_parent_id_idx" ON "pages_blocks_split_text_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_text_order_idx" ON "pages_blocks_split_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_text_parent_id_idx" ON "pages_blocks_split_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_text_path_idx" ON "pages_blocks_split_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_numbered_list_items_order_idx" ON "pages_blocks_numbered_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_list_items_parent_id_idx" ON "pages_blocks_numbered_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_list_order_idx" ON "pages_blocks_numbered_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_list_parent_id_idx" ON "pages_blocks_numbered_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_list_path_idx" ON "pages_blocks_numbered_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_headline_lines_order_idx" ON "pages_blocks_cta_banner_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_headline_lines_parent_id_idx" ON "pages_blocks_cta_banner_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_image_break" CASCADE;
  DROP TABLE "pages_blocks_text_section_stats" CASCADE;
  DROP TABLE "pages_blocks_text_section" CASCADE;
  DROP TABLE "pages_blocks_founder_grid_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_founder_grid" CASCADE;
  DROP TABLE "pages_blocks_credentials_grid_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_credentials_grid" CASCADE;
  DROP TABLE "pages_blocks_split_text_columns" CASCADE;
  DROP TABLE "pages_blocks_split_text" CASCADE;
  DROP TABLE "pages_blocks_numbered_list_items" CASCADE;
  DROP TABLE "pages_blocks_numbered_list" CASCADE;
  DROP TABLE "pages_blocks_cta_banner_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_image_break_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_text_section_background";
  DROP TYPE "public"."enum_pages_blocks_text_section_emphasis";
  DROP TYPE "public"."enum_pages_blocks_founder_grid_background";
  DROP TYPE "public"."enum_pages_blocks_credentials_grid_background";
  DROP TYPE "public"."enum_pages_blocks_split_text_background";
  DROP TYPE "public"."enum_pages_blocks_numbered_list_background";
  DROP TYPE "public"."enum_pages_blocks_numbered_list_columns";`)
}
