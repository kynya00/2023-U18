import { ethers } from "ethers";
import { NextResponse } from "next/server";

import { env } from "@/env";

export const challenge = "flag-market-challenge";

const digest = ethers.hashMessage(challenge);
const provider = new ethers.JsonRpcProvider(env.RPC_URL);
const contract = new ethers.Contract(
  env.CONTRACT_ADDRESS,
  ["function hasBoughtFlag(address user) public view returns (bool)"],
  provider
);

export async function POST(request: Request) {
  const body = await request.json();

  let address: string;
  try {
    address = ethers.recoverAddress(digest, body);
  } catch {
    return new NextResponse("Don't try to fool me!! https://http.cat/403", {
      status: 403,
    });
  }

  const hasBoughtFlag = await contract.hasBoughtFlag(address);
  if (!hasBoughtFlag) {
    return new NextResponse("Don't try to fool me!! https://http.cat/403", {
      status: 403,
    });
  }
  return NextResponse.json({ flag: env.FLAG });
}
