import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs, NewBlog } from "@/db/schema";

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const getBlogByID = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addBlog = async (data: NewBlog) => {
  const [newBlog] = await db
    .insert(blogs)
    .values({
      ...data,
      likes: data.likes ?? 0, // Ensure likes defaults to 0
    })
    .returning();
  return newBlog;
};

export const incrementLikes = async (id: number) => {
  const [updated] = await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
    .returning();
  return updated;
};