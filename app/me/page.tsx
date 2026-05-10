import { auth } from "@/auth";
import { Info, MessageSquareWarning, Check } from "lucide-react";
import { getTokenStatus } from "@/app/actions/tokenAction";
import TokenForm from "./TokenForm"; 

export default async function TokenManagementPage() {
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="text-center">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                        Please log in to manage your API token
                    </p>
                    <a href="/login" className="text-blue-600 hover:underline">
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    const tokenStatus = await getTokenStatus();
    // Extract the status JSX to a variable
    const statusContent = (() => {
        if (!tokenStatus?.hasToken) {
            return (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <Info aria-hidden="true" />
                    <span>No active token</span>
                </div>
            );
        }

        if (tokenStatus.isExpired) {
            return (
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <MessageSquareWarning aria-hidden="true" />
                    <span>
                        Expired Token{" "}
                        {tokenStatus.tokenPreview &&
                            `(${tokenStatus.tokenPreview})`}
                    </span>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
               <Check aria-hidden="true"/>
                <span>
                    Active Token{" "}
                    {tokenStatus.tokenPreview &&
                        `(${tokenStatus.tokenPreview})`}
                </span>
            </div>
        );
    })();

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                    API Token Management
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                    Managing token for:{" "}
                    <span className="font-medium">{session.user.name}</span>
                </p>

                {/* Token Status Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                        Current Token Status
                    </h2>

                    {statusContent}
                </div>

                {/* Interactive Form (Client Component) */}
                {session?.user?.name && (
                    <TokenForm
                        initialStatus={tokenStatus}
                        name={session.user.name}
                    />
                )}

                {/* Usage Instructions */}
                <div className="mt-6 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                        How to Use Your Token
                    </h3>
                    <pre className="p-4 bg-zinc-900 dark:bg-zinc-950 rounded-lg text-xs font-mono text-zinc-100 overflow-x-auto">
                        <code>{String.raw`curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  https://blogs-nextjs-six.vercel.app/api/v1/endpoint`}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
