"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { BatteryMedium, Box, Power } from "lucide-react";
import { defaultUiSettings, detectReducedMotionPreference } from "@/lib/ui-settings";

const ModelViewer3D = dynamic(
  () =>
    import("@/components/lab/model-viewer-3d").then(
      (module) => module.ModelViewer3D,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="card-surface p-6 text-sm text-slate-300">
        Loading 3D renderer...
      </div>
    ),
  },
);

function webGlSupported() {
  if (typeof window === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl");
  return Boolean(gl);
}

export function LazyModelViewer3D() {
  const [supportState, setSupportState] = useState<"unknown" | "supported" | "unsupported">(
    "unknown",
  );
  const [enabled, setEnabled] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(
    () => detectReducedMotionPreference() || defaultUiSettings.lowPowerMode,
  );

  if (supportState === "unsupported") {
    return (
      <div className="card-surface p-6">
        <h3 className="text-lg font-semibold text-slate-100">3D Preview Unavailable</h3>
        <p className="mt-2 text-sm text-slate-300">
          WebGL is unavailable in this browser/device. You can still explore the
          architecture and benchmark sections below.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-200 transition hover:border-amber-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
          onClick={() => setSupportState("unknown")}
        >
          Try Again
        </button>
      </div>
    );
  }

  function handleEnableViewer() {
    const supported = webGlSupported();
    setSupportState(supported ? "supported" : "unsupported");
    if (supported) {
      setEnabled(true);
    }
  }

  if (!enabled) {
    return (
      <div className="card-surface space-y-4 p-6">
        <h3 className="text-lg font-semibold text-slate-100">Interactive 3D Viewer</h3>
        <p className="text-sm text-slate-300">
          Enable the viewer when you want to inspect the proxy model. Keeping it
          off improves initial load performance on mobile and low-power devices.
        </p>
        <div className="relative h-44 overflow-hidden rounded-lg border border-white/10 bg-slate-900/70">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(140deg, rgba(20,184,166,0.24) 0%, rgba(15,23,42,0.75) 38%, rgba(2,6,23,0.95) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-teal-200/35 bg-teal-300/10" />
          <div className="absolute left-20 top-12 h-20 w-36 -rotate-12 rounded-full border border-amber-200/35 bg-amber-300/10" />
          <div className="absolute right-6 top-5 grid gap-2 text-right font-mono text-[11px] uppercase text-slate-200">
            <span className="rounded border border-white/10 bg-slate-950/60 px-2 py-1">70deg stable</span>
            <span className="rounded border border-white/10 bg-slate-950/60 px-2 py-1">~6000 to 2</span>
            <span className="rounded border border-white/10 bg-slate-950/60 px-2 py-1">Headless docs</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-slate-950/70 px-3 py-2 text-[11px] uppercase text-slate-200">
            Simulation proxy preview (static until enabled)
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
            onClick={handleEnableViewer}
          >
            <Box size={16} aria-hidden />
            Enable 3D Viewer
          </button>
          <button
            type="button"
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-5 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 ${
              lowPowerMode
                ? "border-amber-300/60 text-amber-100"
                : "border-white/20 text-slate-300"
            }`}
            onClick={() => setLowPowerMode((prev) => !prev)}
          >
            <BatteryMedium size={16} aria-hidden />
            {lowPowerMode ? "Low Power: On" : "Low Power: Off"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <button
          type="button"
          className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 ${
            lowPowerMode
              ? "border-amber-300/60 text-amber-100"
              : "border-white/20 text-slate-300"
          }`}
          onClick={() => setLowPowerMode((prev) => !prev)}
        >
          <BatteryMedium size={14} aria-hidden />
          {lowPowerMode ? "Low Power: On" : "Low Power: Off"}
        </button>
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-slate-300 transition hover:border-amber-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
          onClick={() => setEnabled(false)}
        >
          <Power size={14} aria-hidden />
          Disable Viewer
        </button>
      </div>
      <ModelViewer3D lowPowerMode={lowPowerMode} />
    </div>
  );
}
