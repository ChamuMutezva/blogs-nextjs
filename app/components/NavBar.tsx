"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Rss } from "lucide-react";

export default function NavBar() {
    const { data: session } = useSession();

    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Single flex container that wraps naturally on small screens */}
                <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors shrink-0"
                    >
                        <Rss className="h-5 w-5" aria-hidden="true" />
                        <span>BlogSpace</span>
                    </Link>

                    {/* Navigation Links + Auth UI */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
                        <Link
                            href="/"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            My Blogs
                        </Link>
                        <Link
                            href="/users"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            Users
                        </Link>

                        {session ? (
                            <>
                                <Link
                                    href="/blogs/new"
                                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                >
                                    Create New
                                </Link>
                                {/* Hide separator on mobile to save space */}
                                <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">
                                    |
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-30">
                                    {session.user?.name}
                                </span>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 rounded px-1"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
