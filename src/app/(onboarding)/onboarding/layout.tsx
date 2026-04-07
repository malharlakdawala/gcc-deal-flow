"use client";

import Link from "next/link";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LanguageToggle } from "@/components/features/language-toggle";

const SIDEBAR_STEPS = [
  { step: 1, label: "Company Profile", icon: "business" },
  { step: 2, label: "Director Details", icon: "person_pin" },
  { step: 3, label: "UBO Declaration", icon: "account_balance" },
  { step: 4, label: "Financial Documents", icon: "description" },
  { step: 5, label: "Final Review", icon: "fact_check" },
] as const;

const STEP_TIME_REMAINING: Record<number, string> = {
  1: "~12 minutes remaining",
  2: "~10 minutes remaining",
  3: "~8 minutes remaining",
  4: "~5 minutes remaining",
  5: "~3 minutes remaining",
  6: "Ready for market",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentStep, completedSteps } = useOnboardingStore();

  const percentage = Math.round((currentStep / 6) * 100);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Top Nav Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#071325] border-b border-white/10 shadow-xl flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold text-primary tracking-tight">
          Al-Mawarid Financial
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6">
            <Link
              href="#"
              className="text-slate-400 font-medium hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-slate-400 font-medium hover:text-white transition-colors"
            >
              Help
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:bg-white/5 p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">language</span>
            </button>
            <button className="gold-gradient text-on-primary px-5 py-2 rounded-xl text-sm font-bold hover:scale-95 duration-200">
              Save &amp; Continue Later
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary/30 bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm">
              M
            </div>
          </div>
        </div>
      </nav>

      {/* Side Nav Bar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-[#071325]/60 backdrop-blur-xl flex flex-col pt-20 z-40 shadow-[32px_0_32px_-16px_rgba(7,19,37,0.5)]">
        <div className="px-8 mb-10">
          <div className="text-primary font-bold text-xs uppercase tracking-widest mb-1">
            Onboarding
          </div>
          <div className="text-slate-400 text-[10px] uppercase tracking-widest font-mono">
            The Sovereign Ledger
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {SIDEBAR_STEPS.map(({ step, label, icon }) => {
            const isCompleted = completedSteps.includes(step);
            const isActive = currentStep === step || (currentStep === 6 && step === 5);

            if (isActive && !isCompleted) {
              return (
                <Link
                  key={step}
                  href={`/onboarding/step-${step}`}
                  className="flex items-center gap-4 px-8 py-4 text-primary border-r-4 border-primary bg-gradient-to-r from-primary/10 to-transparent uppercase tracking-widest text-[10px] transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {icon}
                  </span>
                  <span>{label}</span>
                </Link>
              );
            }

            if (isCompleted) {
              return (
                <Link
                  key={step}
                  href={`/onboarding/step-${step}`}
                  className="flex items-center gap-4 px-8 py-4 text-slate-500 uppercase tracking-widest text-[10px] hover:text-primary/70 transition-all"
                >
                  <span
                    className="material-symbols-outlined text-[20px] text-emerald-500"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    check_circle
                  </span>
                  <span>{label}</span>
                </Link>
              );
            }

            return (
              <div
                key={step}
                className="flex items-center gap-4 px-8 py-4 text-slate-600 uppercase tracking-widest text-[10px]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {icon}
                </span>
                <span>{label}</span>
              </div>
            );
          })}
        </nav>

        <div className="p-8 space-y-4 border-t border-white/5">
          <a
            href="#"
            className="flex items-center gap-3 text-slate-500 hover:text-primary/70 transition-all text-[10px] uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-[18px]">
              security
            </span>
            <span>Privacy Policy</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-slate-500 hover:text-primary/70 transition-all text-[10px] uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-[18px]">
              contact_support
            </span>
            <span>Support</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 pt-24 min-h-screen bg-surface-container-lowest overflow-y-auto">
        <div className="max-w-5xl mx-auto px-12 py-12">
          {/* Progress Header */}
          <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
                  Onboarding Progress
                </span>
                <div className="text-3xl font-bold mt-1 tracking-tight">
                  Step {currentStep} of 6 |{" "}
                  <span className="text-primary">{percentage}% complete</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-xs font-medium mb-1 flex items-center justify-end gap-2">
                  <span className="material-symbols-outlined text-sm">
                    schedule
                  </span>
                  {STEP_TIME_REMAINING[currentStep] || "~12 minutes remaining"}
                </div>
                <LanguageToggle />
              </div>
            </div>
            <ProgressBar
              value={percentage}
              variant="gold"
              className="h-1.5"
            />
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
