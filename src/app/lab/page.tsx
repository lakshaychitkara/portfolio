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
    "Interactive AI and 3D demos demonstrating LLM serving behavior, performance tuning, multimodal evaluation, and biomechanics simulation workflows.",
  alternates: {
    canonical: canonicalFor("/lab"),
  },
};

export default function LabPage() {
  return (
    <div className="space-y-10">
      <header className="border-b border-white/10 pb-7">
        <p className="font-mono text-xs uppercase text-amber-200">Lab</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-100 md:text-4xl">
          Interactive AI Systems Lab
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
          Inspect retrieval quality, serving latency, multimodal benchmark behavior, and a web-native proxy for the Piper biomechanics workflow.
        </p>
      </header>

      <SectionBlock
        eyebrow="3D Demo"
        title="Biomechanics Repositioning Proxy"
        description="A lightweight articulated mesh proxy for the Piper repositioning work. The 3D renderer is opt-in to keep initial load fast."
      >
        <LazyModelViewer3D />
      </SectionBlock>

      <SectionBlock
        eyebrow="LLM Demo"
        title="RAG + Performance Explorer"
        description="Compare baseline versus optimized serving behavior across retrieval traces, latency, throughput, and groundedness."
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
        title="Multimodal Benchmark Explorer"
        description="Compare caption quality and recall/precision signals across classical and multimodal model families."
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
