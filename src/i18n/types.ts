import type { CategoryId } from "../lib/types";

// Qo'llab-quvvatlanadigan tillar ro'yxati (20 dan ortiq)
export type LangCode =
  | "uz"
  | "ru"
  | "en"
  | "zh"
  | "ar"
  | "tr"
  | "kk"
  | "tg"
  | "ja"
  | "de"
  | "fr"
  | "es"
  | "ko"
  | "fa"
  | "hi"
  | "it"
  | "pt"
  | "ky"
  | "tk"
  | "az"
  | "uk";

export interface LangMeta {
  code: LangCode;
  /** O'z tilidagi nomi (mahalliy) */
  native: string;
  /** Inglizcha nomi */
  english: string;
  flag: string;
  /** Matn yo'nalishi */
  dir: "ltr" | "rtl";
}

export interface CategoryText {
  name: string;
  description: string;
}

// Barcha tarjima kalitlari. Har bir til fayli shu interfeysни to'liq
// qondirishi shart — aks holda TypeScript build xato beradi (to'liqlik kafolati).
export interface Translation {
  // Navigatsiya
  navHome: string;
  navExplore: string;
  navAssistant: string;
  navFavorites: string;
  navAdmin: string;

  // Tilni tanlash
  langLabel: string;

  // Narx darajalari
  priceFree: string;
  priceCheap: string;
  priceMedium: string;
  priceExpensive: string;

  // Kartochka
  cardDetails: string;
  featuredBadge: string;

  // Bosh sahifa
  homeHeroBadge: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeSearchPlaceholder: string;
  homeAskBtn: string;
  homeQuick1: string;
  homeQuick2: string;
  homeQuick3: string;
  homeQuick4: string;
  homeCatsTitle: string;
  homeCatsSubtitle: string;
  homeSeeAll: string;
  homeFeaturedTitle: string;
  homeFeaturedRegion: string;
  homeAllLink: string;
  homeCtaTitle: string;
  homeCtaText: string;
  homeCtaBtn: string;

  // Kashf etish
  exploreTitle: string;
  exploreSubtitle: string; // {count}
  exploreSearchPlaceholder: string;
  exploreSortRating: string;
  exploreSortName: string;
  exploreSortPrice: string;
  exploreAll: string;
  exploreEmptyTitle: string;
  exploreEmptyText: string;

  // Joy tafsiloti
  detailBack: string;
  detailFeatured: string;
  detailDirections: string;
  detailViewMap: string;
  detailAddFav: string;
  detailInFav: string;
  detailAskSimilar: string;
  detailLocation: string;
  detailSimilar: string;
  detailNotFoundTitle: string;
  detailNotFoundBtn: string;

  // Sevimlilar
  favTitle: string;
  favSubtitleCount: string; // {count}
  favSubtitleEmpty: string;
  favEmptyTitle: string;
  favEmptyText: string;
  favDiscoverBtn: string;
  favAdd: string;
  favRemove: string;

  // AI Yordamchi
  asTitle: string;
  asAiActive: string;
  asLocalMode: string;
  asRegion: string;
  asApiWarnBefore: string;
  asApiWarnSettings: string;
  asApiWarnAfter: string;
  asGreeting: string;
  asInputPlaceholder: string;
  asSend: string;
  asSug1: string;
  asSug2: string;
  asSug3: string;
  asSug4: string;
  asSug5: string;
  asSug6: string;
  asFoundReply: string; // {count}
  asNotFoundReply: string;
  asAiConnectFail: string;
  asAiTempFail: string;

  // Footer
  footerTagline: string;
  footerSections: string;
  footerRegion: string;
  footerRegionItem1: string;
  footerRegionItem2: string;
  footerRegionItem3: string;
  footerAiTitle: string;
  footerAiText: string;
  footerRights: string;

  // 404
  nfTitle: string;
  nfText: string;
  nfBtn: string;

  // Kategoriyalar (nom + tavsif)
  categories: Record<CategoryId, CategoryText>;
}
