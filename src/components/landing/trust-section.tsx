"use client";

import { motion } from "framer-motion";
import { Moon, Globe, MapPin } from "lucide-react";

const regulators = ["DFSA", "ADGM", "SCA", "CMA", "QFC", "CBB"];

const badges = [
  {
    icon: Moon,
    label: "Sharia-ready",
    colorClass: "text-tertiary",
    bgClass: "bg-tertiary/10",
    borderClass: "border-tertiary/20",
  },
  {
    icon: Globe,
    label: "Bilingual",
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    borderClass: "border-primary/20",
  },
  {
    icon: MapPin,
    label: "GCC-native",
    colorClass: "text-secondary",
    bgClass: "bg-secondary/10",
    borderClass: "border-secondary/20",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.div
            className="flex flex-wrap justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {regulators.map((reg) => (
              <div
                key={reg}
                className="text-xl font-bold tracking-widest text-on-surface"
              >
                {reg}
              </div>
            ))}
          </motion.div>

          <div className="flex space-x-6">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className={`${badge.bgClass} px-4 py-2 rounded-full flex items-center space-x-2 border ${badge.borderClass}`}
              >
                <badge.icon className={`${badge.colorClass} w-4 h-4`} />
                <span
                  className={`${badge.colorClass} text-xs font-bold uppercase tracking-widest`}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
