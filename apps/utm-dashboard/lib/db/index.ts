import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { Agent } from "undici"

import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const parsedTimeout = Number(process.env.DATABASE_CONNECT_TIMEOUT_MS ?? "60000")
const connectTimeout =
  Number.isFinite(parsedTimeout) && parsedTimeout > 0 ? parsedTimeout : 60_000

const dispatcher = new Agent({
  connectTimeout,
  headersTimeout: 120_000,
  bodyTimeout: 120_000,
})

const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: {
    dispatcher,
  },
})

export const db = drizzle(sql, { schema })
