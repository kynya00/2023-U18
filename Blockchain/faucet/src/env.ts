import { z } from "zod";

export const env = z
  .object({
    RPC_URL: z.string().url(),
    FAUCET_PRIVATE_KEY: z.string(),
  })
  .parse(process.env);
