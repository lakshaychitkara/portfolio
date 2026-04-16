import type { Capability } from "@/lib/types";

export const capabilities: Capability[] = [
  {
    id: "cap-01",
    title: "LLM Systems Engineering",
    domain: "llm",
    summary:
      "Designed and optimized RAG and legal-assistant pipelines with quantization, vLLM migration, structured outputs, and load-aware tuning.",
    skills: [
      "LangChain",
      "ChromaDB",
      "QLoRA",
      "LoRA",
      "ORPO",
      "vLLM",
      "Prefix caching",
      "BERTScore",
      "Prompt engineering",
    ],
    highlight:
      "Production tuning included 50-user load testing, >36 tok/s observed throughput, and memory-window controls for higher response stability.",
  },
  {
    id: "cap-02",
    title: "Computer Vision + Multimodal Retrieval",
    domain: "cv",
    summary:
      "Built benchmark harnesses for video-caption retrieval and model comparisons across language-vision stacks and indexing strategies.",
    skills: [
      "YOLO",
      "SSD",
      "DeepSORT",
      "OpenCV",
      "MediaPipe",
      "InternVideo2",
      "LanguageBind",
      "X-CLIP",
      "FAISS",
    ],
    highlight:
      "Evaluated 1,000 video-caption pairs, annotated 104 CCTV videos, and benchmarked FAISS behavior on 600,000 embeddings.",
  },
  {
    id: "cap-03",
    title: "C++ / VTK / Biomechanics Simulation",
    domain: "cpp3d",
    summary:
      "Delivered geometry-sensitive fixes in human-body repositioning workflows, including contour parallelization and metadata correction.",
    skills: [
      "C++",
      "CMake",
      "VTK",
      "Qt/QML",
      "LS-DYNA",
      "CGAL",
      "Mesh correction",
      "Linux build tooling",
    ],
    highlight:
      "Resolved critical model quality blockers including 45deg knee flexion stability and zero negative elements in IDM correction runs.",
  },
  {
    id: "cap-04",
    title: "Fast Full-Stack Delivery",
    domain: "fullstack",
    summary:
      "Built frontend and API products while integrating AI backends, crawler pipelines, and practical deployment/debugging loops.",
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
    ],
    highlight:
      "Shipped end-to-end features from wireframe content generation to social listening PoCs with iterative stakeholder feedback cycles.",
  },
];
