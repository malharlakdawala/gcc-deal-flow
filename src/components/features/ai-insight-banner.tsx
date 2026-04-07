"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

type BannerVariant = "info" | "warning" | "predictive";

interface AIInsightBannerProps {
  message: string;
  variant?: BannerVariant;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const variantStyles: Record<BannerVariant, { border: string; icon: string; gradient: string }> = {
  info: {
    border: "border-secondary",
    icon: "text-secondary",
    gradient: "from-secondary/5 to-transparent",
  },
  warning: {
    border: "border-amber-500",
    icon: "text-amber-400",
    gradient: "from-amber-500/5 to-transparent",
  },
  predictive: {
    border: "border-secondary",
    icon: "text-secondary",
    gradient: "from-secondary/8 to-transparent",
  },
};

export function AIInsightBanner({
  message,
  variant = "info",
  onDismiss,
  actionLabel,
  onAction,
}: AIInsightBannerProps) {
  const [visible, setVisible] = useState(true);
  const styles = variantStyles[variant];

  function handleDismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className={cn(
            "relative bg-surface-container-low border-s-4 rounded-2xl p-4 bg-gradient-to-r",
            styles.border,
            styles.gradient
          )}
        >
          <div className="flex items-start gap-3">
            <Sparkles className={cn("w-5 h-5 mt-0.5 shrink-0", styles.icon)} />

            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <Badge variant="ai" size="sm">
                  AI
                </Badge>
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                {message}
              </p>

              {variant === "predictive" && actionLabel && onAction && (
                <Button
                  onClick={onAction}
                  className="mt-3 bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-bold px-4 py-1.5 rounded-lg"
                >
                  {actionLabel}
                </Button>
              )}
            </div>

            <button
              onClick={handleDismiss}
              className="text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
