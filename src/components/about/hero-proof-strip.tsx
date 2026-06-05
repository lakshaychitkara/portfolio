"use client";

import { useMemo, useState } from "react";
import type { EvidenceMetric } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeroProofStripProps {
  metrics: EvidenceMetric[];
}

export function HeroProofStrip({ metrics }: HeroProofStripProps) {
  const [selectedId, setSelectedId] = useState(metrics[0]?.id ?? "");
  const selectedMetric = useMemo(
    () => metrics.find((metric) => metric.id === selectedId) ?? metrics[0],
    [metrics, selectedId],
  );

  if (!metrics.length || !selectedMetric) {
    return null;
  }

  return (
    <div className="rounded-lg border border-white/12 bg-slate-950/45 p-3 shadow-[0_24px_70px_-46px_rgba(34,211,238,0.65)] backdrop-blur">
      <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]" role="tablist" aria-label="Portfolio proof metrics">
        {metrics.map((metric) => {
          const selected = metric.id === selectedMetric.id;

          return (
            <button
              key={metric.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSelectedId(metric.id)}
              className={cn(
                "min-h-[44px] shrink-0 rounded-lg border px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80",
                selected
                  ? "border-amber-300/60 bg-amber-300/15 text-amber-100"
                  : "border-white/12 bg-slate-950/45 text-slate-300 hover:border-teal-300/40 hover:text-white",
              )}
            >
              <span className="block font-mono text-[10px] uppercase text-slate-400">{metric.label}</span>
              <span className="mt-1 block text-base font-semibold">{metric.value}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 min-h-20 rounded-lg border border-teal-300/20 bg-slate-950/65 p-4">
        <p className="font-mono text-[11px] uppercase text-teal-200">Selected proof</p>
        <p className="mt-2 text-2xl font-semibold text-amber-100">{selectedMetric.value}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-200">{selectedMetric.context}</p>
      </div>
    </div>
  );
}
