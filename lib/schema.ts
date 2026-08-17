// ============================================================
// STRUCTURED DATA — canonical business entity
// ============================================================
//
// One LocalBusiness entity, emitted identically on every page under a single
// stable @id. schema.org consumers merge nodes that share an @id, so this makes
// Google see ONE trusted business instead of a separate, disconnected node per
// page. All values come from siteConfig; empty fields (e.g. unset coordinates)
// are omitted so the markup stays valid for any client.
//
// Usage:
//   businessEntity()  → the full canonical node (spread into a page's JSON-LD)
//   businessRef       → a lightweight { @id } reference (e.g. a Service.provider)
// ============================================================

import { siteConfig } from "@/lib/content";

/** Site-wide stable @id for the one business entity. */
export const businessId = `${siteConfig.seo.siteUrl}/#business`;

/** Reference the canonical entity by @id without redeclaring its properties. */
export const businessRef = { "@id": businessId } as const;

/** The canonical LocalBusiness node. Spread into a page's JSON-LD object. */
export function businessEntity() {
  const { address, geo, seo, serviceAreas } = siteConfig;
  return {
    "@type": seo.localBusinessType,
    "@id": businessId,
    name: siteConfig.name,
    description: seo.defaultDescription,
    url: seo.siteUrl,
    image: `${seo.siteUrl}${seo.ogImage}`,
    priceRange: "$$",
    ...(siteConfig.phone
      ? { telephone: siteConfig.phoneHref.replace("tel:", "") }
      : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(address.street
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.province,
            postalCode: address.postal,
            addressCountry: "CA",
          },
        }
      : {}),
    ...(geo.latitude != null && geo.longitude != null
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
    ...(seo.openingHours.length ? { openingHours: seo.openingHours } : {}),
    ...(serviceAreas.length
      ? {
          areaServed: serviceAreas.map((a) => ({
            "@type": "City",
            name: a.name,
            addressCountry: "CA",
          })),
        }
      : {}),
  };
}
