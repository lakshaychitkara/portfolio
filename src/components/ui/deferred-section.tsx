"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

export function DeferredSection({
  children,
  fallback,
  rootMargin = "260px 0px",
}: DeferredSectionProps) {
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined",
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={ref}>{isVisible ? children : fallback ?? null}</div>;
}
