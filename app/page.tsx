import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Reviews } from "@/components/sections/Reviews";
import { FAQSection } from "@/components/sections/FAQSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.seo.siteUrl },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <Reviews />
      <FAQSection />
      <GalleryPreview />
      <CTASection />
    </>
  );
}
