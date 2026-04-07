export const APP_NAME = "The Sovereign Ledger";

export const GCC_COUNTRIES = [
  "UAE",
  "KSA",
  "Qatar",
  "Bahrain",
  "Oman",
  "Kuwait",
] as const;

export const SECTORS = [
  "Healthcare",
  "Hospitality",
  "Technology",
  "Logistics",
  "Real Estate",
  "F&B",
  "Education",
  "Renewables",
  "Financial Services",
  "Retail",
] as const;

export const DEAL_TYPES = [
  "Full Sale",
  "Partial Sale",
  "Equity Fundraise",
  "Debt",
  "MBO",
  "JV",
] as const;

export const DEAL_STATUSES = [
  "Draft",
  "Under Review",
  "Listed",
  "Under NDA",
  "Indicative Bids",
  "Term Sheet",
  "Closed",
] as const;

export const NDA_STATUSES = [
  "Pending",
  "Sent",
  "Off for Signing",
  "Signed",
  "Expired",
] as const;

export const INVESTOR_HEAT_LEVELS = [
  "Browse",
  "Engaged",
  "Active",
  "Hot",
  "Very Hot",
] as const;

export const USER_ROLES = ["advisor", "company", "investor"] as const;

export const CURRENCIES = ["AED", "SAR", "QAR", "BHD", "OMR", "KWD", "USD"] as const;

export const REGULATORY_BODIES = [
  "DFSA",
  "ADGM",
  "SCA",
  "CMA",
  "QFC",
  "CBB",
] as const;
