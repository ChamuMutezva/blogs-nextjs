"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementLikes } from "@/services/blogsService";
import { auth } from "@/auth";

export async function createBlog(formData: FormData) {
  const session = await auth();
  
  if(!session){
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  // Extract userId from the form. 
  // ⚠️ Make sure your form has a hidden input for userId, or this will default to 1
  // const userIdStr = formData.get("userId");
 //  const userId = userIdStr ? Number.parseInt(userIdStr as string) : 1;
 const userId = session ? Number.parseInt(session.user?.id || "") : 1; // Fallback to 1 if session is not available
  // Validation
  if (!title?.trim() || !author?.trim() || !url?.trim()) {
    throw new Error("All fields are required");
  }

  // ✅ Call service - NO db.insert() here!
  await addBlog({ title, author, url , userId});

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