import type { ExperienceConfig } from "../types/experience";

export const experience: ExperienceConfig = {
  headline: {
    before: "Enterprise experience.",
    accent: "Startup mindset.",
    after: "Helping growing businesses move faster.",
  },
  entries: [
    {
      company: "Freelance",
      role: "Independent Product Engineer",
      startDate: "2026",
      startLabel: "2026",
      endLabel: "now",
      current: true,
      context: "SMEs · Consulting & custom software",
    },
    {
      company: "Selego",
      role: "Startup Product Engineer",
      startDate: "2024",
      startLabel: "2024",
      endDate: "2026",
      endLabel: "2026",
      context: "Venture studio · 0→1 products",
    },
    {
      company: "FDJ",
      role: "Fullstack Developer",
      startDate: "2023",
      startLabel: "2023",
      endDate: "2024",
      endLabel: "2024",
      context: "High-traffic platforms",
    },
    {
      company: "Capgemini",
      role: "Software Engineer",
      startDate: "2020",
      startLabel: "2020",
      endDate: "2022",
      endLabel: "2022",
      context: "Enterprise applications",
    },
  ],
};
