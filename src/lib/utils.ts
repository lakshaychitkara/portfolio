import { clsx, type ClassValue } from "clsx";
import type { ApiErrorResponse } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function extractApiErrorMessage(payload: ApiErrorResponse | null, fallback: string) {
  if (!payload) {
    return fallback;
  }

  if (typeof payload.error === "string" && payload.error) {
    return payload.error;
  }

  if (typeof payload.error === "object" && payload.error?.message) {
    return payload.error.message;
  }

  if (payload.message) {
    return payload.message;
  }

  return fallback;
}
