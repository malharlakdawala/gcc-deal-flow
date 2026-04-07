"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { ProgressBar } from "@/components/ui/progress-bar";

const COMPANY_TYPE_LABELS: Record<string, string> = {
  sme: "Established SME",
  family: "Family Business",
  growth_startup: "Growth-Stage Startup",
  pre_revenue: "Pre-Revenue Startup",
};

const DOC_LABELS: Record<string, string> = {
  trade_license: "Trade License",
  financials_y1: "Financial Statements Y1",
  financials_y2: "Financial Statements Y2",
  financials_y3: "Financial Statements Y3",
  shareholder_agreement: "Shareholder Agreement",
  memorandum: "Company Memorandum",
};

export default function Step6Page() {
  const router = useRouter();
  const {
    companyType,
    businessDetails,
    documents,
    dealConfig,
    valuationInput,
    setStep,
    completeStep,
  } = useOnboardingStore();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setStep(6);
  }, [setStep]);

  const ebitdaNum = valuationInput?.ebitda ?? 2_200_000;
  const multiple = 7.0;
  const baseValuation = ebitdaNum * multiple;
  const bearValuation = ebitdaNum * (multiple - 1.5);
  const bullValuation = ebitdaNum * (multiple + 1.2);

  const uploadedCount = documents.filter(
    (d) => d.status === "uploaded" || d.status === "verified"
  ).length;
  const docProgress = Math.round((uploadedCount / documents.length) * 100);

  const goToStep = (step: number) => {
    router.push(`/onboarding/step-${step}`);
  };

  const handleGoLive = () => {
    completeStep(6);
    setShowModal(false);
    // In production this would submit to an API
  };

  function formatVal(val: number): string {
    return new Intl.NumberFormat("en-AE").format(Math.round(val));
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Review &amp; Go Live
        </h1>
        <p className="text-slate-400 font-medium">
          Step 6 of 6 | 100% complete
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Summary */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          {/* Company Summary */}
          <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-primary font-bold tracking-widest text-xs uppercase">
                Company Summary
              </h3>
              <button
                onClick={() => goToStep(1)}
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Company Type
                </label>
                <p className="text-lg font-semibold text-white">
                  {companyType
                    ? COMPANY_TYPE_LABELS[companyType]
                    : "Not selected"}
                </p>
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Sector
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-white">
                    {businessDetails.sector || "Not set"}
                  </p>
                  {dealConfig.sharia_compliant && (
                    <Badge variant="sharia" size="sm">
                      Sharia
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Company Name
                </label>
                <p className="text-lg font-semibold text-white">
                  {businessDetails.company_name || "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Country
                </label>
                <p className="text-lg font-semibold text-white">
                  {businessDetails.country || "Not set"}
                </p>
              </div>
            </div>
          </div>

          {/* Deal Terms */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-primary font-bold tracking-widest text-xs uppercase">
                Deal Terms
              </h3>
              <button
                onClick={() => goToStep(4)}
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Deal Type
                </label>
                <p className="text-lg font-semibold text-white">
                  {dealConfig.deal_type || "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Pre-Money Valuation
                </label>
                <p className="text-lg font-semibold text-white font-mono tabular-nums">
                  {dealConfig.asking_pre_money
                    ? `AED ${formatVal(dealConfig.asking_pre_money)}`
                    : "Not set"}
                </p>
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Equity Offered
                </label>
                <p className="text-lg font-semibold text-white font-mono">
                  {dealConfig.equity_offered
                    ? `${dealConfig.equity_offered}%`
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Min Ticket Size
                </label>
                <p className="text-lg font-semibold text-white font-mono tabular-nums">
                  {dealConfig.min_ticket
                    ? `AED ${formatVal(dealConfig.min_ticket)}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Checklist */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-primary font-bold tracking-widest text-xs uppercase">
                Documents
              </h3>
              <button
                onClick={() => goToStep(3)}
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>
                  {uploadedCount} of {documents.length} uploaded
                </span>
                <span className="font-mono">{docProgress}%</span>
              </div>
              <ProgressBar value={docProgress} variant="teal" className="h-1" />
            </div>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.type}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-container-highest/30"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-sm ${
                        doc.status !== "pending"
                          ? "text-tertiary"
                          : "text-slate-600"
                      }`}
                      style={
                        doc.status !== "pending"
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {doc.status !== "pending" ? "check_circle" : "circle"}
                    </span>
                    <span className="text-sm text-on-surface">
                      {DOC_LABELS[doc.type]}
                    </span>
                  </div>
                  <Badge
                    variant={
                      doc.status === "verified"
                        ? "signed"
                        : doc.status === "uploaded"
                          ? "sent"
                          : "pending"
                    }
                    size="sm"
                  >
                    {doc.status === "verified"
                      ? "Verified"
                      : doc.status === "uploaded"
                        ? "Uploaded"
                        : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Valuation & Score */}
        <div className="col-span-12 md:col-span-5 space-y-6">
          {/* Valuation Summary */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-primary font-bold tracking-widest text-xs uppercase">
                Valuation Summary
              </h3>
              <button
                onClick={() => goToStep(5)}
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-surface-container-highest/30">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                    Bear Case
                  </div>
                </div>
                <span className="font-mono font-bold text-on-surface tabular-nums">
                  AED {formatVal(bearValuation)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-primary/5 border border-primary/30">
                <div>
                  <div className="text-[10px] text-primary uppercase tracking-widest font-bold">
                    Base Case
                  </div>
                </div>
                <span className="font-mono font-extrabold text-primary text-xl tabular-nums">
                  AED {formatVal(baseValuation)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-surface-container-highest/30">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                    Bull Case
                  </div>
                </div>
                <span className="font-mono font-bold text-on-surface tabular-nums">
                  AED {formatVal(bullValuation)}
                </span>
              </div>
            </div>
          </div>

          {/* Deal Readiness Score */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 flex flex-col items-center text-center">
            <h3 className="text-primary font-bold tracking-widest text-xs uppercase mb-8 self-start">
              Deal Readiness Score
            </h3>
            <div className="relative w-48 h-48 mb-6">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(230, 195, 100, 0.1)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="rgba(230, 195, 100, 0.1)"
                  strokeWidth="0.5"
                />
                <path
                  d="M50 5 L50 95 M5 50 L95 50"
                  stroke="rgba(230, 195, 100, 0.1)"
                  strokeWidth="0.5"
                />
                <polygon
                  points="50,15 80,40 70,75 30,70 20,40"
                  fill="rgba(230, 195, 100, 0.2)"
                  stroke="#E6C364"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                  84
                </span>
                <span className="text-[10px] text-primary uppercase font-bold">
                  Strong
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Your profile shows high readiness in Governance and Financial
              Clarity. Transparency is optimal for UAE sovereign funds.
            </p>
          </div>
        </div>

        {/* AI Insights */}
        <div className="col-span-12">
          <Card
            variant="ai"
            className="p-8 bg-gradient-to-r from-surface-container-low to-secondary/5"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary text-xl">
                psychology
              </span>
              <h3 className="text-white font-bold tracking-tight">
                AI Insights: Quick Wins to Boost Score
              </h3>
              <span className="text-[10px] font-bold text-secondary border border-secondary/30 px-2 py-0.5 rounded ml-2 uppercase">
                Analysis Complete
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Upload Board Minutes", pts: "+8 pts" },
                { label: "Add ESG Statement", pts: "+5 pts" },
                { label: "Link LinkedIn Profile", pts: "+3 pts" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-surface-container-highest/30 p-4 rounded-lg flex items-start gap-3 border border-white/5 hover:bg-surface-container-highest transition-all"
                >
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                    add_circle
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {item.label}
                    </p>
                    <p className="text-primary font-bold text-xs mt-1 font-mono">
                      {item.pts}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-12 flex justify-between items-center bg-surface-container-low p-6 rounded-xl border border-white/5">
        <button
          onClick={() => goToStep(5)}
          className="text-slate-400 hover:text-white transition-all font-bold text-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Modify Previous Steps
        </button>
        <div className="flex gap-4">
          <button className="px-8 py-3 rounded-lg border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all">
            Save as Draft
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="gold-gradient px-10 py-3 rounded-lg text-on-primary font-bold text-sm shadow-[0_4px_20px_rgba(230,195,100,0.3)] hover:shadow-[0_4px_30px_rgba(230,195,100,0.5)] transition-all"
          >
            Publish Anonymised Listing
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Go Live Confirmation"
      >
        <div className="space-y-6">
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Your deal is about to go live on The Sovereign Ledger. Once
            published, your anonymized teaser will be visible to qualified
            investors across the GCC network.
          </p>
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-tertiary text-sm">
                verified
              </span>
              <span className="text-xs font-bold text-tertiary uppercase tracking-widest">
                Pre-launch checklist
              </span>
            </div>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">
                  check
                </span>
                Company profile complete
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">
                  check
                </span>
                Deal terms configured
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">
                  check
                </span>
                Valuation approved
              </li>
            </ul>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-3 rounded-xl border border-white/10 text-on-surface font-semibold text-sm hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleGoLive}
              className="gold-gradient px-8 py-3 rounded-xl text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              Confirm &amp; Go Live
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
