import { config } from "dotenv"
import { neon } from "@neondatabase/serverless"

config({ path: ".env.local" })
config({ path: ".env" })

const url = process.env.DATABASE_URL
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local in apps/utm-dashboard.")
  process.exit(1)
}

const sql = neon(url)

async function main() {
  await sql.query(
    `ALTER TABLE "utm_params" ADD COLUMN IF NOT EXISTS "product_id" text NOT NULL DEFAULT 'auto_insurance_quotifii'`
  )
  await sql.query(`DROP INDEX IF EXISTS "utm_params_brand_id_key_value_unique"`)
  await sql.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS "utm_params_brand_product_key_value_unique" ON "utm_params" ("brand_id", "product_id", "key", "value")`
  )
  console.log("utm_params.product_id migration applied successfully.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
