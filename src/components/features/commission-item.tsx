"use client";

import { cn } from "@/lib/utils";

interface CommissionItemProps {
  projectName: string;
  description: string;
  amount: string;
  status: "invoiced" | "paid" | "pending";
  className?: string;
}

const statusStyles = {
  invoiced: {
    text: "INVOICED",
    amountColor: "text-tertiary",
    labelColor: "text-on-surface-variant/50",
  },
  paid: {
    text: "PAID",
    amountColor: "text-primary",
    labelColor: "text-tertiary",
  },
  pending: {
    text: "PENDING",
    amountColor: "text-on-surface",
    labelColor: "text-on-surface-variant/40",
  },
} as const;

export function CommissionItem({
  projectName,
  description,
  amount,
  status,
  className,
}: CommissionItemProps) {
  const style = statusStyles[status];

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg bg-surface-container border border-white/5",
        status === "pending" && "opacity-60",
        className
      )}
    >
      <div>
        <p className="text-xs font-semibold text-on-surface">{projectName}</p>
        <p className="text-[10px] text-on-surface-variant/40">{description}</p>
      </div>
      <div className="text-right">
        <p className={cn("text-xs font-mono", style.amountColor)}>{amount}</p>
        <p
          className={cn(
            "text-[9px] uppercase font-bold",
            style.labelColor
          )}
        >
          {style.text}
        </p>
      </div>
    </div>
  );
}
