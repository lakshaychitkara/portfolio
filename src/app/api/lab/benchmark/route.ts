import { z } from "zod";
import { timedJson } from "@/lib/server/route-utils";

const benchmarkSchema = z.object({
  scenario: z.string().min(3),
});

export async function POST(request: Request) {
  const startedAt = performance.now();
  try {
    const json = await request.json();
    const parsed = benchmarkSchema.safeParse(json);

    if (!parsed.success) {
      console.warn(
        "benchmark_validation_error",
        JSON.stringify({ issues: parsed.error.flatten() }),
      );
      return timedJson(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid benchmark payload.",
            details: parsed.error.flatten(),
          },
        },
        { status: 400, startedAt },
      );
    }

    console.info("benchmark_request_received", { scenario: parsed.data.scenario });

    return timedJson(
      {
        scenario: parsed.data.scenario,
        baseline: {
          latencyMs: 674,
          throughput: 58,
          groundedness: 0.75,
        },
        optimized: {
          latencyMs: 422,
          throughput: 86,
          groundedness: 0.91,
        },
      },
      {
        status: 200,
        startedAt,
        cacheControl: "public, max-age=60, stale-while-revalidate=300",
      },
    );
  } catch (error) {
    console.error("benchmark_route_error", error);
    return timedJson(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Benchmark endpoint failed.",
        },
      },
      { status: 500, startedAt },
    );
  }
}
