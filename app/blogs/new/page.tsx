"use client";
import { createBlog } from "@/app/actions/blogsAction";

const NewBlog = () => {
    return (
        <div className="max-w-lg mx-auto mt-10">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                    Create New Blog
                </h2>

                <form className="space-y-5" action={createBlog}>
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
                            required
                            placeholder="e.g., Advanced React Patterns"
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
                            required
                            placeholder="Your name"
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
                            required
                            placeholder="https://example.com/article"
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all cursor-pointer"
                    >
                        Add Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewBlog;
