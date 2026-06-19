import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface ServiceAreasSectionProps {
  noPaddingTop?: boolean;
}

export function ServiceAreasSection({ noPaddingTop }: ServiceAreasSectionProps) {
  const { serviceAreas, serviceRadius, address } = siteConfig;

  return (
    <Section noPaddingTop={noPaddingTop}>
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-neutral-400 text-[11px] uppercase tracking-[0.25em] mb-4">
              Where We Work
            </p>
            <h2 className="text-[2rem] sm:text-[2.625rem] lg:text-[3rem] font-semibold tracking-tighter leading-[1.1]">
              Service Areas
            </h2>
          </div>
          <p className="text-neutral-500 text-[14px] sm:text-right lg:whitespace-nowrap">
            Based in {address.city} — serving {serviceRadius}.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
          {serviceAreas.map((area) => (
            <div key={area.name} className="bg-white px-6 py-5">
              <p className="text-[15px] font-medium text-neutral-900">{area.name}</p>
              {area.distance && (
                <p className="text-[12px] text-neutral-400 mt-0.5">{area.distance}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
