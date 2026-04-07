const CURRENCY_SYMBOLS: Record<string, string> = {
  AED: "AED",
  SAR: "SAR",
  QAR: "QAR",
  BHD: "BHD",
  OMR: "OMR",
  KWD: "KWD",
  USD: "USD",
};

export function formatCurrency(
  amount: number,
  currency: string = "AED",
  locale: string = "en"
): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${symbol} ${formatted}`;
}

export function formatCompactNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}Bn`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function formatDate(
  date: Date | string,
  locale: string = "en"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale === "ar" ? "ar-AE" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
