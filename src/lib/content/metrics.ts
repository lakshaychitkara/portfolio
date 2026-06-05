import type { EvidenceMetric } from "@/lib/types";

export const evidenceMetrics: EvidenceMetric[] = [
  {
    id: "ev-01",
    label: "Piper Mesh Quality",
    value: "~6000 to 2",
    context: "GHBMC negative elements reduced after detection-script alignment and scaling corrections.",
  },
  {
    id: "ev-02",
    label: "Knee Flexion Stability",
    value: "70deg",
    context: "THUMS/IDM knee flexion stability extended through metadata and timestep updates.",
  },
  {
    id: "ev-03",
    label: "vLLM Load Test",
    value: "50 users",
    context: "Parallel load testing completed after enabling prefix caching and architecture migration.",
  },
  {
    id: "ev-04",
    label: "Retrieval Benchmark Scale",
    value: "600k embeddings",
    context: "Flat/HNSW/IVF comparison script executed for build/query/recall analysis.",
  },
  {
    id: "ev-05",
    label: "Video Evaluation Set",
    value: "1,000 pairs",
    context: "InternVideo, LanguageBind, X-CLIP, and related model families compared across recall metrics.",
  },
  {
    id: "ev-06",
    label: "CCTV Annotation",
    value: "104 videos",
    context: "Manual annotation pipeline used for model confidence, recall, and retrieval comparison.",
  },
  {
    id: "ev-07",
    label: "OCR Benchmark Breadth",
    value: "4 stacks",
    context: "Tesseract, DeepSeek-OCR, GLM-OCR, and PaddleOCR/PaddleOCR-VL were explored for scanned PDFs.",
  },
  {
    id: "ev-08",
    label: "STORMS Runtime Fix",
    value: "OOM fixed",
    context: "CPU audio processing failures were resolved while profiling document-assistant performance.",
  },
];

export const recruiterSignals = [
  "Owns evidence-heavy AI systems work across LLM serving, multimodal retrieval, OCR, and C++ simulation.",
  "Validates architecture choices with benchmarks, load tests, and mesh-quality diagnostics rather than intuition.",
  "Comfortable moving between production UI/API delivery, model evaluation, and low-level geometry debugging.",
];

export const resumeHighlights = [
  "Reduced GHBMC negative elements from roughly 6000 to 2 and extended stable knee flexion to 70deg in Piper workflows.",
  "Migrated chatbot architecture to vLLM, enabled prefix caching, and validated behavior up to 50 users with >36 tok/s observed in 10-user tests.",
  "Benchmarked retrieval, captioning, OCR, and embedding-index stacks across 1,000-pair, 104-video, and 600k-embedding datasets.",
  "Built FastAPI document-assistant services with multilingual, context summarization, and CPU audio-processing OOM fixes.",
];
