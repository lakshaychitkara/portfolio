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
      <div className="mb-5 space-y-2 border-l border-cyan-300/25 pl-4 md:mb-6">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="[font-size:clamp(1.45rem,1.22rem+1vw,2rem)] font-semibold leading-tight text-slate-100">
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
