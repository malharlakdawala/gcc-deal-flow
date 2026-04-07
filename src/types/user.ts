import type { USER_ROLES } from "@/lib/constants";

export type UserRole = (typeof USER_ROLES)[number];

export interface Profile {
  id: string;
  user_id: string;
  role: UserRole;
  name: string;
  avatar_url: string | null;
  locale: "en" | "ar";
  created_at: string;
}

export interface AdvisorProfile extends Profile {
  role: "advisor";
  firm_name: string;
  license_number: string;
}

export interface CompanyProfile extends Profile {
  role: "company";
  company_name: string;
  trade_license: string;
  sector: string;
  country: string;
}

export interface InvestorProfile extends Profile {
  role: "investor";
  firm_name: string;
  firm_type: "family_office" | "pe" | "vc" | "hnwi" | "sovereign_fund";
  portfolio_size: number;
  sectors_of_interest: string[];
  geography_pref: string[];
}
