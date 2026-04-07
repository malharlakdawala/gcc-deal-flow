import type { SupabaseClient } from "@supabase/supabase-js";
import type { Deal } from "@/types/deal";

interface DealFilters {
  status?: string;
  sector?: string;
  country?: string;
  sharia_compliant?: boolean;
  deal_type?: string;
}

export async function getDeals(client: SupabaseClient, filters?: DealFilters) {
  let query = client
    .from("deals")
    .select("*, companies(name, sector, country, company_type, revenue_range)")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.sector) {
    query = query.eq("sector", filters.sector);
  }
  if (filters?.country) {
    query = query.eq("country", filters.country);
  }
  if (filters?.sharia_compliant !== undefined) {
    query = query.eq("sharia_compliant", filters.sharia_compliant);
  }
  if (filters?.deal_type) {
    query = query.eq("deal_type", filters.deal_type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getDealById(client: SupabaseClient, id: string) {
  const { data, error } = await client
    .from("deals")
    .select(
      `
      *,
      companies(id, name, trade_license, sector, country, company_type, revenue_range, employee_count, sharia_compliant),
      valuations(id, bear_case, base_case, bull_case, currency, methodology, ai_insight, created_at)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getDealTeasers(client: SupabaseClient) {
  const { data, error } = await client
    .from("deals")
    .select(
      "id, sector, country, deal_type, asking_valuation, currency, sharia_compliant, companies(revenue_range)"
    )
    .eq("status", "Listed")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((deal) => ({
    id: deal.id,
    sector: deal.sector,
    country: deal.country,
    deal_type: deal.deal_type,
    revenue_range: (deal.companies as unknown as { revenue_range: string } | null)?.revenue_range ?? "Undisclosed",
    asking_valuation_range: formatValuationRange(deal.asking_valuation, deal.currency),
    sharia_compliant: deal.sharia_compliant,
  }));
}

function formatValuationRange(valuation: number, currency: string): string {
  const m = valuation / 1_000_000;
  if (m < 10) return `${currency} ${Math.floor(m)}-${Math.ceil(m * 1.3)}M`;
  const lower = Math.floor(m * 0.8);
  const upper = Math.ceil(m * 1.2);
  return `${currency} ${lower}-${upper}M`;
}

export async function createDeal(
  client: SupabaseClient,
  data: Omit<Deal, "id" | "created_at">
) {
  const { data: deal, error } = await client
    .from("deals")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return deal;
}

export async function updateDealStatus(
  client: SupabaseClient,
  id: string,
  status: Deal["status"]
) {
  const { data, error } = await client
    .from("deals")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
