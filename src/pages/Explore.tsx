import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { useData } from "../context/DataContext";
import { useI18n } from "../context/I18nContext";
import { CATEGORIES } from "../lib/categories";
import type { CategoryId } from "../lib/types";
import { PlaceCard } from "../components/PlaceCard";

type SortKey = "rating" | "name" | "price";

export default function Explore() {
  const { places } = useData();
  const { t, tc } = useI18n();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("rating");

  const activeCat = (params.get("cat") as CategoryId | null) ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCat]);

  const setCat = (cat: CategoryId | null) => {
    const next = new URLSearchParams(params);
    if (cat) next.set("cat", cat);
    else next.delete("cat");
    setParams(next);
  };

  const filtered = useMemo(() => {
    let list = [...places];
    if (activeCat) list = list.filter((p) => p.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.address.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.priceLevel - b.priceLevel;
    });
    return list;
  }, [places, activeCat, query, sort]);

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("exploreTitle")}</h1>
      <p className="mt-1 text-slate-500">
        {t("exploreSubtitle", { count: places.length })}
      </p>

      {/* Qidiruv + saralash */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
          <Search size={18} className="shrink-0 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("exploreSearchPlaceholder")}
            className="flex-1 bg-transparent py-2.5 text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
          <SlidersHorizontal size={16} className="shrink-0 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-transparent py-2.5 text-sm outline-none"
          >
            <option value="rating">{t("exploreSortRating")}</option>
            <option value="name">{t("exploreSortName")}</option>
            <option value="price">{t("exploreSortPrice")}</option>
          </select>
        </div>
      </div>

      {/* Kategoriya filtrlari */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCat(null)}
          className={`chip ${
            !activeCat
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
          }`}
        >
          {t("exploreAll")}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`chip ${
              activeCat === c.id
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
            }`}
          >
            {c.emoji} {tc(c.id).name}
          </button>
        ))}
      </div>

      {/* Natijalar */}
      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-slate-500">
          <p className="text-4xl">🔍</p>
          <p className="mt-3 font-medium">{t("exploreEmptyTitle")}</p>
          <p className="text-sm">{t("exploreEmptyText")}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}
    </div>
  );
}
