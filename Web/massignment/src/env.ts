import { z } from "zod";

export const env = z
  .object({
    FLAG: z.string().regex(/^HZU18{.+}$/),
    DB_DIR: z.string().optional(),
  })
  .parse(process.env);
