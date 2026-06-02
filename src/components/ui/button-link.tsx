import Link from "next/link";
import type { LinkProps } from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-300 text-slate-950 hover:bg-amber-200 border border-transparent shadow-[0_12px_30px_-20px_rgba(251,191,36,0.8)]",
  secondary:
    "border border-teal-300/45 text-teal-100 hover:bg-teal-400/10 bg-transparent",
  tertiary:
    "border border-white/20 text-slate-100 hover:border-amber-300/45 hover:bg-white/5 bg-transparent",
};

export function ButtonLink({
  children,
  className,
  icon,
  iconPosition = "end",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex min-h-[46px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        variantStyles[variant],
        className,
      )}
    >
      {icon && iconPosition === "start" ? icon : null}
      {children}
      {icon && iconPosition === "end" ? icon : null}
    </Link>
  );
}
