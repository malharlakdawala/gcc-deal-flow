"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DEAL_TYPES } from "@/lib/constants";
import type { DealType } from "@/types/deal";

const DEAL_TYPE_ICONS: Record<string, string> = {
  "Full Sale": "sell",
  "Partial Sale": "pie_chart",
  "Equity Fundraise": "payments",
  Debt: "account_balance",
  MBO: "groups_3",
  JV: "handshake",
};

const ROUND_OPTIONS = [
  { label: "Seed", value: "Seed" },
  { label: "Series A", value: "Series A" },
  { label: "Series B", value: "Series B" },
  { label: "Series C+", value: "Series C+" },
];

export default function Step4Page() {
  const router = useRouter();
  const { dealConfig, updateDealConfig, setStep, completeStep } =
    useOnboardingStore();

  useEffect(() => {
    setStep(4);
  }, [setStep]);

  const showFundraiseParams =
    dealConfig.deal_type === "Equity Fundraise" ||
    dealConfig.deal_type === "Partial Sale";

  const handleContinue = () => {
    completeStep(4);
    setStep(5);
    router.push("/onboarding/step-5");
  };

  const handleBack = () => {
    setStep(3);
    router.push("/onboarding/step-3");
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Deal Type Selector */}
          <section className="bg-surface-container-low p-8 rounded-xl shadow-lg border-s-4 border-primary">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                account_tree
              </span>
              Primary Deal Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DEAL_TYPES.map((dt) => {
                const isSelected = dealConfig.deal_type === dt;
                return (
                  <label key={dt} className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="deal_type"
                      className="peer sr-only"
                      checked={isSelected}
                      onChange={() =>
                        updateDealConfig({ deal_type: dt as DealType })
                      }
                    />
                    <div
                      className={`h-full p-4 rounded-lg transition-all ${
                        isSelected
                          ? "bg-primary/5 border border-primary/50"
                          : "bg-surface-container border border-transparent group-hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined ${
                          isSelected
                            ? "text-primary"
                            : "text-slate-500 group-hover:text-primary"
                        } transition-colors`}
                      >
                        {DEAL_TYPE_ICONS[dt]}
                      </span>
                      <div className="mt-3 text-sm font-semibold text-on-surface">
                        {dt}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Sharia Toggle */}
          <div className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-sm">
                eco
              </span>
              <span className="text-sm font-medium text-on-surface">
                Sharia-compliant only
              </span>
            </div>
            <div className="flex items-center gap-3">
              {dealConfig.sharia_compliant && (
                <span className="text-xs font-bold text-tertiary">
                  Ethical &amp; Sharia Verified
                </span>
              )}
              <button
                onClick={() =>
                  updateDealConfig({
                    sharia_compliant: !dealConfig.sharia_compliant,
                  })
                }
                className={`relative w-12 h-6 rounded-full p-1 flex items-center transition-all ${
                  dealConfig.sharia_compliant ? "bg-tertiary" : "bg-slate-700"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all ${
                    dealConfig.sharia_compliant
                      ? "translate-x-6 bg-on-tertiary"
                      : "translate-x-0 bg-slate-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Fundraise Parameters */}
          {showFundraiseParams && (
            <section className="bg-surface-container-low p-8 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-8xl">
                  payments
                </span>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">tune</span>
                Fundraising Parameters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <Input
                  label="Asking Pre-money Valuation (AED)"
                  variant="currency"
                  currencyPrefix="AED"
                  placeholder="e.g. 45,000,000"
                  value={dealConfig.asking_pre_money?.toString() ?? ""}
                  onChange={(e) =>
                    updateDealConfig({
                      asking_pre_money: e.target.value
                        ? parseFloat(e.target.value.replace(/,/g, ""))
                        : null,
                    })
                  }
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-on-surface-variant font-medium">
                    % Equity Offered
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={dealConfig.equity_offered ?? 15}
                      onChange={(e) =>
                        updateDealConfig({
                          equity_offered: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full accent-primary bg-surface-container-highest rounded-lg h-2 appearance-none mt-6"
                    />
                    <div className="absolute top-0 right-0 font-mono text-primary font-bold">
                      {dealConfig.equity_offered ?? 15}%
                    </div>
                  </div>
                </div>
                <Input
                  label="Minimum Ticket Size (AED)"
                  variant="currency"
                  currencyPrefix="AED"
                  placeholder="e.g. 500,000"
                  value={dealConfig.min_ticket?.toString() ?? ""}
                  onChange={(e) =>
                    updateDealConfig({
                      min_ticket: e.target.value
                        ? parseFloat(e.target.value.replace(/,/g, ""))
                        : null,
                    })
                  }
                />
                <Select
                  label="Round Type"
                  options={ROUND_OPTIONS}
                  placeholder="Select round"
                  value={dealConfig.round_type ?? ""}
                  onChange={(e) =>
                    updateDealConfig({ round_type: e.target.value })
                  }
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-on-surface-variant font-medium">
                    Close Date Target
                  </label>
                  <input
                    type="date"
                    className="w-full bg-surface-container-lowest border border-white/5 text-on-surface rounded-[12px] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={dealConfig.close_date_target ?? ""}
                    onChange={(e) =>
                      updateDealConfig({ close_date_target: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 font-semibold hover:text-white transition-all px-6 py-3"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!dealConfig.deal_type}
              className="gold-gradient text-on-primary px-10 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(230,195,100,0.2)] hover:shadow-[0_0_30px_rgba(230,195,100,0.3)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Step 5
            </button>
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI Compliance Widget */}
          <Card variant="ai" className="p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">
                  Intelligent Engine
                </h3>
              </div>
              <div className="bg-secondary/10 px-2 py-0.5 rounded text-[10px] text-secondary font-bold">
                ACTIVE
              </div>
            </div>

            <div className="p-4 bg-surface-container-lowest rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-on-surface">
                  Sharia-compliant only
                </span>
                <div
                  className={`w-12 h-6 rounded-full p-1 flex items-center ${
                    dealConfig.sharia_compliant ? "bg-tertiary" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-all ${
                      dealConfig.sharia_compliant
                        ? "translate-x-6 bg-on-tertiary"
                        : "bg-slate-400"
                    }`}
                  />
                </div>
              </div>
              {dealConfig.sharia_compliant && (
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-sm">eco</span>
                  <span className="text-xs font-bold">
                    Ethical &amp; Sharia Verified
                  </span>
                </div>
              )}
            </div>

            <p className="text-slate-400 text-xs leading-relaxed italic">
              &quot;Your current parameters suggest a high likelihood of
              attracting institutional capital from the GCC sovereign wealth fund
              ecosystem. Sharia-compliance is currently a prerequisite for 82% of
              regional family offices.&quot;
            </p>
          </Card>

          {/* Market Context Card */}
          <div className="bg-surface-container-low p-6 rounded-xl shadow-lg space-y-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Market Context
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-highest/40">
                <span className="text-xs text-slate-400">
                  Market Median (Series A)
                </span>
                <span className="text-xs font-mono text-on-surface">
                  AED 38M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-highest/40 border-s-2 border-primary">
                <span className="text-xs text-slate-400">Your Ask</span>
                <span className="text-xs font-mono text-primary">
                  AED{" "}
                  {dealConfig.asking_pre_money
                    ? `${(dealConfig.asking_pre_money / 1_000_000).toFixed(0)}M`
                    : "--"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-highest/40">
                <span className="text-xs text-slate-400">Top Quartile</span>
                <span className="text-xs font-mono text-on-surface">
                  AED 65M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-highest/40">
                <span className="text-xs text-slate-400">
                  Regional Series A Index
                </span>
                <span className="text-xs font-mono text-tertiary">+12.4%</span>
              </div>
            </div>
          </div>

          {/* Consult CTA */}
          <div className="bg-surface-container p-6 rounded-xl border border-white/5 text-center">
            <p className="text-xs text-slate-500 mb-3 italic">
              Need structural advice on your deal?
            </p>
            <button className="text-primary text-xs font-bold flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-sm">forum</span>
              Consult with Al-Mawarid Partner
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
