import type { CareerPhase } from "@/lib/types";

const monthOrder = new Map<string, number>([
  ["jan", 0],
  ["feb", 1],
  ["mar", 2],
  ["apr", 3],
  ["may", 4],
  ["jun", 5],
  ["jul", 6],
  ["aug", 7],
  ["sep", 8],
  ["oct", 9],
  ["nov", 10],
  ["dec", 11],
]);

function parseMonthYear(value: string): Date | null {
  const match = value.trim().toLowerCase().match(/([a-z]{3,9})\s+(\d{4})/);
  if (!match) {
    return null;
  }

  const month = monthOrder.get(match[1].slice(0, 3));
  if (month === undefined) {
    return null;
  }

  return new Date(Number(match[2]), month, 1);
}

function extractRange(period: string): { start: Date | null; end: Date | null } {
  const [rawStart, rawEnd] = period.split("-").map((part) => part.trim());
  const start = parseMonthYear(rawStart ?? period);
  const end = parseMonthYear(rawEnd ?? rawStart ?? period);
  return { start, end };
}

export function getTimelineCoverageMonths(entries: CareerPhase[]) {
  if (!entries.length) {
    return 0;
  }

  const starts = entries.map((entry) => extractRange(entry.period).start).filter(Boolean) as Date[];
  const ends = entries.map((entry) => extractRange(entry.period).end).filter(Boolean) as Date[];

  if (!starts.length || !ends.length) {
    return 0;
  }

  const minStart = new Date(Math.min(...starts.map((date) => date.getTime())));
  const maxEnd = new Date(Math.max(...ends.map((date) => date.getTime())));
  return (maxEnd.getFullYear() - minStart.getFullYear()) * 12 + (maxEnd.getMonth() - minStart.getMonth()) + 1;
}

