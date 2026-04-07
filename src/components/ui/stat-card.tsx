import * as React from "react";
import { cn } from "@/lib/utils";

type AccentColor = "primary" | "secondary" | "tertiary" | "error";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  subtitle?: string;
  delta?: string;
  accentColor?: AccentColor;
}

const borderColorMap: Record<AccentColor, string> = {
  primary: "border-primary",
  secondary: "border-secondary",
  tertiary: "border-tertiary",
  error: "border-error",
};

const deltaColor = (delta: string) => {
  if (delta.startsWith("+")) return "text-tertiary";
  if (delta.startsWith("-")) return "text-error";
  return "text-on-surface-variant";
};

function StatCard({
  label,
  value,
  subtitle,
  delta,
  accentColor = "primary",
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-low rounded-2xl py-8 px-6 border-s-4",
        borderColorMap[accentColor],
        className
      )}
      {...props}
    >
      <p className="uppercase tracking-wider text-xs text-on-surface-variant mb-2">
        {label}
      </p>
      <p className="font-mono text-3xl tabular-nums text-on-surface font-semibold">
        {value}
      </p>
      {(subtitle || delta) && (
        <div className="flex items-center gap-2 mt-2">
          {subtitle && (
            <span className="text-sm text-on-surface-variant">{subtitle}</span>
          )}
          {delta && (
            <span className={cn("text-sm font-medium", deltaColor(delta))}>
              {delta}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { StatCard };
export default StatCard;
