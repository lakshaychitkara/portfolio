import { projectCategories } from "@/lib/content/project-filters";
import type { Project } from "@/lib/types";

export { projectCategories };

const projectCatalog: Project[] = [
  {
    slug: "piper-repositioning-stability",
    title: "Piper Whole-Body Repositioning Stability",
    tagline:
      "Advanced FE-HBM repositioning across knee, hip, lumbar, thorax, and shoulder workflows with metadata correction, contour logic, diagnostics, and documentation automation.",
    year: "2026",
    domain: ["cpp3d"],
    priority: "flagship",
    hiringRank: 4,
    roleFitTags: ["C++ simulation", "Geometry diagnostics", "Research automation"],
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
    evidenceTrail: [
      {
        date: "Mar 26, 2026",
        milestone: "IDM negative-element correction",
        result: "Reduced corrected-run negative solid elements to zero.",
        source: "my_work.ods rows 124-127",
      },
      {
        date: "Apr 22, 2026",
        milestone: "GHBMC mesh-quality reduction",
        result: "Aligned detection and scaling scripts to reduce negative elements from roughly 6000 to 2.",
        source: "my_work.ods row 220",
      },
      {
        date: "May 25, 2026",
        milestone: "Headless FE-HBM documentation automation",
        result: "Built C++/Python report, PNG, and JSON evidence automation for repositioning sweeps.",
        source: "my_work.ods row 253",
      },
    ],
    labDemo: {
      kind: "piper",
      label: "Inspect 3D Proxy",
      href: "/lab#piper-proxy",
    },
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
    hiringRank: 2,
    roleFitTags: ["Multimodal retrieval", "OCR benchmarks", "Vector search"],
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
    evidenceTrail: [
      {
        date: "Feb 16-19, 2026",
        milestone: "Video-language model recall comparison",
        result: "Benchmarked InternVideo2, LanguageBind, MobileCLIP, X-CLIP, and annotated CCTV data.",
        source: "my_work.ods rows 104-107",
      },
      {
        date: "Mar 11-12, 2026",
        milestone: "FAISS index benchmark",
        result: "Compared Flat, HNSW, and IVF build/query/recall behavior across 600k embeddings.",
        source: "my_work.ods rows 111-112",
      },
      {
        date: "Mar 16-23, 2026",
        milestone: "Embedding and OCR evaluation",
        result: "Compared Gemini Embedding 2 plus OCR options including PaddleOCR, Tesseract, DeepSeek, GLM, and PaddleOCR-VL.",
        source: "my_work.ods rows 113-119",
      },
    ],
    featured: true,
    demoRoute: "/lab",
    labDemo: {
      kind: "cv",
      label: "Open Benchmark Lab",
      href: "/lab#cv-benchmarks",
    },
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
    hiringRank: 1,
    roleFitTags: ["LLM serving", "vLLM", "RAG systems"],
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
    evidenceTrail: [
      {
        date: "Nov 13-17, 2025",
        milestone: "Adapter, latency, and streaming stabilization",
        result: "Fixed adapter stacking, EOS latency, server errors, and background/streaming synchronization issues.",
        source: "my_work.ods rows 60-64",
      },
      {
        date: "Nov 19, 2025",
        milestone: "vLLM migration",
        result: "Moved the assistant from transformer serving to vLLM and stabilized performance.",
        source: "my_work.ods row 66",
      },
      {
        date: "Nov 25-26, 2025",
        milestone: "Prefix caching and load tests",
        result: "Enabled prefix caching, tested up to 50 users, and observed >36 tok/s in 10-user tests.",
        source: "my_work.ods rows 72-73",
      },
    ],
    featured: true,
    demoRoute: "/lab",
    labDemo: {
      kind: "rag",
      label: "Try RAG Explorer",
      href: "/lab#rag-performance",
    },
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
    hiringRank: 3,
    roleFitTags: ["FastAPI AI services", "Multilingual LLM", "Audio pipeline"],
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
    evidenceTrail: [
      {
        date: "May 4-5, 2026",
        milestone: "FastAPI summarization service",
        result: "Built summarization endpoints with PDF, JSON, and raw text parsing support.",
        source: "my_work.ods rows 232-233",
      },
      {
        date: "May 7, 2026",
        milestone: "Multilingual and CPU audio expansion",
        result: "Integrated Indic2 200M for five-language support and implemented CPU audio handling.",
        source: "my_work.ods row 235",
      },
      {
        date: "May 13-15, 2026",
        milestone: "Chatbot context and hallucination fixes",
        result: "Built Gemma/vLLM chatbot flow, switched models for quality, and added up to 40-turn context summarization.",
        source: "my_work.ods rows 241-243",
      },
    ],
    labDemo: {
      kind: "rag",
      label: "Open RAG Explorer",
      href: "/lab#rag-performance",
    },
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
    hiringRank: 6,
    roleFitTags: ["Crawler pipelines", "SEO prompts", "Full-stack AI"],
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
    evidenceTrail: [
      {
        date: "Nov 3-4, 2025",
        milestone: "Question inputs and crawler depth",
        result: "Added question-style inputs and web crawling with depth control up to 20 levels.",
        source: "my_work.ods rows 50-51",
      },
      {
        date: "Nov 5-7, 2025",
        milestone: "Scraping fixes and SEO keyword generation",
        result: "Fixed scraping issues, explored Figma API content behavior, and added SEO keyword generation.",
        source: "my_work.ods rows 52-54",
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
    hiringRank: 5,
    roleFitTags: ["Product PoC", "API integrations", "Signal dashboards"],
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
    evidenceTrail: [
      {
        date: "Mar 18, 2026",
        milestone: "Social listening PoC development",
        result: "Built the initial social listening app proof-of-concept while validating multimodal extraction choices.",
        source: "my_work.ods row 116",
      },
      {
        date: "Mar 19, 2026",
        milestone: "Instagram and YouTube ingestion",
        result: "Integrated platform extraction, improved UI after feedback, cleaned the branch, and pushed final delivery.",
        source: "my_work.ods row 117",
      },
    ],
    featured: false,
  },
];

export const projects: Project[] = [...projectCatalog].sort(
  (a, b) => a.hiringRank - b.hiringRank || Number(b.year) - Number(a.year),
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
