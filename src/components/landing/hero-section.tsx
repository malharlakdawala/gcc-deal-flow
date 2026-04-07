"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Landmark,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const roleCards = [
  {
    icon: Building2,
    title: "For Companies",
    description:
      "Empowering SMEs, Startups, and Family Businesses to access institutional capital and strategic growth debt.",
    cta: "List Your Business",
    borderColor: "border-primary/20",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    ctaVariant: "primary" as const,
  },
  {
    icon: Landmark,
    title: "For Investors",
    description:
      "Direct access to vetted GCC deal flow for Family Offices, HNWIs, and Private Equity / Venture Capital firms.",
    cta: "Access Deal Flow",
    borderColor: "border-secondary/20",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    ctaVariant: "primary" as const,
  },
  {
    icon: Handshake,
    title: "For Advisors",
    description:
      "Providing M&A Advisors, Brokers, and Arrangers with a digital workspace to manage and scale their practice.",
    cta: "Grow Your Practice",
    borderColor: "border-slate-500/20",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-300",
    ctaVariant: "outline" as const,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[920px] flex flex-col justify-center items-center px-8 overflow-hidden bg-[#0A1628]">
      {/* Background overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0A1628]/90 to-background pointer-events-none" />

      {/* Hero text */}
      <motion.div
        className="relative z-10 max-w-[1440px] w-full text-center mb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6">
          The Private Capital{" "}
          <span className="text-primary italic">Infrastructure</span> of the GCC
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Connecting sovereign-grade enterprises with a global network of
          institutional investors and specialized advisors through a unified
          digital ledger.
        </p>
      </motion.div>

      {/* Role cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {roleCards.map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            className={`bg-surface-container-low p-10 rounded-2xl flex flex-col items-start transition-all hover:-translate-y-2 border-l-4 ${card.borderColor}`}
          >
            <div className={`${card.iconBg} p-4 rounded-xl mb-6`}>
              <card.icon className={`${card.iconColor} w-8 h-8`} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              {card.description}
            </p>
            <Button
              variant={card.ctaVariant}
              size="lg"
              className="w-full font-bold"
            >
              {card.cta}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
