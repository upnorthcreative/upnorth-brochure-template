import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const googleStat = siteConfig.hero.stats.find((s) => s.label === "Google Rating");

interface TestimonialsProps {
  bg?: "soft" | "white";
  noPaddingTop?: boolean;
}

export function TestimonialsSection({ bg = "soft", noPaddingTop }: TestimonialsProps) {
  return (
    <section className={cn(
      bg === "white" ? "bg-white" : "bg-neutral-50",
      noPaddingTop ? "pb-16 sm:pb-20 lg:pb-28" : "py-16 sm:py-20 lg:py-28"
    )}>
      <Container>
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-neutral-400 text-[11px] uppercase tracking-[0.25em] mb-4">
              Client Reviews
            </p>
            <h2 className="text-[2rem] sm:text-[2.625rem] lg:text-[3rem] font-semibold tracking-tighter leading-[1.1]">
              What Our Clients Say
            </h2>
          </div>
          {googleStat && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-neutral-950" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[13px] text-neutral-500">
                {googleStat.value} on Google
              </span>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border border-neutral-200">
          {siteConfig.testimonials.map((t) => (
            <div key={t.name} className="bg-white p-8 lg:p-10 flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-3 h-3 fill-neutral-900" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-neutral-700 text-[14px] sm:text-[15px] leading-relaxed flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="pt-5 border-t border-neutral-100">
                <p className="text-neutral-950 text-[13px] font-semibold">{t.name}</p>
                <p className="text-neutral-400 text-[12px] mt-0.5">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
