import type { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/resume-document";

export const metadata: Metadata = {
  title: "Resume Print",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResumePrintPage() {
  return (
    <div className="resume-print-page bg-white">
      <ResumeDocument printMode />
    </div>
  );
}
