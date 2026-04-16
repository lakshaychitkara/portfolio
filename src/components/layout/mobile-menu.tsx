"use client";

import Link from "next/link";
import { useId, useRef } from "react";
import type { NavItem } from "@/lib/types";

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const navId = useId();

  function closeMenu() {
    const details = detailsRef.current;
    if (!details) {
      return;
    }

    details.open = false;
  }

  return (
    <details ref={detailsRef} className="relative lg:hidden">
      <summary
        className="inline-flex min-h-[44px] cursor-pointer list-none items-center rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-100 transition hover:border-cyan-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 [&::-webkit-details-marker]:hidden"
        aria-controls={navId}
        aria-label="Open menu"
      >
        Menu
      </summary>
      <nav
        id={navId}
        className="absolute right-0 top-[calc(100%+0.65rem)] z-50 flex w-[min(18.75rem,calc(100vw-2.5rem))] flex-col gap-2 rounded-xl border border-white/15 bg-slate-950/95 p-3 shadow-[0_24px_45px_-30px_rgba(15,23,42,0.95)]"
        aria-label="Mobile Primary"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex min-h-[44px] items-center rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
            onClick={() => closeMenu()}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
