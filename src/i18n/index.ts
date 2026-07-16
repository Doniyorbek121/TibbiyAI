import type { LangCode, Translation } from "./types";
import { uz } from "./locales/uz";
import { ru } from "./locales/ru";
import { en } from "./locales/en";
import { zh } from "./locales/zh";
import { ar } from "./locales/ar";
import { tr } from "./locales/tr";
import { kk } from "./locales/kk";
import { tg } from "./locales/tg";
import { ja } from "./locales/ja";
import { de } from "./locales/de";
import { fr } from "./locales/fr";
import { es } from "./locales/es";
import { ko } from "./locales/ko";
import { fa } from "./locales/fa";
import { hi } from "./locales/hi";
import { it } from "./locales/it";
import { pt } from "./locales/pt";
import { ky } from "./locales/ky";
import { tk } from "./locales/tk";
import { az } from "./locales/az";
import { uk } from "./locales/uk";

export const TRANSLATIONS: Record<LangCode, Translation> = {
  uz, ru, en, zh, ar, tr, kk, tg, ja, de, fr, es, ko, fa, hi, it, pt, ky, tk, az, uk,
};

export * from "./types";
export { LANGUAGES, DEFAULT_LANG } from "./languages";
