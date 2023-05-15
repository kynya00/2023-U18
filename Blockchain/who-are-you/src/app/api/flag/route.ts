import { ethers } from "ethers";
import { NextResponse } from "next/server";

import { challenge, env } from "@/env";

const digest = ethers.hashMessage(challenge);

export async function POST(request: Request) {
  const body = await request.formData();

  let address: string;
  try {
    address = ethers.recoverAddress(digest, body.get("signature") as string);
    if (address !== body.get("address")) {
      throw Error("Address mismatch");
    }
  } catch {
    return new NextResponse("Don't try to fool me!! https://http.cat/403", {
      status: 403,
    });
  }

  return NextResponse.json({ flag: env.FLAG });
}
