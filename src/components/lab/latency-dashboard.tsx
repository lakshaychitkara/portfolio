"use client";

import { useEffect, useState } from "react";
import { buildApiUrl, getApiTargetDiagnostics } from "@/lib/api";
import { fetchJson } from "@/lib/http";
import { captureClientError } from "@/lib/telemetry";
import type { BenchmarkResponse } from "@/lib/types";

export function LatencyDashboard() {
  const [data, setData] = useState<BenchmarkResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const payload = await fetchJson<BenchmarkResponse>(buildApiUrl("/api/lab/benchmark"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scenario: "llm_pipeline" }),
          timeoutMs: 8000,
          retries: 2,
          dedupeKey: "benchmark:llm_pipeline",
        });

        if (mounted) {
          setData(payload);
        }
      } catch (err) {
        if (mounted) {
          const diagnostics = getApiTargetDiagnostics();
          const message = err instanceof Error ? err.message : "Unexpected error.";
          const hint = diagnostics.warning ? ` ${diagnostics.warning}` : "";
          captureClientError("latency_dashboard_load", err, {
            apiMode: diagnostics.mode,
            configuredBaseUrl: diagnostics.configuredBaseUrl,
          });
          setError(`${message}${hint}`);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return <p className="text-sm text-rose-300">{error}</p>;
  }

  if (!data) {
    return (
      <div className="card-surface p-5">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-400">
          Loading benchmark traces...
        </p>
        <div className="mt-4 space-y-3">
          {["Latency", "Throughput", "Groundedness"].map((label) => (
            <div key={label} className="space-y-1">
              <div className="h-3 w-28 animate-pulse rounded bg-slate-700/70" />
              <div className="h-2 w-full animate-pulse rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const rows = [
    {
      label: "Latency (ms)",
      baseline: data.baseline.latencyMs,
      optimized: data.optimized.latencyMs,
      invert: true,
    },
    {
      label: "Throughput (tok/s)",
      baseline: data.baseline.throughput,
      optimized: data.optimized.throughput,
      invert: false,
    },
    {
      label: "Groundedness",
      baseline: Math.round(data.baseline.groundedness * 100),
      optimized: Math.round(data.optimized.groundedness * 100),
      invert: false,
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">
        Baseline vs Optimized
      </p>
      <div className="mt-4 space-y-4">
        {rows.map((row) => {
          const max = Math.max(row.baseline, row.optimized);
          const baselineWidth = (row.baseline / max) * 100;
          const optimizedWidth = (row.optimized / max) * 100;

          return (
            <div key={row.label}>
              <p className="text-sm text-slate-200">{row.label}</p>
              <div className="mt-2 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Baseline</span>
                    <span>{row.baseline}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-slate-500"
                      style={{ width: `${baselineWidth}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-cyan-200">
                    <span>Optimized</span>
                    <span>{row.optimized}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${optimizedWidth}%` }}
                    />
                  </div>
                </div>
              </div>
              {row.invert && row.optimized < row.baseline ? (
                <p className="mt-1 text-xs text-emerald-300">Lower is better</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
