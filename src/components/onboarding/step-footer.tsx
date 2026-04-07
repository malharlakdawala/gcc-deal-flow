"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type { OnboardingStep } from "@/types/onboarding";

interface StepFooterProps {
  currentStep: OnboardingStep;
  nextLabel?: string;
  nextDisabled?: boolean;
  onNext?: () => void;
}

export function StepFooter({
  currentStep,
  nextLabel = "Next",
  nextDisabled = false,
  onNext,
}: StepFooterProps) {
  const router = useRouter();
  const { setStep, completeStep } = useOnboardingStore();

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prev = (currentStep - 1) as OnboardingStep;
      setStep(prev);
      router.push(`/onboarding/step-${prev}`);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
      return;
    }
    if (currentStep < 6) {
      completeStep(currentStep);
      const next = (currentStep + 1) as OnboardingStep;
      setStep(next);
      router.push(`/onboarding/step-${next}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-10 border-t border-white/5 gap-6">
      <button
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className="text-slate-400 font-bold hover:text-on-surface transition-colors flex items-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
        Previous Step
      </button>
      <div className="flex items-center gap-8">
        <a
          href="#"
          className="text-primary/70 hover:text-primary font-bold text-sm tracking-wide transition-colors"
        >
          Save &amp; Continue Later
        </a>
        <button
          onClick={handleNext}
          disabled={nextDisabled}
          className={`px-12 py-4 rounded-xl font-bold tracking-widest uppercase text-sm flex items-center gap-3 transition-all duration-200 ${
            nextDisabled
              ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
              : "gold-gradient text-on-primary hover:premium-glow hover:scale-[1.02] shadow-[0_0_20px_rgba(230,195,100,0.2)]"
          }`}
        >
          {nextLabel}
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
