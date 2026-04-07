import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-surface-container-high text-on-surface",
        gold: "bg-primary text-on-primary",
        ai: "bg-secondary-container text-secondary",
        sharia: "bg-tertiary text-on-tertiary",
        error: "bg-error-container text-on-error-container",
        // NDA status variants
        pending: "border border-amber-500/30 text-amber-400 bg-amber-500/10",
        sent: "border border-blue-500/30 text-blue-400 bg-blue-500/10",
        signing: "border border-orange-500/30 text-orange-400 bg-orange-500/10",
        signed: "border border-teal-500/30 text-teal-400 bg-teal-500/10",
        expired: "border border-red-500/30 text-red-400 bg-red-500/10",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

const CrescentIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M5 1C3.067 1.5 1.5 3.067 1.5 5.5S3.067 9.5 5 10c-2.5-.5-4-2.5-4-4.5S2.5 1.5 5 1z"
      fill="currentColor"
    />
    <circle cx="7" cy="3" r="1" fill="currentColor" />
  </svg>
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {variant === "sharia" && <CrescentIcon />}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
export default Badge;
