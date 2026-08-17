import type { APIRoute } from "astro";
import { site } from "../data/site";
import { formatTaglineSvg, getFullName } from "../lib/profile";

export const prerender = true;

export const GET: APIRoute = () => {
  const { role, tagline, taglineHighlight } = site.profile;
  const fullName = getFullName(site.profile);
  const taglineSvg = formatTaglineSvg(tagline, taglineHighlight, escapeXml);
  const siteHost = site.meta.url.replace(/^https?:\/\//, "");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="#09090b"/>
  <rect x="1" y="1" width="1198" height="628" rx="24" stroke="#27272a" stroke-width="2"/>
  <rect x="80" y="80" width="4" height="72" rx="2" fill="#fafafa"/>
  <text x="108" y="132" fill="#fafafa" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="600" letter-spacing="-0.03em">${escapeXml(fullName)}</text>
  <text x="108" y="182" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="500">${escapeXml(role)}</text>
  <text x="108" y="248" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="400">${taglineSvg}</text>
  <text x="108" y="548" fill="#71717a" font-family="ui-monospace, SFMono-Regular, monospace" font-size="22" letter-spacing="0.04em">${escapeXml(siteHost)}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
