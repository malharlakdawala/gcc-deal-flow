"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "AED 2.4Bn+", label: "Deal Flow" },
  { value: "1,200+", label: "Verified Investors" },
  { value: "85+", label: "Lender Partners" },
  { value: "340+", label: "Companies Listed" },
];

function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setDisplayed(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      className="flex items-center space-x-4"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span
        className={`text-primary text-3xl font-bold font-mono tracking-tight tabular-nums transition-opacity duration-500 ${
          displayed ? "opacity-100" : "opacity-0"
        }`}
      >
        {value}
      </span>
      <span className="text-slate-400 text-sm font-light uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

export function StatsBar() {
  return (
    <section className="bg-background py-12 border-y border-primary/10">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-wrap justify-between gap-8">
        {stats.map((stat, i) => (
          <AnimatedStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            delay={i * 0.15}
          />
        ))}
      </div>
    </section>
  );
}
