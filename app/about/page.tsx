import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";
import { fetchReviews, reviewStats } from "@/lib/reviews";
import { PageBanner } from "@/components/sections/PageBanner";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { Reviews } from "@/components/sections/Reviews";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — ${siteConfig.shortDescription}`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/about`,
  },
  openGraph: {
    url: `${siteConfig.seo.siteUrl}/about`,
  },
};

export default async function AboutPage() {
  const { about } = siteConfig;

  // Live Google rating + review count prepended when available; otherwise just
  // the static stats below — same graceful-hide policy as the Reviews section.
  const stats = [...reviewStats(await fetchReviews(), "Google Reviews"), ...about.stats];

  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title={about.headline}
        description={siteConfig.shortDescription}
        wide
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="space-y-6">
              {about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-8 lg:p-10">
                  <p className="text-4xl font-semibold tracking-tighter mb-2">{stat.value}</p>
                  <p className="text-[13px] text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Reviews bg="white" noPaddingTop />
      <CTASection />
    </>
  );
}
