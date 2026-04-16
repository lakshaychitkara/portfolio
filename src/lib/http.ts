import type { ApiErrorResponse, FetchJsonOptions } from "@/lib/types";
import { extractApiErrorMessage } from "@/lib/utils";

const pendingRequests = new Map<string, Promise<unknown>>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapNetworkError(error: unknown): Error {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return new Error("Request timed out. Please try again.");
    }

    if (error instanceof TypeError) {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        return new Error("You appear to be offline. Reconnect and try again.");
      }

      return new Error(
        "Unable to reach the API endpoint. Check your connection and API base URL settings.",
      );
    }

    return error;
  }

  return new Error("Unexpected network error.");
}

function shouldRetry(status?: number) {
  if (!status) {
    return true;
  }

  return status >= 500 || status === 429;
}

export async function fetchJson<T>(
  input: string,
  {
    timeoutMs = 8000,
    retries = 0,
    dedupeKey,
    ...init
  }: FetchJsonOptions = {},
): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();
  const key = dedupeKey ?? `${method}:${input}:${typeof init.body === "string" ? init.body : ""}`;

  if (pendingRequests.has(key)) {
    return pendingRequests.get(key) as Promise<T>;
  }

  const run = (async () => {
    let attempt = 0;

    while (attempt <= retries) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(input, {
          ...init,
          signal: controller.signal,
        });

        const payload = (await response.json().catch(() => null)) as
          | T
          | ApiErrorResponse
          | null;

        if (!response.ok) {
          if (attempt < retries && shouldRetry(response.status)) {
            attempt += 1;
            await sleep(200 * attempt);
            continue;
          }

          throw new Error(
            extractApiErrorMessage(
              payload as ApiErrorResponse | null,
              `Request failed with status ${response.status}.`,
            ),
          );
        }

        return payload as T;
      } catch (error) {
        if (attempt < retries) {
          attempt += 1;
          await sleep(200 * attempt);
          continue;
        }

        throw mapNetworkError(error);
      } finally {
        clearTimeout(timeoutId);
      }
    }

    throw new Error("Request failed.");
  })();

  pendingRequests.set(key, run);
  try {
    return await run;
  } finally {
    pendingRequests.delete(key);
  }
}
