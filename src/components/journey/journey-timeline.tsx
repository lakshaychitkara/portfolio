"use client";

import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import type { CareerPhase } from "@/lib/types";
import { cn } from "@/lib/utils";

interface JourneyTimelineProps {
  entries: CareerPhase[];
}

export function JourneyTimeline({ entries }: JourneyTimelineProps) {
  const [selectedId, setSelectedId] = useState(entries[0]?.id ?? "");

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedId) ?? entries[0],
    [entries, selectedId],
  );

  if (!entries.length) {
    return (
      <div className="card-surface p-5 text-sm text-slate-300">
        Journey milestones are being refreshed. Please check back shortly.
      </div>
    );
  }

  function focusTabByIndex(index: number) {
    const normalizedIndex = (index + entries.length) % entries.length;
    const nextEntry = entries[normalizedIndex];
    if (!nextEntry) {
      return;
    }

    setSelectedId(nextEntry.id);
    const nextTab = document.getElementById(`journey-tab-${nextEntry.id}`);
    if (nextTab instanceof HTMLButtonElement) {
      nextTab.focus();
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTabByIndex(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTabByIndex(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTabByIndex(0);
        break;
      case "End":
        event.preventDefault();
        focusTabByIndex(entries.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="space-y-5">
      <div className="card-surface-muted p-3 lg:hidden">
        <label
          htmlFor="journey-phase-select"
          className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-200"
        >
          Choose Career Phase
        </label>
        <select
          id="journey-phase-select"
          value={selectedEntry?.id ?? ""}
          onChange={(event) => setSelectedId(event.target.value)}
          className="mt-2 min-h-[44px] w-full rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
        >
          {entries.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.phase} - {entry.period}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="hidden space-y-3 lg:block" role="tablist" aria-label="Career phases">
          {entries.map((entry, index) => {
            const isSelected = selectedEntry?.id === entry.id;

            return (
              <button
                key={entry.id}
                id={`journey-tab-${entry.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`journey-panel-${entry.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedId(entry.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={cn(
                  "min-h-[44px] w-full rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80",
                  isSelected
                    ? "border-cyan-300/60 bg-cyan-500/15"
                    : "border-white/10 bg-slate-900/70 hover:border-cyan-300/40",
                )}
              >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-200">
                  {entry.phase}
                </p>
                <p className="mt-1 text-sm text-slate-400">{entry.period}</p>
                <p className="mt-1 text-base font-semibold text-slate-100">{entry.title}</p>
                <p className="mt-1 text-sm text-slate-300">{entry.focus}</p>
              </button>
            );
          })}
        </div>

        {selectedEntry ? (
          <div
            className="card-surface p-5 md:p-6"
            id={`journey-panel-${selectedEntry.id}`}
            role="tabpanel"
            aria-labelledby={`journey-tab-${selectedEntry.id}`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">
              {selectedEntry.period}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-100">
              {selectedEntry.title}
            </h3>
            <p className="mt-3 text-slate-300">{selectedEntry.summary}</p>

            <div className="mt-5 card-surface-muted p-4">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
                Major Outcomes
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-200">
                {selectedEntry.outcomes.map((outcome) => (
                  <li key={outcome} className="card-surface px-3 py-2">
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {selectedEntry.projectImpact.map((metric) => (
                <div
                  key={`${selectedEntry.id}-${metric.label}`}
                  className="card-surface-muted p-3"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-cyan-200">{metric.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{metric.context}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedEntry.tools.map((tool) => (
                <span
                  key={`${selectedEntry.id}-${tool}`}
                  className="chip"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-surface p-5 text-sm text-slate-300">
            No journey entry is selected.
          </div>
        )}
      </div>
    </div>
  );
}
