"use client";

import { useState, useCallback, useRef } from "react";
import type {
  ValuationInput,
  ValuationScenario,
  SensitivityRow,
} from "@/types/valuation";
import { createAIService } from "@/lib/ai";

interface UseValuationResult {
  scenarios: ValuationScenario[];
  insight: string;
  sensitivity: SensitivityRow[];
  isLoading: boolean;
  error: string | null;
  recalculate: (input: ValuationInput) => Promise<void>;
}

const aiService = createAIService();

export function useValuation(_initialInput?: ValuationInput): UseValuationResult {
  const [scenarios, setScenarios] = useState<ValuationScenario[]>([]);
  const [insight, setInsight] = useState("");
  const [sensitivity, setSensitivity] = useState<SensitivityRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheRef = useRef<{
    key: string;
    scenarios: ValuationScenario[];
    insight: string;
    sensitivity: SensitivityRow[];
  } | null>(null);

  const recalculate = useCallback(async (input: ValuationInput) => {
    const cacheKey = JSON.stringify(input);

    if (cacheRef.current?.key === cacheKey) {
      setScenarios(cacheRef.current.scenarios);
      setInsight(cacheRef.current.insight);
      setSensitivity(cacheRef.current.sensitivity);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await aiService.generateValuation(input);
      setScenarios(result.scenarios);
      setInsight(result.insight);
      setSensitivity(result.sensitivity);
      cacheRef.current = { key: cacheKey, ...result };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Valuation generation failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { scenarios, insight, sensitivity, isLoading, error, recalculate };
}
