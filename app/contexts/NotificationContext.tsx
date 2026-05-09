"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
    useEffect,
    useMemo, 
} from "react";
import { createPortal } from "react-dom";
import Notification, {
    type NotificationProps,
    type NotificationType,
} from "../components/Notification";

// 🔹 Context Value Type
interface NotificationContextValue {
    showNotification: (
        message: string,
        type?: NotificationType,
        duration?: number,
    ) => string;
    dismissNotification: (id: string) => void;
    dismissAll: () => void;
}

// 🔹 Create Context
const NotificationContext = createContext<NotificationContextValue | undefined>(
    undefined,
);

// 🔹 Provider Component
export function NotificationProvider({
    children,
}: Readonly<{ children: ReactNode }>) {
    const [notifications, setNotifications] = useState<
        Array<NotificationProps & { type: NotificationType }>
    >([]);
    const [isMounted, setIsMounted] = useState(false);

    // ✅ Only run portal logic after client mount (prevents hydration mismatch)
    useEffect(() => {
        const timeout = globalThis.window.setTimeout(
            () => setIsMounted(true),
            0,
        );
        return () => globalThis.window.clearTimeout(timeout);
    }, []);

    // Show a new notification
    const showNotification = useCallback(
        (message: string, type: NotificationType = "info", duration = 4000) => {
            const id = Math.random().toString(36).slice(2);
            setNotifications((prev) => [
                ...prev,
                { id, message, type, duration, onClose: () => {} },
            ]);
            return id;
        },
        [],
    );

    // Dismiss a single notification
    const dismissNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    // Dismiss all notifications
    const dismissAll = useCallback(() => {
        setNotifications([]);
    }, []);

    // ✅ Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({ showNotification, dismissNotification, dismissAll }),
        [showNotification, dismissNotification, dismissAll],
    );

    // Helper to update onClose handler with current dismiss function
    const notificationsWithHandlers = notifications.map((n) => ({
        ...n,
        onClose: dismissNotification,
    }));

    return (
        // ✅ Use the memoized value
        <NotificationContext.Provider value={contextValue}>
            {children}

            {/* ✅ Only render portal after client mount */}
            {isMounted &&
                typeof document !== "undefined" &&
                createPortal(
                    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
                        {notificationsWithHandlers.map((notification) => (
                            <div
                                key={notification.id}
                                className="pointer-events-auto"
                            >
                                <Notification {...notification} />
                            </div>
                        ))}
                    </div>,
                    document.body,
                )}
        </NotificationContext.Provider>
    );
}

// 🔹 Custom Hook for Easy Access
export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider",
        );
    }
    return context;
}
