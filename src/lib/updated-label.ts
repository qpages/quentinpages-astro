const MS_PER_DAY = 86_400_000;

export function daysSince(date: Date, now = Date.now()): number {
  return Math.max(0, Math.floor((now - date.getTime()) / MS_PER_DAY));
}

export function formatUpdatedLabel(date: Date, now = Date.now()): string {
  const days = daysSince(date, now);

  if (days === 0) return "Updated today.";
  if (days === 1) return "Updated 1 day ago.";
  return `Updated ${days} days ago.`;
}
