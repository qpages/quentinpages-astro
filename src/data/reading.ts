import type { CurrentRead, ShelfBook } from "../types/reading";

export const currentRead: CurrentRead = {
  title: "La vie courante",
  subtitle: "Portrait d'un champion du trail",
  author: "François d’Haene",
  publisher: "Guérin / Éditions Paulsen",
  quote: "Mes courses, mes aventures, mes engagements…",
  pages: 192,
  progress: 18,
  cover: "/images/books/la-vie-courante.webp",
  href: "https://www.amazon.fr/dp/B0C44DV2QM",
  published: "4 May 2023",
  format: "15 × 21 cm",
};

/** Finished books on the shelf. */
export const shelf: ShelfBook[] = [
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    cover: "/images/books/the-mom-test.webp",
    href: "https://www.amazon.com/dp/B01H4G2J1U",
    width: 820,
    height: 1280,
  },
  {
    title: "1984",
    author: "George Orwell",
    cover: "/images/books/1984.webp",
    href: "https://www.amazon.com/dp/B003JTHWKU",
    width: 800,
    height: 1200,
  },
  {
    title: "Vivre d’aventures",
    author: "Mathieu Blanchard",
    cover: "/images/books/vivre-d-aventures.webp",
    href: "https://www.amazon.fr/dp/B0BWRNSVGR",
    width: 797,
    height: 1299,
  },
];

/** Page estimate from the stored percent. Display the percent itself for progress. */
export function readingPage(
  book: Pick<CurrentRead, "pages" | "progress">,
): number {
  return Math.round((book.pages * book.progress) / 100);
}
