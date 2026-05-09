"use client";
import { createBlog } from "@/app/actions/blogsAction";
import { useActionState, useEffect } from "react";
import { useNotification } from "@/app/contexts/NotificationContext";
import { useRouter } from "next/navigation";

export default function NewBlog() {
    const [state, formAction, isPending] = useActionState(createBlog, {
        error: "",
        success: false,
    });
    const { showNotification } = useNotification();
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            showNotification("Blog created");
            router.push("/blogs");
        }
    }, [state, showNotification, router]);

    return (
        <div className="max-w-lg mx-auto mt-10">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                    Create New Blog
                </h2>

                {/* Error Message */}
                {state?.error && (
                    <div className="mb-6 p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-lg text-sm text-rose-700 dark:text-rose-400 text-center">
                        {state.error}
                    </div>
                )}

                <form action={formAction} className="space-y-5">
                    {/* Hidden userId (adjust as needed) */}
                    <input
                        type="hidden"
                        name="userId"
                        value="1"
                        defaultValue={state?.fields?.userId}
                    />

                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            // required
                            placeholder="e.g., Advanced React Patterns"
                            defaultValue={state?.fields?.title || ""}
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="author"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                        >
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            // required
                            placeholder="Your name"
                            defaultValue={state?.fields?.author || ""}
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="url"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                        >
                            Article URL
                        </label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            // required
                            placeholder="https://example.com/article"
                            defaultValue={state?.fields?.url || ""}
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full px-4 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all"
                    >
                        {isPending ? "Adding..." : "Add Blog"}
                    </button>
                </form>
            </div>
        </div>
    );
}
