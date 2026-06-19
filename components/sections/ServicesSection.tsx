import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface ServicesSectionProps {
  hideHeading?: boolean;
}

export function ServicesSection({ hideHeading }: ServicesSectionProps) {
  return (
    <Section>
      <Container>
        {!hideHeading && (
          <div className="mb-12 sm:mb-16">
            <p className="text-neutral-400 text-[11px] uppercase tracking-[0.25em] mb-4">
              What We Do
            </p>
            <h2 className="text-[2rem] sm:text-[2.625rem] lg:text-[3rem] font-semibold tracking-tighter leading-[1.1]">
              Our Services
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
          {siteConfig.services.map((service, i) => (
            <div key={service.slug} className="relative bg-white p-8 lg:p-10 group hover:bg-neutral-50 transition-colors duration-200">
              <p className="text-[11px] text-neutral-400 font-medium tracking-[0.2em] mb-8">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[17px] font-semibold tracking-tight mb-3 leading-snug">
                {service.title}
              </h3>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
                {service.description}
              </p>
              <span className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-lg select-none" aria-hidden="true">
                →
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
