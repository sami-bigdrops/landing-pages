import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const vehicleQuotes = pgTable("vehicle_quotes", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id),
  carYear: varchar("car_year", { length: 4 }).notNull(),
  carMake: varchar("car_make", { length: 100 }).notNull(),
  carModel: varchar("car_model", { length: 100 }).notNull(),
  currentMileage: varchar("current_mileage", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
