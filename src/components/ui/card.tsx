import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-2xl", {
  variants: {
    variant: {
      default: "bg-surface-container-low",
      elevated: "bg-surface-container-high sunken-shadow",
      glass: "glass-panel",
      ai: "bg-surface-container-low border-s-4 border-secondary bg-gradient-to-r from-secondary/5 to-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  padding?: boolean;
}

function Card({
  className,
  variant,
  padding = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant }), padding && "p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, cardVariants };
export default Card;
