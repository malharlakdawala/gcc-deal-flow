import type { SupabaseClient } from "@supabase/supabase-js";
import type { Valuation } from "@/types/valuation";

export async function getValuation(client: SupabaseClient, dealId: string) {
  const { data, error } = await client
    .from("valuations")
    .select("*")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

export async function createValuation(
  client: SupabaseClient,
  data: Omit<Valuation, "id" | "created_at">
) {
  const { data: valuation, error } = await client
    .from("valuations")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return valuation;
}
