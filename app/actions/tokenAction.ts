"use server";
import { revalidatePath } from "next/cache";
import {
    generateUserToken,
    revokeUserToken,
    getUserWithToken,
} from "@/services/usersService";
import { auth } from "@/auth";

export type TokenActionState = {
    success?: string;
    error?: string;
    token?: string;
} | null;

export type TokenStatus = {
    hasToken: boolean;
    isExpired: boolean;
    expiryDate?: string;
    tokenPreview?: string; // First 8 chars for display (never full token)
};

export async function generateTokenAction(
    prevState: TokenActionState,
    formData: FormData,
): Promise<TokenActionState> {
    // 🔐 Get authenticated user from session
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "You must be logged in to generate a token" };
    }
    
    const userId = session.user.id; // ✅ Use session ID, not form input
    const expiryHours = formData.get("expiryHours");

    try {
        const result = await generateUserToken(
            Number(userId),
            expiryHours ? Number(expiryHours) : undefined,
        );

        revalidatePath("/user");
        revalidatePath(`/users/${userId}`);

        return {
            success: "Token generated successfully",
            token: result.token ?? undefined,
        };
    } catch (error) {
        console.error("Token generation error:", error);
        return { error: "Failed to generate token. Please try again." };
    }
}

export async function revokeTokenAction() {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await revokeUserToken(Number(session.user.id));
    revalidatePath("/profile/tokens");
    revalidatePath(`/users/${session.user.id}`);
}

export async function getTokenStatus(): Promise<TokenStatus | null> {
    const session = await auth();
    if (!session?.user?.id) return null;

    const user = await getUserWithToken(Number(session.user.id));
    if (!user?.token) return { hasToken: false, isExpired: false };

    const isExpired = user.tokenExpiry ? new Date() > user.tokenExpiry : true;

    return {
        hasToken: true,
        isExpired,
        expiryDate: user.tokenExpiry?.toISOString(),
        tokenPreview: user.token.slice(0, 8) + "...", // Safe preview
    };
}
