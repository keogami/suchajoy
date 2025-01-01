import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { counter } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const POST: RequestHandler = async () => {
  const res = await db.update(counter).set({
    value: sql`${counter.value} + 1`,
  }).where(eq(counter.id, 0)).returning();

  const value = res[0].value;

  return Response.json({ value })
}
