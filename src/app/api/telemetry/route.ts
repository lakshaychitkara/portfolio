import { NextResponse } from "next/server";
import { z } from "zod";

const telemetryEventSchema = z.object({
  event: z.string().min(1).max(100),
  context: z.string().min(1).max(200),
  message: z.string().min(1).max(500),
  metadata: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().optional(),
});

const telemetryBatchSchema = z.object({
  events: z.array(telemetryEventSchema).min(1).max(50),
});

export async function POST(request: Request) {
  const started = performance.now();
  try {
    const json = await request.json();
    const parsedBatch = telemetryBatchSchema.safeParse(json);
    const events = parsedBatch.success
      ? parsedBatch.data.events
      : telemetryEventSchema.safeParse(json).success
        ? [telemetryEventSchema.parse(json)]
        : null;

    if (!events) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid telemetry payload.",
          },
        },
        { status: 400 },
      );
    }

    console.info(
      "client_telemetry_batch",
      JSON.stringify({
        count: events.length,
        contexts: events.map((event) => event.context),
      }),
    );

    const response = NextResponse.json({ ok: true });
    response.headers.set("Server-Timing", `telemetry;dur=${(performance.now() - started).toFixed(1)}`);
    return response;
  } catch (error) {
    console.error("telemetry_route_error", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Telemetry capture failed.",
        },
      },
      { status: 500 },
    );
  }
}
