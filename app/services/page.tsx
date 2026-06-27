import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";
import { PageBanner } from "@/components/sections/PageBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore the plumbing services offered by ${siteConfig.name}. Emergency repairs, drain cleaning, water heaters, renovations, and more.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/services`,
  },
  openGraph: {
    url: `${siteConfig.seo.siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="What We Offer"
        title="Our Services"
        description="From emergency repairs to full renovations — residential and commercial, done right."
        wide
      />
      <ServicesSection hideHeading />
      <ServiceAreasSection noPaddingTop />
      <ProcessSection />
      <CTASection />
    </>
  );
}
