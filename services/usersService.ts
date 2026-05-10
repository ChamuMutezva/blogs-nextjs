import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { generateToken, getTokenExpiry } from "@/lib/token";

// ✅ Return full list of users
export const getUsers = async () => {
    return db.query.users.findMany();
};

// ✅ Return single user by ID
export const getUserById = async (id: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, id),
    });
};

// ✅ Return single user by username
export const getUserByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
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
};

export const getUserWithBlogs = async (userId: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            blogs: true,
        },
    });
};

export const registerUser = async ({
    username,
    name,
    password,
}: {
    username: string;
    name: string;
    password: string;
}) => {
    // 1️⃣ Check for existing username
    const existing = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
    if (existing.length > 0) {
        throw new Error("Username already exists");
    }

    // 2️⃣ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Insert user & return created record
    const [newUser] = await db
        .insert(users)
        .values({ username, name, passwordHash: hashedPassword })
        .returning();

    return newUser;
};

/**
 * Generate a new token for a user
 */
export const generateUserToken = async (
    userId: number,
    expiryHours?: number,
) => {
    const token = generateToken();
    const tokenExpiry = getTokenExpiry(expiryHours);

    const [updated] = await db
        .update(users)
        .set({ token, tokenExpiry })
        .where(eq(users.id, userId))
        .returning();

    return updated;
};


/**
 * Validate a token and return the user if valid
 */
export const validateUserToken = async (token: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.token, token)));
  
  if (!user || !user.tokenExpiry) return null;
  
  // Check expiry
  if (new Date() > user.tokenExpiry) {
    // Optionally clear expired token
    await db.update(users).set({ token: null, tokenExpiry: null }).where(eq(users.id, user.id));
    return null;
  }
  
  return user;
};

/**
 * Revoke a user's token
 */
export const revokeUserToken = async (userId: number) => {
  await db
    .update(users)
    .set({ token: null, tokenExpiry: null })
    .where(eq(users.id, userId));
};

/**
 * Get user by ID with token info (for admin views)
 */
export const getUserWithToken = async (userId: number) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));
  return user;
};
