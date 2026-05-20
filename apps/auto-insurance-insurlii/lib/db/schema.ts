import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const utmParamStatusEnum = pgEnum("utm_param_status", ["active", "blocked"])

export const utmParams = pgTable(
  "utm_params",
  {
    id: serial("id").primaryKey(),
    brandId: text("brand_id").notNull(),
    productId: text("product_id").notNull().default("auto_insurance_insurlii"),
    key: text("key").notNull(),
    value: text("value").notNull(),
    status: utmParamStatusEnum("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    brandProductKeyValueUnique: uniqueIndex("utm_params_brand_product_key_value_unique").on(
      table.brandId,
      table.productId,
      table.key,
      table.value
    ),
  })
)
