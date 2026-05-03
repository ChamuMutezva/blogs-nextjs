import { eq } from "drizzle-orm";
import { db } from "@/db";
import { blogs, users } from "@/db/schema";

// ✅ Return full list of users
export const getUsers = async () => {
    return db.query.users.findMany();
};

// ✅ Return single user by ID
export const getUserById = async (id: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, id)
    });
};

// ✅ Return single user by username
export const getUserByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username)
    });
};

// ✅ Return blogs by userId
export const getBlogsByUserId = async (userId: number) => {
    return db.query.blogs.findMany({
        where: eq(blogs.userId, userId),
    });
};

// Return user with their blogs using relations
export const getUserWithBlogsByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: {
            blogs: true,
        },
    });
}

export const getUserWithBlogs = async (userId: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            blogs: true,
        },
    });
}
