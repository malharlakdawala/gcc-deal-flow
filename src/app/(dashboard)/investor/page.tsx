"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DonutChart } from "@/components/ui/donut-chart";
import { DealCard, type DealCardData } from "@/components/features/deal-card";
import {
  Calendar,
  Search,
  SlidersHorizontal,
  Star,
  ArrowRight,
  Users,
  Network,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Mock Data ──────────────────────────────────────────────

const digestDeals = [
  {
    id: "d1",
    title: "UAE Healthcare SME",
    dealType: "Equity Raise",
    range: "AED 20M-50M",
    matchScore: 94,
    summary:
      "Matches your F&B mandate: 28% EBITDA CAGR, below your AED 30M ticket threshold.",
  },
  {
    id: "d2",
    title: "KSA Logistics Tech",
    dealType: "Series B",
    range: "AED 15M-25M",
    matchScore: 88,
    summary:
      "Strong regional expansion play into Qatar/Oman. Founders have previous exit in mobility space.",
  },
  {
    id: "d3",
    title: "Oman AgriTech Hub",
    dealType: "Pre-IPO",
    range: "AED 100M+",
    matchScore: 82,
    summary:
      "High alignment with Sustainability mandate. Proprietary hydroponic IP with government offtake.",
  },
  {
    id: "d4",
    title: "Bahrain Fintech SME",
    dealType: "Growth Equity",
    range: "AED 8M-15M",
    matchScore: 79,
    summary:
      "Payment infrastructure play. Licensed by CBB, processing AED 200M/month in transactions.",
  },
  {
    id: "d5",
    title: "Qatar EdTech Platform",
    dealType: "Series A",
    range: "AED 5M-10M",
    matchScore: 75,
    summary:
      "K-12 Arabic-first digital learning. 40K MAU growing 35% QoQ across GCC markets.",
  },
];

const explorerDeals: DealCardData[] = [
  {
    id: "e1",
    anonymizedName: "Dub-Engines Mfg",
    sector: "Industrial",
    location: "Dubai, UAE",
    seekingAmount: "AED 12M",
    icon: "factory",
    shariaCompliant: true,
    metrics: [
      { label: "Revenue", value: "AED 45M" },
      { label: "EBITDA", value: "18%" },
      { label: "Burn Rate", value: "N/A" },
    ],
    investorCount: 14,
  },
  {
    id: "e2",
    anonymizedName: "Desert-Harvest Retail",
    sector: "Retail Tech",
    location: "Riyadh, KSA",
    seekingAmount: "AED 8.5M",
    icon: "retail",
    metrics: [
      { label: "Revenue", value: "AED 12M" },
      { label: "EBITDA", value: "12%" },
      { label: "Growth", value: "140% YoY" },
    ],
    investorCount: 5,
  },
  {
    id: "e3",
    anonymizedName: "Oasis-Pay Fintech",
    sector: "Fintech",
    location: "Manama, Bahrain",
    seekingAmount: "AED 5.2M",
    icon: "fintech",
    shariaCompliant: true,
    metrics: [
      { label: "Volume", value: "AED 200M/mo" },
      { label: "Rev Share", value: "Yes" },
      { label: "MoM Growth", value: "22%" },
    ],
    investorCount: 47,
  },
];

const filterPills = [
  { label: "Deal Type", active: true },
  { label: "Sector", active: false },
  { label: "Country", active: false },
  { label: "Revenue Range", active: false },
  { label: "Sharia", active: false, icon: true },
  { label: "Stage", active: false },
];

const portfolioDeals = [
  { name: "Emirates Health Group", status: "Signed", color: "text-tertiary" },
  { name: "Al-Nour Logistics", status: "Closing", color: "text-primary" },
  {
    name: "Jeddah Retail Syndicate",
    status: "Term Sheet",
    color: "text-secondary",
  },
];

const networkEvents = [
  {
    icon: Users,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    text: (
      <>
        <span className="font-bold">3 investors</span> you know are looking at{" "}
        <span className="text-primary blur-[3px]">UAE Tech SME</span>
      </>
    ),
    time: "2 hours ago",
  },
  {
    icon: Network,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    text: (
      <>
        Lead investor <span className="font-bold">HNI Network member</span>{" "}
        created a new syndicate &mdash;{" "}
        <span className="font-mono font-bold tabular-nums">
          AED 2M minimum
        </span>
      </>
    ),
    time: "Yesterday at 4:30 PM",
  },
];

const deadlines = [
  {
    name: "Hospitality Group",
    type: "NDA expires",
    days: 3,
    borderColor: "border-amber-500",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-500",
  },
  {
    name: "Saudi Fintech Startup",
    type: "Round closes",
    days: 7,
    borderColor: "border-surface-container-highest",
    badgeBg: "bg-surface-container-highest",
    badgeText: "text-on-surface-variant",
  },
  {
    name: "UAE Manufacturing SME",
    type: "Term sheet deadline",
    days: 1,
    borderColor: "border-error",
    badgeBg: "bg-error/10",
    badgeText: "text-error",
  },
];

// ─── Helpers ────────────────────────────────────────────────

function getMatchBorderOpacity(score: number) {
  if (score >= 90) return "border-tertiary";
  if (score >= 80) return "border-tertiary/60";
  return "border-tertiary/40";
}

function formatToday(): string {
  const now = new Date();
  return now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// ─── Component ──────────────────────────────────────────────

export default function InvestorDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Deal Type");

  return (
    <div className="space-y-10">
      {/* ── Section 1: Morning Deal Digest ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">
            Your Morning Deal Digest{" "}
            <span className="text-on-surface-variant font-normal">
              &mdash; {formatToday()}
            </span>
          </h1>
          <Badge variant="ai" size="sm">
            AI
          </Badge>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {digestDeals.map((deal, i) => (
            <motion.div
              key={deal.id}
              className="min-w-[420px] bg-surface-container-low rounded-xl p-6 border-s-4 border-secondary relative overflow-hidden group flex-shrink-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 40px rgba(7,19,37,0.5)",
              }}
            >
              {/* AI Match Score */}
              <div className="absolute top-0 right-0 p-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full border-4 flex items-center justify-center",
                      getMatchBorderOpacity(deal.matchScore)
                    )}
                  >
                    <motion.span
                      className="text-2xl font-bold font-mono tabular-nums text-on-surface"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {deal.matchScore}
                    </motion.span>
                  </div>
                  <span className="text-[10px] text-tertiary mt-1 font-bold">
                    AI MATCH
                  </span>
                </div>
              </div>

              {/* Anonymized Title */}
              <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-2 inline-block mb-3">
                <span className="text-xl font-bold text-primary blur-[2px] select-none">
                  {deal.title}
                </span>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-4">
                <Badge variant="default" size="sm">
                  {deal.dealType}
                </Badge>
                <Badge variant="default" size="sm">
                  <span className="font-mono tabular-nums">{deal.range}</span>
                </Badge>
              </div>

              {/* AI Summary */}
              <p className="text-on-surface-variant text-sm italic mb-6 leading-relaxed">
                {deal.summary}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <Button size="sm">Request NDA</Button>
                <Button variant="outline" size="sm">
                  Save to Watchlist
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Quick Stats ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Invested"
          value="AED 12.5M"
          accentColor="primary"
        />
        <StatCard
          label="Portfolio IRR"
          value="18.4%"
          subtitle="vs GCC benchmark: 14.2%"
          accentColor="secondary"
        />
        <StatCard label="Active Deals" value="7" accentColor="tertiary" />
        <motion.div
          className="bg-surface-container-low rounded-2xl py-8 px-6 border-s-4 border-tertiary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          }}
        >
          <p className="uppercase tracking-wider text-xs text-on-surface-variant mb-2">
            Unrealized Gain
          </p>
          <p className="font-mono text-3xl tabular-nums text-tertiary font-semibold">
            +AED 2.1M
          </p>
        </motion.div>
      </section>

      {/* ── Section 3+4: Deal Explorer + Right Sidebar ── */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Deal Explorer */}
        <div className="lg:w-3/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-on-surface">
              Deal Explorer
            </h2>
            <button className="flex items-center gap-1 text-primary text-sm font-medium">
              Advanced Filters
              <SlidersHorizontal size={14} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search deals... (e.g. 'profitable F&B in UAE under AED 20M')"
              className="w-full bg-surface-container-highest border-none rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterPills.map((pill) => (
              <button
                key={pill.label}
                onClick={() => setActiveFilter(pill.label)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1",
                  activeFilter === pill.label
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                )}
              >
                {pill.icon && <Star size={12} />}
                {pill.label}
              </button>
            ))}
          </div>

          {/* Deal Cards */}
          <div className="space-y-6">
            {explorerDeals.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
              >
                <DealCard deal={deal} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Panels */}
        <div className="lg:w-2/5 space-y-8">
          {/* Portfolio Tracker */}
          <Card className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-on-surface">
                Portfolio Tracker
              </h3>
              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
                Sector Diversification
              </span>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="relative w-36 h-36">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="#1f2a3d"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="#E6C364"
                    strokeWidth="3"
                    strokeDasharray="45 100"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray="25 100"
                    strokeDashoffset="-45"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="#6cd9cb"
                    strokeWidth="3"
                    strokeDasharray="15 100"
                    strokeDashoffset="-70"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-[10px] text-on-surface-variant">
                    Target
                  </span>
                  <span className="font-bold font-mono tabular-nums text-on-surface">
                    92%
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-on-surface-variant">
                    Healthcare (45%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-on-surface-variant">
                    Technology (25%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="text-xs font-medium text-on-surface-variant">
                    Retail (15%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-surface-container-highest" />
                  <span className="text-xs font-medium text-on-surface-variant">
                    Other (15%)
                  </span>
                </div>
              </div>
            </div>

            {/* Portfolio deal statuses */}
            <div className="mt-8 border-t border-outline-variant/20 pt-6 space-y-4">
              {portfolioDeals.map((d) => (
                <div
                  key={d.name}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-on-surface-variant">{d.name}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      d.color === "text-tertiary" &&
                        "bg-tertiary/10 text-tertiary",
                      d.color === "text-primary" &&
                        "bg-primary/10 text-primary",
                      d.color === "text-secondary" &&
                        "bg-secondary/10 text-secondary"
                    )}
                  >
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Network Intelligence */}
          <Card className="p-8">
            <h3 className="text-xl font-bold text-on-surface mb-6">
              Network Intelligence
            </h3>
            <div className="space-y-6">
              {networkEvents.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      event.iconBg
                    )}
                  >
                    <event.icon size={20} className={event.iconColor} />
                  </div>
                  <div>
                    <p className="text-sm text-on-surface leading-snug">
                      {event.text}
                    </p>
                    <span className="text-[10px] text-on-surface-variant font-medium">
                      {event.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="p-8">
            <h3 className="text-xl font-bold text-on-surface mb-6">
              Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              {deadlines.map((d, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg bg-surface-container-lowest border-s-4",
                    d.borderColor
                  )}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 * i,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                  }}
                >
                  <div>
                    <p className="text-sm font-bold blur-[3px] select-none text-on-surface">
                      {d.name}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                      {d.type}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold",
                      d.badgeBg,
                      d.badgeText
                    )}
                  >
                    {d.days} {d.days === 1 ? "day" : "days"}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
