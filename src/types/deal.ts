import type {
  DEAL_TYPES,
  DEAL_STATUSES,
  NDA_STATUSES,
  INVESTOR_HEAT_LEVELS,
  CURRENCIES,
} from "@/lib/constants";

export type DealType = (typeof DEAL_TYPES)[number];
export type DealStatus = (typeof DEAL_STATUSES)[number];
export type NDAStatus = (typeof NDA_STATUSES)[number];
export type InvestorHeatLevel = (typeof INVESTOR_HEAT_LEVELS)[number];
export type Currency = (typeof CURRENCIES)[number];

export interface Deal {
  id: string;
  company_id: string;
  project_name: string;
  deal_type: DealType;
  status: DealStatus;
  asking_valuation: number;
  equity_offered: number | null;
  min_ticket: number | null;
  currency: Currency;
  sector: string;
  country: string;
  sharia_compliant: boolean;
  created_at: string;
  go_live_at: string | null;
  ai_velocity: "on_track" | "at_risk" | "stalled" | null;
}

export interface DealTeaser {
  id: string;
  sector: string;
  country: string;
  deal_type: DealType;
  revenue_range: string;
  asking_valuation_range: string;
  match_score: number;
  sharia_compliant: boolean;
}

export interface DealRevealed extends Deal {
  company_name: string;
  trade_license: string;
  financials: {
    revenue: number;
    ebitda: number;
    net_profit: number;
  };
}

export interface NDA {
  id: string;
  deal_id: string;
  investor_id: string;
  investor_name: string;
  status: NDAStatus;
  sent_at: string;
  signed_at: string | null;
  expires_at: string | null;
}

export interface InvestorActivity {
  id: string;
  deal_id: string;
  investor_id: string;
  investor_name: string;
  action: "teaser_view" | "nda_request" | "nda_signed" | "data_room_access" | "document_view" | "message_sent";
  timestamp: string;
}

export interface Mandate {
  id: string;
  advisor_id: string;
  deal_id: string;
  project_name: string;
  company_code: string;
  deal_type: DealType;
  deal_value_range: string;
  currency: Currency;
  stage: "mandate_signed" | "listed" | "under_nda" | "indicative_bids" | "term_sheet";
  commission_pct: number;
  days_in_stage: number;
  ai_velocity: "on_track" | "at_risk" | "stalled";
  team_avatars: string[];
}

export interface Commission {
  id: string;
  mandate_id: string;
  project_name: string;
  amount: number;
  currency: Currency;
  status: "pending" | "invoiced" | "paid";
  success_fee_pct: number;
}
