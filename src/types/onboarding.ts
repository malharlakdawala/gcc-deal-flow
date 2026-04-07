import type { DealType, Currency } from "./deal";

export type CompanyType = "sme" | "family" | "growth_startup" | "pre_revenue";

export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface BusinessDetails {
  company_name: string;
  trade_license: string;
  sector: string;
  country: string;
  years_in_operation: number | null;
  annual_revenue: number | null;
  employee_count: number | null;
}

export interface DocumentUpload {
  type: "trade_license" | "financials_y1" | "financials_y2" | "financials_y3" | "shareholder_agreement" | "memorandum";
  file_name: string | null;
  status: "pending" | "uploaded" | "verified";
}

export interface DealConfig {
  deal_type: DealType | null;
  asking_pre_money: number | null;
  equity_offered: number | null;
  min_ticket: number | null;
  round_type: string | null;
  close_date_target: string | null;
  currency: Currency;
  sharia_compliant: boolean;
}

export interface OnboardingState {
  current_step: OnboardingStep;
  completed_steps: Set<OnboardingStep>;
  company_type: CompanyType | null;
  business_details: BusinessDetails;
  documents: DocumentUpload[];
  deal_config: DealConfig;
  valuation_input: {
    revenue: number | null;
    ebitda: number | null;
    sector: string;
    country: string;
    growth_rate: number | null;
  } | null;
}
