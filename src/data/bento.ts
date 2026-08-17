import type { BentoCardConfig } from "../types/site";

export const bentoCards: BentoCardConfig[] = [
  {
    id: "experience",
    title: "My Experience",
    colSpan: 1,
    rowSpan: 2,
    minHeight: "min-h-80",
    visible: true,
  },
  {
    id: "playlist",
    title: "My music playlist",
    colSpan: 1,
    rowSpan: 1,
    minHeight: "min-h-52",
    visible: true,
  },
  {
    id: "reading",
    title: "What I'm reading",
    colSpan: 1,
    rowSpan: 1,
    minHeight: "min-h-52",
    visible: true,
  },
  {
    id: "location",
    title: "Location",
    colSpan: 1,
    rowSpan: 1,
    minHeight: "min-h-52",
    visible: true,
  },
  {
    id: "work",
    title: "How I work",
    colSpan: 2,
    rowSpan: 1,
    minHeight: "min-h-44",
    visible: true,
  },
];
