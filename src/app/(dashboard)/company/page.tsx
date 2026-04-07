"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Upload,
  FileWarning,
  MessageCircleQuestion,
  BellRing,
  ChevronRight,
  Download,
  Mail,
  Pencil,
  AlertTriangle,
  Plus,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -2 },
};

const cardTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const ndaRows = [
  {
    investor: "Mubadala Partners",
    verified: true,
    sentDate: "Oct 12, 2023",
    status: "Executed" as const,
    aging: "0d",
    actionIcon: Download,
    actionColor: "text-secondary",
  },
  {
    investor: "Al-Saud Holdings",
    verified: true,
    sentDate: "Oct 24, 2023",
    status: "Pending" as const,
    aging: "3d",
    actionIcon: Mail,
    actionColor: "text-primary",
  },
  {
    investor: "Neom Capital",
    verified: true,
    sentDate: "Oct 26, 2023",
    status: "Draft" as const,
    aging: "1d",
    actionIcon: Pencil,
    actionColor: "text-on-surface-variant",
  },
  {
    investor: "Qatari Diar",
    verified: true,
    sentDate: "Oct 20, 2023",
    status: "Expiring" as const,
    aging: "7d",
    actionIcon: AlertTriangle,
    actionColor: "text-error",
  },
  {
    investor: "Blue Chip Cap",
    verified: false,
    sentDate: "Oct 25, 2023",
    status: "Executed" as const,
    aging: "2d",
    actionIcon: Download,
    actionColor: "text-secondary",
  },
];

const statusColors: Record<string, string> = {
  Executed: "bg-tertiary/10 text-tertiary",
  Pending: "bg-primary/10 text-primary",
  Draft: "bg-on-surface-variant/10 text-on-surface-variant",
  Expiring: "bg-error/10 text-error",
};

const heatInvestors = [
  {
    name: "Institutional Fund A",
    label: "Very Hot",
    score: 98,
    borderColor: "border-error",
    dotColor: "bg-error",
    barColor: "bg-error",
    labelColor: "text-error",
    pulse: true,
  },
  {
    name: "Sovereign Wealth X",
    label: "Warm",
    score: 72,
    borderColor: "border-primary",
    dotColor: "bg-primary",
    barColor: "bg-primary",
    labelColor: "text-primary",
    pulse: false,
  },
  {
    name: "Family Office G",
    label: "Engaged",
    score: 45,
    borderColor: "border-primary/40",
    dotColor: "bg-primary/40",
    barColor: "bg-primary/40",
    labelColor: "text-primary/40",
    pulse: false,
  },
  {
    name: "Private Equity Hub",
    label: "Browse",
    score: 12,
    borderColor: "border-slate-600",
    dotColor: "bg-slate-600",
    barColor: "bg-slate-600",
    labelColor: "text-slate-500",
    pulse: false,
  },
];

const criticalActions = [
  {
    title: "Upload Q3 Accounts",
    subtitle: "+12 PTS READINESS",
    subtitleColor: "text-tertiary",
    icon: Upload,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Missing Contracts (2)",
    subtitle: "Data Room Incomplete",
    subtitleColor: "text-on-surface-variant",
    icon: FileWarning,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Respond to Questions (3)",
    subtitle: "Awaiting Input",
    subtitleColor: "text-secondary",
    icon: MessageCircleQuestion,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    title: "Send NDA Reminders (5)",
    subtitle: "Follow-up needed",
    subtitleColor: "text-on-surface-variant",
    icon: BellRing,
    iconBg: "bg-on-surface-variant/10",
    iconColor: "text-on-surface-variant",
  },
];

const donutSegments = [
  { value: 40, color: "#E6C364", label: "Committed" },
  { value: 25, color: "#6cd9cb", label: "In Diligence" },
  { value: 20, color: "#0566d9", label: "Signed NDA" },
  { value: 15, color: "#2a3548", label: "Viewing" },
];

/* ------------------------------------------------------------------ */
/*  Animated number counter                                            */
/* ------------------------------------------------------------------ */

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  className,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        {prefix}
        {target.toLocaleString()}
        {suffix}
      </motion.span>
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Small donut for deal readiness                                     */
/* ------------------------------------------------------------------ */

