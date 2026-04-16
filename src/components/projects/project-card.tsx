import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card-surface motion-lift p-5 shadow-[0_20px_50px_-20px_rgba(8,145,178,0.55)] transition hover:-translate-y-1 hover:border-cyan-300/40 md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {project.domain.map((domain) => (
          <DomainBadge key={`${project.slug}-${domain}`} domain={domain} />
        ))}
        <span className="chip ml-auto">{project.priority}</span>
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
      <p className="mt-1 text-sm text-slate-300">{project.impactSummary}</p>
      <p className="mt-2 text-sm text-slate-400">{project.tagline}</p>

      <div className="mt-4 grid gap-2">
        {project.projectImpact.slice(0, 2).map((metric) => (
          <div
            key={`${project.slug}-${metric.label}`}
            className="card-surface-muted px-3 py-2"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
              {metric.label}
            </p>
            <p className="text-base font-semibold text-cyan-200">{metric.value}</p>
            <p className="text-xs text-slate-400">{metric.context}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.proofBadges.map((badge) => (
          <span key={`${project.slug}-${badge}`} className="chip">
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={`/projects/${project.slug}`} variant="primary">
          Read Case Study
        </ButtonLink>
        {project.cta ? (
          <ButtonLink href={project.cta.href} variant="secondary">
            {project.cta.label}
          </ButtonLink>
        ) : project.demoRoute ? (
          <ButtonLink href={project.demoRoute} variant="secondary">
            Open Demo
          </ButtonLink>
        ) : null}
      </div>
    </article>
  );
}
