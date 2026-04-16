import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navItems } from "@/lib/content/navigation";
import { profile } from "@/lib/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 lg:px-8 [padding-left:max(1.25rem,env(safe-area-inset-left))] [padding-right:max(1.25rem,env(safe-area-inset-right))]">
        <Link href="/" className="flex min-h-[44px] flex-col justify-center space-y-1">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
            Portfolio
          </p>
          <p
            className="max-w-[11rem] text-[13px] font-semibold leading-tight text-slate-100 sm:max-w-[15rem] md:max-w-[22rem] md:truncate md:whitespace-nowrap lg:max-w-[30rem]"
            title={profile.role}
          >
            {profile.role}
          </p>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
