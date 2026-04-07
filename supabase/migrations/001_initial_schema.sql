-- 001_initial_schema.sql
-- The Sovereign Ledger - GCC Deal Flow Platform
-- Initial database schema

-- ============================================================
-- PROFILES
-- ============================================================
create table profiles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null check (role in ('advisor', 'company', 'investor')),
  name       text not null,
  avatar_url text,
  locale     text not null default 'en' check (locale in ('en', 'ar')),
  created_at timestamptz not null default now(),
  unique (user_id)
);

-- ============================================================
-- COMPANIES
-- ============================================================
create table companies (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid not null references profiles(id) on delete cascade,
  name            text not null,
  trade_license   text,
  sector          text not null,
  country         text not null,
  company_type    text not null check (company_type in ('sme', 'family', 'growth_startup', 'pre_revenue')),
  revenue_range   text,
  employee_count  int,
  sharia_compliant boolean not null default false,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- DEALS
-- ============================================================
create table deals (
  id               uuid primary key default gen_random_uuid(),
  company_id       uuid not null references companies(id) on delete cascade,
  project_name     text not null,
  deal_type        text not null check (deal_type in ('Full Sale', 'Partial Sale', 'Equity Fundraise', 'Debt', 'MBO', 'JV')),
  status           text not null default 'Draft' check (status in ('Draft', 'Under Review', 'Listed', 'Under NDA', 'Indicative Bids', 'Term Sheet', 'Closed')),
  asking_valuation numeric not null,
  equity_offered   numeric,
  min_ticket       numeric,
  currency         text not null default 'AED' check (currency in ('AED', 'SAR', 'QAR', 'BHD', 'OMR', 'KWD', 'USD')),
  sector           text not null,
  country          text not null,
  sharia_compliant boolean not null default false,
  ai_velocity      text check (ai_velocity in ('on_track', 'at_risk', 'stalled')),
  created_at       timestamptz not null default now(),
  go_live_at       timestamptz
);

-- ============================================================
-- DEAL DOCUMENTS
-- ============================================================
create table deal_documents (
  id         uuid primary key default gen_random_uuid(),
  deal_id    uuid not null references deals(id) on delete cascade,
  doc_type   text not null,
  file_url   text not null,
  status     text not null default 'pending' check (status in ('pending', 'uploaded', 'verified')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- VALUATIONS
-- ============================================================
create table valuations (
  id          uuid primary key default gen_random_uuid(),
  deal_id     uuid not null references deals(id) on delete cascade,
  bear_case   numeric not null,
  base_case   numeric not null,
  bull_case   numeric not null,
  currency    text not null default 'AED' check (currency in ('AED', 'SAR', 'QAR', 'BHD', 'OMR', 'KWD', 'USD')),
  methodology text not null,
  ai_insight  text,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- INVESTORS
-- ============================================================
create table investors (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          uuid not null references profiles(id) on delete cascade,
  firm_name           text not null,
  firm_type           text not null check (firm_type in ('family_office', 'pe', 'vc', 'hnwi', 'sovereign_fund')),
  portfolio_size      numeric,
  sectors_of_interest text[] not null default '{}',
  geography_pref      text[] not null default '{}',
  created_at          timestamptz not null default now()
);

-- ============================================================
-- NDAs
-- ============================================================
create table ndas (
  id          uuid primary key default gen_random_uuid(),
  deal_id     uuid not null references deals(id) on delete cascade,
  investor_id uuid not null references investors(id) on delete cascade,
  status      text not null default 'Pending' check (status in ('Pending', 'Sent', 'Off for Signing', 'Signed', 'Expired')),
  sent_at     timestamptz,
  signed_at   timestamptz,
  expires_at  timestamptz,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- INVESTOR ACTIVITY
-- ============================================================
create table investor_activity (
  id          uuid primary key default gen_random_uuid(),
  deal_id     uuid not null references deals(id) on delete cascade,
  investor_id uuid not null references investors(id) on delete cascade,
  action      text not null check (action in ('teaser_view', 'nda_request', 'nda_signed', 'data_room_access', 'document_view', 'message_sent')),
  created_at  timestamptz not null default now()
);

-- ============================================================
-- MANDATES
-- ============================================================
create table mandates (
  id             uuid primary key default gen_random_uuid(),
  advisor_id     uuid not null references profiles(id) on delete cascade,
  deal_id        uuid not null references deals(id) on delete cascade,
  stage          text not null check (stage in ('mandate_signed', 'listed', 'under_nda', 'indicative_bids', 'term_sheet')),
  commission_pct numeric not null default 0,
  days_in_stage  int not null default 0,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- COMMISSIONS
-- ============================================================
create table commissions (
  id         uuid primary key default gen_random_uuid(),
  mandate_id uuid not null references mandates(id) on delete cascade,
  amount     numeric not null,
  currency   text not null default 'AED' check (currency in ('AED', 'SAR', 'QAR', 'BHD', 'OMR', 'KWD', 'USD')),
  status     text not null default 'pending' check (status in ('pending', 'invoiced', 'paid')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_profiles_user_id on profiles(user_id);
create index idx_companies_profile_id on companies(profile_id);
create index idx_deals_company_id on deals(company_id);
create index idx_deals_status on deals(status);
create index idx_deals_sector on deals(sector);
create index idx_deals_country on deals(country);
create index idx_deal_documents_deal_id on deal_documents(deal_id);
create index idx_valuations_deal_id on valuations(deal_id);
create index idx_investors_profile_id on investors(profile_id);
create index idx_ndas_deal_id on ndas(deal_id);
create index idx_ndas_investor_id on ndas(investor_id);
create index idx_investor_activity_deal_id on investor_activity(deal_id);
create index idx_investor_activity_investor_id on investor_activity(investor_id);
create index idx_mandates_advisor_id on mandates(advisor_id);
create index idx_mandates_deal_id on mandates(deal_id);
create index idx_commissions_mandate_id on commissions(mandate_id);
