import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export type NavLinkVariant =
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost";
export type NavLinkSize = "sm" | "md" | "lg";

interface NavLinkProps extends Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "className"
> {
    variant?: NavLinkVariant;
    size?: NavLinkSize;
    className?: string;
    children: React.ReactNode;
}

const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900";

const variants: Record<NavLinkVariant, string> = {
    default:
        "text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:ring-zinc-500",
    primary:
        "text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 shadow-sm hover:-translate-y-0.5 focus:ring-zinc-900 dark:focus:ring-white",
    secondary:
        "text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950",
    tertiary:
        "text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 focus:ring-zinc-500",

    ghost: "text-blue-600 dark:text-blue-400 hover:underline focus:ring-blue-500",
};

const sizes: Record<NavLinkSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-base",
};

export default function NavLink({
    variant = "default",
    size = "md",
    className = "",
    children,
    ...props
}: Readonly<NavLinkProps>) {
    return (
        <Link
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
            {...props}
        >
            {children}
        </Link>
    );
}
