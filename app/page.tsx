import NavLink from "./components/NavLink";

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
                <NavLink href="/blogs" variant="tertiary" size="lg">
                    Explore Blogs
                </NavLink>
            </div>
        </div>
    );
}
