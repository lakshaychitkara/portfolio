import type { AboutDisplayConfig } from "@/lib/types";

export const aboutDisplayConfig: AboutDisplayConfig = {
  sectionOrder: [
    "evidence",
    "flagship-work",
    "capabilities",
    "milestones",
    "foundations",
    "recruiter-signals",
  ],
  limits: {
    heroHighlights: 3,
    evidenceMetrics: 6,
    featuredProjects: 4,
    capabilities: 3,
    careerPhases: 4,
    foundationProjects: 2,
    recruiterSignals: 2,
  },
  ctaPriority: ["projects", "journey", "resume"],
};
