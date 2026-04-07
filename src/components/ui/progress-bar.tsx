"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressVariant = "gold" | "blue" | "teal";

interface ProgressBarProps {
  value: number;
  variant?: ProgressVariant;
  className?: string;
}

const variantStyles: Record<ProgressVariant, string> = {
  gold: "gold-gradient",
  blue: "bg-secondary",
  teal: "bg-tertiary",
};

function ProgressBar({
  value,
  variant = "gold",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "w-full h-2 bg-surface-container rounded-full overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          variantStyles[variant]
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { ProgressBar };
export default ProgressBar;
