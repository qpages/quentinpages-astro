import type { SiteConfig } from "../types/site";

export const site: SiteConfig = {
  meta: {
    title: "Quentin Pages — Fullstack Developer",
    description:
      "Portfolio of Quentin Pages, freelance fullstack developer. Web applications, interfaces, and product experiences.",
    url: "https://quentinpages.dev",
    locale: "en_US",
  },
  profile: {
    firstName: "Quentin",
    lastName: "Pages",
    role: "Fullstack Developer",
    tagline: "Building web products for startups and product teams.",
    taglineHighlight: "startups",
    location: "Paris, FR",
    email: "hello@quentinpages.com",
    available: true,
    photo: "/images/avatar.webp",
  },
  cta: {
    label: "Book a call",
    href: "mailto:hello@quentinpages.com",
  },
  ctaSecondary: {
    label: "View work",
    href: "#work",
  },
  links: {
    github: "https://github.com/qpages",
    linkedin: "https://linkedin.com/in/quentinpages",
    x: "https://x.com/ash1sn",
  },
};
