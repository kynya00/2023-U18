import { z } from "zod";
import { ethers } from "ethers";

export const env = z
  .object({
    RPC_URL: z.string().url(),
    CONTRACT_ADDRESS: z
      .string()
      .refine(ethers.isAddress, "Must be a contract address"),
    FLAG: z.string().regex(/^HZU18{.+}$/),
  })
  .parse(process.env);
