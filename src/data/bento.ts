import type { BentoCardConfig } from "../types/site";

export const bentoCards: BentoCardConfig[] = [
  {
    id: "experience",
    title: "Experience",
    colSpan: 1,
    rowSpan: 2,
    minHeight: "min-h-80",
    visible: true,
  },
  {
    id: "stack",
    title: "Stack",
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
    minHeight: "min-h-72",
    visible: true,
  },
  {
    id: "playlist",
    title: "Music playlist",
    colSpan: 1,
    rowSpan: 1,
    minHeight: "min-h-72",
    visible: true,
  },
  {
    id: "work",
    title: "How I work",
    colSpan: 2,
    rowSpan: 1,
    minHeight: "min-h-64",
    visible: true,
  },
];
