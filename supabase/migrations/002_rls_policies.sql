-- 002_rls_policies.sql
-- Row Level Security policies for The Sovereign Ledger

-- ============================================================
-- Enable RLS on all tables
-- ============================================================
alter table profiles enable row level security;
alter table companies enable row level security;
alter table deals enable row level security;
alter table deal_documents enable row level security;
alter table valuations enable row level security;
alter table investors enable row level security;
alter table ndas enable row level security;
alter table investor_activity enable row level security;
alter table mandates enable row level security;
alter table commissions enable row level security;

-- ============================================================
-- PROFILES
-- Users can read and update their own profile, insert on signup
-- ============================================================
create policy "profiles_select_own"
  on profiles for select
  using (user_id = auth.uid());

create policy "profiles_insert_own"
  on profiles for insert
  with check (user_id = auth.uid());

create policy "profiles_update_own"
  on profiles for update
  using (user_id = auth.uid());

-- ============================================================
-- COMPANIES
-- Company users CRUD their own; advisors read companies they have mandates for
-- ============================================================
create policy "companies_select_own"
  on companies for select
  using (
    profile_id in (select id from profiles where user_id = auth.uid())
  );

create policy "companies_select_advisor_mandate"
  on companies for select
  using (
    exists (
      select 1 from mandates m
      join deals d on d.id = m.deal_id
      join profiles p on p.id = m.advisor_id
      where d.company_id = companies.id
        and p.user_id = auth.uid()
    )
  );

create policy "companies_insert_own"
  on companies for insert
  with check (
    profile_id in (select id from profiles where user_id = auth.uid() and role = 'company')
  );

create policy "companies_update_own"
  on companies for update
  using (
    profile_id in (select id from profiles where user_id = auth.uid() and role = 'company')
  );

create policy "companies_delete_own"
  on companies for delete
  using (
    profile_id in (select id from profiles where user_id = auth.uid() and role = 'company')
  );

