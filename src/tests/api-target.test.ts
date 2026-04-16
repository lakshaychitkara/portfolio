import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { buildApiUrl, getApiTargetDiagnostics } from "@/lib/api";

const originalEnv = { ...process.env };
const originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");

function setWindowHostname(hostname: string) {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    writable: true,
    value: {
      location: { hostname },
    },
  });
}

afterEach(() => {
  process.env = { ...originalEnv };

  if (originalWindowDescriptor) {
    Object.defineProperty(globalThis, "window", originalWindowDescriptor);
    return;
  }

  Reflect.deleteProperty(globalThis, "window");
});

test("defaults to same-origin mode even when NEXT_PUBLIC_API_BASE_URL is set", () => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";
  delete process.env.NEXT_PUBLIC_API_MODE;

  assert.equal(buildApiUrl("/api/contact"), "/api/contact");
  const diagnostics = getApiTargetDiagnostics();
  assert.equal(diagnostics.mode, "same-origin");
  assert.equal(diagnostics.usesSameOrigin, true);
});

test("direct mode uses configured base URL", () => {
  process.env.NEXT_PUBLIC_API_MODE = "direct";
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://192.168.1.24:8000";

  assert.equal(buildApiUrl("/api/lab/rag"), "http://192.168.1.24:8000/api/lab/rag");
  const diagnostics = getApiTargetDiagnostics();
  assert.equal(diagnostics.usesSameOrigin, false);
  assert.equal(diagnostics.effectiveBaseUrl, "http://192.168.1.24:8000");
});

test("auto mode falls back to same-origin when base URL is localhost on mobile host", () => {
  process.env.NEXT_PUBLIC_API_MODE = "auto";
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";
  setWindowHostname("192.168.1.34");

  assert.equal(buildApiUrl("/api/contact"), "/api/contact");
  const diagnostics = getApiTargetDiagnostics();
  assert.equal(diagnostics.usesSameOrigin, true);
  assert.ok(diagnostics.warning);
});
