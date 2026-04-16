import { NextResponse } from "next/server";

interface TimedJsonOptions {
  status?: number;
  startedAt: number;
  cacheControl?: string;
}

export function timedJson(
  payload: unknown,
  { status = 200, startedAt, cacheControl }: TimedJsonOptions,
) {
  const response = NextResponse.json(payload, { status });
  response.headers.set(
    "Server-Timing",
    `app;dur=${(performance.now() - startedAt).toFixed(1)}`,
  );
  if (cacheControl) {
    response.headers.set("Cache-Control", cacheControl);
  }
  return response;
}
