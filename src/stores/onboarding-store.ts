import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  OnboardingStep,
  CompanyType,
  BusinessDetails,
  DocumentUpload,
  DealConfig,
} from "@/types/onboarding";

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: number[];
  companyType: CompanyType | null;
  businessDetails: BusinessDetails;
  documents: DocumentUpload[];
  dealConfig: DealConfig;
  valuationInput: {
    revenue: number | null;
    ebitda: number | null;
    sector: string;
    country: string;
    growth_rate: number | null;
  } | null;

  setStep: (step: OnboardingStep) => void;
  completeStep: (step: OnboardingStep) => void;
  setCompanyType: (type: CompanyType) => void;
  updateBusinessDetails: (details: Partial<BusinessDetails>) => void;
  updateDocument: (index: number, update: Partial<DocumentUpload>) => void;
  updateDealConfig: (config: Partial<DealConfig>) => void;
  setValuationInput: (input: OnboardingState["valuationInput"]) => void;
  reset: () => void;
}

const initialBusinessDetails: BusinessDetails = {
  company_name: "",
  trade_license: "",
  sector: "",
  country: "",
  years_in_operation: null,
  annual_revenue: null,
  employee_count: null,
};

const initialDocuments: DocumentUpload[] = [
  { type: "trade_license", file_name: null, status: "pending" },
  { type: "financials_y1", file_name: null, status: "pending" },
  { type: "financials_y2", file_name: null, status: "pending" },
  { type: "financials_y3", file_name: null, status: "pending" },
  { type: "shareholder_agreement", file_name: null, status: "pending" },
  { type: "memorandum", file_name: null, status: "pending" },
];

const initialDealConfig: DealConfig = {
  deal_type: null,
  asking_pre_money: null,
  equity_offered: null,
  min_ticket: null,
  round_type: null,
  close_date_target: null,
  currency: "AED",
  sharia_compliant: false,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      completedSteps: [],
      companyType: null,
      businessDetails: initialBusinessDetails,
      documents: initialDocuments,
      dealConfig: initialDealConfig,
      valuationInput: null,

      setStep: (step) => set({ currentStep: step }),
      completeStep: (step) =>
        set((s) => ({
          completedSteps: s.completedSteps.includes(step)
            ? s.completedSteps
            : [...s.completedSteps, step],
        })),
      setCompanyType: (type) => set({ companyType: type }),
      updateBusinessDetails: (details) =>
        set((s) => ({
          businessDetails: { ...s.businessDetails, ...details },
        })),
      updateDocument: (index, update) =>
        set((s) => ({
          documents: s.documents.map((doc, i) =>
            i === index ? { ...doc, ...update } : doc
          ),
        })),
      updateDealConfig: (config) =>
        set((s) => ({ dealConfig: { ...s.dealConfig, ...config } })),
      setValuationInput: (input) => set({ valuationInput: input }),
      reset: () =>
        set({
          currentStep: 1,
          completedSteps: [],
          companyType: null,
          businessDetails: initialBusinessDetails,
          documents: initialDocuments,
          dealConfig: initialDealConfig,
          valuationInput: null,
        }),
    }),
    { name: "sovereign-ledger-onboarding" }
  )
);
