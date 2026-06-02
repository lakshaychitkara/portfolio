import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, Gauge, NotebookTabs } from "lucide-react";
import { AboutProjectPreviewCard } from "@/components/about/about-project-preview-card";
import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
import { EvidenceCard } from "@/components/ui/evidence-card";
import { SectionBlock } from "@/components/ui/section-block";
import {
  aboutDisplayConfig,
  capabilities,
  careerPhases,
  evidenceMetrics,
  featuredProjects,
  foundationProjects,
  profile,
  recruiterSignals,
} from "@/lib/content";
import { canonicalFor } from "@/lib/seo";
import type { AboutCtaKey, AboutProjectPreview, AboutSectionId } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: canonicalFor("/"),
  },
};

const ctaCatalog = {
  projects: { href: "/projects", label: "Explore Case Studies", variant: "primary", icon: BriefcaseBusiness },
  journey: { href: "/journey", label: "View Journey", variant: "secondary", icon: NotebookTabs },
  resume: { href: "/resume", label: "Resume Evidence", variant: "tertiary", icon: Gauge },
  contact: { href: "/contact", label: "Contact", variant: "secondary", icon: ArrowRight },
} satisfies Record<
  AboutCtaKey,
  {
    href: string;
    label: string;
    variant: "primary" | "secondary" | "tertiary";
    icon: typeof ArrowRight;
  }
>;

function EmptySectionState({ message }: { message: string }) {
  return (
    <div className="about-card-action px-4 py-4 text-sm text-slate-300">
      {message}
    </div>
  );
}

