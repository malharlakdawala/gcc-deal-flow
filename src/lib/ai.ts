import type {
  ValuationInput,
  ValuationScenario,
  SensitivityRow,
} from "@/types/valuation";
import type { Currency } from "@/types/deal";

// ---------------------------------------------------------------------------
// AI Service interface
// ---------------------------------------------------------------------------

export interface AIService {
  generateValuation(input: ValuationInput): Promise<{
    scenarios: ValuationScenario[];
    insight: string;
    sensitivity: SensitivityRow[];
  }>;

  generateDealInsight(context: {
    dealType: string;
    sector: string;
    country: string;
    stage: string;
  }): Promise<string>;

  generateMarketContext(
    sector: string,
    country: string
  ): Promise<{ median: number; topQuartile: number; regional: string }>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(): Promise<void> {
  return delay(800 + Math.random() * 700);
}

const SECTOR_MULTIPLES: Record<string, [number, number]> = {
  Healthcare: [10, 14],
  Technology: [12, 18],
  Logistics: [6, 8],
  "Real Estate": [8, 12],
  "F&B": [5, 8],
  Hospitality: [7, 10],
  Education: [8, 11],
  Renewables: [9, 13],
  "Financial Services": [10, 15],
  Retail: [5, 9],
};

const COUNTRY_PREMIUM: Record<string, number> = {
  UAE: 1.05,
  KSA: 1.08,
  Qatar: 1.02,
  Bahrain: 0.95,
  Oman: 0.93,
  Kuwait: 0.98,
};

// ---------------------------------------------------------------------------
// Mock implementation
// ---------------------------------------------------------------------------

class MockAIService implements AIService {
  async generateValuation(input: ValuationInput) {
    await randomDelay();

    const { ebitda, sector, country, growth_rate, revenue } = input;
    const [lo, hi] = SECTOR_MULTIPLES[sector] ?? [7, 10];
    const countryFactor = COUNTRY_PREMIUM[country] ?? 1.0;
    const growthBonus = Math.max(0, (growth_rate - 10) * 0.02);

    const baseMultiple =
      ((lo + hi) / 2 + growthBonus) * countryFactor;
    const bearMultiple = baseMultiple * 0.8;
    const bullMultiple = baseMultiple * 1.2;

    const currency: Currency = country === "KSA" ? "SAR" : country === "Qatar" ? "QAR" : country === "Bahrain" ? "BHD" : country === "Oman" ? "OMR" : country === "Kuwait" ? "KWD" : "AED";

    const scenarios: ValuationScenario[] = [
      {
        label: "bear",
        amount: Math.round(ebitda * bearMultiple),
        currency,
        multiple: parseFloat(bearMultiple.toFixed(1)),
        methodology: "Discount to sector median",
      },
      {
        label: "base",
        amount: Math.round(ebitda * baseMultiple),
        currency,
        multiple: parseFloat(baseMultiple.toFixed(1)),
        methodology: "EV/EBITDA sector median",
      },
      {
        label: "bull",
        amount: Math.round(ebitda * bullMultiple),
        currency,
        multiple: parseFloat(bullMultiple.toFixed(1)),
        methodology: "Premium for growth + market tailwinds",
      },
    ];

    const marginPct = revenue > 0 ? (ebitda / revenue) * 100 : 20;
    const baseVal = scenarios[1].amount;

    const sensitivity: SensitivityRow[] = [-2, -1, 0, 1, 2].map((delta) => {
      const newMargin = marginPct + delta;
      const adjustedEbitda =
        delta === 0 ? ebitda : Math.round(revenue * (newMargin / 100));
      const val = Math.round(adjustedEbitda * baseMultiple);
      const premDisc =
        baseVal > 0
          ? parseFloat((((val - baseVal) / baseVal) * 100).toFixed(1))
          : 0;
      return {
        label:
          delta === 0
            ? "Baseline"
            : delta < 0
              ? `Margin ${delta}%`
              : `Margin +${delta}%`,
        margin_pct: parseFloat(newMargin.toFixed(1)),
        adjusted_ebitda: adjustedEbitda,
        valuation: val,
        premium_discount_pct: premDisc,
      };
    });

    const insights = [
      `${sector} assets in ${country} are trading at ${lo}-${hi}x EBITDA, with cross-border interest from Abu Dhabi and Riyadh sovereign wealth funds driving premiums up 5-8% this quarter.`,
      `Current pipeline data shows ${country}-based ${sector.toLowerCase()} businesses at this revenue scale closing within 4-6 months. Growth rate of ${growth_rate}% positions this above the 75th percentile.`,
      `Comparable transactions in the GCC ${sector.toLowerCase()} segment over the past 12 months support a base multiple of ${baseMultiple.toFixed(1)}x. Sharia-compliant structures may unlock an additional 3-5% premium from Islamic funds.`,
    ];
    const insight = insights[Math.floor(Math.random() * insights.length)];

    return { scenarios, insight, sensitivity };
  }

