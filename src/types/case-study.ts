export interface CaseStudyResult {
  label: string;
  value: string;
}

export interface CaseStudyShot {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  featured: boolean;
  teaser: string;
  highlight?: string;
  /** Short name for the breadcrumb. Falls back to the title. */
  trailLabel?: string;
  /** Opening sentence on the case page. Falls back to the teaser. */
  lead?: string;
  leadHighlight?: string;
  context?: string;
  problemTitle?: string;
  problemBeats?: string[];
  problem: string;
  solutionTitle?: string;
  solutionBeats?: string[];
  solution: string;
  stack: string[];
  results: CaseStudyResult[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  gallery?: CaseStudyShot[];
}
