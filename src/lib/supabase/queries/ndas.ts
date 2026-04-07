import type { SupabaseClient } from "@supabase/supabase-js";

export async function getNDAs(client: SupabaseClient, dealId: string) {
  const { data, error } = await client
    .from("ndas")
    .select("*, investors(firm_name, firm_type, profiles(name))")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getNDAsByInvestor(
  client: SupabaseClient,
  investorId: string
) {
  const { data, error } = await client
    .from("ndas")
    .select("*, deals(project_name, sector, country, deal_type, status)")
    .eq("investor_id", investorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
