export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function bentoSpanClasses(
  colSpan: 1 | 2,
  rowSpan: 1 | 2,
  minHeight?: string,
): string {
  const col = colSpan === 2 ? "md:col-span-2" : "md:col-span-1";
  const row = rowSpan === 2 ? "md:row-span-2" : "md:row-span-1";
  return cn("col-span-1", col, row, minHeight);
}
