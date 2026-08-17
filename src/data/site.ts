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
    lastName: "Pagès",
    role: "Product Full-Stack Engineer",
    tagline: "Building web products for startups and product teams.",
    taglineHighlight: "startups",
    location: "France",
    city: "Paris",
    timezone: "Europe/Paris",
    remoteFriendly: true,
    mapCoordinates: { lat: 48.8566, lng: 2.3522 },
    locationPhoto: "/images/paris-street.webp",
    email: "hello@quentinpages.com",
    available: true,
    availabilityLabel: "Available from October",
    updatedAt: "2026-08-18",
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
