"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationProps {
    id: string;
    message: string;
    type?: NotificationType;
    duration?: number;
    onClose: (id: string) => void;
}

export default function Notification({
    id,
    message,
    type = "info",
    duration = 4000,
    onClose,
}: Readonly<NotificationProps>) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Auto-dismiss timer
    useEffect(() => {
        if (duration > 0) {
            timerRef.current = setTimeout(() => onClose(id), duration);

            // Animate progress bar
            if (progressRef.current) {
                progressRef.current.style.transition = `width ${duration}ms linear`;
                progressRef.current.style.width = "0%";
            }
        }
    }, [id, duration, onClose]);

    // Variant styles
    const variants = {
        success: {
            bg: "bg-emerald-50 dark:bg-emerald-950/50",
            border: "border-emerald-200 dark:border-emerald-800",
            text: "text-emerald-800 dark:text-emerald-200",
            icon: "text-emerald-500",
            progress: "bg-emerald-500",
        },
        error: {
            bg: "bg-rose-50 dark:bg-rose-950/50",
            border: "border-rose-200 dark:border-rose-800",
            text: "text-rose-800 dark:text-rose-200",
            icon: "text-rose-500",
            progress: "bg-rose-500",
        },
        warning: {
            bg: "bg-amber-50 dark:bg-amber-950/50",
            border: "border-amber-200 dark:border-amber-800",
            text: "text-amber-800 dark:text-amber-200",
            icon: "text-amber-500",
            progress: "bg-amber-500",
        },
        info: {
            bg: "bg-blue-50 dark:bg-blue-950/50",
            border: "border-blue-200 dark:border-blue-800",
            text: "text-blue-800 dark:text-blue-200",
            icon: "text-blue-500",
            progress: "bg-blue-500",
        },
    };

    const style = variants[type];

    // Icons per type
    const icons = {
        success: "✓",
        error: "✕",
        warning: "⚠",
        info: "ℹ",
    };

    return (
        <div
            role="alert"
            aria-live="polite"
            className={`group relative flex items-start gap-3 w-full max-w-sm p-4 rounded-xl border shadow-lg backdrop-blur-sm ${style.bg} ${style.border} ${style.text} animate-slide-in`}
        >
            {/* Icon */}
            <span
                className={`shrink-0 text-lg font-bold ${style.icon}`}
                aria-hidden="true"
            >
                {icons[type]}
            </span>

            {/* Message */}
            <p className="flex-1 text-sm font-medium leading-relaxed">
                {message}
            </p>

            {/* Close Button */}
            <button
                onClick={() => onClose(id)}
                className="shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                aria-label="Dismiss notification"
            >
                <X className="h-4 w-4" />
            </button>

            {/* Progress Bar (bottom edge) */}
            {duration > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/10 rounded-b-xl overflow-hidden">
                    <div
                        ref={progressRef}
                        className={`h-full ${style.progress}`}
                        style={{ width: "100%", transitionProperty: "width" }}
                    />
                </div>
            )}
        </div>
    );
}
