export function parseCityFromLocation(location: string): string {
  return location.split(",")[0]?.trim() ?? location;
}

export function formatLocalTime(timezone: string, date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatUtcOffset(timezone: string, date = new Date()): string {
  const part = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((entry) => entry.type === "timeZoneName");

  const offset = part?.value ?? "UTC";
  return offset.replace(/^GMT/i, "UTC");
}

export function getMapsUrl(coordinates: { lat: number; lng: number }): string {
  return `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
}
