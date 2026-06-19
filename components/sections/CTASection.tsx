import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="bg-neutral-100 py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: headline + body */}
          <div>
            <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-tighter leading-[1.08] text-neutral-950 mb-5">
              {siteConfig.cta.headline}
            </h2>
            <p className="text-neutral-500 text-[15px] leading-relaxed max-w-md">
              {siteConfig.cta.body}
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex flex-col gap-4 lg:items-end">
            <Button href={siteConfig.cta.cta.href} variant="primary" size="lg" className="w-full sm:w-auto">
              {siteConfig.cta.cta.label}
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 text-[13px]">Or call us directly —</span>
              <a
                href={siteConfig.phoneHref}
                className="text-neutral-950 text-[17px] font-semibold tracking-tight hover:text-neutral-600 transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
