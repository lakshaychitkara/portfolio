import { profile } from "@/lib/content/profile";

export const resumeProfile = {
  name: profile.name,
  role: "Machine Learning Engineer | LLM Systems | Multimodal AI | C++ Simulation",
  location: "Rohtak, Haryana, India",
  phone: profile.phone,
  email: profile.email,
  portfolio: "Portfolio",
  linkedin: "LinkedIn",
  github: "GitHub",
  summary:
    "Machine Learning Engineer with internship-backed work across LLM serving, RAG systems, multimodal retrieval, OCR benchmarking, FastAPI AI services, and C++/VTK biomechanics simulation. Known for turning ambiguous research or prototype work into measurable engineering evidence: vLLM load tests, retrieval benchmarks, mesh-quality fixes, multilingual assistant paths, and headless documentation automation.",
};

export const resumeExperience = [
  {
    role: "Machine Learning Intern",
    company: "CreateBytes",
    period: "Sep 2025 - Present",
    location: "Remote / India",
    bullets: [
      "Migrated and stabilized a Chainlit legal assistant on vLLM with prefix caching, 5-turn memory, streaming synchronization fixes, and load testing up to 50 users.",
      "Benchmarked multimodal retrieval, captioning, OCR, and FAISS index strategies across 1,000 video-caption pairs, 104 manually annotated CCTV videos, and 600k embeddings.",
      "Implemented FastAPI document-assistant paths for PDF/JSON/text parsing, multilingual summarization, context summarization, and CPU audio processing; resolved OOM failures during profiling.",
      "Delivered C++/VTK/QML FE-HBM repositioning improvements for Piper, including metadata corrections, contour fixes, negative-element diagnostics, and headless report/image automation.",
    ],
  },
];

export const resumeEducation = [
  {
    institution: "Chitkara University",
    credential: "B.E. in Computer Science",
    score: "CGPA 8.87",
    period: "Oct 2022 - Jun 2026",
    location: "Patiala, Punjab",
  },
  {
    institution: "GMSSS, Mani Majra",
    credential: "Class 12 CBSE",
    score: "95.4%",
    period: "2020 - 2021",
    location: "Chandigarh",
  },
  {
    institution: "Blue Bird High School",
    credential: "Class 10 CBSE",
    score: "95.2%",
    period: "2018 - 2019",
    location: "Panchkula, Haryana",
  },
];

export const resumeSkills = [
  {
    label: "AI / ML",
    values: ["RAG", "LLM fine-tuning", "vLLM", "Prefix caching", "LangChain", "ChromaDB", "QLoRA", "LoRA", "BERTScore"],
  },
  {
    label: "Multimodal / CV",
    values: ["InternVideo2", "LanguageBind", "X-CLIP", "Gemini Embedding 2", "PaddleOCR-VL", "OpenCV", "YOLO", "MediaPipe", "FAISS"],
  },
  {
    label: "Programming",
    values: ["Python", "C++", "Java", "JavaScript", "TypeScript"],
  },
  {
    label: "Backend / Web",
    values: ["FastAPI", "React", "Node.js", "Express", "REST APIs", "Streamlit", "MongoDB", "MySQL"],
  },
  {
    label: "Simulation / Tools",
    values: ["VTK", "Qt/QML", "CMake", "LS-DYNA", "CGAL", "SWIG", "Linux", "Git/GitHub", "Postman"],
  },
  {
    label: "Core",
    values: ["Data Structures", "Algorithms", "OOP", "Operating Systems", "Computer Networks", "DBMS"],
  },
];

export const resumeProjects = [
  {
    title: "Legal Assistant Optimization on vLLM",
    stack: "vLLM, Chainlit, RAG, Prompt Engineering, Load Testing",
    bullets: [
      "Migrated inference to vLLM, enabled prefix caching, and fixed EOS latency plus background-stream synchronization issues.",
      "Validated parallel behavior up to 50 users and observed >36 tok/s in 10-user tests while improving memory handling and edge-case responses.",
    ],
  },
  {
    title: "Multimodal Retrieval and OCR Benchmark Suite",
    stack: "InternVideo2, LanguageBind, X-CLIP, Gemini Embedding 2, PaddleOCR-VL, FAISS",
    bullets: [
      "Benchmarked model families across 1,000 video-caption pairs and 104 annotated CCTV videos using recall, confidence, and caption-quality signals.",
      "Compared FAISS Flat/HNSW/IVF indexes at 600k embeddings and evaluated OCR stacks for scanned PDFs and vehicle/video datasets.",
    ],
  },
  {
    title: "STORMS Document and Multilingual Assistant",
    stack: "FastAPI, Qwen, Gemma, Indic2 200M, vLLM, Audio Processing",
    bullets: [
      "Built FastAPI service paths for PDF/JSON/text parsing, summarization, chatbot flows, multilingual support, and context summarization.",
      "Integrated Indic2 200M for five-language translation support and resolved CPU audio OOM failures during performance profiling.",
    ],
  },
  {
    title: "Piper FE-HBM Computational Biomechanics",
    stack: "C++, VTK, Qt/QML, CMake, LS-DYNA, CGAL, SWIG",
    bullets: [
      "Corrected metadata, contour, and timestep issues to extend stable knee flexion to 70 degrees and reduce GHBMC negative elements from roughly 6000 to 2.",
      "Built negative-volume visualization and a C++/Python headless documentation pipeline for repeatable FE-HBM evidence capture.",
    ],
  },
];

export const resumeAchievements = [
  "Class Representative at Chitkara University, coordinating communication and team activities across the class.",
  "Consistent DSA practice across LeetCode, GeeksforGeeks, W3Schools, and Coding Ninjas.",
  "Comfortable working across research-heavy ambiguity, product UI/API delivery, and low-level C++ debugging.",
];
