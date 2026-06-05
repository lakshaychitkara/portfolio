import type { CapabilityDomain, ProjectEvidence } from "@/lib/types";

export interface InternshipMilestone {
  id: string;
  period: string;
  title: string;
  summary: string;
  domains: CapabilityDomain[];
  metrics: ProjectEvidence[];
  tools: string[];
  evidence: string[];
  sourceRows: string;
}

export const internshipEvidenceSummary = {
  source: "my_work.ods",
  filledEntries: 176,
  period: "Sep 16, 2025 - Jun 1, 2026",
  employer: "CreateBytes",
  role: "Machine Learning Intern",
};

export const internshipMilestones: InternshipMilestone[] = [
  {
    id: "foundation-rag",
    period: "Sep - Oct 2025",
    title: "ML Foundations to RAG and Model Adaptation",
    summary:
      "Built the base ML and LLM stack: BERT experiments, RAG with LangChain/ChromaDB, quantization, LoRA/QLoRA, and metric-driven evaluation.",
    domains: ["llm"],
    metrics: [
      { label: "RAG prototype", value: "1 pipeline", context: "Retrieval and generation integrated with debugging in the final QA loop." },
      { label: "Model adaptation", value: "3 tracks", context: "LoRA, QLoRA, and quantization experiments completed." },
      { label: "Evaluation", value: "Metric-first", context: "BERTScore and LLM-as-judge concepts added to quality review." },
    ],
    tools: ["BERT", "LangChain", "ChromaDB", "QLoRA", "LoRA", "bitsandbytes"],
    evidence: [
      "Completed a RAG implementation after learning LangChain, vector stores, and WebBaseLoader.",
      "Ran fine-tuning and quantization experiments on LLaMA/Gemma style workflows.",
      "Moved from intuition-only output checks toward classification, regression, and generated-text metrics.",
    ],
    sourceRows: "Rows 9-26",
  },
  {
    id: "legal-vllm",
    period: "Nov 2025",
    title: "Legal Assistant Optimization on vLLM",
    summary:
      "Stabilized a Chainlit legal assistant by fixing adapter stacking, EOS latency, memory drift, streaming sync, and vLLM prefix-caching behavior.",
    domains: ["llm", "fullstack"],
    metrics: [
      { label: "Load test", value: "50 users", context: "Parallel vLLM load testing completed after migration and prefix caching." },
      { label: "Throughput", value: ">36 tok/s", context: "Observed during 10-user parallel testing." },
      { label: "Memory", value: "5 turns", context: "Sliding-window memory implemented to reduce follow-up drift." },
    ],
    tools: ["vLLM", "Chainlit", "Prefix caching", "FastAPI", "Prompt engineering"],
    evidence: [
      "Migrated inference from a transformer-based path to vLLM.",
      "Fixed background generation and streaming synchronization defects.",
      "Documented vLLM usage and improved prompt classification for edge-case queries.",
    ],
    sourceRows: "Rows 58-75",
  },
  {
    id: "wireframe-product",
    period: "Oct - Nov 2025",
    title: "SEO Wireframe and Content Generation Pipeline",
    summary:
      "Improved an LLM content-generation workflow with question-style inputs, crawler depth control, SEO keyword generation, and iterative stakeholder feedback.",
    domains: ["fullstack", "llm"],
    metrics: [
      { label: "Crawler depth", value: "20 levels", context: "Depth control added to the web crawling stage." },
      { label: "Prompt variants", value: "9 reels", context: "Feedback-driven content variants generated and reviewed." },
      { label: "Input quality", value: "Question-based", context: "Inputs reframed to sharpen retrieval intent." },
    ],
    tools: ["Python", "Web crawling", "SEO", "Prompt engineering", "Figma API"],
    evidence: [
      "Added crawling and scraping fixes to make retrieved source content more reliable.",
      "Implemented SEO keyword generation before web search and scraping.",
      "Learned and explored Figma API behavior for downstream wireframe content handling.",
    ],
    sourceRows: "Rows 44-57",
  },
  {
    id: "multimodal-benchmarking",
    period: "Feb - Mar 2026",
    title: "Multimodal, OCR, and Retrieval Benchmarks",
    summary:
      "Benchmarked video-language models, OCR stacks, embedding indexes, color detection, and retrieval choices against target-like datasets.",
    domains: ["cv", "llm"],
    metrics: [
      { label: "Video eval", value: "1,000 pairs", context: "Video-caption benchmark set used for recall comparisons." },
      { label: "CCTV set", value: "104 videos", context: "Manual annotation supported confidence and recall analysis." },
      { label: "Index scale", value: "600k", context: "FAISS Flat/HNSW/IVF build-query-recall benchmarks executed." },
    ],
    tools: ["InternVideo2", "LanguageBind", "X-CLIP", "Gemini Embedding 2", "PaddleOCR-VL", "FAISS"],
    evidence: [
      "Compared InternVideo2, LanguageBind, MobileCLIP, X-CLIP, BLIP2, Qwen, and Gemini embedding options.",
      "Benchmarked OCR families including PaddleOCR, Tesseract, DeepSeek OCR, GLM OCR, and PaddleOCR-VL.",
      "Built standalone encoder and query-embedding scripts for downstream retrieval workflows.",
    ],
    sourceRows: "Rows 96-117",
  },
  {
    id: "piper-simulation",
    period: "Dec 2025 - Jun 2026",
    title: "Piper FE-HBM Repositioning Engineering",
    summary:
      "Worked through C++/VTK/QML simulation issues: metadata, contour intersections, negative elements, Linux build tooling, and headless documentation automation.",
    domains: ["cpp3d"],
    metrics: [
      { label: "Knee flexion", value: "70deg", context: "Stable THUMS/IDM knee flexion extended via metadata and timestep work." },
      { label: "GHBMC quality", value: "~6000 to 2", context: "Negative elements reduced after detection-script alignment and scaling fixes." },
      { label: "IDM quality", value: "0 negatives", context: "Iterative validity checks cleared negative solid elements." },
    ],
    tools: ["C++", "VTK", "Qt/QML", "CMake", "LS-DYNA", "CGAL", "SWIG"],
    evidence: [
      "Corrected metadata and contour logic across knee, hip, lumbar, thorax, shoulder, and whole-body workflows.",
      "Integrated negative-volume visualization and UI state controls for repositioning flows.",
      "Built C++/Python headless documentation automation producing PNG evidence, DOCX reports, and JSON summaries.",
    ],
    sourceRows: "Rows 80-260",
  },
  {
    id: "storms-assistant",
    period: "May 2026",
    title: "STORMS Document Assistant Productization",
    summary:
      "Built FastAPI summarization, document parsing, multilingual, chatbot, audio, and context-summarization paths while profiling CPU constraints.",
    domains: ["llm", "fullstack"],
    metrics: [
      { label: "Inputs", value: "PDF/JSON/text", context: "Parsing support added to FastAPI service paths." },
      { label: "Languages", value: "5", context: "Indic2 200M added for multilingual expansion." },
      { label: "Runtime", value: "OOM fixed", context: "CPU audio out-of-memory failures resolved during profiling." },
    ],
    tools: ["FastAPI", "Qwen", "Gemma", "Indic2 200M", "vLLM", "LangGraph"],
    evidence: [
      "Provisioned Qwen and built chatbot flows using Gemma/vLLM before switching models to reduce hallucinations.",
      "Added context summarization up to 40 turns to prevent memory issues.",
      "Benchmarked CPU latency and improved audio generation stability.",
    ],
    sourceRows: "Rows 232-243",
  },
  {
    id: "social-listening",
    period: "Mar 2026",
    title: "Social Listening Product PoC",
    summary:
      "Delivered a reviewed social listening proof-of-concept with platform ingestion, UI improvements, latency review, and branch cleanup.",
    domains: ["fullstack", "llm"],
    metrics: [
      { label: "Sources", value: "2 APIs", context: "Instagram and YouTube data extraction integrated." },
      { label: "Delivery", value: "1 PoC", context: "Reviewed, cleaned, rerun, and pushed for stakeholder feedback." },
      { label: "Review", value: "2+ cycles", context: "UI and ingestion improvements incorporated from feedback." },
    ],
    tools: ["React", "Node.js", "YouTube API", "Instagram API", "Prompt refinement"],
    evidence: [
      "Implemented API data extraction paths for social signals.",
      "Shared latency observations for feasibility review.",
      "Finalized and pushed the branch after cleanup and local rerun validation.",
    ],
    sourceRows: "Rows 113-119",
  },
];
