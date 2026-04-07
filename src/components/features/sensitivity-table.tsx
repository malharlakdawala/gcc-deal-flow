"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import type { SensitivityRow } from "@/types/valuation";
import { motion } from "framer-motion";

interface SensitivityTableProps {
  rows: SensitivityRow[];
  currency?: string;
  baselineIndex?: number;
}

export function SensitivityTable({
  rows,
  currency = "AED",
  baselineIndex = 2,
}: SensitivityTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
            <th className="text-left py-3 px-4">Scenario</th>
            <th className="text-right py-3 px-4">Margin %</th>
            <th className="text-right py-3 px-4">Adj. EBITDA</th>
            <th className="text-right py-3 px-4">Valuation</th>
            <th className="text-right py-3 px-4">Premium / Discount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isBaseline = i === baselineIndex;
            const premDisc = row.premium_discount_pct;

            return (
              <motion.tr
                key={row.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                className={cn(
                  isBaseline
                    ? "bg-surface-container-high"
                    : i % 2 === 0
                      ? "bg-surface-container-low"
                      : "bg-transparent"
                )}
              >
                <td className="py-3 px-4 font-medium text-on-surface">
                  {row.label}
                  {isBaseline && (
                    <span className="ml-2 text-[10px] text-primary font-bold uppercase">
                      Current
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-on-surface">
                  {row.margin_pct.toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-on-surface">
                  {formatCurrency(row.adjusted_ebitda, currency)}
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-on-surface font-bold">
                  {formatCurrency(row.valuation, currency)}
                </td>
                <td
                  className={cn(
                    "py-3 px-4 text-right font-mono tabular-nums font-medium",
                    premDisc > 0
                      ? "text-green-400"
                      : premDisc < 0
                        ? "text-red-400"
                        : "text-on-surface-variant"
                  )}
                >
                  {premDisc === 0
                    ? "---"
                    : `${premDisc > 0 ? "+" : ""}${premDisc.toFixed(1)}%`}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
