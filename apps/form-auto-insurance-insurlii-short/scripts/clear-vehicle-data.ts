import "../lib/load-env.js"
import { sql } from "drizzle-orm"
import { db } from "../lib/db/index.js"

const TABLES = [
  "bike_makes",
  "car_makes",
  "years",
] as const

function hasConfirmation(): boolean {
  return (
    process.argv.includes("--confirm") ||
    process.env.CONFIRM_CLEAR === "true"
  )
}

async function main() {
  if (!hasConfirmation()) {
    console.error(
      "Refusing to clear data without confirmation.\n" +
        "Run: pnpm clear-vehicle-data --confirm\n" +
        "Or: CONFIRM_CLEAR=true pnpm clear-vehicle-data"
    )
    process.exit(1)
  }

  console.log("Clearing vehicle tables:", TABLES.join(", "))

  await db.execute(
    sql.raw(
      `TRUNCATE TABLE ${TABLES.join(", ")} RESTART IDENTITY CASCADE`
    )
  )

  console.log("All vehicle data cleared.")
  process.exit(0)
}

main().catch((error) => {
  console.error("Error:", error)
  process.exit(1)
})
