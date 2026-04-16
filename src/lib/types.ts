export type CapabilityDomain = "fullstack" | "llm" | "cv" | "cpp3d";

export interface Capability {
  id: string;
  title: string;
  domain: CapabilityDomain;
  summary: string;
  skills: string[];
  highlight: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  credential: string;
  score: string;
  period: string;
  location: string;
}

export interface EvidenceMetric {
  id: string;
  label: string;
  value: string;
  context: string;
}

export interface ProjectEvidence {
  label: string;
  value: string;
  context: string;
}

export interface CareerPhase {
  id: string;
  phase: string;
  period: string;
  title: string;
  focus: string;
  summary: string;
  tools: string[];
  outcomes: string[];
  projectImpact: ProjectEvidence[];
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface ProjectVisual {
  label: string;
  gradientFrom: string;
  gradientTo: string;
  caption: string;
}

export interface ProjectCta {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  domain: CapabilityDomain[];
  priority: "flagship" | "notable";
  impactSummary: string;
  proofBadges: string[];
  readTimeMinutes: number;
  visual: ProjectVisual;
  challenge: string;
  stack: string[];
  projectImpact: ProjectEvidence[];
  architecture: string[];
  sections: ProjectSection[];
  featured: boolean;
  demoRoute?: string;
  cta?: ProjectCta;
}

export interface AboutProjectPreview {
  slug: string;
  title: string;
  year: string;
  domain: CapabilityDomain[];
  impactSummary: string;
  readTimeMinutes: number;
  visual: ProjectVisual;
  keyMetric?: ProjectEvidence;
}

export interface FoundationProject {
  id: string;
  title: string;
  stack: string[];
  summary: string;
}

export interface PrivacyConfig {
  showPhone: boolean;
  showLocationTag: boolean;
}

export interface NavItem {
  href: string;
  label: string;
}

export type AboutSectionId =
  | "evidence"
  | "flagship-work"
  | "capabilities"
  | "milestones"
  | "foundations"
  | "recruiter-signals";

export type AboutCtaKey = "projects" | "journey" | "resume" | "contact";

export interface AboutDisplayConfig {
  sectionOrder: AboutSectionId[];
  limits: {
    heroHighlights: number;
    evidenceMetrics: number;
    featuredProjects: number;
    capabilities: number;
    careerPhases: number;
    foundationProjects: number;
    recruiterSignals: number;
  };
  ctaPriority: AboutCtaKey[];
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface RagRequest {
  query: string;
  mode: "baseline" | "optimized";
}

export interface RagResponse {
  mode: "baseline" | "optimized";
  answer: string;
  retrieval: Array<{
    source: string;
    relevance: number;
    snippet: string;
  }>;
  metrics: {
    latencyMs: number;
    tokensPerSecond: number;
    groundedness: number;
  };
}

export interface CvBenchmarkRequest {
  clip: string;
  modelFamily: "baseline" | "multimodal";
}

export interface CvBenchmarkResponse {
  clip: string;
  modelFamily: "baseline" | "multimodal";
  captions: Array<{
    model: string;
    caption: string;
    recall: number;
    precision: number;
  }>;
}

export interface BenchmarkResponse {
  scenario: string;
  baseline: {
    latencyMs: number;
    throughput: number;
    groundedness: number;
  };
  optimized: {
    latencyMs: number;
    throughput: number;
    groundedness: number;
  };
}

export interface ContactResponse {
  ok: boolean;
  message: string;
}

export interface ApiErrorResponse {
  error?:
    | string
    | {
        code: string;
        message: string;
        details?: unknown;
      };
  message?: string;
}

export interface UiSettings {
  reducedMotion: boolean;
  lowPowerMode: boolean;
}

export type ApiMode = "same-origin" | "direct" | "auto";

export interface ApiTargetDiagnostics {
  mode: ApiMode;
  configuredBaseUrl: string | null;
  effectiveBaseUrl: string | null;
  usesSameOrigin: boolean;
  warning: string | null;
}

export interface FetchJsonOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  dedupeKey?: string;
}
