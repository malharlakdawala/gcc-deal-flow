"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { Select } from "@/components/ui/select";
import { GCC_COUNTRIES, SECTORS } from "@/lib/constants";

const countryOptions = GCC_COUNTRIES.map((c) => ({ label: c, value: c }));
const sectorOptions = SECTORS.map((s) => ({ label: s, value: s }));

function formatAED(value: number): string {
  return new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 1_000_000);
}

export default function Step5Page() {
  const router = useRouter();
  const {
    valuationInput,
    setValuationInput,
    businessDetails,
    setStep,
    completeStep,
  } = useOnboardingStore();

  const [revenue, setRevenue] = useState(
    valuationInput?.revenue?.toString() ?? "25000000"
  );
  const [ebitda, setEbitda] = useState(
    valuationInput?.ebitda?.toString() ?? "2200000"
  );
  const [sector, setSector] = useState(
    valuationInput?.sector || businessDetails.sector || "Healthcare"
  );
  const [country, setCountry] = useState(
    valuationInput?.country || businessDetails.country || "UAE"
  );
  const [growthRate, setGrowthRate] = useState(
    valuationInput?.growth_rate?.toString() ?? "14"
  );

  const [multiple, setMultiple] = useState(7.0);

  useEffect(() => {
    setStep(5);
  }, [setStep]);

  const ebitdaNum = parseFloat(ebitda.replace(/,/g, "")) || 0;
  const revenueNum = parseFloat(revenue.replace(/,/g, "")) || 0;

  const baseValuation = ebitdaNum * multiple;
  const bearValuation = ebitdaNum * (multiple - 1.5);
  const bullValuation = ebitdaNum * (multiple + 1.2);

  const handleRecalculate = useCallback(() => {
    setValuationInput({
      revenue: revenueNum,
      ebitda: ebitdaNum,
      sector,
      country,
      growth_rate: parseFloat(growthRate) || 0,
    });
  }, [revenueNum, ebitdaNum, sector, country, growthRate, setValuationInput]);

  const handleBack = () => {
    setStep(4);
    router.push("/onboarding/step-4");
  };

  const handleApprove = () => {
    handleRecalculate();
    completeStep(5);
    setStep(6);
    router.push("/onboarding/step-6");
  };

  // Sensitivity analysis data
  const ebitdaMargin = revenueNum > 0 ? (ebitdaNum / revenueNum) * 100 : 10;
  const sensitivityRows = [
    { margin: Math.max(ebitdaMargin - 2, 2), label: `${Math.max(ebitdaMargin - 2, 2).toFixed(0)}% Margin` },
    { margin: ebitdaMargin, label: `${ebitdaMargin.toFixed(0)}% Margin`, isBaseline: true },
    { margin: ebitdaMargin + 2, label: `${(ebitdaMargin + 2).toFixed(0)}% Margin` },
  ].map((row) => {
    const adjEbitda = revenueNum * (row.margin / 100);
    const valuation = adjEbitda * multiple;
    const premDiscount =
      baseValuation > 0
        ? ((valuation - baseValuation) / baseValuation) * 100
        : 0;
    return { ...row, adjEbitda, valuation, premDiscount };
  });

  return (
    <>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
          AI Valuation Engine
        </h1>
        <p className="text-slate-400 max-w-xl">
          Leveraging proprietary GCC market data and real-time multiples to
          generate a sovereign-grade valuation for your enterprise.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Inputs Card */}
        <section className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-low rounded-xl p-8 border border-white/5 shadow-2xl">
            <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                analytics
              </span>
              Input Parameters
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Annual Revenue (AED)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-on-surface font-mono focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <span className="absolute right-4 top-3 text-slate-500 text-xs font-mono">
                    AED
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Annual EBITDA (AED)
                </label>
                <input
                  type="text"
                  value={ebitda}
                  onChange={(e) => setEbitda(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-on-surface font-mono focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <Select
                label="Industry Sector"
                options={sectorOptions}
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />
              <Select
                label="Country of Operation"
                options={countryOptions}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  EV/EBITDA Multiple
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={multiple}
                    onChange={(e) =>
                      setMultiple(parseFloat(e.target.value) || 7)
                    }
                    className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-on-surface font-mono focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <span className="absolute right-4 top-3 text-slate-500 text-xs font-mono">
                    x
                  </span>
                </div>
              </div>
              <button
                onClick={handleRecalculate}
                className="w-full py-4 rounded-xl border border-primary/20 bg-primary/5 text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/10 transition-all mt-4"
              >
                Recalculate Engine
              </button>
            </div>
          </div>
        </section>

        {/* Right: Results */}
        <section className="col-span-12 lg:col-span-8 space-y-8">
          {/* Valuation Scenarios Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bear Case */}
            <div className="bg-surface-container rounded-xl p-6 flex flex-col justify-between border border-white/5 h-48 group hover:bg-surface-container-high transition-all">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Bear Case
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-medium">
                  Conservative
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono text-on-surface tabular-nums">
                AED {formatAED(bearValuation)}M
              </div>
            </div>
            {/* Base Case */}
            <div className="relative bg-surface-container-low rounded-xl p-6 flex flex-col justify-between border-2 border-primary/40 h-48 shadow-[0_0_40px_-10px_rgba(230,195,100,0.2)] overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary px-3 py-1 text-[10px] font-bold text-on-primary uppercase tracking-tighter">
                Our Recommendation
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                  Base Case
                </div>
                <div className="text-[10px] text-primary/60 uppercase font-medium">
                  Market Optimized
                </div>
              </div>
              <div className="text-3xl font-extrabold font-mono text-primary tabular-nums">
                AED {formatAED(baseValuation)}M
              </div>
            </div>
            {/* Bull Case */}
            <div className="bg-surface-container rounded-xl p-6 flex flex-col justify-between border border-white/5 h-48 group hover:bg-surface-container-high transition-all">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Bull Case
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-medium">
                  Optimistic
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono text-on-surface tabular-nums">
                AED {formatAED(bullValuation)}M
              </div>
            </div>
          </div>

          {/* AI Insight Banner */}
          <div className="border-s-4 border-secondary bg-secondary/5 rounded-r-xl p-6 flex items-start gap-5">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  AI Market Analysis
                </span>
                <span className="bg-secondary text-on-secondary-container text-[8px] px-1.5 py-0.5 rounded-sm font-black uppercase">
                  Alpha V2
                </span>
              </div>
              <p className="text-on-surface font-medium italic">
                &quot;GCC {sector.toLowerCase()} businesses at this size
                typically transact at {(multiple - 1).toFixed(0)}-
                {(multiple + 2).toFixed(0)}x EBITDA. Your current trajectory
                suggests a premium multiple of {multiple.toFixed(1)}x.&quot;
              </p>
            </div>
          </div>

          {/* Sensitivity Table */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Sensitivity Analysis: EBITDA Margin Impact
              </h4>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-high/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-4">Margin (%)</th>
                  <th className="px-8 py-4">Adjusted EBITDA</th>
                  <th className="px-8 py-4">Valuation (AED)</th>
                  <th className="px-8 py-4 text-right">Premium / Discount</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {sensitivityRows.map((row) => (
                  <tr
                    key={row.label}
                    className={
                      row.isBaseline
                        ? "bg-primary/5"
                        : "hover:bg-white/5 transition-colors"
                    }
                  >
                    <td
                      className={`px-8 py-5 font-mono ${
                        row.isBaseline
                          ? "text-primary font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      {row.label}
                    </td>
                    <td
                      className={`px-8 py-5 tabular-nums ${
                        row.isBaseline ? "text-primary" : "text-slate-400"
                      }`}
                    >
                      AED {(row.adjEbitda / 1_000_000).toFixed(1)}M
                    </td>
                    <td
                      className={`px-8 py-5 tabular-nums ${
                        row.isBaseline ? "text-primary" : ""
                      }`}
                    >
                      AED {(row.valuation / 1_000_000).toFixed(1)}M
                    </td>
                    <td
                      className={`px-8 py-5 text-right tabular-nums ${
                        row.isBaseline
                          ? "text-primary font-bold"
                          : row.premDiscount > 0
                            ? "text-tertiary"
                            : "text-error"
                      }`}
                    >
                      {row.isBaseline
                        ? "BASELINE"
                        : `${row.premDiscount > 0 ? "+" : ""}${row.premDiscount.toFixed(1)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Step 4
            </button>
            <div className="flex gap-4">
              <button className="px-8 py-4 rounded-xl glass-panel border border-white/10 text-on-surface font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
                Export PDF
              </button>
              <button
                onClick={handleApprove}
                className="gold-gradient px-12 py-4 rounded-xl text-on-primary font-extrabold text-xs uppercase tracking-[0.15em] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                Approve &amp; Finalize Review
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
