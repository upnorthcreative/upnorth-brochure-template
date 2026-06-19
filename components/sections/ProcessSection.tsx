import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function ProcessSection() {
  return (
    <section className="bg-neutral-950 text-white py-16 sm:py-20 lg:py-28">
      <Container>
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-4">
              How It Works
            </p>
            <h2 className="text-[2rem] sm:text-[2.625rem] lg:text-[3rem] font-semibold tracking-tighter leading-[1.1] text-white">
              Our Process
            </h2>
          </div>
          <p className="hidden sm:block text-neutral-500 text-[13px] shrink-0 lg:whitespace-nowrap">
            From your first call to final follow-up — here&apos;s what to expect.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-neutral-800">
          {siteConfig.process.map((step, i) => (
            <div
              key={step.step}
              className={[
                "p-6 sm:p-8 lg:p-10",
                i === 1 || i === 3 ? "border-l border-neutral-800" : "",
                i >= 2 ? "border-t border-neutral-800" : "",
                i >= 1 ? "lg:border-l lg:border-neutral-800" : "",
                i >= 2 ? "lg:border-t-0" : "",
              ].filter(Boolean).join(" ")}
            >
              <p className="text-[2.5rem] sm:text-[3.5rem] font-semibold text-neutral-800 mb-6 leading-none tracking-tighter select-none">
                {step.step}
              </p>
              <h3 className="text-[15px] font-semibold mb-2.5 text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
