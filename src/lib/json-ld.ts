import type { SiteConfig } from "../types/site";
import { getFullName } from "./profile";

type JsonLdIdRef = { "@id": string };

type JsonLdPerson = {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  email: string;
  jobTitle: string;
  description: string;
  image?: string;
  address?: {
    "@type": "PostalAddress";
    addressLocality?: string;
    addressCountry?: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  sameAs?: string[];
};

type JsonLdWebSite = {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  publisher: JsonLdIdRef;
  mainEntity: JsonLdIdRef;
};

export type SiteJsonLd = {
  "@context": "https://schema.org";
  "@graph": [JsonLdPerson, JsonLdWebSite];
};

function toAbsoluteUrl(origin: string, path: string): string {
  return new URL(path, `${origin}/`).href;
}

function toBcp47Locale(locale: string): string {
  return locale.replace("_", "-");
}

function buildSameAs(links: SiteConfig["links"]): string[] | undefined {
  const urls = [links.linkedin, links.github, links.x].filter(
    (url): url is string => Boolean(url),
  );

  return urls.length > 0 ? urls : undefined;
}

export function buildSiteJsonLd(
  config: SiteConfig,
  siteOrigin: string,
): SiteJsonLd {
  const personId = `${siteOrigin}/#person`;
  const websiteId = `${siteOrigin}/#website`;
  const { meta, profile, links } = config;
  const fullName = getFullName(profile);

  const person: JsonLdPerson = {
    "@type": "Person",
    "@id": personId,
    name: fullName,
    url: siteOrigin,
    email: profile.email,
    jobTitle: profile.role,
    description: profile.tagline,
  };

  if (profile.photo) {
    person.image = toAbsoluteUrl(siteOrigin, profile.photo);
  }

  if (profile.city || profile.location) {
    person.address = {
      "@type": "PostalAddress",
      ...(profile.city && { addressLocality: profile.city }),
      ...(profile.location && { addressCountry: profile.location }),
    };
  }

  if (profile.mapCoordinates) {
    person.geo = {
      "@type": "GeoCoordinates",
      latitude: profile.mapCoordinates.lat,
      longitude: profile.mapCoordinates.lng,
    };
  }

  const sameAs = buildSameAs(links);
  if (sameAs) {
    person.sameAs = sameAs;
  }

  const website: JsonLdWebSite = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteOrigin,
    name: meta.title,
    description: meta.description,
    inLanguage: toBcp47Locale(meta.locale),
    publisher: { "@id": personId },
    mainEntity: { "@id": personId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website],
  };
}
