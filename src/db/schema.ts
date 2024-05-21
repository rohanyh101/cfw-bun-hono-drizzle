import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	title: text("title", { length: 255 }).notNull(),
	content: text("content", { length: 255 }).notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
