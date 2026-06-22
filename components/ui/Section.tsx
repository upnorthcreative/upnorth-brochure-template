import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  noPaddingTop?: boolean;
}

export function Section({ children, className, id, dark, noPaddingTop }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        noPaddingTop ? "pb-16 sm:pb-20 lg:pb-28" : "py-16 sm:py-20 lg:py-28",
        dark ? "bg-brand text-white" : "bg-white",
        className
      )}
    >
      {children}
    </section>
  );
}
