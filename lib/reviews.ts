// ============================================================
// GOOGLE REVIEWS — server-side fetching
// ============================================================
//
// Provider-agnostic review fetching for the Reviews section.
//
// - Runs server-side only. API credentials are read from environment
//   variables and are never exposed to the client bundle.
// - Responses are cached (revalidated hourly) to stay within Google API
//   quotas and keep pages fast.
// - Returns `null` whenever the integration is disabled, misconfigured, or
//   the upstream API fails. There is no hardcoded fallback content — the
//   Reviews section simply hides itself, so the page never breaks or shows
//   stale/fake reviews.
//
// Provider switch lives in lib/content.ts → siteConfig.reviews.provider:
//   "places" — Google Places API (available now)
//   "gbp"    — Google Business Profile API (pending approval; stubbed below)
// ============================================================

import type { ReviewProvider, Stat } from "@/types";
import { siteConfig } from "@/lib/content";

/** Normalized review, independent of the source API. */
export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  /** ISO timestamp, when available */
  date: string | null;
  /** e.g. "3 months ago", when available */
  relativeTime: string | null;
  photoUrl: string | null;
}

/** Normalized aggregate + reviews payload. */
export interface ReviewsData {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

/** Cache Google responses for one hour (see lib/content.ts notes). */
const REVALIDATE_SECONDS = 3600;

/**
 * Fetch Google reviews using the provider configured in siteConfig.reviews.
 * Returns null when disabled, misconfigured, or unavailable.
 */
export async function fetchReviews(): Promise<ReviewsData | null> {
  const { enabled, provider } = siteConfig.reviews;
  if (!enabled) return null;

  const source = provider as ReviewProvider;
  switch (source) {
    case "places":
      return fetchPlacesReviews();
    case "gbp":
      return fetchBusinessProfileReviews();
    default:
      return null;
  }
}

/**
 * Build the review-derived stats (rating + count) from a live API response,
 * ready to merge into a stats grid (hero, about, etc.).
 *
 * Returns [] when there's no usable data, so callers can omit these stats
 * entirely — the same graceful-hide policy as the Reviews section. No
 * stale/fake numbers are ever shown. `countLabel` lets each surface label the
 * review count to taste ("Reviews", "Google Reviews", …).
 */
export function reviewStats(
  data: ReviewsData | null,
  countLabel = "Reviews"
): Stat[] {
  if (!data || data.totalCount <= 0) return [];
  return [
    { value: `${data.averageRating.toFixed(1)} ★`, label: "Google Rating" },
    { value: data.totalCount.toLocaleString(), label: countLabel },
  ];
}

/**
 * Direct "write a review" URL for the configured Google place — opens Google's
 * review composer. Returns null when no Place ID is set (server-side only).
 */
export function writeReviewUrl(): string | null {
  const placeId = process.env.GOOGLE_PLACE_ID;
  return placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : null;
}

// ── Google Places API ──────────────────────────────────────────────────────────

async function fetchPlacesReviews(): Promise<ReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Missing credentials → fall back gracefully.
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );

    if (!res.ok) return null;

    const data = (await res.json()) as Record<string, unknown>;
    return normalizePlaces(data);
  } catch {
    return null;
  }
}

function normalizePlaces(data: Record<string, unknown>): ReviewsData {
  const rawReviews = Array.isArray(data.reviews) ? data.reviews : [];

  return {
    averageRating: typeof data.rating === "number" ? data.rating : 0,
    totalCount:
      typeof data.userRatingCount === "number" ? data.userRatingCount : 0,
    reviews: rawReviews.map((raw, i): Review => {
      const r = raw as Record<string, unknown>;
      const author = r.authorAttribution as Record<string, string> | undefined;
      const text = r.text as Record<string, string> | undefined;

      return {
        id: (r.name as string) ?? String(i),
        author: author?.displayName ?? "Anonymous",
        rating: typeof r.rating === "number" ? r.rating : 5,
        text: text?.text ?? "",
        date: (r.publishTime as string) ?? null,
        relativeTime: (r.relativePublishTimeDescription as string) ?? null,
        photoUrl: author?.photoUri ?? null,
      };
    }),
  };
}

// ── Google Business Profile API ──────────────────────────────────────────────────

/**
 * Google Business Profile (GBP) API integration.
 *
 * GBP API access is pending approval. Until then this returns null so the
 * Reviews section hides itself. Once approved, implement the My Business API
 * call here and flip siteConfig.reviews.provider to "gbp" — no component
 * changes required.
 */
async function fetchBusinessProfileReviews(): Promise<ReviewsData | null> {
  return null;
}