  async generateDealInsight(context: {
    dealType: string;
    sector: string;
    country: string;
    stage: string;
  }): Promise<string> {
    await randomDelay();

    const pool = [
      `3 deals in your pipeline are losing momentum. Consider opening data rooms for shortlisted buyers to re-engage interest.`,
      `Market conditions in ${context.country} improved your indicative valuation by 4% this week, driven by increased sovereign fund activity in ${context.sector.toLowerCase()}.`,
      `Investor Al Faisal Group viewed financials 6 times over 34 minutes. This is a high-intent signal worth following up on.`,
      `GCC ${context.sector.toLowerCase()} businesses at this size typically transact at 8-12x EBITDA. Your ${context.dealType.toLowerCase()} is well-positioned.`,
      `Predictive modeling suggests 82% alignment with Oasis Sovereign Fund investment criteria based on sector, geography, and deal structure.`,
      `${context.stage} stage deals in ${context.country} ${context.sector.toLowerCase()} have a median close rate of 34%. Moving to data room access could increase this to 58%.`,
      `Two new investors matching your criteria registered on the platform this week. Both focus on ${context.sector.toLowerCase()} assets in the ${context.country} market.`,
    ];

    return pool[Math.floor(Math.random() * pool.length)];
  }

  async generateMarketContext(
    sector: string,
    country: string
  ): Promise<{ median: number; topQuartile: number; regional: string }> {
    await randomDelay();

    const [lo, hi] = SECTOR_MULTIPLES[sector] ?? [7, 10];
    const countryFactor = COUNTRY_PREMIUM[country] ?? 1.0;
    const median = parseFloat((((lo + hi) / 2) * countryFactor).toFixed(1));
    const topQuartile = parseFloat((hi * countryFactor).toFixed(1));

    const contexts = [
      `${country} ${sector.toLowerCase()} market is seeing increased M&A activity, with 23% more mandates signed year-over-year. Vision 2030 spending is a key driver.`,
      `Cross-border interest from Southeast Asian family offices into GCC ${sector.toLowerCase()} has risen 15% this quarter. Valuations are firm.`,
      `Regulatory changes in ${country} are creating a more favourable environment for ${sector.toLowerCase()} transactions, particularly for partial sale structures.`,
    ];

    return {
      median,
      topQuartile,
      regional: contexts[Math.floor(Math.random() * contexts.length)],
    };
  }
}

// ---------------------------------------------------------------------------
// Future: Real implementation using Anthropic SDK
// ---------------------------------------------------------------------------
// import Anthropic from '@anthropic-ai/sdk';
//
// class ClaudeAIService implements AIService {
//   private client: Anthropic;
//
//   constructor() {
//     this.client = new Anthropic();
//   }
//
//   async generateValuation(input: ValuationInput) {
//     const message = await this.client.messages.create({
//       model: 'claude-sonnet-4-20250514',
//       max_tokens: 1024,
//       messages: [{
//         role: 'user',
//         content: `Analyse the following company for a GCC M&A valuation: ${JSON.stringify(input)}`
//       }],
//     });
//     // Parse structured output...
//   }
//
//   async generateDealInsight(context) { ... }
//   async generateMarketContext(sector, country) { ... }
// }

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createAIService(): AIService {
  // Returns MockAIService for development.
  // Swap to ClaudeAIService when the Anthropic API key is configured.
  return new MockAIService();
}
