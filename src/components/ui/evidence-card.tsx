import type { HTMLAttributes } from "react";
import type { ProjectEvidence } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EvidenceCardProps extends HTMLAttributes<HTMLDivElement> {
  metric: ProjectEvidence;
  compact?: boolean;
}

export function EvidenceCard({ metric, className, compact = false, ...props }: EvidenceCardProps) {
  return (
    <div {...props} className={cn("evidence-card", compact ? "p-3" : "p-4", className)}>
      <p className="font-mono text-[11px] uppercase text-slate-400">
        {metric.label}
      </p>
      <p className={cn("font-semibold text-amber-100", compact ? "mt-1 text-lg" : "mt-2 text-2xl")}>
        {metric.value}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-300">{metric.context}</p>
    </div>
  );
}
