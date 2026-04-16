import type { Metadata } from "next";
import { ResumePreview } from "@/components/resume-preview";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionBlock } from "@/components/ui/section-block";
import {
  education,
  evidenceMetrics,
  profile,
  resumeHighlights,
  roleFocus,
} from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume-integrated portfolio view for Lakshay Kumar, including education, technical strengths, and measured project evidence.",
  alternates: {
    canonical: canonicalFor("/resume"),
  },
};

export default function ResumePage() {
  return (
    <>
      <h1 className="sr-only">Resume</h1>
      <SectionBlock
        id="resume-evidence"
        eyebrow="Resume"
        title="Lakshay Kumar - Resume and Evidence"
        description="Education, role-fit focus, and selected measurable outcomes sourced from real project worklogs."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="card-surface space-y-4 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">
              Education
            </p>
            <div className="space-y-3">
              {education.length ? (
                education.map((item) => (
                  <div key={item.id} className="card-surface-muted px-3 py-3">
                    <p className="text-sm font-semibold text-slate-100">{item.institution}</p>
                    <p className="text-sm text-slate-300">{item.credential}</p>
                    <p className="text-xs text-cyan-200">{item.score}</p>
                    <p className="text-xs text-slate-400">
                      {item.period} | {item.location}
                    </p>
                  </div>
                ))
              ) : (
                <p className="card-surface-muted px-3 py-3 text-sm text-slate-300">
                  Education records are currently unavailable.
                </p>
              )}
            </div>
          </div>

          <div className="card-surface space-y-4 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">
              Open To Roles
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              {roleFocus.length ? (
                roleFocus.map((item) => (
                  <li key={item} className="card-surface-muted px-3 py-2">
                    {item}
                  </li>
                ))
              ) : (
                <li className="card-surface-muted px-3 py-2 text-slate-300">
                  Role focus signals are currently unavailable.
                </li>
              )}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/resume.pdf" variant="primary">
                Download Resume PDF
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact Me
              </ButtonLink>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-[44px] items-center break-all rounded-lg px-2 text-xs text-cyan-200 transition hover:bg-cyan-400/10 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="card-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">
              Technical Highlights
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {resumeHighlights.length ? (
                resumeHighlights.map((item) => (
                  <li key={item} className="card-surface-muted px-3 py-2">
                    {item}
                  </li>
                ))
              ) : (
                <li className="card-surface-muted px-3 py-2 text-slate-300">
                  Technical highlights are currently unavailable.
                </li>
              )}
            </ul>
          </div>

          <div className="card-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">
              Selected Evidence
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {evidenceMetrics.length ? (
                evidenceMetrics.map((metric) => (
                  <div key={metric.id} className="card-surface-muted px-3 py-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-400">
                      {metric.label}
                    </p>
                    <p className="text-base font-semibold text-cyan-200">{metric.value}</p>
                    <p className="text-xs text-slate-300">{metric.context}</p>
                  </div>
                ))
              ) : (
                <p className="card-surface-muted px-3 py-3 text-sm text-slate-300 sm:col-span-2">
                  Evidence metrics are currently unavailable.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ResumePreview />
        </div>
      </SectionBlock>
    </>
  );
}
