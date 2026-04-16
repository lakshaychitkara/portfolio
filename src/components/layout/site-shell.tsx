import type { ReactNode } from "react";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <main id="main-content" role="main" className="atlas-bg min-h-[calc(100vh-120px)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-10 lg:px-8 md:py-14 [padding-left:max(1.25rem,env(safe-area-inset-left))] [padding-right:max(1.25rem,env(safe-area-inset-right))] [padding-bottom:max(2.5rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </main>
  );
}
