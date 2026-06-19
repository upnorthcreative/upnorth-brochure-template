import { Container } from "@/components/ui/Container";

interface PageBannerProps {
  title: string;
  description?: React.ReactNode;
  eyebrow?: string;
  wide?: boolean;
}

export function PageBanner({ title, description, eyebrow, wide }: PageBannerProps) {
  return (
    <section className="bg-neutral-950 text-white pt-32 pb-14 lg:pt-[8.5rem] lg:pb-16">
      <Container>
        <div className={wide ? undefined : "max-w-3xl"}>
          {eyebrow && (
            <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-6">
              {eyebrow}
            </p>
          )}
          <h1
            className={
              wide
                ? "text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-semibold tracking-tighter leading-[1.06] lg:whitespace-nowrap"
                : "text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-semibold tracking-tighter leading-[1.06]"
            }
          >
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-neutral-400 text-[15px] sm:text-[17px] leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
