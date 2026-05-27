import "../lib/load-env.js"
import { eq } from "drizzle-orm"
import {
  getCarLogoSlugIndex,
  getCarLogoThumbUrl,
  loadCarLogosDataset,
  resolveCarLogoSlug,
} from "../lib/car-logos.js"
import { db } from "../lib/db/index.js"
import { carMakes } from "../lib/db/schema.js"

async function main() {
  console.log("Loading car logos dataset...")
  await loadCarLogosDataset()
  const slugIndex = await getCarLogoSlugIndex()

  const makes = await db
    .select({ id: carMakes.id, name: carMakes.name })
    .from(carMakes)

  let matched = 0

  for (const make of makes) {
    const slug = resolveCarLogoSlug(make.name, slugIndex)
    if (slug) {
      await db
        .update(carMakes)
        .set({ logoUrl: getCarLogoThumbUrl(slug) })
        .where(eq(carMakes.id, make.id))
      matched++
    }
  }

  console.log(`Matched ${matched}/${makes.length} car makes with logo URLs`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
