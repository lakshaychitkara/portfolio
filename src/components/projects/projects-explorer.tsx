"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { capabilityDomains } from "@/lib/content/domain-labels";
import { projectCategories } from "@/lib/content/project-filters";
import type { CapabilityDomain, Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectsExplorerProps {
  projects: Project[];
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<CapabilityDomain | "all">(
    "all",
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }

    return projects.filter((project) => project.domain.includes(activeCategory));
  }, [activeCategory, projects]);

  return (
    <div className="space-y-6">
      <fieldset className="-mx-1 border-0 p-0">
        <legend className="sr-only">Project domain filter</legend>
        <div
          className="flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]"
          role="group"
          aria-label="Project domain filter"
        >
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            aria-pressed={activeCategory === "all"}
            className={cn(
              "inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80",
              activeCategory === "all"
                ? "border-cyan-300/60 bg-cyan-500/20 text-cyan-100"
                : "border-white/15 text-slate-300 hover:border-cyan-300/30 hover:text-white",
            )}
          >
            All Domains
          </button>
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                "inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80",
                activeCategory === category
                  ? "border-cyan-300/60 bg-cyan-500/20 text-cyan-100"
                  : "border-white/15 text-slate-300 hover:border-cyan-300/30 hover:text-white",
              )}
            >
              {capabilityDomains[category]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        {filteredProjects.length ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        ) : (
          <div className="card-surface p-5 text-sm text-slate-300 md:col-span-2">
            No projects match this domain yet. Try another category or add a new case study.
          </div>
        )}
      </div>
    </div>
  );
}
