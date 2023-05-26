"use server";
import argon2 from "argon2";
import { z } from "zod";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

import { getDB } from "@/server/db";

const tRegisterRequest = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(["admin", "user"]),
});
export async function register(formData: FormData) {
  const userData = tRegisterRequest.parse(
    Object.fromEntries(Array.from(formData.entries()))
  );

  try {
    const db = await getDB();
    await db.run(
      "INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)",
      nanoid(32),
      userData.username,
      await argon2.hash(userData.password),
      userData.role
    );
    return { error: null };
  } catch (e) {
    const maybeError = z.object({ code: z.string() }).safeParse(e);
    if (maybeError.success) {
      if (maybeError.data.code === "SQLITE_CONSTRAINT") {
        return { error: "user_already_exists" };
      }
    }
    return { error: "internal" };
  }
}
