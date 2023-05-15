"use server";
import argon2 from "argon2";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getDB } from "@/server/db";

const tLoginRequest = z.object({ username: z.string(), password: z.string() });
export async function login(formData: FormData) {
  const request = tLoginRequest.parse(
    Object.fromEntries(Array.from(formData.entries()))
  );

  const db = await getDB();
  const user = await db.get<{ id: string; password: string }>(
    "SELECT id, password FROM users WHERE username = ?",
    request.username
  );
  if (!user) {
    throw Error("Invalid username or password");
  }

  const valid = await argon2.verify(user.password, request.password);
  if (!valid) {
    throw Error("Invalid username or password");
  }

  if (argon2.needsRehash(user.password)) {
    await db.run(
      "UPDATE users SET password = ? WHERE username = ?",
      await argon2.hash(request.password),
      request.username
    );
  }
  redirect(`/dashboard/${user.id}`);
}
