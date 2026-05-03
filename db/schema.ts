import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    author: text("author").notNull(),
    url: text("url").notNull(),
    likes: integer("likes").notNull().default(0),

    userId: integer("user_id").notNull().references(() => users.id)
});

// ✅ Export type for inserts (excludes `id` and uses optional `likes`)
export type NewBlog = typeof blogs.$inferInsert;
export type Blog = typeof blogs.$inferSelect;

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    name: text("name").notNull(),
})

export type User = typeof users.$inferSelect

export const usersRelations = relations(users, ({many}) => ({
    blogs: many(blogs)
}))

export const blogsRelations = relations(blogs, ({one}) => ({
    user: one(users, {
        fields: [blogs.userId],
        references: [users.id]
    })
}))
