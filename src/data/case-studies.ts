import type { CaseStudy } from "../types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    slug: "mozza-dog-shop",
    title: "Client photo space for a dog concept store",
    client: "Mozza Dog Shop · Strasbourg",
    year: "2026",
    role: "Independent Product Engineer",
    featured: true,
    teaser:
      "Each participant keeps every shooting. The email-a-link step is gone.",
    highlight: "In production",
    trailLabel: "Mozza Dog Shop",
    lead: "The brief was not another website. It was a task that returned",
    leadHighlight: "after every shooting.",
    context:
      "Mozza Dog Shop is a concept store in Strasbourg, France: shop, café, and dog wash. Mickael and Margaux run photo sessions with their clients and their dogs.",
    problemTitle: "The loop",
    problemBeats: [
      "Upload the photos to a transfer service",
      "Copy the link",
      "Send the link by email",
    ],
    problem:
      "Before, that was every shooting. One is manageable. It stops being manageable when participants and sessions pile up.",
    solutionTitle: "The space",
    solutionBeats: [
      "Enter the email from the shooting. No account to create.",
      "One session opens the gallery. Several appear as a list, including the upcoming session.",
      "Download a photo, or the whole set as a ZIP.",
    ],
    solution:
      "Now they upload once from the admin. The transfer link is no longer the product.",
    stack: [
      "Astro",
      "React",
      "Fastify",
      "PostgreSQL",
      "TypeScript",
      "Drizzle",
      "Cloudflare R2",
      "Coolify",
    ],
    results: [
      { label: "Client", value: "Email in, photos out" },
      { label: "Files", value: "Gallery and ZIP" },
      { label: "Studio", value: "Two admins" },
    ],
    liveUrl: "https://mozza-web.quentinpages.dev",
    repoUrl: "https://github.com/qpages/mozza-dog-shop-monorepo",
    caseStudyUrl: "/work/mozza-dog-shop",
    gallery: [
      {
        src: "/images/work/mozza/entry.webp",
        caption: "Entry",
        alt: "Mozza photo page. The client enters the email from the shooting to open their photos.",
      },
      {
        src: "/images/work/mozza/gallery.webp",
        caption: "Gallery",
        alt: "Client gallery for Premier anniversaire du Mozza Dog Shop, with seven photos and a ZIP download.",
      },
      {
        src: "/images/work/mozza/admin.webp",
        caption: "Admin",
        alt: "Admin view of Premier anniversaire du Mozza Dog Shop, with participants, dog names, and photo import.",
      },
    ],
  },
];

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
