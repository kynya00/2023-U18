"use client";
import { Button, Label, TextInput } from "flowbite-react";

import { register } from "./actions";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex flex-col gap-4" action={register}>
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
