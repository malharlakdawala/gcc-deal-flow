import type { SupabaseClient } from "@supabase/supabase-js";

export async function getMandates(client: SupabaseClient, advisorId: string) {
  const { data, error } = await client
    .from("mandates")
    .select(
      `
      *,
      deals(
        project_name,
        deal_type,
        asking_valuation,
        currency,
        ai_velocity,
        status,
        companies(name)
      ),
      commissions(amount, currency, status)
    `
    )
    .eq("advisor_id", advisorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getMandatesByStage(
  client: SupabaseClient,
  advisorId: string
) {
  const { data, error } = await client
    .from("mandates")
    .select(
      `
      *,
      deals(
        project_name,
        deal_type,
        asking_valuation,
        currency,
        ai_velocity,
        status,
        companies(name)
      ),
      commissions(amount, currency, status)
    `
    )
    .eq("advisor_id", advisorId)
    .order("days_in_stage", { ascending: true });

  if (error) throw error;

  const stages = {
    mandate_signed: [] as typeof data,
    listed: [] as typeof data,
    under_nda: [] as typeof data,
    indicative_bids: [] as typeof data,
    term_sheet: [] as typeof data,
  };

  for (const mandate of data) {
    const stage = mandate.stage as keyof typeof stages;
    if (stages[stage]) {
      stages[stage].push(mandate);
    }
  }

  return stages;
}
