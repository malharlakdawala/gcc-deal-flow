import { en } from "./en";
import { ar } from "./ar";

export type TranslationKey = keyof typeof en;

export const translations = { en, ar } as const;
