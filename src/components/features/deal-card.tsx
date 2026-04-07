"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Factory,
  ShoppingBasket,
  Landmark,
  HeartPulse,
  Truck,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export interface DealCardData {
  id: string;
  anonymizedName: string;
  sector: string;
  location: string;
  seekingAmount: string;
  icon: string;
  shariaCompliant?: boolean;
  metrics: { label: string; value: string }[];
  investorCount: number;
  ctaLabel?: string;
}

const iconMap: Record<string, LucideIcon> = {
  factory: Factory,
  retail: ShoppingBasket,
  fintech: Landmark,
  healthcare: HeartPulse,
  logistics: Truck,
  agritech: Wheat,
};

export function DealCard({ deal }: { deal: DealCardData }) {
  const Icon = iconMap[deal.icon] || Factory;

  return (
    <motion.div
      className="bg-surface-container-low rounded-2xl p-6 group hover:bg-surface-container transition-all duration-300"
      whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(7,19,37,0.4)" }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg blur-[3px] select-none text-on-surface">
                {deal.anonymizedName}
              </h3>
              {deal.shariaCompliant && (
                <Badge variant="sharia" size="sm">
                  Sharia Compliant
                </Badge>
              )}
            </div>
            <p className="text-xs text-on-surface-variant">
              {deal.sector} &bull; {deal.location}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
            Seeking
          </p>
          <p className="font-bold font-mono tabular-nums text-primary">
            {deal.seekingAmount}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {deal.metrics.map((m) => (
          <div
            key={m.label}
            className="bg-surface-container-lowest p-3 rounded-lg"
          >
            <p className="text-[10px] text-on-surface-variant uppercase font-bold">
              {m.label}
            </p>
            <p className="text-sm font-bold font-mono tabular-nums text-on-surface">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {[...Array(Math.min(deal.investorCount, 2))].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center"
            >
              <span className="text-[10px] font-bold text-on-surface-variant">
                {String.fromCharCode(65 + i)}
              </span>
            </div>
          ))}
          {deal.investorCount > 2 && (
            <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
              +{deal.investorCount - 2}
            </div>
          )}
        </div>
        <button className="text-primary hover:text-on-surface transition-colors text-sm font-bold flex items-center gap-1">
          {deal.ctaLabel || "View Deal Memo"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
