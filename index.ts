import { env } from "cloudflare:workers";
export function getDb() {
  if (!env.DB)
    throw new Error("The question database is unavailable.");
  return env.DB;
}
