import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLinks } from "@/components/layout/nav-links";
import { navItems } from "@/lib/content/navigation";
import { profile } from "@/lib/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 lg:px-8 [padding-left:max(1.25rem,env(safe-area-inset-left))] [padding-right:max(1.25rem,env(safe-area-inset-right))]">
        <Link href="/" className="flex min-h-[44px] max-w-[15rem] flex-col justify-center space-y-1 sm:max-w-none">
          <p className="font-mono text-xs uppercase text-amber-200">
            {profile.name}
          </p>
          <p
            className="max-w-[11rem] text-[12px] font-semibold leading-tight text-slate-100 sm:max-w-[15rem] md:max-w-[22rem] md:truncate md:whitespace-nowrap lg:max-w-[30rem] lg:text-[13px]"
            title={profile.role}
          >
            {profile.role}
          </p>
        </Link>

        <NavLinks items={navItems} />

        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
