"use client";

import { Alert } from "flowbite-react";

export function DashboardBadge({
  role,
  flag,
}: {
  role: "admin" | "user";
  flag?: string;
}) {
  if (role === "user") {
    return (
      <Alert color="info">
        <span>
          <span className="font-medium">Welcome!</span> You need to be an admin
          to view the flag.
        </span>
      </Alert>
    );
  }

  return (
    <Alert color="success">
      <span>
        <span className="font-medium">Congratz! 🎉</span> The flag is: {flag}
      </span>
    </Alert>
  );
}
