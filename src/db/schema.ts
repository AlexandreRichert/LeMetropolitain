import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const favorite = pgTable(
  "favorite",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    artworkId: text("artwork_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("favorite_user_artwork_idx").on(table.userId, table.artworkId),
  ],
);

export const booking = pgTable("booking", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  items: jsonb("items").notNull(), // [{ id, label, kind: 'ticket' | 'option', price, quantity, subtotal }]
  visitors: integer("visitors").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
