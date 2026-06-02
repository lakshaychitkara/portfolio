import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { SectionBlock } from "@/components/ui/section-block";
import { projects } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Searchable portfolio of LLM systems, multimodal/OCR benchmarks, C++/3D simulation contributions, and full-stack architecture work.",
  alternates: {
    canonical: canonicalFor("/projects"),
  },
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="sr-only">Projects</h1>
      <SectionBlock
        id="projects-explorer"
        eyebrow="Case Studies"
        title="Project Evidence Explorer"
        description="Search, filter, and sort by domain, metrics, stack, and outcome evidence."
      >
        <ProjectsExplorer projects={projects} />
      </SectionBlock>
    </>
  );
}
