import "../lib/load-env"

import { eq } from "drizzle-orm"

import {
  createUser,
  findUserByUsername,
  hashPassword,
} from "../lib/auth"
import { db } from "../lib/db/index"
import { users } from "../lib/db/schema"

const USERNAME = "admin-insurlii"
const PASSWORD = "Admin123"
const BRAND_ID = "insurlii"

async function main() {
  const existing = await findUserByUsername(USERNAME)
  if (existing) {
    await db
      .update(users)
      .set({
        brandId: BRAND_ID,
        passwordHash: hashPassword(PASSWORD),
      })
      .where(eq(users.id, existing.id))
    console.log(`Updated user "${USERNAME}" for brand "${BRAND_ID}".`)
    return
  }

  await createUser(USERNAME, PASSWORD, BRAND_ID)
  console.log(`Created user "${USERNAME}" for brand "${BRAND_ID}".`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
