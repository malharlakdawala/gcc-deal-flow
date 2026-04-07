"use client";

import { useLocaleStore } from "@/stores/locale-store";
import { translations, type TranslationKey } from "@/data/translations";

export function useLocale() {
  const { locale, setLocale, toggleLocale } = useLocaleStore();

  const t = (key: TranslationKey): string => {
    return translations[locale][key] ?? key;
  };

  const direction = locale === "ar" ? "rtl" : "ltr";

  return { locale, direction, t, setLocale, toggleLocale };
}
