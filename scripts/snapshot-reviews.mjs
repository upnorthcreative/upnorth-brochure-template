// ============================================================
// REVIEWS SNAPSHOT GENERATOR
// ============================================================
//
// Fetches the current Google reviews and writes a known-good snapshot to
// data/reviews-snapshot.json. lib/reviews.ts serves this snapshot as a
// fallback whenever the live API is unavailable, so the Reviews section (and
// the hero rating stat) never go dark during a transient Google outage.
//
// Re-run whenever you want to refresh the fallback:
//
//   npm run snapshot:reviews
//
// Reads GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID from the environment
// (the npm script loads them from .env.local via node --env-file).
//
// NOTE: the normalization below mirrors normalizePlaces() in lib/reviews.ts.
// Keep the two in sync if the Places field mask or shape changes.
// ============================================================

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

if (!apiKey || !placeId) {
  console.error(
    "✗ Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID.\n" +
      "  Run with: node --env-file=.env.local scripts/snapshot-reviews.mjs"
  );
  process.exit(1);
}

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "reviews-snapshot.json"
);

function normalize(data) {
  const rawReviews = Array.isArray(data.reviews) ? data.reviews : [];
  return {
    averageRating: typeof data.rating === "number" ? data.rating : 0,
    totalCount:
      typeof data.userRatingCount === "number" ? data.userRatingCount : 0,
    reviews: rawReviews.map((r, i) => ({
      id: r.name ?? String(i),
      author: r.authorAttribution?.displayName ?? "Anonymous",
      rating: typeof r.rating === "number" ? r.rating : 5,
      text: r.text?.text ?? "",
      date: r.publishTime ?? null,
      relativeTime: r.relativePublishTimeDescription ?? null,
      photoUrl: r.authorAttribution?.photoUri ?? null,
    })),
  };
}

async function main() {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`✗ Places API returned ${res.status}. ${body.slice(0, 300)}`);
    process.exit(1);
  }

  const normalized = normalize(await res.json());

  if (normalized.reviews.length === 0) {
    console.error(
      "✗ API returned no reviews — refusing to overwrite the snapshot with an empty set."
    );
    process.exit(1);
  }

  const snapshot = {
    capturedAt: new Date().toISOString(),
    ...normalized,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + "\n");

  console.log(
    `✓ Wrote ${normalized.reviews.length} reviews ` +
      `(${normalized.averageRating}★, ${normalized.totalCount} total) to data/reviews-snapshot.json`
  );
}

main().catch((err) => {
  console.error("✗ Snapshot failed:", err);
  process.exit(1);
});
