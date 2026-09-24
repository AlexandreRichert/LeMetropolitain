import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { session as sessionTable, user as userTable } from "@/db/schema";

/** Désactive le compte et révoque immédiatement toutes ses sessions actives. */
export async function disableAccount(userId) {
  await db
    .update(userTable)
    .set({ disabled: true })
    .where(eq(userTable.id, userId));
  await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}
