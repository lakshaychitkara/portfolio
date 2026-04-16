"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
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
          className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
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
        <div className="relative h-44 overflow-hidden rounded-xl border border-white/10 bg-slate-900/70">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 28% 22%, rgba(34,211,238,0.3), transparent 44%), linear-gradient(140deg, rgba(15,23,42,0.75) 0%, rgba(2,6,23,0.95) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-x-0 bottom-0 bg-slate-950/70 px-3 py-2 text-[11px] uppercase tracking-[0.13em] text-slate-200">
            Simulation proxy preview (static until enabled)
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
            onClick={handleEnableViewer}
          >
            Enable 3D Viewer
          </button>
          <button
            type="button"
            className={`inline-flex min-h-[44px] items-center rounded-full border px-5 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
              lowPowerMode
                ? "border-cyan-300/60 text-cyan-100"
                : "border-white/20 text-slate-300"
            }`}
            onClick={() => setLowPowerMode((prev) => !prev)}
          >
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
          className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
            lowPowerMode
              ? "border-cyan-300/60 text-cyan-100"
              : "border-white/20 text-slate-300"
          }`}
          onClick={() => setLowPowerMode((prev) => !prev)}
        >
          {lowPowerMode ? "Low Power: On" : "Low Power: Off"}
        </button>
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 py-2 text-slate-300 transition hover:border-cyan-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
          onClick={() => setEnabled(false)}
        >
          Disable Viewer
        </button>
      </div>
      <ModelViewer3D lowPowerMode={lowPowerMode} />
    </div>
  );
}
