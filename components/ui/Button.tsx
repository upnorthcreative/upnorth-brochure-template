import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "outline-dark" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-neutral-950 text-white hover:bg-neutral-800 border border-neutral-950",
  secondary:
    "bg-white text-neutral-950 hover:bg-neutral-100 border border-white",
  outline:
    "bg-transparent text-neutral-950 hover:bg-neutral-950 hover:text-white border border-neutral-950",
  "outline-dark":
    "bg-transparent text-neutral-400 hover:text-white hover:border-neutral-400 border border-neutral-700",
  ghost:
    "bg-transparent text-neutral-950 hover:underline border border-transparent",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium tracking-normal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-950 disabled:opacity-40 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
