import { create } from "zustand";
import { persist } from "zustand/middleware";

type Locale = "en" | "ar";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "en",
      setLocale: (locale) => {
        set({ locale });
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
      },
      toggleLocale: () => {
        const next = get().locale === "en" ? "ar" : "en";
        get().setLocale(next);
      },
    }),
    { name: "sovereign-ledger-locale" }
  )
);
