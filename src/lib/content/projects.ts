import { projectCategories } from "@/lib/content/project-filters";
import type { Project } from "@/lib/types";

export { projectCategories };

export const projects: Project[] = [
  {
    slug: "legal-assistant-vllm-optimization",
    title: "Legal Assistant Optimization on vLLM",
    tagline:
      "Stabilized a legal-domain assistant by migrating to vLLM, enabling prefix caching, and tuning memory + streaming behavior under load.",
    year: "2025",
    domain: ["llm", "fullstack"],
    priority: "flagship",
    impactSummary:
      "Stabilized concurrency-heavy legal assistant behavior with lower latency variance and stronger evidence grounding.",
    proofBadges: ["Load-tested", "Latency-tuned", "Production patterns"],
    readTimeMinutes: 6,
    visual: {
      label: "Inference Graph",
      gradientFrom: "#0ea5e9",
      gradientTo: "#0f172a",
      caption: "Routing and caching graph used in the optimized inference path.",
    },
    challenge:
      "Latency spikes, memory side effects, and thread synchronization issues were reducing reliability in concurrent chatbot sessions.",
    stack: [
      "vLLM",
      "Chainlit",
      "Prompt engineering",
      "FastAPI",
      "Load testing",
      "Structured outputs",
    ],
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
      "Inference path migrated from transformer-serving setup to vLLM runtime",
      "Prefix caching enabled for repeated context acceleration",
      "Concurrency issues fixed between background generation and stream emission",
      "Prompt/classification layer updated for legal-basic and legal-complex scenarios",
    ],
    sections: [
      {
        heading: "Context",
        body: "The core problem was not only latency but consistency under concurrency. Speed and answer quality had to improve together.",
      },
      {
        heading: "Implementation",
        body: "I fixed adapter stacking, EOS-token latency, threading sync faults, and memory side effects while introducing prefix caching and more deterministic prompt behavior.",
      },
      {
        heading: "Result",
        body: "The assistant handled significantly higher parallel traffic with better throughput and stronger response stability.",
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
    slug: "seo-wireframe-content-generator",
    title: "SEO Wireframe Content Generator",
    tagline:
      "Improved a content-generation pipeline with depth-controlled crawling, SEO keyword generation, and cleaner retrieval prompts.",
    year: "2025",
    domain: ["fullstack", "llm"],
    priority: "notable",
    impactSummary:
      "Increased content relevance and controllability with SEO-aware retrieval and depth-controlled crawl behavior.",
    proofBadges: ["SEO-aware", "Crawler resilience", "Prompt iteration"],
    readTimeMinutes: 5,
    visual: {
      label: "Content Pipeline",
      gradientFrom: "#f59e0b",
      gradientTo: "#1e293b",
      caption: "Multi-step generation flow from keyword extraction to final draft output.",
    },
    challenge:
      "Content quality and source relevance were inconsistent due to weak retrieval signals and crawler instability.",
    stack: [
      "Python",
      "Web crawling",
      "SEO keyword generation",
      "Prompt engineering",
      "JSON outputs",
      "Figma API",
    ],
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
      "SEO keyword module added before web search and scrape stages",
      "Crawl depth control and failure handling embedded into extraction logic",
      "Prompt templates adjusted for content format consistency",
      "Storage and debugging workflow improved for generated artifacts",
    ],
    sections: [
      {
        heading: "Context",
        body: "The objective was to make generated content more relevant, faster to validate, and easier to iterate with stakeholders.",
      },
      {
        heading: "Implementation",
        body: "I added question-based prompting, SEO-aware retrieval, depth-controlled crawling, and quality-focused prompt updates.",
      },
      {
        heading: "Result",
        body: "The pipeline became more controllable and produced consistently better draft quality for downstream review.",
      },
    ],
    featured: true,
  },
  {
    slug: "piper-repositioning-stability",
    title: "Piper Repositioning Stability Engineering",
    tagline:
      "Resolved geometry and contour failures in biomechanical repositioning pipelines with metadata correction and dynamic axis logic.",
    year: "2026",
    domain: ["cpp3d"],
    priority: "flagship",
    impactSummary:
      "Removed geometric failure modes and improved model stability in posture-sensitive repositioning simulations.",
    proofBadges: ["Geometry fixes", "Mesh quality", "Pipeline consistency"],
    readTimeMinutes: 7,
    visual: {
      label: "Knee Axis Model",
      gradientFrom: "#fb923c",
      gradientTo: "#0f172a",
      caption: "Axis and contour overlays used during stability diagnostics.",
    },
    challenge:
      "Bone intersections, contour tearing, and negative elements blocked reliable posture-specific model generation.",
    stack: ["C++", "VTK", "Qt/QML", "CMake", "LS-DYNA", "CGAL"],
    projectImpact: [
      {
        label: "Flexion Quality",
        value: "45deg stable",
        context: "Left-knee contour intersections removed up to 45deg flexion after tanh/sine strategy refinements.",
      },
      {
        label: "Negative Elements",
        value: "0 (IDM case)",
        context: "Iterative correction achieved zero negatives while reducing penetrations in corrected workflow.",
      },
      {
        label: "Pipeline Consistency",
        value: "Left/Right unified",
        context: "Knee repositioning logic was synchronized across both pipelines to reduce divergence.",
      },
    ],
    architecture: [
      "Dynamic FE-axis logic implemented and compared against correction-based methods",
      "Contour parallelization functions reworked for moving-axis projections",
      "Metadata endpoint and landmark corrections applied to eliminate axis mismatch",
      "Build tooling hardened with path validation and reproducible shell scripts",
    ],
    sections: [
      {
        heading: "Context",
        body: "The work sat in a high-stakes loop where geometric correctness and mesh quality had to improve without introducing new deformation artifacts.",
      },
      {
        heading: "Implementation",
        body: "I iterated across dynamic-axis methods, correction functions, contour smoothing strategies, and metadata fixes until persistent blockers were isolated and removed.",
      },
      {
        heading: "Result",
        body: "Model stability improved materially in key knee-repositioning scenarios, and the pipeline became easier to validate and reproduce across environments.",
      },
    ],
    featured: true,
  },
  {
    slug: "multimodal-video-retrieval-benchmarks",
    title: "Multimodal Video Retrieval Benchmark Suite",
    tagline:
      "Benchmarked retrieval and captioning quality across language-vision models and index strategies for production decision-making.",
    year: "2026",
    domain: ["cv", "llm"],
    priority: "flagship",
    impactSummary:
      "Established benchmark-backed model/index choices for production retrieval and caption quality decisions.",
    proofBadges: ["Scale benchmarks", "Model comparison", "Retrieval validation"],
    readTimeMinutes: 6,
    visual: {
      label: "Benchmark Matrix",
      gradientFrom: "#10b981",
      gradientTo: "#0f172a",
      caption: "Recall/latency matrix across multimodal model families and FAISS index types.",
    },
    challenge:
      "Model quality varied heavily by dataset and retrieval index choice, making deployment decisions unclear.",
    stack: [
      "InternVideo2",
      "LanguageBind",
      "X-CLIP",
      "Gemini Embedding 2",
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
    ],
    architecture: [
      "Dataset prep layer for public and custom CCTV sources",
      "Model runner abstraction for retrieval + captioning families",
      "FAISS benchmarking harness for index strategy comparison",
      "Standalone query/embed scripts for production integration planning",
    ],
    sections: [
      {
        heading: "Context",
        body: "The objective was to choose model/index combinations based on measured behavior, not assumptions.",
      },
      {
        heading: "Implementation",
        body: "I benchmarked multiple model families and index types, then compared confidence, recall, and latency trade-offs across datasets.",
      },
      {
        heading: "Result",
        body: "The team gained a clearer path for retrieval architecture decisions with defensible benchmark evidence.",
      },
    ],
    featured: true,
    demoRoute: "/lab",
    cta: {
      label: "Open CV Benchmark Lab",
      href: "/lab",
    },
  },
  {
    slug: "social-listening-poc",
    title: "Social Listening Product PoC",
    tagline:
      "Delivered an end-to-end social listening proof-of-concept combining platform ingestion, UI iteration, and latency review loops.",
    year: "2026",
    domain: ["fullstack", "llm"],
    priority: "notable",
    impactSummary:
      "Delivered a demo-ready cross-platform listening workflow with iterative UI and ingestion improvements.",
    proofBadges: ["PoC delivery", "API integrations", "Feedback loop"],
    readTimeMinutes: 4,
    visual: {
      label: "Signal Dashboard",
      gradientFrom: "#22d3ee",
      gradientTo: "#1e293b",
      caption: "Signal aggregation UI from Instagram and YouTube ingestion endpoints.",
    },
    challenge:
      "Needed a usable PoC quickly while integrating external sources and incorporating iterative feedback without destabilizing flow.",
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
        label: "Feedback Cycles",
        value: "2+",
        context: "Multiple review rounds incorporated before final push.",
      },
    ],
    architecture: [
      "Source extractors added for two social platforms",
      "UI flow iterated after review feedback",
      "Latency observations captured and shared for feasibility decisions",
      "Code cleanup and rerun verification performed before delivery",
    ],
    sections: [
      {
        heading: "Context",
        body: "This PoC prioritized fast iteration with enough engineering rigor to support meaningful product evaluation.",
      },
      {
        heading: "Implementation",
        body: "I built ingestion + UI flow, applied review feedback cycles, and validated runtime behavior after branch sync.",
      },
      {
        heading: "Result",
        body: "Delivered a functional social listening baseline that was immediately demo-ready and extendable.",
      },
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
