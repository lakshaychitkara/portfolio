import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/journey/journey-timeline";
import { SectionBlock } from "@/components/ui/section-block";
import { careerPhases } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Milestone digest of Lakshay Kumar's Sep 2025 to Apr 2026 progression from full-stack foundations into LLM systems, multimodal benchmarking, and C++ simulation engineering.",
  alternates: {
    canonical: canonicalFor("/journey"),
  },
};

export default function JourneyPage() {
  return (
    <>
      <h1 className="sr-only">Journey</h1>
      <SectionBlock
        eyebrow="Trajectory"
        title="Advanced-First Growth Timeline (Milestone Digest)"
        description="Curated phases from Sep 2025 to Apr 2026 showing outcomes, technical focus, and measurable impact."
      >
        <JourneyTimeline entries={careerPhases} />
      </SectionBlock>
    </>
  );
}
