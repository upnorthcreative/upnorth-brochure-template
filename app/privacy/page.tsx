import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { PageBanner } from "@/components/sections/PageBanner";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/privacy`,
  },
  openGraph: {
    url: `${siteConfig.seo.siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageBanner eyebrow="Legal" title="Privacy Policy" />

      <Section>
        <Container narrow>
          <div className="text-neutral-700 space-y-8 text-sm leading-relaxed">
            <p className="text-neutral-400">Last updated: {siteConfig.seo.privacyLastUpdated}</p>

            <div>
              <h2 className="text-base font-semibold text-neutral-950 mb-3">Information We Collect</h2>
              <p>
                When you contact us through our website, we collect your name, email address, phone number,
                and the message you provide. This information is used solely to respond to your inquiry.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-neutral-950 mb-3">How We Use Your Information</h2>
              <p>
                We use the information you provide to respond to your questions, provide estimates,
                and communicate with you about our services. We do not sell, trade, or transfer your
                personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-neutral-950 mb-3">Cookies</h2>
              <p>
                Our website may use cookies and analytics tools (such as Google Analytics) to understand
                how visitors use our site. You can disable cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-neutral-950 mb-3">Third-Party Services</h2>
              <p>
                We may use third-party services including Google Analytics and email delivery services.
                These services have their own privacy policies governing the use of your information.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-neutral-950 mb-3">Data Retention</h2>
              <p>
                We retain contact form submissions for up to 12 months to support follow-up communication.
                You may request deletion of your information at any time by contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-neutral-950 mb-3">Contact</h2>
              <p>
                For privacy-related questions, please use our{" "}
                <Link href="/contact" className="underline">contact form</Link>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
