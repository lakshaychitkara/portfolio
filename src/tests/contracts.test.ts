import assert from "node:assert/strict";
import test from "node:test";
import { POST as benchmarkPOST } from "../app/api/lab/benchmark/route";
import { POST as contactPOST } from "../app/api/contact/route";
import { POST as cvPOST } from "../app/api/lab/cv/route";
import { POST as ragPOST } from "../app/api/lab/rag/route";

test("POST /api/contact returns standardized success payload", async () => {
  const response = await contactPOST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Lakshay",
        email: "lakshay@example.com",
        message: "Looking to discuss an AI systems engineering role.",
      }),
    }),
  );

  assert.equal(response.status, 200);
  const payload = (await response.json()) as { ok: boolean; message: string };
  assert.equal(payload.ok, true);
  assert.equal(typeof payload.message, "string");
});

test("POST /api/contact returns standardized validation errors", async () => {
  const response = await contactPOST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "A",
        email: "invalid",
        message: "short",
      }),
    }),
  );

  assert.equal(response.status, 400);
  const payload = (await response.json()) as {
    error: { code: string; message: string; details: unknown };
  };
  assert.equal(payload.error.code, "VALIDATION_ERROR");
  assert.equal(typeof payload.error.message, "string");
  assert.ok(payload.error.details);
});

test("POST /api/lab/rag uses camelCase metrics contract", async () => {
  const response = await ragPOST(
    new Request("http://localhost/api/lab/rag", {
      method: "POST",
      body: JSON.stringify({
        query: "How do you keep latency stable?",
        mode: "optimized",
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.ok(response.headers.get("server-timing"));
  assert.ok(response.headers.get("cache-control")?.includes("stale-while-revalidate"));
  const payload = (await response.json()) as {
    metrics: {
      latencyMs: number;
      tokensPerSecond: number;
      groundedness: number;
    };
  };
  assert.equal(typeof payload.metrics.latencyMs, "number");
  assert.equal(typeof payload.metrics.tokensPerSecond, "number");
  assert.equal(typeof payload.metrics.groundedness, "number");
});

test("POST /api/lab/cv returns modelFamily contract", async () => {
  const response = await cvPOST(
    new Request("http://localhost/api/lab/cv", {
      method: "POST",
      body: JSON.stringify({
        clip: "warehouse-ergonomics.mp4",
        modelFamily: "multimodal",
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.ok(response.headers.get("cache-control")?.includes("stale-while-revalidate"));
  const payload = (await response.json()) as {
    clip: string;
    modelFamily: string;
    captions: unknown[];
  };
  assert.equal(payload.clip, "warehouse-ergonomics.mp4");
  assert.equal(payload.modelFamily, "multimodal");
  assert.ok(Array.isArray(payload.captions));
});

test("POST /api/lab/benchmark exposes baseline/optimized blocks", async () => {
  const response = await benchmarkPOST(
    new Request("http://localhost/api/lab/benchmark", {
      method: "POST",
      body: JSON.stringify({
        scenario: "llm_pipeline",
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.ok(response.headers.get("cache-control")?.includes("stale-while-revalidate"));
  const payload = (await response.json()) as {
    baseline: { latencyMs: number };
    optimized: { latencyMs: number };
  };
  assert.equal(typeof payload.baseline.latencyMs, "number");
  assert.equal(typeof payload.optimized.latencyMs, "number");
});
