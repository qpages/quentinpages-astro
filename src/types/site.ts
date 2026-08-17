export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  locale: string;
}

export interface SiteProfile {
  firstName: string;
  lastName: string;
  role: string;
  company?: string;
  tagline: string;
  taglineHighlight?: string;
  location: string;
  email: string;
  available: boolean;
  photo?: string;
}

export interface SiteCta {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x";
}

/** External profile links — omit any network you don't use yet. */
export interface SiteLinks {
  github?: string;
  linkedin?: string;
  x?: string;
}

export interface SiteConfig {
  meta: SiteMeta;
  profile: SiteProfile;
  cta: SiteCta;
  ctaSecondary: SiteCta;
  links: SiteLinks;
}

export type BentoCardId =
  "experience" | "playlist" | "reading" | "location" | "work";

export interface BentoCardConfig {
  id: BentoCardId;
  title: string;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  minHeight?: string;
  visible: boolean;
}
