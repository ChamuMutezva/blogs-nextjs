import Link from "next/link";
import { getUsers } from "@/services/usersService";

const Users = async () => {
    const users = await getUsers();
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Users
                    </h1>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Manage and view all registered accounts.
                    </p>
                </div>
                <Link
                    href="/users/new"
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                >
                    + Add User
                </Link>
            </div>
            {/* Users Grid */}
            {users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <article
                            key={user.id}
                            className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Avatar & Info Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg shadow-inner">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                                        {user.name}
                                    </h2>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                                        @{user.username}
                                    </p>
                                </div>
                            </div>

                            {/* Spacer to push footer to bottom */}
                            <div className="flex-1" />

                            {/* Footer Action */}
                            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                <Link
                                    href={`/users/${user.username}`}
                                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    View profile{" "}
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-4 bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                        No users found
                    </p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Add your first user to get started.
                    </p>
                </div>
            )}
        </div>
    );
};
export default Users;
