"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

import { login } from "@/app/actions";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="flex flex-col gap-4"
      action={async (formData: FormData) => {
        const { error } = await login(formData);
        switch (error) {
          case "internal":
            setError("Something went wrong :(");
            break;
          case "forbidden":
            setError("Incorrect username or password");
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
      <Button type="submit">Sign in</Button>
      <Label>
        <Link
          href="/register"
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign up
        </Link>
      </Label>
    </form>
  );
}
