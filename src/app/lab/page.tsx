import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LazyModelViewer3D } from "@/components/lab/lazy-model-viewer-3d";
import { DeferredSection } from "@/components/ui/deferred-section";
import { SectionBlock } from "@/components/ui/section-block";
import { canonicalFor } from "@/lib/seo";

const RagPlayground = dynamic(
  () => import("@/components/lab/rag-playground").then((module) => module.RagPlayground),
  {
    loading: () => (
      <div className="card-surface p-5 text-sm text-slate-300">Loading RAG explorer...</div>
    ),
  },
);

const LatencyDashboard = dynamic(
  () => import("@/components/lab/latency-dashboard").then((module) => module.LatencyDashboard),
  {
    loading: () => (
      <div className="card-surface p-5 text-sm text-slate-300">Loading latency traces...</div>
    ),
  },
);

const CvBenchmarkExplorer = dynamic(
  () =>
    import("@/components/lab/cv-benchmark-explorer").then(
      (module) => module.CvBenchmarkExplorer,
    ),
  {
    loading: () => (
      <div className="card-surface p-5 text-sm text-slate-300">
        Loading CV benchmark controls...
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Interactive AI and 3D demos demonstrating system design depth, performance tuning, and multimodal evaluation workflows.",
  alternates: {
    canonical: canonicalFor("/lab"),
  },
};

export default function LabPage() {
  return (
    <div className="space-y-10">
      <header className="card-surface p-6 md:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Lab</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-100 md:text-4xl">
          Interactive AI Systems Lab
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
          Experiment with retrieval quality, latency behavior, and multimodal workflows through
          lightweight demos designed for architecture conversations.
        </p>
      </header>

      <SectionBlock
        eyebrow="3D Demo"
        title="Biomechanics Viewer Prototype"
        description="A web-native proxy for simulation-grade geometry interaction. The 3D renderer is opt-in to keep initial load fast."
      >
        <LazyModelViewer3D />
      </SectionBlock>

      <SectionBlock
        eyebrow="LLM Demo"
        title="RAG + Performance Explorer"
        description="Toggle baseline versus optimized inference mode to inspect retrieval traces, latency, throughput, and groundedness."
      >
        <DeferredSection
          fallback={
            <div className="card-surface p-5 text-sm text-slate-300">
              Loading interactive RAG and latency panel as this section approaches viewport...
            </div>
          }
        >
          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <RagPlayground />
            <LatencyDashboard />
          </div>
        </DeferredSection>
      </SectionBlock>

      <SectionBlock
        eyebrow="Vision Demo"
        title="CV / Multimodal Benchmark Explorer"
        description="Compare caption quality and recall/precision signals across baseline and multimodal model families."
      >
        <DeferredSection
          fallback={
            <div className="card-surface p-5 text-sm text-slate-300">
              Loading CV benchmark explorer as you reach this section...
            </div>
          }
        >
          <CvBenchmarkExplorer />
        </DeferredSection>
      </SectionBlock>
    </div>
  );
}
