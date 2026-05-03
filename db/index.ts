import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema"; // 👈 Import your schema

config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is missing from .env");
}

const sql = neon(DATABASE_URL);

// 👇 Pass `{ schema }` here to enable `db.query`
export const db = drizzle(process.env.DATABASE_URL!, { schema, logger: true });
