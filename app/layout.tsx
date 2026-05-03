import "./globals.css";
import Link from "next/link";
import { Rss } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = {
    title: "My Blog App",
    description: "A list of my favorite blogs",
};

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-foreground font-sans antialiased min-h-screen flex flex-col">
                <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                            >
                                <Rss aria-hidden="true" />
                                <span>BlogSpace</span>
                            </Link>
                            <div className="flex gap-6">
                                <Link
                                    href="/"
                                    className="text-sm font-medium hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/blogs"
                                    className="text-sm font-medium hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                                >
                                    My Blogs
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                    {children}
                </main>

                <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    © {new Date().getFullYear()} My Blog App. All rights
                    reserved.
                </footer>
            </body>
        </html>
    );
}
