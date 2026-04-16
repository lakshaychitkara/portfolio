import { buildApiUrl } from "@/lib/api";

interface TelemetryPayload {
  event: string;
  context: string;
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

const queue: TelemetryPayload[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const SAMPLE_RATE = Number(process.env.NEXT_PUBLIC_TELEMETRY_SAMPLE_RATE ?? "0.35");
const BATCH_SIZE = Number(process.env.NEXT_PUBLIC_TELEMETRY_BATCH_SIZE ?? "5");
const FLUSH_INTERVAL_MS = Number(
  process.env.NEXT_PUBLIC_TELEMETRY_FLUSH_INTERVAL_MS ?? "5000",
);

function shouldSample() {
  return Math.random() <= SAMPLE_RATE;
}

function scheduleFlush() {
  if (flushTimer) {
    return;
  }

  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_INTERVAL_MS);
}

function sendBatch(payload: { events: TelemetryPayload[] }) {
  try {
    const body = JSON.stringify(payload);
    const endpoint = buildApiUrl("/api/telemetry");

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
      return;
    }

    void fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true,
    });
  } catch {
    // Telemetry should never impact UX.
  }
}

function flush() {
  if (!queue.length) {
    return;
  }

  const events = queue.splice(0, BATCH_SIZE);
  sendBatch({ events });

  if (queue.length) {
    scheduleFlush();
  }
}

function enqueue(payload: Omit<TelemetryPayload, "timestamp">) {
  if (!shouldSample()) {
    return;
  }

  queue.push({
    ...payload,
    timestamp: new Date().toISOString(),
  });

  if (queue.length >= BATCH_SIZE) {
    flush();
    return;
  }

  scheduleFlush();
}

export function captureClientError(
  context: string,
  error: unknown,
  metadata?: Record<string, unknown>,
) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  console.error(`[telemetry:${context}]`, error, metadata);
  enqueue({
    event: "client_error",
    context,
    message,
    metadata,
  });
}