export default function HomePage() {
  const prioritizedCtas = aboutDisplayConfig.ctaPriority
    .map((key) => ctaCatalog[key])
    .slice(0, 3);

  const heroHighlights = ["ev-01", "ev-02", "ev-04"]
    .map((id) => evidenceMetrics.find((metric) => metric.id === id))
    .filter((metric): metric is (typeof evidenceMetrics)[number] => Boolean(metric))
    .slice(0, aboutDisplayConfig.limits.heroHighlights);
  const evidencePreview = evidenceMetrics.slice(0, aboutDisplayConfig.limits.evidenceMetrics);
  const capabilityPreview = capabilities.slice(0, aboutDisplayConfig.limits.capabilities);
  const milestonePreview = careerPhases.slice(-aboutDisplayConfig.limits.careerPhases);
  const foundationPreview = foundationProjects.slice(0, aboutDisplayConfig.limits.foundationProjects);
  const recruiterSignalPreview = recruiterSignals.slice(0, aboutDisplayConfig.limits.recruiterSignals);
  const flagshipPreview: AboutProjectPreview[] = featuredProjects
    .slice(0, aboutDisplayConfig.limits.featuredProjects)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      year: project.year,
      domain: project.domain,
      impactSummary: project.impactSummary,
      readTimeMinutes: project.readTimeMinutes,
      visual: project.visual,
      keyMetric: project.projectImpact[0],
    }));
  const orderedSections: AboutSectionId[] = aboutDisplayConfig.sectionOrder.length
    ? aboutDisplayConfig.sectionOrder
    : ["evidence", "flagship-work", "capabilities", "milestones", "foundations", "recruiter-signals"];

  const renderSection = (sectionId: AboutSectionId) => {
    switch (sectionId) {
      case "evidence":
        return (
          <div data-about-critical="evidence">
            <SectionBlock
              id="evidence"
              eyebrow="Evidence"
              title="Measured Impact Snapshot"
              description="Recent outcomes selected for hiring-panel scan and deeper technical follow-up."
            >
              {evidencePreview.length ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {evidencePreview.map((metric) => (
                    <EvidenceCard key={metric.id} metric={metric} data-about-card="evidence" />
                  ))}
                </div>
              ) : (
                <EmptySectionState message="Evidence metrics are being refreshed. Check back shortly for updated outcomes." />
              )}
            </SectionBlock>
          </div>
        );
      case "flagship-work":
        return (
          <div data-about-critical="flagship">
            <SectionBlock
              id="flagship-work"
              eyebrow="Flagship Work"
              title="Case Studies With Proof"
              description="Primary projects with measurable outcomes, implementation detail, and architecture trade-offs."
            >
              {flagshipPreview.length ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {flagshipPreview.map((project) => (
                    <AboutProjectPreviewCard key={project.slug} project={project} />
                  ))}
                </div>
              ) : (
                <EmptySectionState message="Flagship case studies are temporarily unavailable. Visit Projects for the full archive." />
              )}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                <p className="max-w-xl text-sm text-slate-300">
                  The full explorer adds domain filtering, search, sorting, and deeper case-study evidence.
                </p>
                <ButtonLink href="/projects" variant="secondary" icon={<ArrowRight size={16} aria-hidden />}>
                  See All Projects
                </ButtonLink>
              </div>
            </SectionBlock>
          </div>
        );
      case "capabilities":
        return (
          <div data-about-critical="capabilities">
            <SectionBlock
              id="capabilities"
              eyebrow="Capabilities"
              title="Breadth With Systems Depth"
              description="LLM serving, multimodal benchmarks, simulation, and full-stack delivery without treating any layer as someone else's problem."
            >
              {capabilityPreview.length ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {capabilityPreview.map((capability) => (
                    <article key={capability.id} className="about-card-narrative p-5">
                      <DomainBadge domain={capability.domain} />
                      <h3 className="mt-3 text-lg font-semibold text-slate-100">{capability.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{capability.summary}</p>
                      <p className="mt-3 text-sm text-amber-100">{capability.highlight}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptySectionState message="Capability summaries are currently unavailable." />
              )}
            </SectionBlock>
          </div>
        );
      case "milestones":
        return (
          <SectionBlock
            id="milestones"
            eyebrow="Milestones"
            title="Recent Execution Arc"
            description="Condensed progression from model systems to geometry-heavy simulation and productized AI services."
          >
            {milestonePreview.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {milestonePreview.map((phase) => (
                  <article key={phase.id} className="border-l border-amber-300/30 bg-slate-950/40 p-4">
                    <p className="font-mono text-xs uppercase text-amber-200">
                      {phase.phase}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{phase.period}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-100">{phase.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{phase.focus}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptySectionState message="Milestone entries are currently unavailable." />
            )}
            <div className="mt-5">
              <ButtonLink href="/journey" variant="secondary" icon={<ArrowRight size={16} aria-hidden />}>
                Open Full Timeline
              </ButtonLink>
            </div>
          </SectionBlock>
        );
      case "foundations":
        return (
          <SectionBlock
            id="foundations"
            eyebrow="Foundations"
            title="Early Product Foundations"
            description="Earlier delivery work that shaped practical execution speed and product instincts."
          >
            {foundationPreview.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {foundationPreview.map((project) => (
                  <article key={project.id} className="border border-white/10 bg-slate-950/45 p-4">
                    <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tool) => (
                        <span key={`${project.id}-${tool}`} className="chip">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptySectionState message="Foundation projects are currently unavailable." />
            )}
          </SectionBlock>
        );
      case "recruiter-signals":
        return (
          <SectionBlock
            id="recruiter-signals"
            eyebrow="Hiring Signal"
            title="What This Portfolio Demonstrates"
            description="Signals designed for rapid screening and technical interview preparation."
          >
            {recruiterSignalPreview.length ? (
              <div className="grid gap-3 md:grid-cols-3">
                {recruiterSignalPreview.map((signal) => (
                  <div key={signal} className="border border-white/10 bg-slate-950/45 p-4">
                    <p className="text-sm text-slate-200">{signal}</p>
                  </div>
                ))}
                <div className="about-card-action p-4">
                  <p className="text-sm text-slate-300">
                    Looking for role fit, collaboration, or technical discussion?
                  </p>
                  <div className="mt-3">
                    <ButtonLink href="/contact" variant="secondary" icon={<ArrowRight size={16} aria-hidden />}>
                      Contact
                    </ButtonLink>
                  </div>
                </div>
              </div>
            ) : (
              <EmptySectionState message="Recruiter signals are currently unavailable." />
            )}
          </SectionBlock>
        );
    }
  };

  return (
    <>
      <section
        className="hero-editorial left-1/2 ml-[-50dvw] flex w-[100dvw] items-end bg-cover bg-center"
        data-about-critical="hero"
        style={{ backgroundImage: "url('/portfolio-assets/hero-ai-systems.png')" }}
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 pb-10 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-16 lg:pt-28">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase text-amber-200">
              AI Systems Portfolio
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-50 md:text-6xl">
              Evidence-backed AI engineering across models, systems, and simulation.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
              {profile.headline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              {profile.shortBio}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {prioritizedCtas.map((cta) => {
                const Icon = cta.icon;
                return (
                  <ButtonLink
                    key={cta.href}
                    href={cta.href}
                    variant={cta.variant}
                    icon={<Icon size={16} aria-hidden />}
                  >
                    {cta.label}
                  </ButtonLink>
                );
              })}
            </div>
          </div>

          <div className="grid content-end gap-3">
            {heroHighlights.map((item) => (
              <EvidenceCard key={item.label} metric={item} compact />
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-12 md:gap-14">
        {orderedSections.map((sectionId, index) => (
          <div
            key={sectionId}
            className={index === 0 ? "motion-fade-up" : "motion-fade-up border-t border-white/10 pt-9"}
          >
            {renderSection(sectionId)}
          </div>
        ))}
      </div>
    </>
  );
}
