import Link from "next/link";
import type { LinkProps } from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-400 text-slate-950 hover:bg-cyan-300 border border-transparent shadow-[0_12px_30px_-20px_rgba(34,211,238,0.85)]",
  secondary:
    "border border-cyan-300/45 text-cyan-100 hover:bg-cyan-400/10 bg-transparent",
  tertiary:
    "border border-white/20 text-slate-100 hover:border-cyan-300/45 hover:bg-white/5 bg-transparent",
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex min-h-[46px] items-center rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
