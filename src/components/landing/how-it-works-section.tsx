"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs } from "@/components/ui/tabs";
import type { TabItem } from "@/components/ui/tabs";

const tabItems: TabItem[] = [
  { label: "Companies", value: "companies" },
  { label: "Investors", value: "investors" },
  { label: "Advisors", value: "advisors" },
];

interface Step {
  number: number;
  title: string;
  description: string;
}

const stepsData: Record<string, Step[]> = {
  companies: [
    {
      number: 1,
      title: "Build Profile",
      description:
        "Upload your pitch deck and financial data to our secure digital vault.",
    },
    {
      number: 2,
      title: "AI-Matching",
      description:
        "Our engine identifies the most relevant institutional matches for your deal.",
    },
    {
      number: 3,
      title: "Secure Closing",
      description:
        "Execute NDAs, manage VDRs, and close the transaction on-platform.",
    },
  ],
  investors: [
    {
      number: 1,
      title: "Set Mandate",
      description:
        "Define your investment thesis, sector focus, and ticket size preferences.",
    },
    {
      number: 2,
      title: "Review Pipeline",
      description:
        "Access curated deal flow matched to your mandate with full data rooms.",
    },
    {
      number: 3,
      title: "Deploy Capital",
      description:
        "Conduct due diligence, negotiate terms, and close deals seamlessly.",
    },
  ],
  advisors: [
    {
      number: 1,
      title: "Onboard Clients",
      description:
        "Bring your portfolio of companies onto the platform with dedicated workspaces.",
    },
    {
      number: 2,
      title: "Manage Deals",
      description:
        "Track multiple mandates, coordinate with investors, and manage timelines.",
    },
    {
      number: 3,
      title: "Earn & Scale",
      description:
        "Close more deals with institutional tools and grow your advisory practice.",
    },
  ],
};

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState("companies");

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How it Works
          </motion.h2>
          <Tabs
            items={tabItems}
            value={activeTab}
            onChange={setActiveTab}
            className="bg-background"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0" />

            {stepsData[activeTab].map((step) => (
              <div
                key={step.number}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-background border-4 border-surface-container flex items-center justify-center text-primary text-2xl font-bold mb-6 sunken-shadow">
                  {step.number}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
