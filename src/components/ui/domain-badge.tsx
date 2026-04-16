import { capabilityDomains } from "@/lib/content/domain-labels";
import type { CapabilityDomain } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneMap: Record<CapabilityDomain, string> = {
  fullstack: "bg-cyan-500/20 text-cyan-200 ring-cyan-400/40",
  llm: "bg-amber-500/20 text-amber-200 ring-amber-400/40",
  cv: "bg-emerald-500/20 text-emerald-200 ring-emerald-400/40",
  cpp3d: "bg-orange-500/20 text-orange-200 ring-orange-400/40",
};

interface DomainBadgeProps {
  domain: CapabilityDomain;
}

export function DomainBadge({ domain }: DomainBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ring-1",
        toneMap[domain],
      )}
    >
      {capabilityDomains[domain]}
    </span>
  );
}
