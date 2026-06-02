import type { Capability } from "@/lib/types";

export const capabilities: Capability[] = [
  {
    id: "cap-01",
    title: "LLM Systems Engineering",
    domain: "llm",
    summary:
      "Designed and optimized RAG, legal-assistant, and document-assistant systems with quantization, vLLM migration, structured outputs, context summarization, and load-aware tuning.",
    skills: [
      "LangChain",
      "ChromaDB",
      "QLoRA",
      "LoRA",
      "ORPO",
      "vLLM",
      "Prefix caching",
      "BERTScore",
      "Qwen",
      "Gemma",
      "Prompt engineering",
    ],
    highlight:
      "Production tuning included 50-user load testing, >36 tok/s observed throughput, memory-window controls, and CPU-conscious STORMS assistant work.",
  },
  {
    id: "cap-02",
    title: "Computer Vision + Multimodal Retrieval",
    domain: "cv",
    summary:
      "Built benchmark harnesses for video-caption retrieval, OCR, color detection, captioning, and model/index comparisons across language-vision stacks.",
    skills: [
      "YOLO",
      "SSD",
      "DeepSORT",
      "OpenCV",
      "MediaPipe",
      "InternVideo2",
      "LanguageBind",
      "X-CLIP",
      "Gemini Embedding 2",
      "PaddleOCR-VL",
      "FAISS",
    ],
    highlight:
      "Evaluated 1,000 video-caption pairs, annotated 104 CCTV videos, benchmarked FAISS on 600,000 embeddings, and compared OCR stacks for scanned PDFs.",
  },
  {
    id: "cap-03",
    title: "C++ / VTK / Biomechanics Simulation",
    domain: "cpp3d",
    summary:
      "Delivered geometry-sensitive fixes in human-body repositioning workflows, including contour parallelization, metadata correction, diagnostics, and headless evidence automation.",
    skills: [
      "C++",
      "CMake",
      "VTK",
      "Qt/QML",
      "LS-DYNA",
      "CGAL",
      "SWIG",
      "Mesh correction",
      "Linux build tooling",
    ],
    highlight:
      "Resolved critical model-quality blockers including 70deg knee flexion stability, roughly 6000-to-2 GHBMC negative elements, and zero negative elements in IDM correction runs.",
  },
  {
    id: "cap-04",
    title: "Fast Full-Stack Delivery",
    domain: "fullstack",
    summary:
      "Built frontend and API products while integrating AI backends, crawler pipelines, social ingestion, document parsing, and practical deployment/debugging loops.",
    skills: [
      "React",
      "Node.js",
      "Express",
      "FastAPI",
      "REST APIs",
      "MongoDB",
      "MySQL",
      "Web crawling",
      "SEO optimization",
      "YouTube API",
      "Instagram API",
    ],
    highlight:
      "Shipped end-to-end features from wireframe content generation to social listening PoCs and STORMS service paths with iterative stakeholder feedback cycles.",
  },
];
