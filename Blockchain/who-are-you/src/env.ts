import { z } from "zod";

export const challenge = "HaruulZangiU18";
export const env = z
  .object({
    FLAG: z.string().regex(/^HZU18{.+}$/),
  })
  .parse(process.env);
