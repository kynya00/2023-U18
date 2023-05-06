import { challenge } from "./api/flag/route";

import { FlagRequestWidget } from "@/components/FlagRequestWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FlagRequestWidget
        challenge={"0x" + Buffer.from(challenge, "utf-8").toString("hex")}
      />
    </main>
  );
}
