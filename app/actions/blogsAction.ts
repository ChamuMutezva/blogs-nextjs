"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementLikes } from "@/services/blogsService";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  // Validation
  if (!title?.trim() || !author?.trim() || !url?.trim()) {
    throw new Error("All fields are required");
  }

  // ✅ Call service - NO db.insert() here!
  await addBlog({ title, author, url });

  // Side effects
  revalidatePath("/blogs");
  redirect("/blogs");
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