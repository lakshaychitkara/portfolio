"use client";

import { FormEvent, useState } from "react";
import { Play } from "lucide-react";
import { buildApiUrl, getApiTargetDiagnostics } from "@/lib/api";
import { fetchJson } from "@/lib/http";
import { captureClientError } from "@/lib/telemetry";
import type { CvBenchmarkResponse } from "@/lib/types";

const clipOptions = [
  "warehouse-ergonomics.mp4",
  "sports-motion-analysis.mp4",
  "clinical-posture-sequence.mp4",
];

const initialResult: CvBenchmarkResponse = {
  clip: clipOptions[0],
  modelFamily: "multimodal",
  captions: [
    {
      model: "InternVideo2 + LanguageBind",
      caption:
        "Captures temporal video semantics and improves retrieval coverage on CCTV-style clips.",
      recall: 0.88,
      precision: 0.86,
      datasetLabel: "104 CCTV videos",
      source: "Manual CCTV annotation and LanguageBind/InternVideo benchmark logs",
    },
    {
      model: "Gemini Embedding 2 + OCR stack",
      caption:
        "Adds embedding comparison and document extraction signals for mixed video and scanned-PDF workflows.",
      recall: 0.91,
      precision: 0.84,
      datasetLabel: "600k embeddings + OCR stacks",
      source: "FAISS Flat/HNSW/IVF and OCR comparison logs",
    },
  ],
};

export function CvBenchmarkExplorer() {
  const [clip, setClip] = useState(clipOptions[0]);
  const [modelFamily, setModelFamily] = useState<"baseline" | "multimodal">(
    "multimodal",
  );
  const [result, setResult] = useState<CvBenchmarkResponse | null>(initialResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = await fetchJson<CvBenchmarkResponse>(buildApiUrl("/api/lab/cv"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clip, modelFamily }),
        timeoutMs: 8000,
        retries: 1,
        dedupeKey: `cv:${clip}:${modelFamily}`,
      });
      setResult(payload);
    } catch (err) {
      const diagnostics = getApiTargetDiagnostics();
      const message = err instanceof Error ? err.message : "Unexpected error.";
      const hint = diagnostics.warning ? ` ${diagnostics.warning}` : "";
      captureClientError("cv_benchmark_submit", err, {
        clip,
        modelFamily,
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
      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Clip</span>
          <select
            value={clip}
            onChange={(event) => setClip(event.target.value)}
            className="min-h-[44px] w-full rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
          >
            {clipOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Model family</span>
          <select
            value={modelFamily}
            onChange={(event) =>
              setModelFamily(event.target.value as "baseline" | "multimodal")
            }
            className="min-h-[44px] w-full rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
          >
            <option value="baseline">Baseline CV stack</option>
            <option value="multimodal">Multimodal stack</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play size={15} aria-hidden />
          {loading ? "Running..." : "Compare"}
        </button>
      </form>

      {error ? (
        <p className="mt-4 text-sm text-rose-300" aria-live="polite" role="status">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {result.captions.map((item) => (
            <div key={item.model} className="rounded-lg border border-white/10 bg-slate-950/65 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-100">{item.model}</p>
                <p className="font-mono text-xs uppercase text-slate-400">
                  {item.datasetLabel ?? result.clip}
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-200">{item.caption}</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Recall", value: item.recall },
                  { label: "Precision", value: item.precision },
                ].map((metric) => (
                  <div key={`${item.model}-${metric.label}`} className="space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase text-slate-400">
                      <span>{metric.label}</span>
                      <span>{(metric.value * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-amber-300"
                        style={{ width: `${metric.value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {item.source ? (
                <p className="mt-4 font-mono text-[11px] uppercase text-teal-200">{item.source}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
