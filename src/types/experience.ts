export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  startLabel: string;
  endDate?: string;
  endLabel: string;
  current?: boolean;
  context?: string;
}

export interface ExperienceConfig {
  headline: {
    before: string;
    accent: string;
    after: string;
  };
  entries: ExperienceEntry[];
}
