"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Handshake,
  PieChart,
  Rocket,
  Banknote,
  Landmark,
} from "lucide-react";

const dealTypes = [
  {
    icon: TrendingUp,
    title: "Equity Fundraise",
    description:
      "Direct equity placements for series A-C rounds and growth capital.",
    timeline: "90-120 Days",
  },
  {
    icon: Handshake,
    title: "M&A / Full Sale",
    description:
      "Discreet, high-value exits and divestments for established GCC entities.",
    timeline: "120-180 Days",
  },
  {
    icon: PieChart,
    title: "Partial Sale / PE Growth",
    description:
      "Strategic carve-outs and secondary sales for family business liquidity.",
    timeline: "90-120 Days",
  },
  {
    icon: Rocket,
    title: "Startup Fundraise",
    description:
      "Structured early-stage rounds for technology ventures in the region.",
    timeline: "60-90 Days",
  },
  {
    icon: Banknote,
    title: "Working Capital Debt",
    description:
      "Short-term liquidity solutions via institutional lender partners.",
    timeline: "30-45 Days",
  },
  {
    icon: Landmark,
    title: "Acquisition Finance",
    description:
      "Leveraged buyout structures for regional consolidation strategies.",
    timeline: "60-90 Days",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function DealTypesSection() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Digital Dealroom
          </motion.h2>
          <motion.p
            className="text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Supporting the full lifecycle of corporate financing in the region.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {dealTypes.map((deal) => (
            <motion.div
              key={deal.title}
              variants={cardVariants}
              className="bg-surface-container p-8 rounded-2xl hover:bg-surface-container-high transition-colors group cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <deal.icon className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  {deal.timeline}
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {deal.title}
              </h4>
              <p className="text-slate-400 text-sm">{deal.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
