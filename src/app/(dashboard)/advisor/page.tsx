"use client";

import { KanbanColumn } from "@/components/features/kanban-column";
import { KanbanCard } from "@/components/features/kanban-card";
import { CommissionItem } from "@/components/features/commission-item";
import { TrendingUp, Hourglass } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mock data matching the mockup exactly                              */
/* ------------------------------------------------------------------ */

const kanbanData = {
  mandateSigned: [
    {
      clientCode: "UAE Hospitality Client 1",
      projectName: "Project Phoenix - Full Sale",
      dealValue: "AED 20M\u201350M",
      daysInStage: 12,
      aiVelocity: "on-track" as const,
      aiVelocityLabel: "On track",
      statusIcon: "check" as const,
      team: [
        { initials: "AK", color: "bg-primary/30 text-primary" },
        { initials: "SR", color: "bg-secondary/30 text-secondary" },
      ],
    },
    {
      clientCode: "Abu Dhabi Tech Hub",
      projectName: "Project Silicon - Partial Exit",
      dealValue: "AED 150M\u2013200M",
      daysInStage: 45,
      aiVelocity: "at-risk" as const,
      aiVelocityLabel: "At risk",
      statusIcon: "warning" as const,
      team: [{ initials: "NM", color: "bg-tertiary/30 text-tertiary" }],
    },
  ],
  underNda: [
    {
      clientCode: "KSA LOGISTICS 04",
      projectName: "Project Caravan",
      dealValue: "AED 45M",
      daysInStage: 14,
      aiVelocity: "behind" as const,
      aiVelocityLabel: "2 weeks behind",
      team: [],
    },
  ],
};

const outreachFunnel = [
  { label: "Teasers", value: 47, heightPct: 100 },
  { label: "Opened", value: 23, heightPct: 49 },
  { label: "NDA Request", value: 12, heightPct: 25 },
  { label: "Data Room", value: 4, heightPct: 8, highlight: true },
];

const hotInvestors = [
  {
    name: "Vertex Capital",
    heat: "VERY HOT",
    heatColor: "text-error bg-error/10",
    borderColor: "border-error",
    detail: "Opened IM 14 times in 48h",
  },
  {
    name: "Alpha Assets",
    heat: "HOT",
    heatColor: "text-primary bg-primary/10",
    borderColor: "border-primary",
    detail: "Requested financial model",
  },
  {
    name: "Mirae Global",
    heat: "ACTIVE",
    heatColor: "text-secondary bg-secondary/10",
    borderColor: "border-secondary",
    detail: "Teaser viewed yesterday",
  },
];

