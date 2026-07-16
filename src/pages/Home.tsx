import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Search, MapPin, ArrowRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { useI18n } from "../context/I18nContext";
import { CATEGORIES } from "../lib/categories";
import { PlaceCard } from "../components/PlaceCard";

export default function Home() {
  const { places } = useData();
  const { t, tc } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const quickPrompts = [
    t("homeQuick1"),
    t("homeQuick2"),
    t("homeQuick3"),
    t("homeQuick4"),
  ];

  const featured = places.filter((p) => p.featured).slice(0, 6);
  const goAssistant = (query: string) =>
    navigate(`/yordamchi?q=${encodeURIComponent(query)}`);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container-app relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip mx-auto border-white/30 bg-white/10 text-white">
              <Sparkles size={14} /> {t("homeHeroBadge")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              {t("homeHeroTitle")}
            </h1>
            <p className="mt-4 text-lg text-brand-50">{t("homeHeroSubtitle")}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) goAssistant(q.trim());
              }}
              className="mx-auto mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-soft"
            >
              <Search className="ml-2 shrink-0 text-slate-400" size={20} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("homeSearchPlaceholder")}
                className="flex-1 bg-transparent px-1 py-2 text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="btn-primary shrink-0">
                {t("homeAskBtn")}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => goAssistant(p)}
                  className="chip border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORIYALAR */}
      <section className="container-app py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("homeCatsTitle")}</h2>
            <p className="mt-1 text-slate-500">{t("homeCatsSubtitle")}</p>
          </div>
          <Link to="/kashf" className="hidden shrink-0 text-sm font-semibold text-brand-700 hover:underline sm:inline">
            {t("homeSeeAll")}
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/kashf?cat=${c.id}`}
              className="card group flex flex-col gap-2 p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="text-3xl">{c.emoji}</span>
              <span className="font-semibold text-slate-900">{tc(c.id).name}</span>
              <span className="text-xs text-slate-500 line-clamp-2">{tc(c.id).description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TAVSIYA ETILGAN */}
      <section className="container-app pb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("homeFeaturedTitle")}</h2>
            <p className="mt-1 flex items-center gap-1 text-slate-500">
              <MapPin size={14} className="shrink-0" /> {t("homeFeaturedRegion")}
            </p>
          </div>
          <Link to="/kashf" className="shrink-0 text-sm font-semibold text-brand-700 hover:underline">
            {t("homeAllLink")}
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <section className="container-app py-14">
        <div className="card flex flex-col items-center gap-4 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center text-white sm:p-12">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500">
            <Sparkles size={26} />
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">{t("homeCtaTitle")}</h2>
          <p className="max-w-xl text-slate-300">{t("homeCtaText")}</p>
          <Link to="/yordamchi" className="btn-primary">
            {t("homeCtaBtn")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
