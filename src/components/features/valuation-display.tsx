"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface ValuationDisplayProps {
  bearCase: number;
  baseCase: number;
  bullCase: number;
  currency?: string;
  isLoading?: boolean;
}

function AnimatedValue({
  value,
  currency,
}: {
  value: number;
  currency: string;
}) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => formatCurrency(Math.round(v), currency));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsub = display.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return unsub;
  }, [display]);

  return <span ref={ref}>{formatCurrency(0, currency)}</span>;
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-surface-container-highest/40",
        className
      )}
    />
  );
}

export function ValuationDisplay({
  bearCase,
  baseCase,
  bullCase,
  currency = "AED",
  isLoading = false,
}: ValuationDisplayProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-2xl p-5",
              i === 1
                ? "bg-surface-container-high border border-primary/30"
                : "bg-surface-container-low"
            )}
          >
            <Skeleton className="h-3 w-16 mb-3" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    );
  }

  const cases = [
    {
      label: "Bear Case",
      value: bearCase,
      bg: "bg-surface-container-low",
      border: "",
      textSize: "text-xl",
    },
    {
      label: "Base Case",
      value: baseCase,
      bg: "bg-surface-container-high",
      border: "border border-primary/40 ring-1 ring-primary/10",
      textSize: "text-3xl",
    },
    {
      label: "Bull Case",
      value: bullCase,
      bg: "bg-surface-container-low",
      border: "",
      textSize: "text-xl",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cases.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className={cn("rounded-2xl p-5 relative", c.bg, c.border)}
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
              {c.label}
            </p>
            {c.label === "Base Case" && (
              <Badge variant="gold" size="sm">
                Our Recommendation
              </Badge>
            )}
          </div>

          <p
            className={cn(
              "font-bold font-mono tabular-nums text-on-surface",
              c.textSize
            )}
          >
            <AnimatedValue value={c.value} currency={currency} />
          </p>
        </motion.div>
      ))}
    </div>
  );
}
