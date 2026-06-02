import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionBlockProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SectionBlock({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionBlockProps) {
  return (
    <section className={cn("scroll-mt-28", className)} id={id} aria-label={title}>
      <div className="mb-5 space-y-2 border-l border-amber-300/35 pl-4 md:mb-6">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase text-amber-200">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold leading-tight text-slate-100 md:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-[1rem]">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
