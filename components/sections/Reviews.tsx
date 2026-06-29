import { fetchReviews, writeReviewUrl } from "@/lib/reviews";
import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Stars } from "@/components/ui/Stars";
import { ReviewsCarousel, type ReviewCardData } from "@/components/sections/ReviewsCarousel";
import { cn } from "@/lib/utils";

// ── Helpers ─────────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(siteConfig.locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

// ── Section ───────────────────────────────────────────────────────────────────────

interface ReviewsProps {
  bg?: "soft" | "white";
  noPaddingTop?: boolean;
}

export async function Reviews({ bg = "soft", noPaddingTop }: ReviewsProps) {
  const { eyebrow, heading, maxReviews, reviewUrl } = siteConfig.reviews;

  // Live Google reviews only. No hardcoded fallback content — when the API is
  // disabled, unconfigured, or unavailable (and ISR has no last-good cache),
  // the section hides itself so the page never shows stale or fake reviews.
  const data = await fetchReviews();
  const cards: ReviewCardData[] = (data?.reviews ?? [])
    .filter((r) => r.text.trim().length > 0)
    .slice(0, maxReviews)
    .map((r) => ({
      id: r.id,
      author: r.author,
      text: r.text,
      rating: r.rating,
      meta: formatDate(r.date) ?? r.relativeTime,
      photoUrl: r.photoUrl,
    }));

  // Nothing to show — hide the section entirely.
  if (!data || cards.length === 0) return null;

  // Aggregate badge, straight from the live API response.
  const summary = `${data.averageRating.toFixed(1)} · ${data.totalCount.toLocaleString()} Google reviews`;
  const summaryStars = Math.round(data.averageRating);

  // "Write a review" link: config override → Google composer (from Place ID) → maps profile.
  const link =
    reviewUrl === "" ? null : reviewUrl ?? writeReviewUrl() ?? siteConfig.maps.profileUrl;

  return (
    <section
      className={cn(
        bg === "white" ? "bg-white" : "bg-neutral-50",
        noPaddingTop ? "pb-16 sm:pb-20 lg:pb-28" : "py-16 sm:py-20 lg:py-28"
      )}
    >
      <Container>
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-neutral-400 text-[11px] uppercase tracking-[0.25em] mb-4">
              {eyebrow}
            </p>
            <h2 className="text-[2rem] sm:text-[2.625rem] lg:text-[3rem] font-semibold tracking-tighter leading-[1.1]">
              {heading}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 shrink-0">
            <div className="flex items-center gap-2">
              <Stars rating={summaryStars} className="w-3.5 h-3.5" />
              <span className="text-[13px] text-neutral-500">{summary}</span>
            </div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-neutral-300 px-4 py-2 text-[13px] font-medium text-neutral-700 hover:text-brand hover:border-brand transition-colors"
              >
                Write a review
              </a>
            )}
          </div>
        </div>

        {/* Scrollable cards (client component for prev/next) */}
        <ReviewsCarousel cards={cards} />
      </Container>
    </section>
  );
}
