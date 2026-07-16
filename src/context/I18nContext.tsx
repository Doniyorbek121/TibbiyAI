import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CategoryId } from "../lib/types";
import {
  TRANSLATIONS,
  LANGUAGES,
  DEFAULT_LANG,
  type LangCode,
  type Translation,
  type CategoryText,
} from "../i18n";

const LANG_KEY = "bizturizm.lang.v1";

// Faqat matnli (string) kalitlarни ruxsat etamiz — `categories` obyekti alohida.
type StringKeys = {
  [K in keyof Translation]: Translation[K] extends string ? K : never;
}[keyof Translation];

interface I18nContextValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  dir: "ltr" | "rtl";
  /** Tarjima: t("navHome") yoki o'zgaruvchi bilan t("exploreSubtitle", { count: 5 }) */
  t: (key: StringKeys, vars?: Record<string, string | number>) => string;
  /** Kategoriya matnlari (nom + tavsif) joriy tilda */
  tc: (id: CategoryId) => CategoryText;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLang(): LangCode {
  try {
    const saved = localStorage.getItem(LANG_KEY) as LangCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;
    // Brauzer tilini aniqlashga urinamiz
    const nav = navigator.language?.slice(0, 2).toLowerCase();
    const match = LANGUAGES.find((l) => l.code === nav);
    if (match) return match.code;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => detectInitialLang());

  const meta = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const dir = meta.dir;

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<I18nContextValue>(() => {
    const table = TRANSLATIONS[lang] ?? TRANSLATIONS[DEFAULT_LANG];
    const fallback = TRANSLATIONS[DEFAULT_LANG];
    return {
      lang,
      setLang: setLangState,
      dir,
      t: (key, vars) => {
        const raw = (table[key] as string) ?? (fallback[key] as string) ?? key;
        return interpolate(raw, vars);
      },
      tc: (id) => table.categories[id] ?? fallback.categories[id],
    };
  }, [lang, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
