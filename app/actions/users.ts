"use server";

import { redirect } from "next/navigation";
import { registerUser } from "@/services/usersService";

export type RegisterFormStateShape = {
    fieldErrors?: {
        username?: string;
        name?: string;
        password?: string;
        confirmPassword?: string;
        _form?: string; // Fallback for unhandled/server errors
    };
    fields?: {
        username: string;
        name: string;
        password: string;
        confirmPassword: string;
    };
};

export type RegisterFormState = RegisterFormStateShape | null;

export const handleRegisterUser = async (
    prevState: RegisterFormState,
    formData: FormData,
): Promise<RegisterFormState> => {
    const username = (formData.get("username") as string)?.trim();
    const name = (formData.get("name") as string)?.trim();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const fieldErrors: RegisterFormStateShape["fieldErrors"] = {};

    // 🔍 Validation
    if (!username?.trim()) {
        fieldErrors.username = "Username is required.";
    } else if (username.length < 5) {
        fieldErrors.username = "Username must be at least 5 characters.";
    }

    if (!name?.trim()) {
        fieldErrors.name = "Full name is required.";
    }

    if (!password) {
        fieldErrors.password = "Password is required.";
    } else if (password.length < 6) {
        fieldErrors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
        fieldErrors.confirmPassword = "Passwords do not match.";
    }

    // If any field failed validation, return early with errors & preserved values
    if (Object.keys(fieldErrors).length > 0) {
        return {
            fieldErrors,
            fields: { username, name, password, confirmPassword },
        };
    }

    try {
        await registerUser({ username, name, password });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Registration failed.";
        // Map DB errors to specific fields when possible
        if (
            message.toLowerCase().includes("username") ||
            message.toLowerCase().includes("unique")
        ) {
            fieldErrors.username = "Username is already taken.";
        } else {
            fieldErrors._form = message;
        }
        return {
            fieldErrors,
            fields: { username, name, password, confirmPassword },
        };
    }

    redirect("/login");
};
