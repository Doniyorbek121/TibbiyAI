import type { Category, CategoryId } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "oshxona",
    name: "Oshxona va taomlar",
    emoji: "🍲",
    description: "Milliy taomlar, choyxona, kafe va restoranlar",
  },
  {
    id: "mehmonxona",
    name: "Mehmonxona",
    emoji: "🏨",
    description: "Mehmonxona, hostel va mehmon uylari",
  },
  {
    id: "ziyoratgoh",
    name: "Ziyoratgoh",
    emoji: "🕌",
    description: "Masjidlar, maqbaralar va muqaddas maskanlar",
  },
  {
    id: "tarixiy",
    name: "Tarixiy joylar",
    emoji: "🏛️",
    description: "Qadimiy obidalar, muzeylar va yodgorliklar",
  },
  {
    id: "tabiat",
    name: "Tabiat",
    emoji: "⛰️",
    description: "Tog'lar, soylar, buloqlar va sayilgohlar",
  },
  {
    id: "hunarmandchilik",
    name: "Hunarmandchilik",
    emoji: "🔪",
    description: "Chust pichog'i, do'ppi va milliy hunarmandlar ustaxonalari",
  },
  {
    id: "dam_olish",
    name: "Dam olish",
    emoji: "🌳",
    description: "Bog'lar, park va oilaviy dam olish maskanlari",
  },
  {
    id: "xaridlar",
    name: "Xaridlar",
    emoji: "🛍️",
    description: "Bozorlar, do'konlar va savdo markazlari",
  },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<CategoryId, Category>
);

export function categoryName(id: CategoryId): string {
  return CATEGORY_MAP[id]?.name ?? id;
}

export function categoryEmoji(id: CategoryId): string {
  return CATEGORY_MAP[id]?.emoji ?? "📍";
}
