import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { AboutProjectPreview } from "@/lib/types";

interface AboutProjectPreviewCardProps {
  project: AboutProjectPreview;
}

export function AboutProjectPreviewCard({ project }: AboutProjectPreviewCardProps) {
  return (
    <article className="about-card-narrative motion-lift p-5 md:p-6" data-about-card="flagship">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {project.domain.map((domain) => (
          <DomainBadge key={`${project.slug}-${domain}`} domain={domain} />
        ))}
      </div>

      <ProjectVisual visual={project.visual} compact />

      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
          {project.year}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-slate-500">
          {project.readTimeMinutes} min read
        </span>
      </div>

      <h3 className="mt-2 text-xl font-semibold text-slate-100">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.impactSummary}</p>

      {project.keyMetric ? (
        <div className="about-card-metric mt-4 px-3 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-300">
            {project.keyMetric.label}
          </p>
          <p className="text-base font-semibold text-cyan-200">{project.keyMetric.value}</p>
          <p className="text-xs text-slate-400">{project.keyMetric.context}</p>
        </div>
      ) : null}

      <div className="mt-5">
        <ButtonLink href={`/projects/${project.slug}`} variant="primary">
          Read Case Study
        </ButtonLink>
      </div>
    </article>
  );
}
