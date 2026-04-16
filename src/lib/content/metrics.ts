import type { EvidenceMetric } from "@/lib/types";

export const evidenceMetrics: EvidenceMetric[] = [
  {
    id: "ev-01",
    label: "vLLM Load Test",
    value: "50 users",
    context: "Parallel load testing completed after enabling prefix caching and architecture migration.",
  },
  {
    id: "ev-02",
    label: "Observed Token Rate",
    value: ">36 tok/s",
    context: "Measured during 10-user parallel chat benchmarking in production-like conditions.",
  },
  {
    id: "ev-03",
    label: "Retrieval Benchmark Scale",
    value: "600k embeddings",
    context: "Flat/HNSW/IVF comparison script executed for build/query/recall analysis.",
  },
  {
    id: "ev-04",
    label: "Video Evaluation Set",
    value: "1,000 pairs",
    context: "InternVideo and language-vision model comparison across recall metrics.",
  },
  {
    id: "ev-05",
    label: "CCTV Annotation",
    value: "104 videos",
    context: "Manual annotation pipeline used for model confidence and recall comparison.",
  },
  {
    id: "ev-06",
    label: "Simulation Quality Win",
    value: "0 negative elements",
    context: "IDM repositioning correction run achieved zero negative elements while reducing penetration.",
  },
];

export const recruiterSignals = [
  "Demonstrated ability to move from learning velocity to production-level AI system execution.",
  "Validated model and retrieval decisions with measurable benchmarks instead of anecdotal comparisons.",
  "Comfortable owning both low-level C++ simulation complexity and high-level product-facing delivery.",
];

export const resumeHighlights = [
  "Migrated chatbot architecture to vLLM and stabilized multi-user inference behavior.",
  "Benchmarked retrieval and multimodal stacks across 1,000-pair and 104-video datasets.",
  "Shipped FastAPI + LangChain service patterns with structured output and parser control.",
  "Solved complex C++ repositioning issues including axis mismatch, contour tearing, and negative elements.",
];
