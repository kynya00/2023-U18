import z from "zod";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

import { env } from "@/env";

const provider = new ethers.JsonRpcProvider(env.RPC_URL);
const wallet = new ethers.Wallet(env.FAUCET_PRIVATE_KEY, provider);

const zFaucetRequest = z.strictObject({
  address: z.string().refine(ethers.isAddress, {
    message: "A valid Ethereum address must be provided",
  }),
});
export async function POST(request: Request) {
  const body = request.json();

  let address: string;
  try {
    const faucetRequest = await zFaucetRequest.parseAsync(body);
    address = faucetRequest.address;
  } catch {
    return new NextResponse(
      "Bad Request. For more info, see: https://http.cat/400",
      { status: 400 }
    );
  }

  const result = await wallet.sendTransaction({
    to: address,
    value: ethers.parseEther("1"),
  });
  return NextResponse.json({ txHash: result.hash });
}
