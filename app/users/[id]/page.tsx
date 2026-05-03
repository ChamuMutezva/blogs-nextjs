import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/services/usersService";
const User = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const userBlogs = await getUserWithBlogs(Number(id));

    if (!userBlogs) {
        notFound();
    }
    console.log(userBlogs);
    return (
        <div className="space-y-8">
            {/* 👤 User Profile Header */}
            <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm">
                <Link
                    href="/users"
                    className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
                >
                    ← Back to Users
                </Link>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="h-20 w-20 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-3xl shadow-inner">
                        {userBlogs.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            {userBlogs.name}
                        </h1>
                        <p className="text-lg text-zinc-500 dark:text-zinc-400">
                            @{userBlogs.username}
                        </p>
                        <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
                            {userBlogs.blogs.length}{" "}
                            {userBlogs.blogs.length === 1 ? "blog" : "blogs"} published
                        </p>
                    </div>
                </div>
            </section>
            {/* 📝 User's Blogs Grid */}
            <section>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                    Articles by {userBlogs.name}
                </h2>

                {userBlogs.blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userBlogs.blogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex-1">
                                    <Link
                                        href={`/blogs/${blog.id}`}
                                        className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2 line-clamp-2 block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                                    <span>❤️ {blog.likes} likes</span>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-4 bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                            No blogs published yet
                        </p>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            {userBlogs.name} hasn&apos;t written any articles.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default User;
