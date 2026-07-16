import type { LangMeta } from "./types";

// 21 ta dunyo tili — foydalanuvchi tanlashi mumkin.
export const LANGUAGES: LangMeta[] = [
  { code: "uz", native: "O'zbek", english: "Uzbek", flag: "🇺🇿", dir: "ltr" },
  { code: "ru", native: "Русский", english: "Russian", flag: "🇷🇺", dir: "ltr" },
  { code: "en", native: "English", english: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "zh", native: "中文", english: "Chinese", flag: "🇨🇳", dir: "ltr" },
  { code: "ar", native: "العربية", english: "Arabic", flag: "🇸🇦", dir: "rtl" },
  { code: "tr", native: "Türkçe", english: "Turkish", flag: "🇹🇷", dir: "ltr" },
  { code: "kk", native: "Қазақша", english: "Kazakh", flag: "🇰🇿", dir: "ltr" },
  { code: "tg", native: "Тоҷикӣ", english: "Tajik", flag: "🇹🇯", dir: "ltr" },
  { code: "ja", native: "日本語", english: "Japanese", flag: "🇯🇵", dir: "ltr" },
  { code: "de", native: "Deutsch", english: "German", flag: "🇩🇪", dir: "ltr" },
  { code: "fr", native: "Français", english: "French", flag: "🇫🇷", dir: "ltr" },
  { code: "es", native: "Español", english: "Spanish", flag: "🇪🇸", dir: "ltr" },
  { code: "ko", native: "한국어", english: "Korean", flag: "🇰🇷", dir: "ltr" },
  { code: "fa", native: "فارسی", english: "Persian", flag: "🇮🇷", dir: "rtl" },
  { code: "hi", native: "हिन्दी", english: "Hindi", flag: "🇮🇳", dir: "ltr" },
  { code: "it", native: "Italiano", english: "Italian", flag: "🇮🇹", dir: "ltr" },
  { code: "pt", native: "Português", english: "Portuguese", flag: "🇵🇹", dir: "ltr" },
  { code: "ky", native: "Кыргызча", english: "Kyrgyz", flag: "🇰🇬", dir: "ltr" },
  { code: "tk", native: "Türkmençe", english: "Turkmen", flag: "🇹🇲", dir: "ltr" },
  { code: "az", native: "Azərbaycan", english: "Azerbaijani", flag: "🇦🇿", dir: "ltr" },
  { code: "uk", native: "Українська", english: "Ukrainian", flag: "🇺🇦", dir: "ltr" },
];

export const DEFAULT_LANG = "uz" as const;
