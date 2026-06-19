import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden">
      <Container>
        <div className="pt-32 pb-14 lg:pt-[11.5rem] lg:pb-28">
          <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-8">
            {siteConfig.tagline}
          </p>

          <h1 className="text-[2rem] sm:text-[3.75rem] lg:text-[4.5rem] font-semibold tracking-tighter leading-[1.05] mb-7 lg:whitespace-nowrap">
            {hero.headline}
          </h1>

          <p className="text-neutral-400 text-[15px] sm:text-[17px] leading-relaxed mb-10 font-light">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={hero.cta.href} variant="secondary" size="lg">
              {hero.cta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline-dark" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-800">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="bg-neutral-950 py-6 sm:py-8 px-6 sm:px-8">
              <p className="text-white text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
                {stat.value}
              </p>
              <p className="text-neutral-500 text-[12px] tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
