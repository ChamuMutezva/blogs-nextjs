"use server";
import { redirect } from "next/navigation";
import { addBlog, incrementLikes } from "../services/blogs";
import { revalidatePath } from "next/cache";

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;
    addBlog(title, author, url);
    revalidatePath("/blogs");
    redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
    const id = formData.get("id");
    if (typeof id !== "string") return;
    incrementLikes(id);
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
};
