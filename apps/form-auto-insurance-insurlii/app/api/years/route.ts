import { NextResponse } from "next/server"
import { desc } from "drizzle-orm"
import { db } from "@/lib/db"
import { years } from "@/lib/db/schema"

export async function GET() {
  try {
    const rows = await db
      .select({ id: years.id, year: years.year })
      .from(years)
      .orderBy(desc(years.year))

    return NextResponse.json(
      { years: rows },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  } catch (error) {
    console.error("years API error:", error)
    return NextResponse.json({ error: "Failed to fetch years" }, { status: 500 })
  }
}
