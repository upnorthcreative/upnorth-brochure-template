import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { GoogleMap } from "@/components/sections/GoogleMap";

export function ContactSection() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-20">
          {/* Info */}
          <div>
            <p className="text-neutral-400 text-[11px] uppercase tracking-[0.2em] mb-4">Get in Touch</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-10">
              Let&apos;s Talk
            </h2>

            <div className="space-y-8 mb-12">
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-2">Phone</p>
                <a href={siteConfig.phoneHref} className="text-[17px] font-medium hover:opacity-60 transition-opacity">
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-2">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-[17px] font-medium hover:opacity-60 transition-opacity">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-2">Address</p>
                <p className="text-[17px] font-medium">{siteConfig.address.full}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-3">Hours</p>
                <div className="space-y-2">
                  {siteConfig.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-8 text-[13px]">
                      <span className="text-neutral-500">{h.days}</span>
                      <span className="font-medium text-neutral-900">{h.time}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[12px] text-neutral-400">{siteConfig.emergency}</p>
              </div>
            </div>

            <GoogleMap />
          </div>

          {/* Form */}
          <div>
            <p className="text-neutral-400 text-[11px] uppercase tracking-[0.2em] mb-4">Free Estimate</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-10">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
