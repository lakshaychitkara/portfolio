import { ArrowRight, FlaskConical } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
import { EvidenceCard } from "@/components/ui/evidence-card";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card-surface motion-lift grid overflow-hidden transition hover:-translate-y-1 hover:border-amber-300/35 lg:grid-cols-[0.85fr_1.15fr]">
      <ProjectVisual visual={project.visual} compact />

      <div className="flex flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.domain.map((domain) => (
            <DomainBadge key={`${project.slug}-${domain}`} domain={domain} />
          ))}
          <span className="chip ml-auto">{project.priority}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase text-slate-400">
            {project.year}
          </span>
          <span className="font-mono text-xs uppercase text-slate-500">
            {project.readTimeMinutes} min read
          </span>
        </div>

        <h3 className="mt-2 text-2xl font-semibold text-slate-100">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.impactSummary}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.tagline}</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {project.projectImpact.slice(0, 2).map((metric) => (
            <EvidenceCard key={`${project.slug}-${metric.label}`} metric={metric} compact />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.proofBadges.map((badge) => (
            <span key={`${project.slug}-${badge}`} className="chip">
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={`/projects/${project.slug}`} variant="primary" icon={<ArrowRight size={16} aria-hidden />}>
            Read Case Study
          </ButtonLink>
          {project.cta ? (
            <ButtonLink href={project.cta.href} variant="secondary" icon={<FlaskConical size={16} aria-hidden />}>
              {project.cta.label}
            </ButtonLink>
          ) : project.demoRoute ? (
            <ButtonLink href={project.demoRoute} variant="secondary" icon={<FlaskConical size={16} aria-hidden />}>
              Open Demo
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
