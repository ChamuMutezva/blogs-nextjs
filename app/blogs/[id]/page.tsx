import { notFound } from "next/navigation";
import { getBlogByID } from "@/services/blogsService";
import Link from "next/link";
import { likeBlog } from "@/app/actions/blogsAction";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = await getBlogByID(Number(id));
    if (!blog) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* Back Navigation */}
            <Link
                href="/blogs"
                className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
            >
                ← Back to all blogs
            </Link>
            {/* Main Card */}
            <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                <header className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {blog.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                        <p className="text-zinc-500 dark:text-zinc-400">
                            by{" "}
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                {blog.author}
                            </span>
                        </p>
                        <form
                            action={likeBlog}
                            className="flex items-center gap-1"
                        >
                            <input type="hidden" name="id" value={blog.id} />
                            <button
                                type="submit"
                                className="flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                                ❤️ {blog.likes}{" "}
                                {blog.likes === 1 ? "like" : "likes"}
                            </button>
                        </form>
                    </div>
                </header>

                <div className="space-y-4">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Click below to read the full article and explore the
                        detailed analysis:
                    </p>
                    <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600/10 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-600/20 dark:hover:bg-blue-500/20 transition-colors"
                    >
                        Read full article →
                    </a>
                </div>
            </article>
        </div>
    );
};
export default BlogPage;
