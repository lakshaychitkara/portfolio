import type { UiSettings } from "@/lib/types";

export const defaultUiSettings: UiSettings = {
  reducedMotion: false,
  lowPowerMode: true,
};

export function detectReducedMotionPreference() {
  if (typeof window === "undefined") {
    return defaultUiSettings.reducedMotion;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
