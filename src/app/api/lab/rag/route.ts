import { z } from "zod";
import { timedJson } from "@/lib/server/route-utils";

const ragSchema = z.object({
  query: z.string().min(4).max(500),
  mode: z.enum(["baseline", "optimized"]),
});

const retrievalSources = [
  {
    source: "vLLM Latency Lab - Case Study",
    snippet:
      "Prefix caching and standardized prompt templates stabilized high-concurrency latency.",
  },
  {
    source: "RAG Benchmark Suite - Experiment Log",
    snippet:
      "Chunking and retrieval-depth experiments improved groundedness while reducing unsupported claims.",
  },
  {
    source: "FastAPI Serving Notes",
    snippet:
      "Typed contracts using Pydantic improved reliability across model-serving endpoints.",
  },
];

function buildAnswer(query: string, mode: "baseline" | "optimized") {
  if (mode === "optimized") {
    return `For the query "${query}", the optimized pipeline routes requests through a retrieval-aware prompt path, applies prefix-caching, and validates structured outputs. This reduces tail-latency while preserving answer grounding through weighted evidence from benchmarked sources.`;
  }

  return `For the query "${query}", the baseline pipeline uses default retrieval and prompt orchestration without cache-aware routing. It can answer correctly but often shows higher latency variance and weaker evidence linkage in edge cases.`;
}

export async function POST(request: Request) {
  const startedAt = performance.now();
  try {
    const json = await request.json();
    const parsed = ragSchema.safeParse(json);

    if (!parsed.success) {
      console.warn("rag_validation_error", JSON.stringify({ issues: parsed.error.flatten() }));
      return timedJson(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request payload.",
            details: parsed.error.flatten(),
          },
        },
        { status: 400, startedAt },
      );
    }

    const { query, mode } = parsed.data;
    console.info("rag_request_received", { mode, queryLength: query.length });

    const metrics =
      mode === "optimized"
        ? {
            latencyMs: 420,
            tokensPerSecond: 86,
            groundedness: 0.91,
          }
        : {
            latencyMs: 665,
            tokensPerSecond: 59,
            groundedness: 0.76,
          };

    const retrieval = retrievalSources.map((item, index) => ({
      ...item,
      relevance: mode === "optimized" ? 0.92 - index * 0.1 : 0.78 - index * 0.11,
    }));

    return timedJson(
      {
        mode,
        answer: buildAnswer(query, mode),
        retrieval,
        metrics,
      },
      {
        status: 200,
        startedAt,
        cacheControl: "public, max-age=60, stale-while-revalidate=300",
      },
    );
  } catch (error) {
    console.error("rag_route_error", error);
    return timedJson(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "RAG service failed.",
        },
      },
      { status: 500, startedAt },
    );
  }
}
