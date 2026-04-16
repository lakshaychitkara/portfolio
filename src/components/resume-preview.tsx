"use client";

import { useState } from "react";

export function ResumePreview() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="card-surface p-6">
        <p className="text-sm text-slate-300">
          Resume preview is deferred to keep page load fast on mobile devices.
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
        >
          Load Resume Preview
        </button>
      </div>
    );
  }

  return (
    <div className="card-surface p-4">
      <iframe
        title="Resume Preview"
        src="/resume.pdf"
        loading="lazy"
        className="h-[620px] w-full rounded-xl border border-white/10 bg-slate-950"
      />
    </div>
  );
}
