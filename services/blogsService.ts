import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs, NewBlog } from "@/db/schema";

// ✅ Return full list of blogs
export const getBlogs = async () => {
    return db.query.blogs.findMany();
};

// ✅ Return single blog by ID
export const getBlogByID = async (id: number) => {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id),
    });
};

// ✅ Insert new blog
// The 'data' parameter is typed as 'NewBlog' which now includes 'userId'
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
    if (!updated) {
        throw new Error(`Blog with id ${id} not found `);
    }
    return updated;
};
