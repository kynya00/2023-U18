"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Label, TextInput } from "flowbite-react";

import { register } from "./actions";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col gap-4"
        action={async (formData: FormData) => {
          const { error } = await register(formData);
          switch (error) {
            case "internal":
              setError("Something went wrong :(");
              break;
            case "user_already_exists":
              setError("User already exists.");
              break;
            case null:
              router.replace("/");
              break;
          }
        }}
      >
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 max-w-5xl"
            role="alert"
          >
            <span className="break-all">{error}</span>
          </div>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput name="username" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput id="password" type="password" name="password" required />
        </div>
        <TextInput hidden name="role" type="hidden" value="user" readOnly />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
