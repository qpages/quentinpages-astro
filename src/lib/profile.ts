import type { SiteProfile } from "../types/site";

export function getFullName(
  profile: Pick<SiteProfile, "firstName" | "lastName">,
): string {
  return `${profile.firstName} ${profile.lastName}`;
}

export interface TaglinePart {
  text: string;
  highlight?: boolean;
}

export function getTaglineParts(
  tagline: string,
  highlight?: string,
): TaglinePart[] {
  if (!highlight || !tagline.includes(highlight)) {
    return [{ text: tagline }];
  }

  const index = tagline.indexOf(highlight);
  const parts: TaglinePart[] = [];

  if (index > 0) {
    parts.push({ text: tagline.slice(0, index) });
  }

  parts.push({ text: highlight, highlight: true });

  const after = tagline.slice(index + highlight.length);
  if (after) {
    parts.push({ text: after });
  }

  return parts;
}

export function formatTaglineSvg(
  tagline: string,
  highlight?: string,
  escape: (value: string) => string = (value) => value,
): string {
  const parts = getTaglineParts(tagline, highlight);

  return parts
    .map((part) =>
      part.highlight
        ? `<tspan fill="#fafafa" font-style="italic">${escape(part.text)}</tspan>`
        : escape(part.text),
    )
    .join("");
}
