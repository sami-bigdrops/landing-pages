import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return null

  if (!dbInstance) {
    const sql = neon(databaseUrl)
    dbInstance = drizzle(sql, { schema })
  }

  return dbInstance
}
