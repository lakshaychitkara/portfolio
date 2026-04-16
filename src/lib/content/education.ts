import type { EducationItem, FoundationProject } from "@/lib/types";

export const education: EducationItem[] = [
  {
    id: "edu-01",
    institution: "Chitkara University",
    credential: "B.E. in Computer Science",
    score: "CGPA 8.42",
    period: "Oct 2022 - Jun 2026",
    location: "Patiala, Punjab",
  },
  {
    id: "edu-02",
    institution: "GMSSS, Mani Majra",
    credential: "Class 12 (CBSE)",
    score: "95.4%",
    period: "2020 - 2021",
    location: "Chandigarh",
  },
  {
    id: "edu-03",
    institution: "Blue Bird High School",
    credential: "Class 10 (CBSE)",
    score: "95.2%",
    period: "2018 - 2019",
    location: "Panchkula, Haryana",
  },
];

export const foundationProjects: FoundationProject[] = [
  {
    id: "foundation-01",
    title: "Ecomart (MERN)",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    summary:
      "Built a responsive gadget e-commerce app with search/filter/sort, cart logic, and performance-aware UI behavior.",
  },
  {
    id: "foundation-02",
    title: "Python Games Bundle",
    stack: ["Python", "Tkinter", "Turtle"],
    summary:
      "Created a multi-game desktop bundle with session-time accounting and dynamic game switching logic.",
  },
];
