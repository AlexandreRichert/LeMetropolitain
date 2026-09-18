import "server-only";
import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { favorite } from "@/db/schema";

export async function getFavoriteArtworkIds(userId) {
  const rows = await db
    .select({ artworkId: favorite.artworkId })
    .from(favorite)
    .where(eq(favorite.userId, userId));
  return rows.map((r) => r.artworkId);
}

export async function addFavorite(userId, artworkId) {
  await db
    .insert(favorite)
    .values({ id: randomUUID(), userId, artworkId })
    .onConflictDoNothing({ target: [favorite.userId, favorite.artworkId] });
}

export async function removeFavorite(userId, artworkId) {
  await db
    .delete(favorite)
    .where(and(eq(favorite.userId, userId), eq(favorite.artworkId, artworkId)));
}
