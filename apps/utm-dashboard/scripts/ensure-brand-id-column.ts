import "../lib/load-env"

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql.query(
    `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "brand_id" text NOT NULL DEFAULT 'quotifii'`
  )
  console.log("users.brand_id migration applied successfully.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
