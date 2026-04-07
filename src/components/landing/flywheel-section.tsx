"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Wallet, Wrench } from "lucide-react";

const personaNodes = [
  {
    icon: Building2,
    label: "Companies",
    iconColor: "text-primary",
    position: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  {
    icon: Wallet,
    label: "Investors",
    iconColor: "text-secondary",
    position: "absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  },
  {
    icon: Wrench,
    label: "Advisors",
    iconColor: "text-slate-300",
    position: "absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  },
];

export function FlywheelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-8 bg-background relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto text-center mb-20">
        <motion.h2
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Unified Ecosystem Flywheel
        </motion.h2>
        <motion.p
          className="text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The power of institutional connectivity at scale.
        </motion.p>
      </div>

      <div
        ref={ref}
        className="relative max-w-[800px] mx-auto aspect-square flex items-center justify-center"
      >
        {/* Background glow */}
        <div className="absolute w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />

        {/* Central hub */}
        <motion.div
          className="relative z-20 glass-panel p-12 rounded-full border border-primary/30 sunken-shadow text-center flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <svg
            className="w-14 h-14 text-primary mb-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <div className="text-white font-bold tracking-tighter text-sm">
            THE LEDGER
          </div>
        </motion.div>

        {/* Persona nodes */}
        {personaNodes.map((node, i) => (
          <motion.div
            key={node.label}
            className={`${node.position} z-20 bg-surface-container-high p-6 rounded-2xl border border-white/5 flex flex-col items-center`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          >
            <node.icon className={`${node.iconColor} w-6 h-6 mb-2`} />
            <span className="text-sm font-bold uppercase tracking-widest text-on-surface">
              {node.label}
            </span>
          </motion.div>
        ))}

        {/* Connecting lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E6C364"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke="#E6C364"
            strokeWidth="0.2"
          />
          <line
            x1="50"
            y1="50"
            x2="15"
            y2="85"
            stroke="#E6C364"
            strokeWidth="0.2"
          />
          <line
            x1="50"
            y1="50"
            x2="85"
            y2="85"
            stroke="#E6C364"
            strokeWidth="0.2"
          />
        </svg>
      </div>
    </section>
  );
}
