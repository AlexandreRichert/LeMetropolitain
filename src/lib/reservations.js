import "server-only";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { booking } from "@/db/schema";

export async function getBookings(userId) {
  return db
    .select()
    .from(booking)
    .where(eq(booking.userId, userId))
    .orderBy(desc(booking.createdAt));
}

export async function createBooking(userId, { items, visitors, total }) {
  const [row] = await db
    .insert(booking)
    .values({ id: randomUUID(), userId, items, visitors, total })
    .returning();
  return row;
}
