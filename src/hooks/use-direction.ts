import { useLocaleStore } from "@/stores/locale-store";

export function useDirection() {
  const { locale } = useLocaleStore();
  return locale === "ar" ? "rtl" : "ltr";
}
