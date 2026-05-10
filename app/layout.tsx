import "./globals.css";
import type { ReactNode } from "react";
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import { NotificationProvider } from "./contexts/NotificationContext";

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
                <AuthSessionProvider>
                    <NotificationProvider>
                        <NavBar />

                        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                            {children}
                        </main>
                        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                            © 2025 - {new Date().getFullYear()} My Blog App. All rights
                            reserved.
                        </footer>
                    </NotificationProvider>
                </AuthSessionProvider>
            </body>
        </html>
    );
}
