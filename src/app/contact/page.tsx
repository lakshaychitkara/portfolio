import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactForm } from "@/components/contact-form";
import { privacyFlags, profile } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lakshay Kumar for AI engineering, LLM systems, multimodal benchmarking, and simulation-focused product work.",
  alternates: {
    canonical: canonicalFor("/contact"),
  },
};

export default function ContactPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="card-surface space-y-4 p-6">
        <p className="font-mono text-xs uppercase text-amber-200">Contact</p>
        <h1 className="text-3xl font-semibold text-slate-100">Let&apos;s Build Something High-Impact</h1>
        <p className="text-sm text-slate-300">
          I am open to roles and collaborations where AI system reliability, measurable model performance,
          and full-stack execution intersect.
        </p>

        <div className="space-y-3 text-sm text-slate-200">
          <div className="card-surface-muted px-3 py-2">
            <p className="font-mono text-[11px] uppercase text-slate-500">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 inline-flex min-h-[44px] items-center break-all rounded-lg px-2 text-amber-200 transition hover:bg-amber-300/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
            >
              {profile.email}
            </a>
          </div>
          <div className="card-surface-muted px-3 py-2">
            <p className="font-mono text-[11px] uppercase text-slate-500">GitHub</p>
            <a
              href={profile.github}
              className="mt-1 inline-flex min-h-[44px] items-center rounded-lg px-2 text-amber-200 transition hover:bg-amber-300/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              View profile
            </a>
          </div>
          <div className="card-surface-muted px-3 py-2">
            <p className="font-mono text-[11px] uppercase text-slate-500">LinkedIn</p>
            <a
              href={profile.linkedin}
              className="mt-1 inline-flex min-h-[44px] items-center rounded-lg px-2 text-amber-200 transition hover:bg-amber-300/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              View profile
            </a>
          </div>
          {privacyFlags.showPhone ? <p>Phone: {profile.phone}</p> : null}
          {privacyFlags.showLocationTag ? <p>Location: {profile.location}</p> : null}
        </div>

        <ButtonLink href="/projects" variant="secondary" className="w-fit">
          Explore Projects Before Reaching Out
        </ButtonLink>
      </article>

      <ContactForm />
    </section>
  );
}
