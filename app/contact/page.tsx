import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";
import { PageBanner } from "@/components/sections/PageBanner";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}. Call ${siteConfig.phone} or send us a message for a free estimate.`,
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Contact Us"
        title="Get a Free Estimate"
        description={<>Call us at <a href={siteConfig.phoneHref} className="text-white hover:text-neutral-300 transition-colors">{siteConfig.phone}</a> or send a message below — we typically respond within one business day.</>}
        wide
      />
      <ContactSection />
    </>
  );
}
