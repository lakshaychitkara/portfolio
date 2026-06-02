import Image from "next/image";
import type { ProjectVisual } from "@/lib/types";

interface ProjectVisualProps {
  visual: ProjectVisual;
  compact?: boolean;
}

type VisualMotif = "graph" | "mesh" | "matrix" | "signal";

function getMotif(label: string): VisualMotif {
  const normalized = label.toLowerCase();
  if (normalized.includes("graph") || normalized.includes("pipeline")) {
    return "graph";
  }
  if (normalized.includes("axis") || normalized.includes("mesh") || normalized.includes("model")) {
    return "mesh";
  }
  if (normalized.includes("matrix") || normalized.includes("benchmark")) {
    return "matrix";
  }
  return "signal";
}

export function ProjectVisual({ visual, compact = false }: ProjectVisualProps) {
  const motif = getMotif(visual.label);

  return (
    <figure
      className={`project-visual relative overflow-hidden rounded-lg border border-white/10 ${
        compact ? "h-36" : "h-56 md:h-72"
      }`}
      aria-label={visual.caption}
    >
      {visual.src ? (
        <Image
          src={visual.src}
          alt={visual.alt ?? visual.caption}
          fill
          sizes={
            compact
              ? "(min-width: 1024px) 36vw, (min-width: 768px) 50vw, 100vw"
              : "(min-width: 1024px) 50vw, 100vw"
          }
          className="object-cover"
          priority={!compact}
          loading={compact ? "eager" : undefined}
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${visual.gradientFrom} 0%, ${visual.gradientTo} 100%)`,
            }}
          />
          {motif === "graph" ? (
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_2px,transparent_2px,transparent_54px),linear-gradient(rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_20px)] bg-[size:56px_100%,100%_20px]" />
          ) : null}
          {motif === "mesh" ? (
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.14)_0,rgba(255,255,255,0.14)_2px,transparent_2px,transparent_14px),repeating-linear-gradient(45deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_14px)]" />
          ) : null}
          {motif === "matrix" ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1.1px)] [background-size:14px_14px]" />
          ) : null}
          {motif === "signal" ? (
            <div className="absolute inset-x-0 bottom-0 top-1/3 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_8px,transparent_8px,transparent_18px)]" />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_50%)]" />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
      <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-2 font-mono text-[11px] uppercase text-slate-100">
        {visual.label}
      </figcaption>
    </figure>
  );
}
