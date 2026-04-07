"use client";

import { useEffect } from "react";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { StepFooter } from "@/components/onboarding/step-footer";
import type { CompanyType } from "@/types/onboarding";

const COMPANY_TYPES: {
  type: CompanyType;
  label: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
}[] = [
  {
    type: "sme",
    label: "Established SME",
    description: "5-20 years, AED 5M-500M revenue",
    icon: "business",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Most popular",
  },
  {
    type: "family",
    label: "Family Business",
    description: "Multi-generational, succession planning",
    icon: "groups",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    type: "growth_startup",
    label: "Growth-Stage Startup",
    description: "1-5 years, equity fundraise",
    icon: "rocket_launch",
    iconBg: "bg-tertiary/10",
    iconColor: "text-tertiary",
  },
  {
    type: "pre_revenue",
    label: "Pre-Revenue Startup",
    description: "0-2 years, angel/seed round",
    icon: "lightbulb",
    iconBg: "bg-primary-fixed-dim/10",
    iconColor: "text-primary-fixed-dim",
  },
];

export default function Step1Page() {
  const { companyType, setCompanyType, setStep } = useOnboardingStore();

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  return (
    <>
      {/* Main Title Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-on-surface">
          Select Your Company Type
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
          Choose the profile that best describes your business to personalize
          your onboarding journey.
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {COMPANY_TYPES.map((ct) => {
          const isSelected = companyType === ct.type;
          return (
            <button
              key={ct.type}
              onClick={() => setCompanyType(ct.type)}
              className={`group text-left p-8 rounded-xl transition-all duration-300 relative overflow-hidden premium-glow ${
                isSelected
                  ? "bg-surface-container-high border border-primary/30"
                  : "bg-surface-container-low border border-white/5 hover:border-primary/50 hover:bg-surface-container"
              }`}
            >
              {ct.badge && (
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-tertiary/20">
                    {ct.badge}
                  </span>
                </div>
              )}
              <div
                className={`mb-6 w-14 h-14 rounded-2xl ${ct.iconBg} flex items-center justify-center ${ct.iconColor} group-hover:scale-110 transition-transform`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {ct.icon}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-on-surface">
                {ct.label}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {ct.description}
              </p>
              <div className="mt-8 flex justify-end">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-primary"
                      : "border-slate-700 group-hover:border-primary"
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <StepFooter currentStep={1} nextDisabled={!companyType} />

      {/* AI Intelligence Ornament */}
      <div className="fixed bottom-8 right-8 p-6 glass-panel border border-secondary/20 rounded-2xl max-w-xs shadow-2xl z-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
            Wealth Intelligence
          </span>
        </div>
        <p className="text-xs text-on-surface/80 leading-relaxed font-medium">
          Selecting &quot;Established SME&quot; will unlock dedicated commercial
          credit lines and advanced treasury tools.
        </p>
      </div>
    </>
  );
}
