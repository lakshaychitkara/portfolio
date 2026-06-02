"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { capabilityDomains } from "@/lib/content/domain-labels";
import { projectCategories } from "@/lib/content/project-filters";
import type { CapabilityDomain, Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectsExplorerProps {
  projects: Project[];
}

type SortKey = "priority" | "newest" | "read-time";

const priorityOrder = new Map<Project["priority"], number>([
  ["flagship", 0],
  ["notable", 1],
]);

function projectSearchText(project: Project) {
  return [
    project.title,
    project.tagline,
    project.impactSummary,
    project.challenge,
    project.stack.join(" "),
    project.proofBadges.join(" "),
    project.projectImpact.map((metric) => `${metric.label} ${metric.value} ${metric.context}`).join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<CapabilityDomain | "all">("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("priority");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const domainMatch = activeCategory === "all" || project.domain.includes(activeCategory);
      const queryMatch = !normalizedQuery || projectSearchText(project).includes(normalizedQuery);
      return domainMatch && queryMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortKey === "newest") {
        return Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
      }
      if (sortKey === "read-time") {
        return b.readTimeMinutes - a.readTimeMinutes || a.title.localeCompare(b.title);
      }
      return (
        (priorityOrder.get(a.priority) ?? 9) - (priorityOrder.get(b.priority) ?? 9) ||
        Number(b.year) - Number(a.year) ||
        a.title.localeCompare(b.title)
      );
    });
  }, [activeCategory, projects, query, sortKey]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-lg border border-white/10 bg-slate-950/45 p-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-[44px] w-full rounded-lg border border-white/15 bg-slate-950/70 py-2 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-amber-300/60"
            placeholder="Search by system, metric, stack, or outcome"
          />
        </label>

        <label className="flex min-w-[13rem] items-center gap-2 rounded-lg border border-white/15 bg-slate-950/70 px-3">
          <SlidersHorizontal className="h-4 w-4 text-amber-200" aria-hidden />
          <span className="sr-only">Sort projects</span>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            className="min-h-[44px] w-full bg-transparent text-sm text-slate-100 outline-none"
          >
            <option value="priority">Priority first</option>
            <option value="newest">Newest first</option>
            <option value="read-time">Deepest reads</option>
          </select>
        </label>
      </div>

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
              "inline-flex min-h-[44px] shrink-0 items-center rounded-lg border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80",
              activeCategory === "all"
                ? "border-amber-300/60 bg-amber-300/15 text-amber-100"
                : "border-white/15 text-slate-300 hover:border-amber-300/30 hover:text-white",
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
                "inline-flex min-h-[44px] shrink-0 items-center rounded-lg border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80",
                activeCategory === category
                  ? "border-amber-300/60 bg-amber-300/15 text-amber-100"
                  : "border-white/15 text-slate-300 hover:border-amber-300/30 hover:text-white",
              )}
            >
              {capabilityDomains[category]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex items-center justify-between border-y border-white/10 py-3 text-sm text-slate-400">
        <span>{filteredProjects.length} projects</span>
        <span>{activeCategory === "all" ? "All domains" : capabilityDomains[activeCategory]}</span>
      </div>

      <div className="grid gap-5">
        {filteredProjects.length ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        ) : (
          <div className="card-surface p-5 text-sm text-slate-300">
            No projects match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
