"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AIIntelligenceWidgetProps {
  context: string;
  tips: string[];
  className?: string;
}

function AIIntelligenceWidgetInner({
  tips,
  className,
}: Omit<AIIntelligenceWidgetProps, "context">) {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (tips.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return <AIIntelligenceWidgetView currentTip={currentTip} tips={tips} className={className} />;
}

export function AIIntelligenceWidget({ context, tips, className }: AIIntelligenceWidgetProps) {
  // Reset tip index when context changes by remounting via key
  return <AIIntelligenceWidgetInner key={context} tips={tips} className={className} />;
}

function AIIntelligenceWidgetView({ currentTip, tips, className }: { currentTip: number; tips: string[]; className?: string }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn("glass-panel rounded-2xl p-5 max-w-xs", className)}
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-secondary"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
          Wealth Intelligence
        </span>
      </div>

      <motion.p
        key={`tip-${currentTip}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm text-on-surface leading-relaxed"
      >
        {tips[currentTip] ?? "Analyzing your selection..."}
      </motion.p>

      {tips.length > 1 && (
        <div className="flex gap-1 mt-3">
          {tips.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === currentTip
                  ? "w-4 bg-secondary"
                  : "w-1.5 bg-surface-container-highest"
              )}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