export const careerPhases: CareerPhase[] = [
  {
    id: "phase-01",
    phase: "Phase 1",
    period: "Sep 2025 - Oct 2025",
    title: "ML/LLM Fundamentals to RAG and Quantization",
    focus: "Rapid grounding in transformer internals, retrieval workflows, and model compression.",
    summary:
      "Built first RAG pipeline, implemented BERT-based experiments, and moved into ORPO/QLoRA/Gemma adaptation workflows with quality-evaluation awareness.",
    tools: [
      "BERT",
      "LangChain",
      "ChromaDB",
      "bitsandbytes",
      "QLoRA",
      "LoRA",
      "ORPO",
    ],
    outcomes: [
      "Completed retrieval + generation integration with bug fixes in final QA loop.",
      "Ran quantization and fine-tuning experiments to compare size, speed, and output quality.",
      "Established evaluation mindset using BERTScore and metric-driven QA validation.",
    ],
    projectImpact: [
      { label: "RAG Delivery", value: "1 pipeline", context: "Completed end-to-end retrieval + generation prototype." },
      { label: "Model Adaptation", value: "3 tracks", context: "LoRA, QLoRA, and quantization workflows completed." },
      { label: "Evaluation Shift", value: "Metric-first", context: "Moved from intuition-only checks to scored validation." },
    ],
  },
  {
    id: "phase-02",
    phase: "Phase 2",
    period: "Nov 2025",
    title: "Legal Assistant Optimization with vLLM",
    focus: "Latency, hallucination control, and concurrency stability under real user load.",
    summary:
      "Migrated inference architecture to vLLM, fixed adapter/memory/threading issues, and stabilized multi-user throughput and output quality.",
    tools: ["vLLM", "Chainlit", "Prompt engineering", "Load testing", "Prefix caching"],
    outcomes: [
      "Resolved EOS-token latency and background-stream synchronization bugs.",
      "Enabled prefix caching and improved quality with memory window tuning.",
      "Validated behavior under parallel traffic with explicit edge-case handling.",
    ],
    projectImpact: [
      { label: "Peak Load", value: "50 users", context: "Parallel load tests executed after vLLM migration." },
      { label: "Sustained Rate", value: ">36 tok/s", context: "Observed during 10-user parallel chat tests." },
      { label: "Memory Window", value: "5 turns", context: "Sliding-window memory implemented to improve response continuity." },
    ],
  },
  {
    id: "phase-03",
    phase: "Phase 3",
    period: "Dec 2025",
    title: "FastAPI + LangChain Production Patterns",
    focus: "API robustness, structured outputs, and deployable AI-service behavior.",
    summary:
      "Deepened FastAPI fundamentals (CRUD, serving, params, validation), connected LangChain parsers/chains, and improved response format control in deployed assistants.",
    tools: ["FastAPI", "Pydantic", "LangChain", "Structured outputs", "Linux"],
    outcomes: [
      "Shipped typed endpoints and model-serving patterns with cleaner contracts.",
      "Built ingestion + QA path with parser and chain orchestration fixes.",
      "Expanded prompt classification logic for scenario-based response shaping.",
    ],
    projectImpact: [
      { label: "API Coverage", value: "CRUD-ready", context: "GET/POST/PUT/DELETE patterns implemented with validation." },
      { label: "Output Discipline", value: "Structured", context: "Prompt and parser layers aligned for predictable responses." },
      { label: "Pipeline Reliability", value: "E2E fixed", context: "Ingestion-to-answer LangChain bugs resolved." },
    ],
  },
  {
    id: "phase-04",
    phase: "Phase 4",
    period: "Jan 2026 - Feb 2026",
    title: "Piper C++/VTK/QML Repositioning Engineering",
    focus: "Biomechanical correctness, contour stability, and build/tooling reliability.",
    summary:
      "Implemented and tested dynamic FE-axis strategies, metadata corrections, contour parallelization updates, and Linux build improvements in a simulation-heavy codebase.",
    tools: ["C++", "VTK", "Qt/QML", "CMake", "LS-DYNA", "CGAL"],
    outcomes: [
      "Fixed child-model axis mismatch and improved knee rotation behavior.",
      "Removed contour tearing in key scenarios and improved high-flexion stability.",
      "Added robust script tooling for configure/generate on Linux with path validation.",
    ],
    projectImpact: [
      { label: "Flexion Stability", value: "45deg", context: "Left knee contour intersections cleared up to 45 degrees." },
      { label: "IDM Quality", value: "0 negatives", context: "Negative elements reduced to zero in corrected run." },
      { label: "Pipeline Sync", value: "2 knees", context: "Left and right knee repositioning pipelines unified." },
    ],
  },
  {
    id: "phase-05",
    phase: "Phase 5",
    period: "Feb 2026 - Mar 2026",
    title: "Multimodal Benchmarking + Video Retrieval",
    focus: "Model comparison at scale with retrieval metrics and index-level trade-off analysis.",
    summary:
      "Benchmarked video-language models across public and custom datasets, then validated retrieval trade-offs with large embedding-index experiments.",
    tools: [
      "InternVideo2",
      "LanguageBind",
      "X-CLIP",
      "Gemini Embedding 2",
      "FAISS",
      "PyTorch",
    ],
    outcomes: [
      "Benchmarked multiple model families for recall and caption quality.",
      "Annotated CCTV dataset and compared confidence and retrieval behavior.",
      "Built scripts for embedding generation and dynamic retrieval evaluation.",
    ],
    projectImpact: [
      { label: "Video-Caption Eval", value: "1,000 pairs", context: "Primary benchmark set created for model recall testing." },
      { label: "CCTV Annotation", value: "104 videos", context: "Manual annotation completed for quality benchmarking." },
      { label: "Index Stress Test", value: "600,000 embeddings", context: "Flat/HNSW/IVF build/query/recall benchmarks executed." },
    ],
  },
  {
    id: "phase-06",
    phase: "Phase 6",
    period: "Mar 2026 - Apr 2026",
    title: "OCR + Social Listening PoC + Infra Tooling",
    focus: "Applied productization across multimodal extraction and cross-platform signal workflows.",
    summary:
      "Explored OCR stacks for scanned documents, integrated retrieval alternatives, and shipped a social listening proof-of-concept with API data ingestion and measurable latency reporting.",
    tools: ["PaddleOCR", "Tesseract", "DeepSeek OCR", "Instagram API", "YouTube API", "React"],
    outcomes: [
      "Compared OCR options and advanced production-fit model selection.",
      "Delivered social listening PoC with iterative review integration.",
      "Documented and stabilized shell-based build/run workflows for reproducibility.",
    ],
    projectImpact: [
      { label: "API Integrations", value: "2 platforms", context: "Instagram and YouTube ingestion integrated into PoC flow." },
      { label: "PoC Delivery", value: "1 end-to-end", context: "Built, reviewed, cleaned, and finalized branch delivery." },
      { label: "Infra Scripts", value: "3 hardened", context: "Configure/generate/run scripts made path-agnostic and validated." },
    ],
  },
];
