import { URSSAF_YEAR } from "./urssaf";

export interface ToolItem {
  slug: string;
  title: string;
  teaser: string;
  highlight?: string;
  tags: string[];
  metaDescription: string;
}

export const tools: ToolItem[] = [
  {
    slug: "urssaf",
    title: "Net to invoice",
    teaser:
      "The net you want to keep, after URSSAF or portage — or what’s left of a billed amount.",
    highlight: `URSSAF ${URSSAF_YEAR}`,
    tags: ["Micro-enterprise", "Portage", "France"],
    metaDescription: `URSSAF ${URSSAF_YEAR} simulator: how much to invoice to keep a net, or what’s left of a billed amount. Micro-enterprise and portage, indicative.`,
  },
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return tools.find((tool) => tool.slug === slug);
}
