"use client";

import { useEffect, useCallback } from "react";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { Badge } from "@/components/ui/badge";
import { StepFooter } from "@/components/onboarding/step-footer";

const DOCUMENT_LABELS: Record<string, { title: string; description: string; icon: string }> = {
  trade_license: {
    title: "Trade License",
    description: "Latest valid UAE Trade License.",
    icon: "verified_user",
  },
  financials_y1: {
    title: "Financial Statements - Year 1",
    description: "Audited accounts for the most recent financial year.",
    icon: "account_balance",
  },
  financials_y2: {
    title: "Financial Statements - Year 2",
    description: "Audited accounts for the prior financial year.",
    icon: "account_balance",
  },
  financials_y3: {
    title: "Financial Statements - Year 3",
    description: "Audited accounts from two years prior.",
    icon: "account_balance",
  },
  shareholder_agreement: {
    title: "Shareholder Agreement",
    description: "Current SHA signed by all major parties.",
    icon: "handshake",
  },
  memorandum: {
    title: "Company Memorandum",
    description: "Memorandum and Articles of Association.",
    icon: "description",
  },
};

const STATUS_BADGE_VARIANT: Record<string, "pending" | "sent" | "signed"> = {
  pending: "pending",
  uploaded: "sent",
  verified: "signed",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  uploaded: "Uploaded",
  verified: "Verified",
};

export default function Step3Page() {
  const { documents, updateDocument, setStep } = useOnboardingStore();

  useEffect(() => {
    setStep(3);
  }, [setStep]);

  const simulateUpload = useCallback(
    (index: number) => {
      const fakeNames = [
        "Trade_License_2024.pdf",
        "FY2023_Audit_Report.pdf",
        "FY2022_Financials.pdf",
        "FY2021_Financials.pdf",
        "SHA_Final_Signed.pdf",
        "MOA_AOA_2024.pdf",
      ];
      updateDocument(index, {
        file_name: fakeNames[index] || `document_${index}.pdf`,
        status: "uploaded",
      });
    },
    [updateDocument]
  );

  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Document Upload Hub
        </h1>
        <p className="text-slate-400 font-medium">
          Verify your corporate identity to unlock institutional capital.
        </p>
      </div>

      {/* AI Insight Banner */}
      <div className="mb-10 p-6 rounded-xl bg-secondary/5 border-s-4 border-secondary flex items-center gap-4">
        <span className="material-symbols-outlined text-secondary">
          auto_awesome
        </span>
        <p className="text-secondary font-medium text-sm">
          Uploading Management Accounts can increase your deal visibility by 25%.
        </p>
        <div className="ml-auto">
          <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
            AI Insight
          </span>
        </div>
      </div>

      {/* Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {documents.map((doc, index) => {
          const meta = DOCUMENT_LABELS[doc.type];
          if (!meta) return null;

          return (
            <div
              key={doc.type}
              className="bg-surface-container-low rounded-xl p-6 flex flex-col group hover:bg-surface-container-high transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    {meta.icon}
                  </span>
                </div>
                <Badge variant={STATUS_BADGE_VARIANT[doc.status]} size="sm">
                  {STATUS_LABELS[doc.status]}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {meta.title}
              </h3>
              <p className="text-xs text-slate-500 mb-6">{meta.description}</p>

              <div className="mt-auto">
                {doc.file_name ? (
                  <div className="bg-surface-container-highest rounded-xl p-4 flex items-center gap-4">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      task_alt
                    </span>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">
                        {doc.file_name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        2.4 MB
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        updateDocument(index, {
                          file_name: null,
                          status: "pending",
                        })
                      }
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => simulateUpload(index)}
                    className="w-full border-2 border-dashed border-outline-variant/30 rounded-xl p-8 text-center group-hover:border-primary/50 transition-colors flex flex-col items-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-slate-600 mb-2">
                      cloud_upload
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Drag &amp; drop or{" "}
                      <span className="text-primary">click to browse</span>
                    </span>
                    <span className="text-[10px] text-slate-600 mt-1">
                      PDF, JPG (Max 10MB)
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <StepFooter currentStep={3} />
    </>
  );
}
