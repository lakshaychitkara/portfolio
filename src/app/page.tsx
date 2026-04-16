import type { Metadata } from "next";
import { AboutProjectPreviewCard } from "@/components/about/about-project-preview-card";
import { ButtonLink } from "@/components/ui/button-link";
import { DomainBadge } from "@/components/ui/domain-badge";
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
  projects: { href: "/projects", label: "Explore Flagship Work", variant: "primary" },
  journey: { href: "/journey", label: "View Milestone Journey", variant: "secondary" },
  resume: { href: "/resume", label: "Resume + Evidence", variant: "tertiary" },
  contact: { href: "/contact", label: "Contact", variant: "secondary" },
} satisfies Record<
  AboutCtaKey,
  {
    href: string;
    label: string;
    variant: "primary" | "secondary" | "tertiary";
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

  const heroHighlights = ["ev-01", "ev-03", "ev-06"]
    .map((id) => evidenceMetrics.find((metric) => metric.id === id))
    .filter((metric): metric is (typeof evidenceMetrics)[number] => Boolean(metric))
    .slice(0, aboutDisplayConfig.limits.heroHighlights);
  const evidencePreview = evidenceMetrics.slice(0, aboutDisplayConfig.limits.evidenceMetrics);
  const capabilityPreview = capabilities.slice(0, aboutDisplayConfig.limits.capabilities);
  const milestonePreview = careerPhases.slice(0, aboutDisplayConfig.limits.careerPhases);
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
              description="High-signal outcomes selected for fast recruiter scan and deeper technical follow-up."
            >
              {evidencePreview.length ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {evidencePreview.map((metric) => (
                    <article key={metric.id} className="about-card-metric p-4" data-about-card="evidence">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-300">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-cyan-200">{metric.value}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">{metric.context}</p>
                    </article>
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
              title="High-Signal Case Studies"
              description="Primary projects with measurable outcomes and architecture depth."
            >
              {flagshipPreview.length ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {flagshipPreview.map((project) => (
                    <AboutProjectPreviewCard key={project.slug} project={project} />
                  ))}
                </div>
              ) : (
                <EmptySectionState message="Flagship case studies are temporarily unavailable. Visit Projects for the full archive." />
              )}
              <div className="about-card-action mt-5 flex flex-wrap items-center justify-between gap-3 px-4 py-4">
                <p className="text-sm text-slate-300">
                  Need the full portfolio view with domain filters and deep case-study writeups?
                </p>
                <ButtonLink href="/projects" variant="secondary">
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
              description="Core capabilities across LLM systems, multimodal benchmarks, simulation, and full-stack delivery."
            >
              {capabilityPreview.length ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {capabilityPreview.map((capability) => (
                    <article key={capability.id} className="about-card-narrative p-5">
                      <DomainBadge domain={capability.domain} />
                      <h3 className="mt-3 text-lg font-semibold text-slate-100">{capability.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{capability.summary}</p>
                      <p className="mt-3 text-sm text-cyan-100">{capability.highlight}</p>
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
            title="Career Phase Digest"
            description="Condensed progression highlights from foundation work to advanced systems execution."
          >
            {milestonePreview.length ? (
              <div className="grid gap-4 md:grid-cols-3">
                {milestonePreview.map((phase) => (
                  <article key={phase.id} className="card-surface-muted p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-300">
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
              <ButtonLink href="/journey" variant="secondary">
                Open Full Milestone Timeline
              </ButtonLink>
            </div>
          </SectionBlock>
        );
      case "foundations":
        return (
          <SectionBlock
            id="foundations"
            eyebrow="Foundations"
            title="Early Web and Product Foundations"
            description="Earlier delivery work that shaped execution speed and engineering discipline."
          >
            {foundationPreview.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {foundationPreview.map((project) => (
                  <article key={project.id} className="about-card-action p-4">
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
            eyebrow="Recruiter Signal"
            title="What This Portfolio Demonstrates"
            description="Signals designed for rapid screening and technical interview preparation."
          >
            {recruiterSignalPreview.length ? (
              <div className="grid gap-3 md:grid-cols-3">
                {recruiterSignalPreview.map((signal) => (
                  <div key={signal} className="card-surface-muted p-4">
                    <p className="text-sm text-slate-200">{signal}</p>
                  </div>
                ))}
                <div className="about-card-action p-4">
                  <p className="text-sm text-slate-300">
                    Looking for role fit, collaboration, or technical discussion?
                  </p>
                  <div className="mt-3">
                    <ButtonLink href="/contact" variant="secondary">
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
        className="card-surface motion-fade-up grid gap-6 rounded-3xl p-5 shadow-[0_25px_80px_-35px_rgba(14,116,144,0.75)] md:grid-cols-[1.3fr_1fr] md:gap-8 md:p-8"
        data-about-critical="hero"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
            Advanced-First AI Engineering
          </p>
          <h1 className="mt-4 [font-size:clamp(1.9rem,1.6rem+1.7vw,3.25rem)] font-semibold leading-tight text-slate-100">
            Proven LLM and multimodal performance, plus simulation-grade C++ systems delivery.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            {profile.headline}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            {profile.shortBio}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {prioritizedCtas.map((cta) => (
              <ButtonLink key={cta.href} href={cta.href} variant={cta.variant}>
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {heroHighlights.length ? (
            heroHighlights.map((item) => (
              <div key={item.label} className="about-card-metric motion-lift p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-300">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-cyan-200">{item.value}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.context}</p>
              </div>
            ))
          ) : (
            <EmptySectionState message="Highlights are currently unavailable." />
          )}
        </div>
      </section>

      <div className="flex flex-col gap-10 md:gap-12">
        {orderedSections.map((sectionId, index) => (
          <div
            key={sectionId}
            className={index === 0 ? "motion-fade-up" : "motion-fade-up border-t border-white/10 pt-8 md:pt-10"}
          >
            {renderSection(sectionId)}
          </div>
        ))}
      </div>
    </>
  );
}
