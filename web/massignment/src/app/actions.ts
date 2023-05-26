"use server";
import argon2 from "argon2";
import { z } from "zod";
import { redirect } from "next/navigation";

import { getDB } from "@/server/db";

const tLoginRequest = z.object({ username: z.string(), password: z.string() });
export async function login(formData: FormData) {
  const request = tLoginRequest.parse(
    Object.fromEntries(Array.from(formData.entries()))
  );

  try {
    const db = await getDB();
    const user = await db.get<{ id: string; password: string }>(
      "SELECT id, password FROM users WHERE username = ?",
      request.username
    );
    if (!user) {
      return { error: "forbidden" };
    }
    const valid = await argon2.verify(user.password, request.password);
    if (!valid) {
      return { error: "forbidden" };
    }

    if (argon2.needsRehash(user.password)) {
      await db.run(
        "UPDATE users SET password = ? WHERE username = ?",
        await argon2.hash(request.password),
        request.username
      );
    }
    redirect(`/dashboard/${user.id}`);
  } catch {
    return { error: "internal" };
  }
}
