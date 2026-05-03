import Link from "next/link";
import { getBlogs } from "../../services/blogsService";
import { type Blog } from "@/types";
import { Heart, Plus } from "lucide-react";

const Blogs = async ({
    searchParams,
}: {
    searchParams: Promise<{ sort?: string; search?: string }>;
}) => {
    const { sort, search } = await searchParams;

    const blogs: Blog[] = await getBlogs();
    const searchTerm = search?.toLowerCase().trim() || "";

    // 1️⃣ FILTER first
    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm) ||
            blog.author.toLowerCase().includes(searchTerm),
    );

    // 2️⃣ SORT second (non-mutating)
    const sortedBlogs = [...filteredBlogs].sort((a, b) => {
        if (sort === "asc") return a.likes - b.likes;
        if (sort === "desc") return b.likes - a.likes;
        return 0; // Default: original insertion order
    });

    // 🔗 Helper to preserve both search & sort in URL
    const buildUrl = (overrides: { sort?: string; search?: string } = {}) => {
        const params = new URLSearchParams();
        if (overrides.sort !== undefined) {
            if (overrides.sort) params.set("sort", overrides.sort);
        } else if (sort) {
            params.set("sort", sort);
        }
        if (overrides.search !== undefined) {
            if (overrides.search) params.set("search", overrides.search);
        } else if (search) {
            params.set("search", search);
        }
        const qs = params.toString();
        return qs ? `/blogs?${qs}` : "/blogs";
    };

    return (
        <div className="space-y-8">
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        My Number 1 Blogs
                    </h1>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Curated articles, tutorials, and deep dives.
                    </p>
                </div>
                <Link
                    href="/blogs/new"
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                >
                    <Plus aria-hidden="true" />
                    <span>Add New Blog</span>
                </Link>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                {/* Search Form */}
                <form
                    method="GET"
                    action="/blogs"
                    className="w-full sm:flex-1 max-w-md"
                >
                    <input type="hidden" name="sort" value={sort || ""} />
                    <input
                        type="search"
                        name="search"
                        defaultValue={search}
                        placeholder="Search by title or author..."
                        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </form>

                {/* Sort Toggles */}
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                    <Link
                        href={buildUrl({
                            sort: sort === "asc" ? undefined : "asc",
                        })}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            sort === "asc"
                                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                    >
                        ↑ Ascending
                    </Link>
                    <Link
                        href={buildUrl({
                            sort: sort === "desc" ? undefined : "desc",
                        })}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            sort === "desc"
                                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                    >
                        ↓ Descending
                    </Link>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBlogs.length > 0 ? (
                    sortedBlogs.map((blog) => (
                        <article
                            key={blog.id}
                            className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex-1">
                                <Link
                                    href={`/blogs/${blog.id}`}
                                    className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 line-clamp-2 block hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                                >
                                    {blog.title}
                                </Link>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                                    by{" "}
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                        {blog.author}
                                    </span>
                                </p>
                                <a
                                    href={blog.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Read detailed analysis{" "}
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </a>
                            </div>

                            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Heart color="pink" strokeWidth={2} fill="red"/>{" "}
                                    <span>{blog.likes} likes</span>
                                </div>
                                <span>Published recently</span>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-zinc-500 dark:text-zinc-400">
                        <p className="text-lg font-medium">
                            No blogs found matching &quot;
                            {search || "your filter"}&quot;
                        </p>
                        <Link
                            href={buildUrl({
                                search: undefined,
                                sort: undefined,
                            })}
                            className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Clear search & reset
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
