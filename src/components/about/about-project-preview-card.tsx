import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
import { EvidenceCard } from "@/components/ui/evidence-card";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { AboutProjectPreview } from "@/lib/types";

interface AboutProjectPreviewCardProps {
  project: AboutProjectPreview;
}

export function AboutProjectPreviewCard({ project }: AboutProjectPreviewCardProps) {
  return (
    <article className="about-card-narrative motion-lift overflow-hidden" data-about-card="flagship">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-2 px-5 pt-5">
          {project.domain.map((domain) => (
            <DomainBadge key={`${project.slug}-${domain}`} domain={domain} />
          ))}
        </div>
      </div>

      <ProjectVisual visual={project.visual} compact />

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase text-slate-400">
            {project.year}
          </span>
          <span className="font-mono text-xs uppercase text-slate-500">
            {project.readTimeMinutes} min read
          </span>
        </div>

        <h3 className="mt-2 text-xl font-semibold text-slate-100">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.impactSummary}</p>

        {project.keyMetric ? <EvidenceCard metric={project.keyMetric} compact className="mt-4" /> : null}

        <div className="mt-5">
          <ButtonLink href={`/projects/${project.slug}`} variant="primary" icon={<ArrowRight size={16} aria-hidden />}>
            Read Case Study
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
