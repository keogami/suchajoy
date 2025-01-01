import { db } from "$lib/server/db";
import { counter } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  const res = await db.query.counter.findFirst();

  if (!res) {
    console.error("counter has no row in it")
    error(500, "the system is in a bad state");
  }

  let { value } = res;
  return { value };
}
