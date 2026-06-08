import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const years = pgTable("years", {
  id: serial("id").primaryKey(),
  apiYearId: integer("api_year_id").notNull().unique(),
  year: integer("year").notNull(),
})

export const carMakes = pgTable("car_makes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  logoUrl: text("logo_url"),
})

export const bikeMakes = pgTable("bike_makes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  logoUrl: text("logo_url"),
})