-- ============================================================
-- DEALS
-- Companies own their deals; advisors see mandated deals;
-- investors see Listed deals (teaser) or deals with signed NDAs
-- ============================================================
create policy "deals_select_company_own"
  on deals for select
  using (
    company_id in (
      select c.id from companies c
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "deals_select_advisor_mandate"
  on deals for select
  using (
    exists (
      select 1 from mandates m
      join profiles p on p.id = m.advisor_id
      where m.deal_id = deals.id
        and p.user_id = auth.uid()
    )
  );

create policy "deals_select_investor_listed"
  on deals for select
  using (
    status = 'Listed'
    and exists (
      select 1 from profiles p where p.user_id = auth.uid() and p.role = 'investor'
    )
  );

create policy "deals_select_investor_nda_signed"
  on deals for select
  using (
    exists (
      select 1 from ndas n
      join investors i on i.id = n.investor_id
      join profiles p on p.id = i.profile_id
      where n.deal_id = deals.id
        and n.status = 'Signed'
        and p.user_id = auth.uid()
    )
  );

create policy "deals_insert_company"
  on deals for insert
  with check (
    company_id in (
      select c.id from companies c
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "deals_update_company"
  on deals for update
  using (
    company_id in (
      select c.id from companies c
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

-- ============================================================
-- DEAL DOCUMENTS
-- Same access as deals (company owner + mandated advisor + NDA-signed investor)
-- ============================================================
create policy "deal_documents_select_company"
  on deal_documents for select
  using (
    deal_id in (
      select d.id from deals d
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "deal_documents_select_advisor"
  on deal_documents for select
  using (
    exists (
      select 1 from mandates m
      join profiles p on p.id = m.advisor_id
      where m.deal_id = deal_documents.deal_id
        and p.user_id = auth.uid()
    )
  );

create policy "deal_documents_select_investor_nda"
  on deal_documents for select
  using (
    exists (
      select 1 from ndas n
      join investors i on i.id = n.investor_id
      join profiles p on p.id = i.profile_id
      where n.deal_id = deal_documents.deal_id
        and n.status = 'Signed'
        and p.user_id = auth.uid()
    )
  );

create policy "deal_documents_insert_company"
  on deal_documents for insert
  with check (
    deal_id in (
      select d.id from deals d
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

-- ============================================================
-- VALUATIONS
-- Same access as deals
-- ============================================================
create policy "valuations_select_company"
  on valuations for select
  using (
    deal_id in (
      select d.id from deals d
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "valuations_select_advisor"
  on valuations for select
  using (
    exists (
      select 1 from mandates m
      join profiles p on p.id = m.advisor_id
      where m.deal_id = valuations.deal_id
        and p.user_id = auth.uid()
    )
  );

create policy "valuations_insert_company"
  on valuations for insert
  with check (
    deal_id in (
      select d.id from deals d
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

-- ============================================================
-- INVESTORS
-- Investor users CRUD their own profile
-- ============================================================
create policy "investors_select_own"
  on investors for select
  using (
    profile_id in (select id from profiles where user_id = auth.uid())
  );

-- Advisors and companies can see investors who interacted with their deals
create policy "investors_select_deal_parties"
  on investors for select
  using (
    exists (
      select 1 from ndas n
      join deals d on d.id = n.deal_id
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where n.investor_id = investors.id
        and p.user_id = auth.uid()
    )
    or exists (
      select 1 from ndas n
      join mandates m on m.deal_id = n.deal_id
      join profiles p on p.id = m.advisor_id
      where n.investor_id = investors.id
        and p.user_id = auth.uid()
    )
  );

create policy "investors_insert_own"
  on investors for insert
  with check (
    profile_id in (select id from profiles where user_id = auth.uid() and role = 'investor')
  );

create policy "investors_update_own"
  on investors for update
  using (
    profile_id in (select id from profiles where user_id = auth.uid() and role = 'investor')
  );

create policy "investors_delete_own"
  on investors for delete
  using (
    profile_id in (select id from profiles where user_id = auth.uid() and role = 'investor')
  );

-- ============================================================
-- NDAs
-- Deal owner (company) and the investor can read
-- ============================================================
create policy "ndas_select_company"
  on ndas for select
  using (
    deal_id in (
      select d.id from deals d
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "ndas_select_advisor"
  on ndas for select
  using (
    exists (
      select 1 from mandates m
      join profiles p on p.id = m.advisor_id
      where m.deal_id = ndas.deal_id
        and p.user_id = auth.uid()
    )
  );

create policy "ndas_select_investor"
  on ndas for select
  using (
    investor_id in (
      select i.id from investors i
      join profiles p on p.id = i.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "ndas_insert_investor"
  on ndas for insert
  with check (
    investor_id in (
      select i.id from investors i
      join profiles p on p.id = i.profile_id
      where p.user_id = auth.uid()
    )
  );

-- ============================================================
-- INVESTOR ACTIVITY
-- Deal owner and the specific investor can read
-- ============================================================
create policy "investor_activity_select_company"
  on investor_activity for select
  using (
    deal_id in (
      select d.id from deals d
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "investor_activity_select_advisor"
  on investor_activity for select
  using (
    exists (
      select 1 from mandates m
      join profiles p on p.id = m.advisor_id
      where m.deal_id = investor_activity.deal_id
        and p.user_id = auth.uid()
    )
  );

create policy "investor_activity_select_investor"
  on investor_activity for select
  using (
    investor_id in (
      select i.id from investors i
      join profiles p on p.id = i.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "investor_activity_insert"
  on investor_activity for insert
  with check (
    investor_id in (
      select i.id from investors i
      join profiles p on p.id = i.profile_id
      where p.user_id = auth.uid()
    )
  );

-- ============================================================
-- MANDATES
-- Advisor CRUD their own; company whose deal it is can read
-- ============================================================
create policy "mandates_select_advisor"
  on mandates for select
  using (
    advisor_id in (select id from profiles where user_id = auth.uid())
  );

create policy "mandates_select_company"
  on mandates for select
  using (
    deal_id in (
      select d.id from deals d
      join companies c on c.id = d.company_id
      join profiles p on p.id = c.profile_id
      where p.user_id = auth.uid()
    )
  );

create policy "mandates_insert_advisor"
  on mandates for insert
  with check (
    advisor_id in (select id from profiles where user_id = auth.uid() and role = 'advisor')
  );

create policy "mandates_update_advisor"
  on mandates for update
  using (
    advisor_id in (select id from profiles where user_id = auth.uid() and role = 'advisor')
  );

create policy "mandates_delete_advisor"
  on mandates for delete
  using (
    advisor_id in (select id from profiles where user_id = auth.uid() and role = 'advisor')
  );

-- ============================================================
-- COMMISSIONS
-- Advisor who owns the mandate can read
-- ============================================================
create policy "commissions_select_advisor"
  on commissions for select
  using (
    mandate_id in (
      select m.id from mandates m
      join profiles p on p.id = m.advisor_id
      where p.user_id = auth.uid()
    )
  );
