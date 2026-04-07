import type { SupabaseClient } from "@supabase/supabase-js";

export async function getInvestors(client: SupabaseClient) {
  const { data, error } = await client
    .from("investors")
    .select("*, profiles(name, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getInvestorActivity(
  client: SupabaseClient,
  dealId: string
) {
  const { data, error } = await client
    .from("investor_activity")
    .select("*, investors(firm_name, profiles(name))")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Groups investors by engagement heat level for a given deal.
 *
 * Heat levels are derived from the highest-value action each investor
 * has taken on the deal:
 *   - Very Hot: message_sent
 *   - Hot: document_view or data_room_access
 *   - Active: nda_signed
 *   - Engaged: nda_request
 *   - Browse: teaser_view only
 */
export async function getInvestorHeatMap(
  client: SupabaseClient,
  dealId: string
) {
  const { data, error } = await client
    .from("investor_activity")
    .select("investor_id, action, investors(firm_name, firm_type, profiles(name))")
    .eq("deal_id", dealId);

  if (error) throw error;

  const actionWeight: Record<string, number> = {
    teaser_view: 1,
    nda_request: 2,
    nda_signed: 3,
    data_room_access: 4,
    document_view: 4,
    message_sent: 5,
  };

  const heatLabels: Record<number, string> = {
    1: "Browse",
    2: "Engaged",
    3: "Active",
    4: "Hot",
    5: "Very Hot",
  };

  // Group by investor, find max action weight
  const investorMap = new Map<
    string,
    { investor_id: string; firm_name: string; name: string; firm_type: string; maxWeight: number }
  >();

  for (const row of data) {
    const existing = investorMap.get(row.investor_id);
    const weight = actionWeight[row.action] ?? 0;
    const investor = row.investors as unknown as {
      firm_name: string;
      firm_type: string;
      profiles: { name: string } | null;
    } | null;

    if (!existing || weight > existing.maxWeight) {
      investorMap.set(row.investor_id, {
        investor_id: row.investor_id,
        firm_name: investor?.firm_name ?? "Unknown",
        name: investor?.profiles?.name ?? "Unknown",
        firm_type: investor?.firm_type ?? "unknown",
        maxWeight: Math.max(weight, existing?.maxWeight ?? 0),
      });
    }
  }

  // Group by heat level
  const heatMap: Record<string, Array<{ investor_id: string; firm_name: string; name: string; firm_type: string }>> = {
    "Very Hot": [],
    Hot: [],
    Active: [],
    Engaged: [],
    Browse: [],
  };

  for (const inv of investorMap.values()) {
    const label = heatLabels[inv.maxWeight] ?? "Browse";
    heatMap[label].push({
      investor_id: inv.investor_id,
      firm_name: inv.firm_name,
      name: inv.name,
      firm_type: inv.firm_type,
    });
  }

  return heatMap;
}
