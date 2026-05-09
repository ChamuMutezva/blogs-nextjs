"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementLikes } from "@/services/blogsService";
import { auth } from "@/auth";

// Define the shape of the form state
export type FormState = {
    error?: string;
    success?: boolean;
    fields?: { title: string; author: string; url: string; userId: string };
} | null;

export async function createBlog(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;
    const userId = (formData.get("userId") as string) || "1";

    // Validation
    if (!title?.trim() || !author?.trim() || !url?.trim()) {
        return {
            error: "All fields are required",
            success: false,
            fields: { title, author, url, userId }, // ✅ Return values to preserve
        };
    }

    if (title.length < 5) {
        // Example of a server-side validation error
        return {
            error: "Title must be 5 characters or less",
            success: false,
            fields: { title, author, url, userId }, // ✅ Preserve user input on validation error
        };
    }

    if (author.length < 5) {
        // Example of a server-side validation error
        return {
            error: "Author must be 5 characters or less",
            success: false,
            fields: { title, author, url, userId }, // ✅ Preserve user input on validation error
        };
    }
    if (url.length < 5) {
        // Example of a server-side validation error
        return {
            error: "Url must be 5 characters or less",
            success: false,
            fields: { title, author, url, userId }, // ✅ Preserve user input on validation error
        };
    }

    // Extract userId from the form.
    // ⚠️ Make sure your form has a hidden input for userId, or this will default to 1
    // const userIdStr = formData.get("userId");
    //  const userId = userIdStr ? Number.parseInt(userIdStr as string) : 1;
    // const userId = session ? Number.parseInt(session.user?.id || "") : 1; // Fallback to 1 if session is not available
    try {
        await addBlog({ title, author, url, userId: Number.parseInt(userId) });
    } catch (error) {
        return {
            error: `Failed to create blog: ${error instanceof Error ? error.message : "Unknown error"}`,
            success: false,
            fields: { title, author, url, userId }, // ✅ Preserve on DB error too
        };
    }
    // Side effects
    revalidatePath("/blogs");
    return {
        error: "",
        success: true,
        fields: { title, author, url, userId },
    };
}

export async function likeBlog(formData: FormData) {
    const id = formData.get("id");
    if (typeof id !== "string") return;

    // ✅ Call service - NO db.update() here!
    await incrementLikes(Number(id));

    // Side effects
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
}
