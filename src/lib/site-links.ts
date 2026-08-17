import type { NavLink, SiteLinks, SocialLink } from "../types/site";

export function buildNavLinks(links: SiteLinks): NavLink[] {
  const nav: NavLink[] = [{ label: "Work", href: "#work" }];

  if (links.github) {
    nav.push({ label: "GitHub", href: links.github, external: true });
  }

  return nav;
}

export function buildSocialLinks(links: SiteLinks): SocialLink[] {
  const social: SocialLink[] = [];

  if (links.github) {
    social.push({ label: "GitHub", href: links.github, icon: "github" });
  }

  if (links.linkedin) {
    social.push({ label: "LinkedIn", href: links.linkedin, icon: "linkedin" });
  }

  if (links.x) {
    social.push({ label: "X", href: links.x, icon: "x" });
  }

  return social;
}
