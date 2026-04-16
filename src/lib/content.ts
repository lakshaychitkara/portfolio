export { capabilityDomains } from "@/lib/content/domain-labels";
export { capabilities } from "@/lib/content/capabilities";
export { navItems } from "@/lib/content/navigation";
export { aboutDisplayConfig } from "@/lib/content/about";
export { education, foundationProjects } from "@/lib/content/education";
export { careerPhases } from "@/lib/content/journey";
export { evidenceMetrics, recruiterSignals, resumeHighlights } from "@/lib/content/metrics";
export { profile, privacyFlags, roleFocus } from "@/lib/content/profile";
export { projectCategories } from "@/lib/content/project-filters";
export { projects, getProjectBySlug } from "@/lib/content/projects";

import { careerPhases, getTimelineCoverageMonths } from "@/lib/content/journey";
import { evidenceMetrics } from "@/lib/content/metrics";
import { projects } from "@/lib/content/projects";

export const featuredProjects = projects.filter((project) => project.featured);

export const journeyHighlights = [
  { label: "Timeline Coverage", value: `${getTimelineCoverageMonths(careerPhases)} months` },
  { label: "Curated Milestones", value: `${careerPhases.length}` },
  { label: "Flagship Projects", value: `${featuredProjects.length}` },
  { label: "Evidence Points", value: `${evidenceMetrics.length}` },
];