const commissions = [
  {
    projectName: "Project Phoenix",
    description: "Success Fee: 2.5%",
    amount: "AED 125,000",
    status: "invoiced" as const,
  },
  {
    projectName: "Silicon Partial",
    description: "Retainer Invoiced",
    amount: "AED 45,000",
    status: "paid" as const,
  },
  {
    projectName: "Caravan Logistics",
    description: "Platform Commission",
    amount: "AED 12,500",
    status: "pending" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AdvisorDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Section 1 - Metrics Row */}
      <section className="grid grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary">
          <p className="text-on-surface-variant/40 text-xs font-semibold uppercase tracking-wider mb-2">
            Active Mandates
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-mono text-on-surface">14</span>
            <span className="text-tertiary text-xs flex items-center gap-1 bg-tertiary/10 px-2 py-1 rounded-full">
              +2 this month
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-secondary">
          <p className="text-on-surface-variant/40 text-xs font-semibold uppercase tracking-wider mb-2">
            Pipeline Value
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-mono text-on-surface">
              AED 1.2Bn
            </span>
            <span className="text-secondary text-xs flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
              High Conviction
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary-container">
          <p className="text-on-surface-variant/40 text-xs font-semibold uppercase tracking-wider mb-2">
            Deals Closed (YTD)
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-mono text-on-surface">8</span>
            <span className="text-on-surface-variant/40 text-xs">
              Target: 12
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-tertiary">
          <p className="text-on-surface-variant/40 text-xs font-semibold uppercase tracking-wider mb-2">
            Platform Commission
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-mono text-on-surface">
              AED 450K
            </span>
            <TrendingUp className="w-5 h-5 text-tertiary" />
          </div>
        </div>
      </section>

      {/* Section 2 - Master Pipeline (Kanban) */}
      <section className="w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Master Pipeline
            </h2>
            <p className="text-on-surface-variant/40 text-sm">
              Managing flow across 9 transaction stages
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5">
              Filter By Team
            </button>
            <button className="bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5">
              View: List
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 -mx-8 px-8">
          {/* Mandate Signed */}
          <KanbanColumn title="Mandate Signed" count={2}>
            {kanbanData.mandateSigned.map((card) => (
              <KanbanCard key={card.clientCode} {...card} />
            ))}
          </KanbanColumn>

          {/* Listed */}
          <KanbanColumn title="Listed" count={4} className="opacity-70">
            <div className="h-32 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-on-surface-variant/20 text-xs">
              Drop cards here
            </div>
          </KanbanColumn>

          {/* Under NDA */}
          <KanbanColumn title="Under NDA" count={3}>
            {kanbanData.underNda.map((card) => (
              <div
                key={card.clientCode}
                className="bg-surface-container-low p-5 rounded-xl border border-white/5"
              >
                <div className="bg-surface-container-highest/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-on-surface-variant font-mono mb-3 w-fit uppercase">
                  {card.clientCode}
                </div>
                <h3 className="text-on-surface font-semibold text-sm mb-1">
                  {card.projectName}
                </h3>
                <p className="text-primary text-xs font-mono mb-4">
                  {card.dealValue}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <Hourglass className="w-4 h-4 text-secondary" />
                  <span className="text-[10px] text-secondary">
                    {card.aiVelocityLabel}
                  </span>
                </div>
              </div>
            ))}
          </KanbanColumn>

          {/* Indicative Bids */}
          <KanbanColumn
            title="Indicative Bids"
            count={1}
            placeholder
          >
            <div />
          </KanbanColumn>

          {/* Term Sheet */}
          <KanbanColumn title="Term Sheet" count={0} placeholder>
            <div />
          </KanbanColumn>
        </div>
      </section>

      {/* Section 3 - Bottom Row */}
      <section className="grid grid-cols-10 gap-8">
        {/* Investor Outreach Activity */}
        <div className="col-span-6 bg-surface-container-low rounded-2xl p-8 border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold text-on-surface">
                Investor Outreach Activity
              </h3>
              <p className="text-on-surface-variant/40 text-xs">
                Primary Deal:{" "}
                <span className="text-primary">Project Phoenix</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-on-surface">
                47{" "}
                <span className="text-xs text-on-surface-variant/40 font-sans">
                  TEASERS SENT
                </span>
              </div>
            </div>
          </div>

          {/* Funnel Visual */}
          <div className="relative py-8 mb-8">
            <div className="flex items-end gap-1 h-20">
              {outreachFunnel.map((bar) => (
                <div
                  key={bar.label}
                  className={`flex-1 rounded-t-lg relative transition-all ${
                    bar.highlight
                      ? "bg-primary/40 hover:bg-primary/60"
                      : "bg-surface-container-highest hover:bg-primary/20"
                  }`}
                  style={{ height: `${bar.heightPct}%` }}
                >
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono ${
                      bar.highlight
                        ? "text-primary font-bold"
                        : "text-on-surface-variant/50"
                    }`}
                  >
                    {bar.value}
                  </div>
                  <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-[9px] text-on-surface-variant/40 uppercase whitespace-nowrap">
                    {bar.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Investors */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {hotInvestors.map((investor) => (
              <div
                key={investor.name}
                className={`bg-surface-container rounded-xl p-4 border-l-2 ${investor.borderColor}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-on-surface">
                    {investor.name}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${investor.heatColor}`}
                  >
                    {investor.heat}
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant/40">
                  {investor.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Tracker */}
        <div className="col-span-4 bg-surface-container-low rounded-2xl p-8 border border-white/5 flex flex-col">
          <h3 className="text-xl font-bold text-on-surface mb-6">
            Commission Tracker
          </h3>

          <div className="flex-1 space-y-4">
            {commissions.map((item) => (
              <CommissionItem key={item.projectName} {...item} />
            ))}
          </div>

          {/* Projected Earnings */}
          <div className="mt-8 p-5 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-on-surface-variant/50 text-[10px] uppercase tracking-wider mb-1">
              Projected Earnings
            </p>
            <div className="text-2xl font-mono text-primary mb-4 leading-none">
              AED 340K{" "}
              <span className="text-xs font-sans text-on-surface-variant/40 block mt-1">
                Due on next deal close
              </span>
            </div>
            <button className="w-full gold-gradient text-on-primary font-bold py-3 rounded-lg text-sm shadow-lg shadow-primary/10 active:scale-[0.98] transition-all">
              Raise Invoice
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
