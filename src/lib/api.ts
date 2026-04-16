import type { ApiMode, ApiTargetDiagnostics } from "@/lib/types";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const warned = new Set<string>();

function warnOnce(key: string, message: string) {
  if (typeof window === "undefined" || warned.has(key)) {
    return;
  }

  warned.add(key);
  console.warn(message);
}

function normalizeBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) {
    return null;
  }

  return raw.replace(/\/$/, "");
}

function getApiMode(): ApiMode {
  const rawMode = process.env.NEXT_PUBLIC_API_MODE?.trim();

  if (rawMode === "direct" || rawMode === "auto" || rawMode === "same-origin") {
    return rawMode;
  }

  return "same-origin";
}

function hostFromUrl(value: string) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isLocalHost(hostname: string | null) {
  if (!hostname) {
    return false;
  }

  return LOCAL_HOSTS.has(hostname.toLowerCase());
}

function shouldFallbackToSameOrigin(baseUrl: string) {
  if (typeof window === "undefined") {
    return false;
  }

  const currentHost = window.location.hostname.toLowerCase();
  const targetHost = hostFromUrl(baseUrl);

  return !isLocalHost(currentHost) && isLocalHost(targetHost);
}

export function getApiTargetDiagnostics(): ApiTargetDiagnostics {
  const mode = getApiMode();
  const configuredBaseUrl = normalizeBaseUrl();

  if (mode === "same-origin") {
    return {
      mode,
      configuredBaseUrl,
      effectiveBaseUrl: null,
      usesSameOrigin: true,
      warning: null,
    };
  }

  if (!configuredBaseUrl) {
    return {
      mode,
      configuredBaseUrl: null,
      effectiveBaseUrl: null,
      usesSameOrigin: true,
      warning:
        "NEXT_PUBLIC_API_BASE_URL is not set. Falling back to same-origin /api routes.",
    };
  }

  const fallback = shouldFallbackToSameOrigin(configuredBaseUrl);
  if (mode === "auto" && fallback) {
    return {
      mode,
      configuredBaseUrl,
      effectiveBaseUrl: null,
      usesSameOrigin: true,
      warning:
        "Configured API base URL points to localhost and is not reachable from this device. Falling back to same-origin /api routes.",
    };
  }

  return {
    mode,
    configuredBaseUrl,
    effectiveBaseUrl: configuredBaseUrl,
    usesSameOrigin: false,
    warning: null,
  };
}

export function buildApiUrl(path: string): string {
  const diagnostics = getApiTargetDiagnostics();

  if (diagnostics.warning) {
    warnOnce("api-target-warning", diagnostics.warning);
  }

  if (!diagnostics.effectiveBaseUrl) {
    return path;
  }

  return `${diagnostics.effectiveBaseUrl}${path}`;
}
