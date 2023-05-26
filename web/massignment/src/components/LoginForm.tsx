"use client";
import Link from "next/link";
import { Button, Label, TextInput } from "flowbite-react";

import { login } from "@/app/actions";

export function LoginForm() {
  return (
    <form className="flex flex-col gap-4" action={login}>
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
