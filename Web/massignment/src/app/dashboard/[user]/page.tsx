import { redirect } from "next/navigation";

import { env } from "@/env";
import { getDB } from "@/server/db";
import { DashboardBadge } from "@/components/DashboardBadge";

export default async function Dashboard({
  params,
}: {
  params: { user: string };
}) {
  const db = await getDB();
  const user = await db.get<{ role: "admin" | "user" }>(
    "SELECT role FROM users WHERE id = ?",
    params.user
  );
  if (!user) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DashboardBadge
        role={user.role}
        flag={user.role === "admin" ? env.FLAG : undefined}
      />
    </main>
  );
}
