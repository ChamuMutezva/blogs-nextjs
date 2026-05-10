"use client";
import { useActionState, useState, useEffect } from "react";
import {
    generateTokenAction,
    revokeTokenAction,
    type TokenActionState,
    type TokenStatus,
} from "@/app/actions/tokenAction";
import { useNotification } from "../contexts/NotificationContext";
import { useRouter } from "next/navigation";

interface TokenFormProps {
    initialStatus: TokenStatus | null;
    name?: string;
}

export default function TokenForm({ initialStatus, name }: Readonly<TokenFormProps>) {
    const { showNotification } = useNotification();
    const router = useRouter();
    console.log(name)

    const [state, formAction, isPending] = useActionState(
        generateTokenAction as unknown as (
            state: TokenActionState,
            payload: FormData,
        ) => TokenActionState | Promise<TokenActionState>,
        null,
    );

    const [expiryHours, setExpiryHours] = useState("24");

    // ✅ Derive values from state — no useEffect needed!
    const shouldShowToken = !!(state?.success && state?.token);
    const currentStatus: TokenStatus | null = state?.success
        ? { hasToken: true, isExpired: false, tokenPreview: state.token?.slice(0, 8) + "..." }
        : initialStatus;
    
    // ✅ Side effect only for notifications (syncing with external system)
    // This is the proper use of useEffect
    useEffect(() => {
        if (state?.success) {
            showNotification(state.success, "success");
        }
        if (state?.error) {
            showNotification(state.error, "error");
        }
    }, [state?.success, state?.error, showNotification]);

    const handleRevoke = async () => {
        if (!confirm("Are you sure you want to revoke your token? This cannot be undone.")) return;

        try {
            await revokeTokenAction();
            showNotification("Token revoked successfully", "success");
            router.refresh(); // Refresh server data to update initialStatus
        } catch {
            showNotification("Failed to revoke token", "error");
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <form action={formAction} className="space-y-6">
                
                {/* Expiry Hours */}
                <div>
                    <label htmlFor="expiryHours" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Token Expiry (hours)
                    </label>
                    <input
                        type="number"
                        id="expiryHours"
                        name="expiryHours"
                        min="1"
                        max="720"
                        value={expiryHours}
                        onChange={(e) => setExpiryHours(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Default: 24 hours. Max: 720 hours (30 days)
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                >
                    {isPending
                        ? "Generating..."
                        : currentStatus?.hasToken && !currentStatus.isExpired
                          ? "Regenerate Token"
                          : "Generate My Token"}
                </button>
            </form>

            {/* Generated Token Display - derived from state */}
            {shouldShowToken && state?.token && (
                <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                    <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                        ✅ Token Generated Successfully
                    </p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-300 break-all">
                            {state.token}
                        </code>
                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard.writeText(state.token!);
                                showNotification("Token copied to clipboard", "info", 2000);
                            }}
                            className="px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            Copy
                        </button>
                    </div>
                    <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">
                        ⚠️ Store this token securely. It will not be shown again.
                    </p>
                </div>
            )}

            {/* Revoke Section - derived from currentStatus */}
            {currentStatus?.hasToken && !currentStatus.isExpired && (
                <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                        Revoke Current Token
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        Revoke your active token. You will need to generate a new one to access the API.
                    </p>
                    <button
                        onClick={handleRevoke}
                        className="px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                    >
                        Revoke My Token
                    </button>
                </div>
            )}
        </div>
    );
}