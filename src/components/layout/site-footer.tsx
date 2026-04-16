import Link from "next/link";
import { privacyFlags, profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-slate-400 lg:px-8 md:flex-row md:items-end md:justify-between [padding-left:max(1.25rem,env(safe-area-inset-left))] [padding-right:max(1.25rem,env(safe-area-inset-right))] [padding-bottom:max(2.5rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="font-semibold text-slate-200">{profile.name}</p>
          <p className="mt-1 max-w-xl leading-relaxed">{profile.headline}</p>
        </div>
        <div className="space-y-1 text-left md:text-right">
          {privacyFlags.showLocationTag ? <p>{profile.location}</p> : null}
          <Link
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[44px] items-center rounded-lg px-2 text-cyan-300 transition hover:bg-cyan-400/10 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 md:ml-auto md:justify-end"
          >
            {profile.email}
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-slate-400">
            Built with Next.js + FastAPI-ready architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
