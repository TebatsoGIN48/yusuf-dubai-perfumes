import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const perfumes = pgTable("perfumes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  imageUrl: text("image_url").notNull(),
  filter: text("filter").notNull(), // bestsellers, new, deals, all
  description: text("description"),
});

export const insertPerfumeSchema = createInsertSchema(perfumes).omit({
  id: true,
});

export type InsertPerfume = z.infer<typeof insertPerfumeSchema>;
export type Perfume = typeof perfumes.$inferSelect;
