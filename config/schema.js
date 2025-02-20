import { integer, pgTable, varchar, serial, text } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  imageUrl: varchar("imageUrl").notNull(),
  credits: integer("credits").default(3),
});

export const AiGeneratedImage = pgTable("ai-generated-image", {
  id: serial("id").primaryKey(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  orgImage: varchar("orgImage").notNull(),
  aiImage: varchar("aiImage").notNull(),
  userEmail: varchar("userEmail"),
});

export const Reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userEmail: varchar("user_email").notNull(),
  imageId: integer("image_id")
    .notNull()
    .references(() => AiGeneratedImage.id, { onDelete: "CASCADE" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
});

export const Favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userEmail: varchar("user_email").notNull(),
  imageId: integer("image_id")
    .notNull()
    .references(() => AiGeneratedImage.id, { onDelete: "CASCADE" }),
});

