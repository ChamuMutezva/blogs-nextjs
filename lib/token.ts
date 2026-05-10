import { randomBytes } from "node:crypto";

/**
 * Generate a cryptographically secure token
 * @param bytes Length in bytes (default: 32 → 64 hex chars)
 */
export const generateToken = (bytes = 32): string => {
    return randomBytes(bytes).toString("hex");
};

/**
 * Check if a token is expired
 */
export const isTokenExpired = (expiry: Date | null): boolean => {
    if (!expiry) return true;
    return new Date() > expiry;
};

/**
 * Default token expiry: 24 hours
 */
export const DEFAULT_TOKEN_EXPIRY_HOURS = 24;

/**
 * Calculate expiry date from now
 */
export const getTokenExpiry = (hours = DEFAULT_TOKEN_EXPIRY_HOURS): Date => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date;
};
