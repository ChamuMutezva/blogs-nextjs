import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="max-w-2xl space-y-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Welcome to My Blogs
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Discover insights, tutorials, and thought-provoking articles
                    on topics that matter.
                </p>
                <Link
                    href="/blogs"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                    Explore Blogs
                </Link>
            </div>
        </div>
    );
}
