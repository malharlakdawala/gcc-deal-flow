import type { Currency } from "./deal";

export interface ValuationInput {
  revenue: number;
  ebitda: number;
  sector: string;
  country: string;
  growth_rate: number;
}

export interface ValuationScenario {
  label: "bear" | "base" | "bull";
  amount: number;
  currency: Currency;
  multiple: number;
  methodology: string;
}

export interface Valuation {
  id: string;
  deal_id: string;
  bear_case: number;
  base_case: number;
  bull_case: number;
  currency: Currency;
  methodology: string;
  ai_insight: string;
  created_at: string;
}

export interface SensitivityRow {
  label: string;
  margin_pct: number;
  adjusted_ebitda: number;
  valuation: number;
  premium_discount_pct: number;
}
