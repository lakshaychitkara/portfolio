import { projectCategories } from "@/lib/content/project-filters";
import type { Project } from "@/lib/types";

export { projectCategories };

export const projects: Project[] = [
  {
    slug: "piper-repositioning-stability",
    title: "Piper Whole-Body Repositioning Stability",
    tagline:
      "Advanced FE-HBM repositioning across knee, hip, lumbar, thorax, and shoulder workflows with metadata correction, contour logic, diagnostics, and documentation automation.",
    year: "2026",
    domain: ["cpp3d"],
    priority: "flagship",
    impactSummary:
      "Turned geometry-heavy repositioning failures into measurable mesh-quality wins and reusable engineering workflows.",
    proofBadges: ["C++ geometry", "Mesh diagnostics", "Research automation"],
    readTimeMinutes: 8,
    visual: {
      label: "Biomechanics Mesh",
      gradientFrom: "#0f766e",
      gradientTo: "#3f1d0b",
      caption: "Generated visualization of the repositioning, contour, and diagnostic workflow.",
      src: "/portfolio-assets/piper-biomechanics.png",
      alt: "Technical biomechanics mesh visualization with hip, knee, lumbar, contour, and diagnostic overlays.",
    },
    challenge:
      "High-flexion repositioning exposed intersecting contours, duplicate-node tearing, negative elements, model-axis mismatches, and platform-specific tooling gaps.",
    stack: ["C++", "VTK", "Qt/QML", "CMake", "LS-DYNA", "CGAL", "SWIG"],
    projectImpact: [
      {
        label: "Knee Flexion",
        value: "70deg stable",
        context: "Metadata and timestep updates extended stable THUMS/IDM knee flexion from earlier 45deg work.",
      },
      {
        label: "Negative Elements",
        value: "~6000 to 2",
        context: "Aligned detection scripts and scaling logic to reduce GHBMC negative elements dramatically.",
      },
      {
        label: "IDM Quality",
        value: "0 negatives",
        context: "Iterative validity checks removed negative solid elements while reducing penetrations.",
      },
      {
        label: "Automation",
        value: "Headless docs",
        context: "Built a C++/Python documentation system for FE-HBM repositioning evidence capture.",
      },
    ],
    architecture: [
      "Refactored contour parallelization toward object-oriented processing and reusable region definitions.",
      "Corrected lumbar, thorax, knee, and shoulder metadata to reduce skewed contours and bone penetration.",
      "Added VTK-based negative-volume visualization and whole-body repositioning UI controls in QML.",
      "Created path-flexible Linux build scripts and headless evidence-generation automation for paper workflows.",
    ],
    sections: [
      {
        heading: "Problem",
        body: "The repositioning pipeline had to preserve anatomical intent while preventing mesh tearing, contour intersections, and negative element regressions.",
      },
      {
        heading: "Approach",
        body: "I combined metadata correction, VTK cutter changes, contour-region rearchitecture, timestep tuning, and validation scripts so every geometry fix could be checked against mesh quality.",
      },
      {
        heading: "Result",
        body: "The work improved knee, lumbar, thorax, and shoulder workflows while producing cleaner diagnostics, stronger automation, and paper-ready evidence.",
      },
    ],
    timeline: [
      {
        heading: "Mar 2026",
        body: "Resolved IDM negative elements to zero and built iterative penetration correction checks.",
      },
      {
        heading: "Apr 2026",
        body: "Fixed lumbar/thorax metadata, VTK cutter intersections, and reduced GHBMC negative elements from roughly 6000 to 2.",
      },
      {
        heading: "May-Jun 2026",
        body: "Advanced whole-body UI, negative-element visualization, headless docs, and paper image/report generation.",
      },
    ],
    featured: true,
  },
  {
    slug: "multimodal-video-retrieval-benchmarks",
    title: "Multimodal Retrieval and OCR Benchmark Suite",
    tagline:
      "Benchmarked video retrieval, captioning, embedding indexes, OCR stacks, and color-detection models to choose production-fit multimodal architecture.",
    year: "2026",
    domain: ["cv", "llm"],
    priority: "flagship",
    impactSummary:
      "Replaced model guesswork with measured recall, confidence, latency, OCR quality, and index trade-off evidence.",
    proofBadges: ["Scale benchmarks", "Model comparison", "Retrieval validation"],
    readTimeMinutes: 7,
    visual: {
      label: "Benchmark Matrix",
      gradientFrom: "#059669",
      gradientTo: "#3f1d0b",
      caption: "Generated visualization of video, embedding, OCR, and index benchmark signals.",
      src: "/portfolio-assets/multimodal-benchmark.png",
      alt: "Technical dashboard with video frames, embedding clusters, OCR tiles, and benchmark charts.",
    },
    challenge:
      "Video retrieval, captioning, OCR, and index behavior varied heavily by dataset and cost profile, making production decisions risky without direct measurement.",
    stack: [
      "InternVideo2",
      "LanguageBind",
      "X-CLIP",
      "Gemini Embedding 2",
      "PaddleOCR-VL",
      "FAISS",
      "PyTorch",
    ],
    projectImpact: [
      {
        label: "Eval Coverage",
        value: "1,000 pairs",
        context: "Video-caption benchmark set prepared and used for recall-based comparison.",
      },
      {
        label: "Annotated Set",
        value: "104 CCTV videos",
        context: "Manual annotation enabled confidence and recall analysis in target-like footage.",
      },
      {
        label: "Index Scale",
        value: "600k embeddings",
        context: "Flat, HNSW, and IVF build/query/recall trade-offs benchmarked at high scale.",
      },
      {
        label: "OCR Coverage",
        value: "4 stacks",
        context: "Compared Tesseract, DeepSeek-OCR, GLM-OCR, and PaddleOCR/PaddleOCR-VL paths.",
      },
    ],
    architecture: [
      "Dataset prep layer for public, CCTV, Kaggle vehicle, and scanned-document sources.",
      "Model runner comparisons across InternVideo, LanguageBind, X-CLIP, Gemini Embedding 2, Qwen, BLIP, and OCR stacks.",
      "FAISS harness for Flat, HNSW, and IVF build/query/recall trade-off analysis at 600k embeddings.",
      "Standalone encoder and query embedding scripts prepared for downstream video-retrieval integration.",
    ],
    sections: [
      {
        heading: "Problem",
        body: "The team needed model and retrieval choices that were defensible across real video, CCTV, OCR, and cost constraints.",
      },
      {
        heading: "Approach",
        body: "I compared recall metrics, confidence scores, caption quality, OCR extraction quality, inference time, and embedding-index behavior instead of optimizing one metric in isolation.",
      },
      {
        heading: "Result",
        body: "The benchmark suite clarified model/index fit and gave the team reusable scripts for future retrieval and OCR decisions.",
      },
    ],
    timeline: [
      {
        heading: "Feb 2026",
        body: "Benchmarked InternVideo2, LanguageBind variants, MobileCLIP, X-CLIP, and manually annotated CCTV data.",
      },
      {
        heading: "Mar 2026",
        body: "Added Gemini Embedding 2, FAISS 600k index tests, OCR model comparisons, and InternVL2.5 color validation.",
      },
    ],
    featured: true,
    demoRoute: "/lab",
    cta: {
      label: "Open Benchmark Lab",
      href: "/lab",
    },
  },
  {
    slug: "legal-assistant-vllm-optimization",
    title: "Legal Assistant Optimization on vLLM",
    tagline:
      "Stabilized a legal-domain assistant by migrating to vLLM, enabling prefix caching, and tuning memory plus streaming behavior under load.",
    year: "2025",
    domain: ["llm", "fullstack"],
    priority: "flagship",
    impactSummary:
      "Improved concurrency-heavy assistant behavior with lower latency variance and stronger evidence grounding.",
    proofBadges: ["Load-tested", "Latency-tuned", "Production patterns"],
    readTimeMinutes: 6,
    visual: {
      label: "LLM Serving Graph",
      gradientFrom: "#0f766e",
      gradientTo: "#111827",
      caption: "Generated visualization of routing, caching, streaming, and memory-window behavior.",
      src: "/portfolio-assets/llm-systems.png",
      alt: "Technical LLM serving architecture with routing paths, cache blocks, streaming traces, and metric panels.",
    },
    challenge:
      "Latency spikes, memory side effects, hallucination behavior, and thread synchronization issues reduced reliability in concurrent chatbot sessions.",
    stack: ["vLLM", "Chainlit", "Prompt engineering", "FastAPI", "Load testing", "Structured outputs"],
    projectImpact: [
      {
        label: "Load Tested",
        value: "50 users",
        context: "Parallel traffic benchmark executed after migration and caching updates.",
      },
      {
        label: "Token Throughput",
        value: ">36 tok/s",
        context: "Observed in 10-user parallel test runs with stabilized generation.",
      },
      {
        label: "Memory Strategy",
        value: "5-turn window",
        context: "Sliding memory implementation reduced context drift in follow-up queries.",
      },
    ],
    architecture: [
      "Inference path migrated from transformer-serving setup to vLLM runtime.",
      "Prefix caching enabled for repeated legal context acceleration.",
      "Background generation and streaming synchronization bugs identified and fixed.",
      "Prompt/classification behavior updated for legal-basic, legal-complex, and nonsensical input scenarios.",
    ],
    sections: [
      {
        heading: "Problem",
        body: "The assistant needed to improve speed without letting memory, streaming, or grounding quality drift under concurrent use.",
      },
      {
        heading: "Approach",
        body: "I fixed adapter stacking, EOS-token latency, synchronization faults, memory side effects, and prompt behavior while introducing prefix caching.",
      },
      {
        heading: "Result",
        body: "The system handled higher parallel traffic with stronger throughput, more stable generation, and clearer edge-case behavior.",
      },
    ],
    timeline: [
      {
        heading: "Nov 2025",
        body: "Migrated to vLLM, enabled prefix caching, fixed latency/threading issues, and tested up to 50 users.",
      },
    ],
    featured: true,
    demoRoute: "/lab",
    cta: {
      label: "Try RAG Explorer",
      href: "/lab",
    },
  },
  {
    slug: "storms-document-assistant",
    title: "STORMS Document and Multilingual Assistant",
    tagline:
      "Built FastAPI summarization, chatbot, multilingual, and audio-processing paths while profiling CPU latency and stabilizing model behavior.",
    year: "2026",
    domain: ["llm", "fullstack"],
    priority: "flagship",
    impactSummary:
      "Moved a document assistant from service prototype toward multilingual, context-aware, CPU-conscious product behavior.",
    proofBadges: ["FastAPI service", "Multilingual", "Audio pipeline"],
    readTimeMinutes: 5,
    visual: {
      label: "Assistant Pipeline",
      gradientFrom: "#0f766e",
      gradientTo: "#3f1d0b",
      caption: "Generated visualization of service routing, context summarization, audio, and model orchestration.",
      src: "/portfolio-assets/llm-systems.png",
      alt: "Technical assistant pipeline with service nodes, cache blocks, audio traces, and model monitoring panels.",
    },
    challenge:
      "The assistant needed document parsing, summarization, multilingual behavior, and audio support while staying practical on CPU-constrained workflows.",
    stack: ["FastAPI", "Qwen", "Gemma", "Indic2 200M", "Prompt optimization", "Audio processing"],
    projectImpact: [
      {
        label: "Service Layer",
        value: "FastAPI",
        context: "Document summarization and parsing service paths were implemented and benchmarked.",
      },
      {
        label: "Model Tracks",
        value: "Qwen/Gemma",
        context: "Provisioned Qwen and later built chatbot flows using Gemma 4 31B before switching models for quality.",
      },
      {
        label: "Language Support",
        value: "Indic2 200M",
        context: "Integrated Indic2 200M for multilingual expansion work.",
      },
      {
        label: "Stability",
        value: "OOM fixed",
        context: "Resolved CPU audio out-of-memory failures and profiled the pipeline.",
      },
    ],
    architecture: [
      "FastAPI service paths added for document summarization, parsing, and prompt-controlled responses.",
      "Quantized prompt workflows optimized while testing CPU latency and model behavior.",
      "Multilingual support added through Indic2 200M integration.",
      "Context summarization added to improve chatbot continuity without overloading the conversation window.",
    ],
    sections: [
      {
        heading: "Problem",
        body: "The product needed to summarize documents, support broader language coverage, and handle audio processing without assuming abundant GPU resources.",
      },
      {
        heading: "Approach",
        body: "I implemented FastAPI service flows, provisioned and evaluated model options, optimized prompts, added Indic2 multilingual support, and fixed CPU audio OOM issues.",
      },
      {
        heading: "Result",
        body: "The assistant became more product-ready: documented, benchmarked, multilingual-aware, and more stable under practical runtime constraints.",
      },
    ],
    timeline: [
      {
        heading: "May 2026",
        body: "Built FastAPI summarization, expanded parsing, provisioned Qwen, added Indic2, fixed audio OOM, and added context summarization.",
      },
    ],
    featured: true,
  },
  {
    slug: "seo-wireframe-content-generator",
    title: "SEO Wireframe Content Generator",
    tagline:
      "Improved a content-generation pipeline with depth-controlled crawling, SEO keyword generation, Figma API learning, and cleaner retrieval prompts.",
    year: "2025",
    domain: ["fullstack", "llm"],
    priority: "notable",
    impactSummary:
      "Increased content relevance and controllability with SEO-aware retrieval and depth-controlled crawl behavior.",
    proofBadges: ["SEO-aware", "Crawler resilience", "Prompt iteration"],
    readTimeMinutes: 5,
    visual: {
      label: "Content Pipeline",
      gradientFrom: "#d97706",
      gradientTo: "#111827",
      caption: "Pipeline from keyword intent to crawl, scrape, prompt, and generated content.",
    },
    challenge:
      "Content quality and source relevance were inconsistent due to weak retrieval signals, crawler instability, and unstructured output handling.",
    stack: ["Python", "Web crawling", "SEO keyword generation", "Prompt engineering", "JSON outputs", "Figma API"],
    projectImpact: [
      {
        label: "Crawler Depth",
        value: "20 levels",
        context: "Depth-limited crawling implemented to improve breadth while controlling crawl behavior.",
      },
      {
        label: "Content Variants",
        value: "9 reels",
        context: "Prompt iteration pipeline produced targeted content variants with feedback-driven improvement.",
      },
      {
        label: "Input Upgrade",
        value: "Question-based",
        context: "Wireframe generator updated to accept question-form inputs for sharper retrieval intent.",
      },
    ],
    architecture: [
      "SEO keyword module added before web search and scraping stages.",
      "Crawl depth control and failure handling embedded into extraction logic.",
      "Prompt templates adjusted for content format consistency and feedback loops.",
      "Figma API behavior explored for wireframe content manipulation.",
    ],
    sections: [
      {
        heading: "Problem",
        body: "The generator needed sharper source selection, better content quality, and a cleaner stakeholder feedback loop.",
      },
      {
        heading: "Approach",
        body: "I added question-based inputs, SEO-aware retrieval, depth-controlled crawling, scraping fixes, and prompt quality improvements.",
      },
      {
        heading: "Result",
        body: "The pipeline became more controllable and produced stronger draft quality for downstream review.",
      },
    ],
    featured: false,
  },
  {
    slug: "social-listening-poc",
    title: "Social Listening Product PoC",
    tagline:
      "Delivered an end-to-end social listening proof-of-concept combining platform ingestion, UI iteration, latency review, and stakeholder feedback.",
    year: "2026",
    domain: ["fullstack", "llm"],
    priority: "notable",
    impactSummary:
      "Delivered a demo-ready cross-platform listening workflow with iterative UI and ingestion improvements.",
    proofBadges: ["PoC delivery", "API integrations", "Feedback loop"],
    readTimeMinutes: 4,
    visual: {
      label: "Signal Dashboard",
      gradientFrom: "#0f766e",
      gradientTo: "#3f1d0b",
      caption: "Signal aggregation flow from Instagram and YouTube ingestion endpoints.",
      src: "/portfolio-assets/multimodal-benchmark.png",
      alt: "Technical signal dashboard with source panels, charts, and clustering overlays.",
    },
    challenge:
      "The team needed a usable PoC quickly while integrating external sources and incorporating iterative feedback without destabilizing the product flow.",
    stack: ["React", "Node.js", "API ingestion", "YouTube API", "Instagram API", "Prompt refinement"],
    projectImpact: [
      {
        label: "Source Coverage",
        value: "2 APIs",
        context: "Integrated both Instagram and YouTube source extraction paths.",
      },
      {
        label: "PoC Delivery",
        value: "1 end-to-end",
        context: "Completed reviewed PoC branch with cleanup and rerun validation.",
      },
      {
        label: "Review Cycles",
        value: "2+",
        context: "Multiple review rounds incorporated before final push.",
      },
    ],
    architecture: [
      "Source extractors added for two social platforms.",
      "UI flow iterated after review feedback.",
      "Latency observations captured and shared for feasibility decisions.",
      "Code cleanup and rerun verification performed before delivery.",
    ],
    sections: [
      {
        heading: "Problem",
        body: "The PoC needed to make social signals explorable quickly while keeping ingestion and UI behavior stable enough for demo review.",
      },
      {
        heading: "Approach",
        body: "I built ingestion plus UI flow, integrated platform APIs, incorporated review feedback, cleaned the branch, and reran the app locally.",
      },
      {
        heading: "Result",
        body: "The PoC became demo-ready and gave stakeholders a concrete baseline for social listening product discussions.",
      },
    ],
    timeline: [
      {
        heading: "Mar 2026",
        body: "Completed API extraction, UI improvements, cleanup, rerun validation, and latency sharing.",
      },
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
