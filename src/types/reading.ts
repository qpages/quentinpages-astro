export interface CurrentRead {
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  quote: string;
  pages: number;
  /** Whole percent, 0–100. The bar reads this value, not a page ratio. */
  progress: number;
  cover: string;
  href: string;
  published: string;
  format: string;
}

/** A finished book on the shelf. */
export interface ShelfBook {
  title: string;
  author: string;
  cover: string;
  href: string;
  width: number;
  height: number;
}
