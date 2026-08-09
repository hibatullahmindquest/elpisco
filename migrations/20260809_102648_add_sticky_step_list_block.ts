import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_sticky_step_list_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_sticky_step_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_sticky_step_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_sticky_step_list_headline_lines" ADD CONSTRAINT "pages_blocks_sticky_step_list_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sticky_step_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_step_list_items" ADD CONSTRAINT "pages_blocks_sticky_step_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sticky_step_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_step_list" ADD CONSTRAINT "pages_blocks_sticky_step_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_sticky_step_list_headline_lines_order_idx" ON "pages_blocks_sticky_step_list_headline_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_step_list_headline_lines_parent_id_idx" ON "pages_blocks_sticky_step_list_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_step_list_items_order_idx" ON "pages_blocks_sticky_step_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_step_list_items_parent_id_idx" ON "pages_blocks_sticky_step_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_step_list_order_idx" ON "pages_blocks_sticky_step_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_step_list_parent_id_idx" ON "pages_blocks_sticky_step_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_step_list_path_idx" ON "pages_blocks_sticky_step_list" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_sticky_step_list_headline_lines" CASCADE;
  DROP TABLE "pages_blocks_sticky_step_list_items" CASCADE;
  DROP TABLE "pages_blocks_sticky_step_list" CASCADE;`)
}
