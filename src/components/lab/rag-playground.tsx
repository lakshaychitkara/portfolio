"use client";

import { FormEvent, useMemo, useState } from "react";
import { Play, Sparkles } from "lucide-react";
import { buildApiUrl, getApiTargetDiagnostics } from "@/lib/api";
import { fetchJson } from "@/lib/http";
import { captureClientError } from "@/lib/telemetry";
import type { RagResponse } from "@/lib/types";

const defaultQuery =
  "How did you reduce latency without sacrificing output quality in your LLM pipelines?";

const defaultResult: RagResponse = {
  mode: "optimized",
  answer:
    "The optimized path pairs vLLM migration with prefix caching, a 5-turn memory window, structured prompts, and retrieval weighting. In the internship evidence log, that work reached 50-user load tests and >36 tok/s in 10-user parallel testing while improving follow-up handling.",
  retrieval: [
    {
      source: "CreateBytes legal assistant log",
      relevance: 0.94,
      snippet: "vLLM migration, prefix caching, memory tuning, and 50-user load testing.",
    },
    {
      source: "RAG / FastAPI service work",
      relevance: 0.86,
      snippet: "Structured outputs, parser discipline, and service-level timeout/error handling.",
    },
    {
      source: "STORMS assistant work",
      relevance: 0.8,
      snippet: "Context summarization and CPU-conscious document assistant reliability work.",
    },
  ],
  metrics: {
    latencyMs: 422,
    tokensPerSecond: 86,
    groundedness: 0.91,
  },
};

export function RagPlayground() {
  const [query, setQuery] = useState(defaultQuery);
  const [mode, setMode] = useState<"baseline" | "optimized">("optimized");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RagResponse | null>(defaultResult);

  const modeHint = useMemo(
    () =>
      mode === "optimized"
        ? "Prefix-aware routing + retrieval weighting"
        : "Naive retrieval and default prompt path",
    [mode],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = await fetchJson<RagResponse>(buildApiUrl("/api/lab/rag"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, mode }),
        timeoutMs: 8000,
        retries: 1,
        dedupeKey: `rag:${mode}:${query.trim()}`,
      });
      setResult(payload);
    } catch (err) {
      const diagnostics = getApiTargetDiagnostics();
      const message = err instanceof Error ? err.message : "Unexpected error.";
      const hint = diagnostics.warning ? ` ${diagnostics.warning}` : "";
      captureClientError("rag_playground_submit", err, {
        mode,
        queryLength: query.length,
        apiMode: diagnostics.mode,
        configuredBaseUrl: diagnostics.configuredBaseUrl,
      });
      setError(`${message}${hint}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <p className="font-mono text-xs uppercase text-amber-200">
          Evidence-backed deterministic demo
        </p>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">Ask the system design assistant</span>
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-24 w-full rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-amber-300/50"
            placeholder="Ask about architecture, optimization, or benchmarking"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("baseline")}
            className={`inline-flex min-h-[44px] items-center rounded-lg border px-4 py-2 text-xs ${
              mode === "baseline"
                ? "border-amber-300/70 bg-amber-300/15 text-amber-100"
                : "border-white/20 text-slate-300"
            }`}
          >
            Baseline
          </button>
          <button
            type="button"
            onClick={() => setMode("optimized")}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2 text-xs ${
              mode === "optimized"
                ? "border-amber-300/70 bg-amber-300/15 text-amber-100"
                : "border-white/20 text-slate-300"
            }`}
          >
            <Sparkles size={14} aria-hidden />
            Optimized
          </button>
          <p className="font-mono text-[11px] uppercase text-slate-400">
            {modeHint}
          </p>
          <button
            type="submit"
            disabled={loading}
            className="ml-auto inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Play size={15} aria-hidden />
            {loading ? "Running..." : "Run Query"}
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 text-sm text-rose-300" aria-live="polite" role="status">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
            <p className="font-mono text-xs uppercase text-amber-200">Answer</p>
            <p className="mt-2 text-sm text-slate-100">{result.answer}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
              <p className="font-mono text-[11px] uppercase text-slate-400">Latency</p>
              <p className="mt-1 text-lg font-semibold text-amber-100">
                {result.metrics.latencyMs} ms
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
              <p className="font-mono text-[11px] uppercase text-slate-400">Throughput</p>
              <p className="mt-1 text-lg font-semibold text-amber-100">
                {result.metrics.tokensPerSecond} tok/s
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
              <p className="font-mono text-[11px] uppercase text-slate-400">Groundedness</p>
              <p className="mt-1 text-lg font-semibold text-amber-100">
                {(result.metrics.groundedness * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-xs uppercase text-slate-400">
              Retrieval Traces
            </p>
            {result.retrieval.map((item) => (
              <div
                key={item.source}
                className="rounded-lg border border-white/10 bg-slate-950/60 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-100">{item.source}</p>
                  <p className="font-mono text-xs text-amber-200">
                    {(item.relevance * 100).toFixed(0)}% relevance
                  </p>
                </div>
                <p className="mt-1 text-xs text-slate-300">{item.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
