import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  topic: text("topic").notNull(),
  question: text("question").notNull(),
  createdAt: text("created_at").notNull(),
});
