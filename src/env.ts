import "@std/dotenv/load";
import * as z from "zod";

export const EnvSchema = z.object({
  YOUTUBE_API: z.string(),
  YOUTUBE_CHANNEL_ID: z
    .string()
    .transform((value) => value.split(",").map((id) => id.trim())),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

let env: EnvSchema;

const { data, error } = EnvSchema.safeParse(Deno.env.toObject());

if (error) {
  console.log(error.issues.flat());
  throw new Error("Missing invalid env");
}

env = data;

export default env;
