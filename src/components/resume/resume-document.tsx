import {
  resumeAchievements,
  resumeEducation,
  resumeExperience,
  resumeProfile,
  resumeProjects,
  resumeSkills,
} from "@/lib/content/resume";
import { cn } from "@/lib/utils";

interface ResumeDocumentProps {
  printMode?: boolean;
}

export function ResumeDocument({ printMode = false }: ResumeDocumentProps) {
  return (
    <article
      className={cn(
        "resume-document mx-auto bg-white text-slate-950",
        printMode ? "w-[8.5in] min-h-[11in] px-[0.38in] py-[0.28in]" : "rounded-lg p-6 shadow-[0_28px_80px_-45px_rgba(15,23,42,0.8)]",
      )}
    >
      <div className="border-b border-slate-300 pb-2 text-center">
        <h1 className={cn("font-bold tracking-[0.06em] text-slate-950", printMode ? "text-2xl" : "text-3xl")}>{resumeProfile.name}</h1>
        <p className="mt-0.5 text-xs font-semibold text-slate-800">{resumeProfile.role}</p>
        <p className="mt-1 text-[10px] text-slate-700">
          {resumeProfile.location} | {resumeProfile.phone} | {resumeProfile.email} | {resumeProfile.portfolio} | {resumeProfile.linkedin} | {resumeProfile.github}
        </p>
      </div>

      <section className="resume-section mt-3">
        <h2>Profile Summary</h2>
        <p>{resumeProfile.summary}</p>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        {resumeExperience.map((item) => (
          <div key={`${item.company}-${item.role}`} className="resume-entry">
            <div className="flex items-baseline justify-between gap-4">
              <h3>{item.role} | {item.company}</h3>
              <p className="resume-meta">{item.period}</p>
            </div>
            <p className="resume-meta">{item.location}</p>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2>Technical Skills</h2>
        <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
          {resumeSkills.map((skill) => (
            <p key={skill.label}>
              <strong>{skill.label}:</strong> {skill.values.join(", ")}
            </p>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Projects</h2>
        <div className="grid gap-2">
          {resumeProjects.map((project) => (
            <div key={project.title} className="resume-entry">
              <h3>{project.title} | <span>{project.stack}</span></h3>
              <ul>
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        <div className="grid gap-1">
          {resumeEducation.map((item) => (
            <div key={item.institution} className="flex items-start justify-between gap-4">
              <div>
                <h3>{item.institution}</h3>
                <p>{item.credential} ({item.score})</p>
              </div>
              <p className="resume-meta text-right">{item.period}<br />{item.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Achievements</h2>
        <ul>
          {resumeAchievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