function MiniDonut({ value }: { value: number }) {
  return (
    <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-surface-container-highest"
      />
      <motion.circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-primary"
        strokeDasharray={`${value}, 100`}
        initial={{ strokeDasharray: "0, 100" }}
        animate={{ strokeDasharray: `${value}, 100` }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Fundraise donut chart (custom for this page)                       */
/* ------------------------------------------------------------------ */

function FundraiseDonut() {
  const total = donutSegments.reduce((s, seg) => s + seg.value, 0);
  const size = 144;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulative = 0;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {donutSegments.map((seg, i) => {
          const segLen = (seg.value / total) * circumference;
          const offset = circumference - cumulative;
          cumulative += segLen;

          return (
            <motion.circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segLen} ${circumference - segLen}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[10px] font-bold text-on-surface-variant uppercase">
          Total
        </span>
        <span className="text-sm font-bold font-mono tabular-nums">112</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CompanyDashboardPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* ---- KPI Row ---- */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {/* Investors Matched */}
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          transition={cardTransition}
        >
          <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-primary/30">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-surface-variant text-sm font-medium">
                Investors Matched
              </span>
              <span className="text-tertiary flex items-center text-xs font-mono tabular-nums">
                +12 this week
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <AnimatedNumber
                target={156}
                className="text-3xl font-bold font-mono tabular-nums"
              />
              <TrendingUp size={18} className="text-tertiary" />
            </div>
          </div>
        </motion.div>

        {/* NDAs Signed */}
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          transition={cardTransition}
        >
          <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-tertiary/30">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-surface-variant text-sm font-medium">
                NDAs Signed
              </span>
              <span className="bg-tertiary/10 text-tertiary px-2 py-0.5 rounded text-[10px] font-bold">
                STABLE
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <AnimatedNumber
                target={84}
                className="text-3xl font-bold font-mono tabular-nums"
              />
              <span className="text-on-surface-variant/50 text-xs font-medium">
                / 112 sent
              </span>
            </div>
          </div>
        </motion.div>

        {/* Data Room Views */}
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          transition={cardTransition}
        >
          <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-secondary/30">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-surface-variant text-sm font-medium">
                Data Room Views
              </span>
              <svg
                className="w-16 h-4 opacity-50"
                viewBox="0 0 64 16"
                fill="none"
              >
                <path
                  d="M0 14 L10 8 L20 12 L30 4 L40 10 L50 2 L64 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-secondary"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tabular-nums">
                1.2k
              </span>
              <span className="text-on-surface-variant/50 text-xs font-medium">
                +18.4%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Deal Readiness */}
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          transition={cardTransition}
        >
          <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-primary/30">
            <div className="flex justify-between items-start mb-2">
              <span className="text-on-surface-variant text-sm font-medium">
                Deal Readiness
              </span>
              <MiniDonut value={74} />
            </div>
            <div className="flex items-baseline gap-2">
              <AnimatedNumber
                target={74}
                className="text-3xl font-bold font-mono tabular-nums text-primary"
              />
              <span className="text-on-surface-variant/50 text-xs font-medium">
                / 100
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ---- Main Content Grid (7/5) ---- */}
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          {/* Dynamic AI Valuation */}
          <motion.div variants={fadeUp}>
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              transition={cardTransition}
            >
              <Card variant="ai" padding={false}>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                        <Sparkles size={20} className="text-secondary" />
                        Dynamic AI Valuation
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Updated 2 days ago &bull; Based on recent sector
                        multipliers
                      </p>
                    </div>
                    <button className="text-xs font-semibold px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                      Re-run Valuation
                    </button>
                  </div>

                  <div className="space-y-6 mb-6">
                    <div className="relative pt-6">
                      <div className="flex justify-between text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-semibold">
                        <span>Bear Case</span>
                        <span className="text-primary">Base Valuation</span>
                        <span>Bull Case</span>
                      </div>
                      <div className="h-3 w-full bg-surface-container-highest rounded-full flex overflow-hidden">
                        <div className="h-full w-1/4 bg-slate-600/30 border-r border-background" />
                        <motion.div
                          className="h-full w-2/4 gold-gradient"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94] as const,
                          }}
                          style={{ transformOrigin: "left" }}
                        />
                        <div className="h-full w-1/4 bg-slate-600/30 border-l border-background" />
                      </div>
                      <div className="flex justify-between mt-3 font-mono tabular-nums text-sm font-medium">
                        <span className="text-slate-400">AED 12.0M</span>
                        <span className="text-primary font-bold text-lg">
                          AED 15.5M
                        </span>
                        <span className="text-slate-400">AED 18.0M</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/10 border-l-4 border-secondary p-4 flex items-center gap-4 rounded-e-lg">
                    <Sparkles size={18} className="text-secondary shrink-0" />
                    <p className="text-sm text-secondary font-medium italic">
                      Market conditions improved your valuation by 4% this week.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Fundraise Lifecycle */}
          <motion.div variants={fadeUp}>
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              transition={cardTransition}
            >
              <Card>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-semibold text-on-surface">
                    Fundraise Lifecycle
                  </h3>
                  <div className="text-right">
                    <p className="text-xs text-on-surface-variant font-medium">
                      Target Date
                    </p>
                    <p className="text-sm font-bold text-on-surface font-mono tabular-nums">
                      31 DEC 2024
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    {/* Capital committed */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-on-surface-variant">
                          Capital Committed
                        </span>
                        <span className="text-sm font-bold text-primary font-mono tabular-nums">
                          64%
                        </span>
                      </div>
                      <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden p-1">
                        <motion.div
                          className="h-full gold-gradient rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "64%" }}
                          transition={{
                            duration: 1,
                            ease: [0.25, 0.46, 0.45, 0.94] as const,
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 font-mono tabular-nums">
                        <span className="text-xs font-bold text-on-surface">
                          AED 3.2M
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Goal: AED 5.0M
                        </span>
                      </div>
                    </div>

                    {/* Stats boxes */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-surface-container-high rounded-lg">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold">
                          Investors
                        </p>
                        <p className="text-xl font-bold font-mono tabular-nums">
                          24
                        </p>
                      </div>
                      <div className="p-3 bg-surface-container-high rounded-lg">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold">
                          Days Left
                        </p>
                        <p className="text-xl font-bold font-mono tabular-nums">
                          42
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Donut */}
                  <div className="flex justify-center">
                    <FundraiseDonut />
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* NDA Pipeline */}
          <motion.div variants={fadeUp}>
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              transition={cardTransition}
            >
              <Card padding={false}>
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">NDA Pipeline</h3>
                  <a
                    href="#"
                    className="text-primary text-xs font-semibold hover:underline"
                  >
                    View All
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface-container-high/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                      <tr>
                        <th className="px-6 py-3">Investor</th>
                        <th className="px-6 py-3">Sent Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Aging</th>
                        <th className="px-6 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {ndaRows.map((row) => (
                        <tr
                          key={row.investor}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="blur-sm bg-surface-container-highest px-2 py-1 rounded text-xs select-none">
                                {row.investor}
                              </div>
                              {row.verified && (
                                <span
                                  className="text-tertiary text-xs"
                                  title="Verified"
                                >
                                  &#10003;
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono tabular-nums text-on-surface-variant">
                            {row.sentDate}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                                statusColors[row.status]
                              )}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono tabular-nums text-on-surface-variant">
                            {row.aging}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              className={cn(
                                "hover:opacity-70 transition-opacity",
                                row.actionColor
                              )}
                            >
                              <row.actionIcon size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          {/* Investor Heat Index */}
          <motion.div variants={fadeUp}>
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              transition={cardTransition}
            >
              <Card padding={false}>
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-semibold mb-1">
                    Investor Heat Index
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Intent levels based on behavioral telemetry
                  </p>
                </div>
                <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
                  {/* First investor row + AI insight */}
                  <div
                    className={cn(
                      "bg-surface-container p-4 rounded-lg flex items-center justify-between border-l-4",
                      heatInvestors[0].borderColor
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full animate-pulse",
                          heatInvestors[0].dotColor
                        )}
                      />
                      <div>
                        <p className="text-sm font-bold blur-[4px] select-none">
                          {heatInvestors[0].name}
                        </p>
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-tighter",
                            heatInvestors[0].labelColor
                          )}
                        >
                          {heatInvestors[0].label} ({heatInvestors[0].score})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <motion.div
                          className={cn(
                            "h-full",
                            heatInvestors[0].barColor
                          )}
                          initial={{ width: "0%" }}
                          animate={{
                            width: `${heatInvestors[0].score}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94] as const,
                          }}
                        />
                      </div>
                      <button className="text-secondary hover:scale-110 transition-transform">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>

                  {/* AI Insight */}
                  <div className="bg-secondary/5 border-l-4 border-secondary p-3 rounded-lg">
                    <p className="text-[11px] text-secondary font-medium leading-relaxed">
                      <span className="font-bold">AI Insight:</span> Investor
                      ABC viewed financials 6 times (34 mins) -- high intent
                      signal detected. Recommend follow-up.
                    </p>
                  </div>

                  {/* Remaining investor rows */}
                  {heatInvestors.slice(1).map((inv) => (
                    <div
                      key={inv.name}
                      className={cn(
                        "bg-surface-container p-4 rounded-lg flex items-center justify-between border-l-4",
                        inv.borderColor
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            inv.dotColor,
                            inv.pulse && "animate-pulse"
                          )}
                        />
                        <div>
                          <p className="text-sm font-bold blur-[4px] select-none">
                            {inv.name}
                          </p>
                          <p
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-tighter",
                              inv.labelColor
                            )}
                          >
                            {inv.label} ({inv.score})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                          <motion.div
                            className={cn("h-full", inv.barColor)}
                            initial={{ width: "0%" }}
                            animate={{ width: `${inv.score}%` }}
                            transition={{
                              duration: 0.8,
                              ease: [0.25, 0.46, 0.45, 0.94] as const,
                            }}
                          />
                        </div>
                        <button className="text-secondary hover:scale-110 transition-transform">
                          <MessageSquare size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Critical Actions */}
          <motion.div variants={fadeUp}>
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              transition={cardTransition}
            >
              <Card>
                <h3 className="text-lg font-semibold mb-6">
                  Critical Actions
                </h3>
                <div className="space-y-4">
                  {criticalActions.map((action) => (
                    <button
                      key={action.title}
                      className="w-full flex items-center justify-between p-4 bg-surface-container rounded-lg border border-white/5 hover:border-primary/50 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded", action.iconBg)}>
                          <action.icon
                            size={20}
                            className={action.iconColor}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {action.title}
                          </p>
                          <p
                            className={cn(
                              "text-[10px] uppercase font-bold",
                              action.subtitleColor
                            )}
                          >
                            {action.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-on-surface-variant group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 gold-gradient rounded-full shadow-2xl flex items-center justify-center text-on-primary z-40 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={28} />
        <div className="absolute right-full mr-4 bg-surface-container-high px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-on-surface">
          New Transaction
        </div>
      </motion.button>
    </motion.div>
  );
}
