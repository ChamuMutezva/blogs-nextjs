"use client";

import { useSession, signOut } from "next-auth/react";
import { Rss } from "lucide-react";
import NavLink from "./NavLink";

export default function NavBar() {
    const { data: session } = useSession();

    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Single flex container that wraps naturally on small screens */}
                <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                    {/* Logo */}

                    <NavLink href="/" variant="default">
                        <Rss className="h-5 w-5" aria-hidden="true" />
                        <span className="text-2xl font-bold">BlogSpace</span>
                    </NavLink>

                    {/* Navigation Links + Auth UI */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/blogs">My Blogs</NavLink>
                        <NavLink href="/users">Users</NavLink>
                        <NavLink href="/me">Me</NavLink>
                        {session ? (
                            <>
                                <NavLink href="/blogs/new">Create New</NavLink>

                                {/* Hide separator on mobile to save space */}
                                <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">
                                    |
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-30">
                                    {session.user?.name}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className="text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 rounded px-1"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink href="/login" variant="secondary">
                                    Login
                                </NavLink>
                                <NavLink href="/register" variant="secondary">
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
