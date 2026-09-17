import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const favorite = pgTable("favorite", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  artworkId: text("artwork_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
