import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FlaskConical } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
import { EvidenceCard } from "@/components/ui/evidence-card";
import { ProjectVisual } from "@/components/ui/project-visual";
import { getProjectBySlug, projects } from "@/lib/content";
import { canonicalFor, getSiteUrl } from "@/lib/seo";

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
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    url: `${getSiteUrl()}/projects/${project.slug}`,
    dateCreated: project.year,
    keywords: [...project.roleFitTags, ...project.stack].join(", "),
    creator: {
      "@type": "Person",
      name: "Lakshay Kumar",
    },
  };
  const proofLabels = Array.from(new Set([...project.roleFitTags, ...project.proofBadges]));

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
      />
      <header className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {project.domain.map((domain) => (
              <DomainBadge key={`${project.slug}-${domain}`} domain={domain} />
            ))}
            <span className="chip">{project.priority}</span>
            <span className="font-mono text-xs uppercase text-slate-400">
              {project.year}
            </span>
          </div>

          <p className="font-mono text-xs uppercase text-amber-200">Case Study</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-100 md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium text-amber-100">{project.impactSummary}</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-300">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/projects" variant="tertiary" icon={<ArrowLeft size={16} aria-hidden />} iconPosition="start">
              Projects
            </ButtonLink>
            {project.cta ? (
              <ButtonLink href={project.cta.href} variant="primary" icon={<FlaskConical size={16} aria-hidden />}>
                {project.cta.label}
              </ButtonLink>
            ) : project.labDemo ? (
              <ButtonLink href={project.labDemo.href} variant="primary" icon={<FlaskConical size={16} aria-hidden />}>
                {project.labDemo.label}
              </ButtonLink>
            ) : project.demoRoute ? (
              <ButtonLink href={project.demoRoute} variant="primary" icon={<FlaskConical size={16} aria-hidden />}>
                Open Interactive Demo
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <ProjectVisual visual={project.visual} />
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Project impact">
        {project.projectImpact.map((metric) => (
          <EvidenceCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]" aria-label="Architecture and challenge">
        <div className="card-surface p-5">
          <p className="font-mono text-xs uppercase text-amber-200">Challenge</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">{project.challenge}</p>

          <p className="mt-6 font-mono text-xs uppercase text-amber-200">Architecture</p>
          <ul className="mt-3 grid gap-3 text-sm text-slate-200">
            {project.architecture.map((line) => (
              <li key={line} className="border-l border-teal-300/30 bg-slate-950/45 px-3 py-2">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-5">
          <p className="font-mono text-xs uppercase text-amber-200">Stack</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tool) => (
              <span key={tool} className="chip">
                {tool}
              </span>
            ))}
          </div>

          <p className="mt-6 font-mono text-xs uppercase text-amber-200">Proof Badges</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {proofLabels.map((badge) => (
              <span key={`${project.slug}-proof-${badge}`} className="chip">
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">{project.visual.caption}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3" aria-label="Problem approach result">
        {project.sections.map((section) => (
          <div key={section.heading} className="border border-white/10 bg-slate-950/45 p-4">
            <p className="font-mono text-xs uppercase text-amber-200">
              {section.heading}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">{section.body}</p>
          </div>
        ))}
      </section>

      {project.timeline?.length ? (
        <section className="card-surface p-5" aria-label="Project timeline">
          <p className="font-mono text-xs uppercase text-amber-200">Timeline Evidence</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {project.timeline.map((item) => (
              <div key={item.heading} className="border-l border-amber-300/35 bg-slate-950/45 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">{item.heading}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {project.evidenceTrail.length ? (
        <section className="card-surface p-5" aria-label="Evidence trail">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase text-amber-200">Evidence Trail</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">
                Internship-backed milestones
              </h2>
            </div>
            {project.labDemo ? (
              <ButtonLink href={project.labDemo.href} variant="secondary" icon={<FlaskConical size={16} aria-hidden />}>
                {project.labDemo.label}
              </ButtonLink>
            ) : null}
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {project.evidenceTrail.map((item) => (
              <article key={`${item.date}-${item.milestone}`} className="border border-white/10 bg-slate-950/50 p-4">
                <p className="font-mono text-[11px] uppercase text-teal-200">{item.date}</p>
                <h3 className="mt-2 text-base font-semibold text-slate-100">{item.milestone}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.result}</p>
                <p className="mt-3 font-mono text-[11px] uppercase text-slate-500">{item.source}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
        <ButtonLink href="/projects" variant="tertiary" icon={<ArrowLeft size={16} aria-hidden />} iconPosition="start">
          Back to Projects
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" icon={<ArrowRight size={16} aria-hidden />}>
          Discuss This Work
        </ButtonLink>
      </div>
    </article>
  );
}
