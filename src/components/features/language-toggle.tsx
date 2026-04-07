"use client";

import { useLocale } from "@/hooks/use-locale";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <div className="flex items-center bg-surface-container-low rounded-full p-1">
      <button
        onClick={locale !== "en" ? toggleLocale : undefined}
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          locale === "en"
            ? "bg-surface-container-high text-on-surface font-semibold"
            : "text-on-surface-variant"
        }`}
      >
        EN
      </button>
      <button
        onClick={locale !== "ar" ? toggleLocale : undefined}
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          locale === "ar"
            ? "bg-surface-container-high text-on-surface font-semibold"
            : "text-on-surface-variant"
        }`}
      >
        AR
      </button>
    </div>
  );
}
