import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import { getProjectBySlug, projects } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      alternates: {
        canonical: canonicalFor("/projects"),
      },
    };
  }

  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: canonicalFor(`/projects/${project.slug}`),
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-7">
      <header className="card-surface p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.domain.map((domain) => (
            <DomainBadge key={`${project.slug}-${domain}`} domain={domain} />
          ))}
          <span className="chip ml-auto">{project.priority}</span>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
            {project.year}
          </span>
        </div>

        <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">{project.title}</h1>
        <p className="mt-2 text-base font-medium text-cyan-100">{project.impactSummary}</p>
        <p className="mt-3 max-w-4xl text-base text-slate-300 md:text-lg">{project.tagline}</p>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <ProjectVisual visual={project.visual} />
          <div className="card-surface-muted p-4">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
              Quick Signals
            </p>
            <p className="mt-2 text-sm text-slate-300">Read time: {project.readTimeMinutes} minutes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.proofBadges.map((badge) => (
                <span key={`${project.slug}-proof-${badge}`} className="chip">
                  {badge}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">{project.visual.caption}</p>
          </div>
        </div>

        <div className="mt-5 card-surface-muted p-4">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400">Challenge</p>
          <p className="mt-2 text-sm text-slate-200">{project.challenge}</p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Project impact">
        {project.projectImpact.map((metric) => (
          <div key={metric.label} className="card-surface p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-cyan-200">{metric.value}</p>
            <p className="mt-1 text-xs text-slate-400">{metric.context}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2" aria-label="Architecture and stack">
        <div className="card-surface p-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-300">Architecture</p>
          <ul className="mt-3 space-y-3 text-sm text-slate-200">
            {project.architecture.map((line) => (
              <li key={line} className="card-surface-muted px-3 py-2">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-300">Stack</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tool) => (
              <span key={tool} className="chip">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {project.sections.map((section) => (
          <div key={section.heading} className="card-surface p-4">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
              {section.heading}
            </p>
            <p className="mt-2 text-sm text-slate-200">{section.body}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/projects" variant="tertiary">
          Back to Projects
        </ButtonLink>
        {project.cta ? (
          <ButtonLink href={project.cta.href} variant="primary">
            {project.cta.label}
          </ButtonLink>
        ) : project.demoRoute ? (
          <ButtonLink href={project.demoRoute} variant="primary">
            Open Interactive Demo
          </ButtonLink>
        ) : null}
      </div>
    </article>
  );
}
