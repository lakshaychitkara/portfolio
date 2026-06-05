import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/journey/journey-timeline";
import { SectionBlock } from "@/components/ui/section-block";
import { internshipEvidenceSummary, internshipMilestones } from "@/lib/content";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Milestone digest of Lakshay Kumar's Sep 2025 to Jun 2026 progression from full-stack foundations into LLM systems, multimodal benchmarking, and C++ simulation engineering.",
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
        title="CreateBytes Internship Evidence Timeline"
        description={`${internshipEvidenceSummary.filledEntries} filled work entries from ${internshipEvidenceSummary.period}, grouped into hiring-relevant AI/ML milestones.`}
      >
        <JourneyTimeline entries={internshipMilestones} />
      </SectionBlock>
    </>
  );
}
