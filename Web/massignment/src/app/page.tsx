import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/LoginForm";

export default function Home() {
  const cookieStore = cookies();
  if (cookieStore.has("auth")) {
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
}
