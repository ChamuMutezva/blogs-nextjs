"use client";
import Link from "next/link";
import { handleRegisterUser } from "../actions/users";
import { useActionState } from "react";

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(
        handleRegisterUser,
        null,
    );
    // Helper to conditionally apply error styling
    const inputClass = (hasError: boolean) =>
        `w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:border-transparent ${
            hasError
                ? "border-rose-300 dark:border-rose-700 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100 focus:ring-rose-500"
                : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-blue-500"
        }`;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-zinc-50 dark:bg-zinc-950">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 text-center">
                    Create Account
                </h2>

                {/* 🚨 General Server Error Banner */}
                {state?.fieldErrors?._form && (
                    <div className="mb-6 p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-lg text-sm text-rose-700 dark:text-rose-400 text-center">
                        {state.fieldErrors._form}
                    </div>
                )}

                <form action={formAction} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="e.g., johndoe"
                            defaultValue={state?.fields?.username}
                            aria-invalid={
                                state?.fieldErrors?.username ? "true" : "false"
                            }
                            aria-describedby={
                                state?.fieldErrors?.username
                                    ? "username-error"
                                    : undefined
                            }
                            className={inputClass(
                                !!state?.fieldErrors?.username,
                            )}
                        />
                        {state?.fieldErrors?.username && (
                            <p
                                id="username-error"
                                className="mt-1.5 text-sm text-rose-600 dark:text-rose-400"
                            >
                                {state.fieldErrors.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={state?.fields?.name || ""}
                            aria-invalid={!!state?.fieldErrors?.name}
                            aria-describedby={
                                state?.fieldErrors?.name
                                    ? "name-error"
                                    : undefined
                            }
                            placeholder="e.g., John Doe"
                            className={inputClass(!!state?.fieldErrors?.name)}
                        />
                        {state?.fieldErrors?.name && (
                            <p
                                id="name-error"
                                className="mt-1.5 text-sm text-rose-600 dark:text-rose-400"
                            >
                                {state.fieldErrors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            minLength={6}
                            defaultValue={state?.fields?.password || ""}
                            aria-invalid={!!state?.fieldErrors?.password}
                            aria-describedby={
                                state?.fieldErrors?.password
                                    ? "password-error"
                                    : undefined
                            }
                            placeholder="••••••••"
                            className={inputClass(
                                !!state?.fieldErrors?.password,
                            )}
                        />

                        {state?.fieldErrors?.password && (
                            <p
                                id="password-error"
                                className="mt-1.5 text-sm text-rose-600 dark:text-rose-400"
                            >
                                {state.fieldErrors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            defaultValue={state?.fields?.confirmPassword || ""}
                            aria-invalid={!!state?.fieldErrors?.confirmPassword}
                            aria-describedby={
                                state?.fieldErrors?.confirmPassword
                                    ? "confirmPassword-error"
                                    : undefined
                            }
                            placeholder="••••••••"
                            className={inputClass(
                                !!state?.fieldErrors?.confirmPassword,
                            )}
                        />

                        {state?.fieldErrors?.confirmPassword && (
                            <p
                                id="confirmPassword-error"
                                className="mt-1.5 text-sm text-rose-600 dark:text-rose-400"
                            >
                                {state.fieldErrors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                    >
                        {isPending ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
