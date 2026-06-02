import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/75 p-8 text-center">
      <p className="font-mono text-xs uppercase text-amber-200">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-100">Page Not Found</h1>
      <p className="mt-2 text-slate-300">The route you requested does not exist in this portfolio build.</p>
      <div className="mt-5">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
